import { useCallback, useEffect, useRef, useState } from "react";

type AudioGraph = {
  ctx: AudioContext;
  master: GainNode;
  oscillators: OscillatorNode[];
  lfos: OscillatorNode[];
};

const TARGET_VOLUME = 0.055;

/**
 * A generated late-night pad: a low, slow, slightly detuned chord with a
 * breathing filter. Nothing autoplays — the AudioContext is only created after
 * the visitor taps the sound control.
 */
export function useNightAmbience() {
  const [playing, setPlaying] = useState(false);
  const [supported, setSupported] = useState(true);
  const graphRef = useRef<AudioGraph | null>(null);
  const fadeTimerRef = useRef<number | null>(null);

  const createGraph = useCallback((): AudioGraph | null => {
    const AudioCtor =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioCtor) return null;

    const ctx = new AudioCtor();
    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 520;
    filter.Q.value = 0.7;
    filter.connect(master);

    const tremolo = ctx.createGain();
    tremolo.gain.value = 0.9;
    tremolo.connect(filter);

    const oscillators: OscillatorNode[] = [];
    const lfos: OscillatorNode[] = [];

    // A low D-minor pad with the ninth on top, spread across the stereo field.
    const chord = [73.42, 110, 146.83, 174.61, 220, 293.66, 329.63];
    chord.forEach((frequency, index) => {
      const osc = ctx.createOscillator();
      const voiceGain = ctx.createGain();
      const panner = ctx.createStereoPanner();

      osc.type = index % 2 === 0 ? "sine" : "triangle";
      osc.frequency.value = frequency;
      osc.detune.value = index % 2 === 0 ? -5 : 5;

      voiceGain.gain.value = index === 0 ? 0.26 : 0.09;
      panner.pan.value = (index / (chord.length - 1)) * 1.3 - 0.65;

      osc.connect(voiceGain);
      voiceGain.connect(panner);
      panner.connect(tremolo);
      osc.start();
      oscillators.push(osc);
    });

    // The filter drifts like a slow breath; the volume swells behind it.
    const filterLfo = ctx.createOscillator();
    const filterDepth = ctx.createGain();
    filterLfo.frequency.value = 0.032;
    filterDepth.gain.value = 190;
    filterLfo.connect(filterDepth);
    filterDepth.connect(filter.frequency);
    filterLfo.start();
    lfos.push(filterLfo);

    const tremoloLfo = ctx.createOscillator();
    const tremoloDepth = ctx.createGain();
    tremoloLfo.frequency.value = 0.06;
    tremoloDepth.gain.value = 0.09;
    tremoloLfo.connect(tremoloDepth);
    tremoloDepth.connect(tremolo.gain);
    tremoloLfo.start();
    lfos.push(tremoloLfo);

    return { ctx, master, oscillators, lfos };
  }, []);

  const toggle = useCallback(async () => {
    if (fadeTimerRef.current) {
      window.clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }

    if (playing) {
      const graph = graphRef.current;
      if (!graph) {
        setPlaying(false);
        return;
      }
      const now = graph.ctx.currentTime;
      graph.master.gain.cancelScheduledValues(now);
      graph.master.gain.setValueAtTime(
        Math.max(graph.master.gain.value, 0.0001),
        now,
      );
      graph.master.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
      setPlaying(false);
      fadeTimerRef.current = window.setTimeout(() => {
        void graph.ctx.suspend();
      }, 1_000);
      return;
    }

    let graph = graphRef.current;
    if (!graph) {
      graph = createGraph();
      if (!graph) {
        setSupported(false);
        return;
      }
      graphRef.current = graph;
    }

    try {
      await graph.ctx.resume();
    } catch {
      setSupported(false);
      return;
    }

    const now = graph.ctx.currentTime;
    graph.master.gain.cancelScheduledValues(now);
    graph.master.gain.setValueAtTime(
      Math.max(graph.master.gain.value, 0.0001),
      now,
    );
    graph.master.gain.exponentialRampToValueAtTime(TARGET_VOLUME, now + 3);
    setPlaying(true);
  }, [createGraph, playing]);

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current);
      const graph = graphRef.current;
      if (!graph) return;
      graph.oscillators.forEach((osc) => {
        try {
          osc.stop();
        } catch {
          // The oscillator may already have stopped.
        }
      });
      graph.lfos.forEach((lfo) => {
        try {
          lfo.stop();
        } catch {
          // The LFO may already have stopped.
        }
      });
      void graph.ctx.close();
      graphRef.current = null;
    };
  }, []);

  return { playing, supported, toggle };
}

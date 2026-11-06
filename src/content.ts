/**
 * Every word a visitor sees lives in this file.
 *
 * Change a string here, run `npm run build`, republish — nothing in the
 * components needs touching. Arabic-script strings are rendered right-to-left
 * by the component that reads them, so keep them as plain text.
 */

export type InvitationRow = {
  label: string;
  value: string;
};

export type PlanStep = {
  index: string;
  title: string;
  emoji: string;
  body: string;
};

export type Surprise = {
  glyph: string;
  label: string;
  message: string;
};

export const invite = {
  brand: {
    name: "The 2 AM Protocol",
    tagline: "One cup of tea. One endless conversation. Zero intentions of sleeping.",
    edition: "Nº 001",
    place: "Cairo · after midnight",
  },

  /* ------------------------------------------------------------ Opening */

  opening: {
    kicker: "Confidential after-hours invitation",
    headingLead: "Hey,",
    headingAccent: "Night Owl",
    headingEmoji: "🌙",
    subtitle: "I have a very serious question.",
    questionLabel: "The question",
    /** Arabic script — rendered right-to-left. */
    question: "هنشاي؟",
    questionEmoji: "☕😏",
    supporting:
      "Because apparently sleeping at a reasonable hour is no longer part of our lifestyle.",
    cta: "LET'S BREAK OUR SLEEP SCHEDULE",
    ctaEmoji: "💋",
    micro: "One button. There is no maybe later. 😌",
    railLeft: "Cairo · after 1 AM",
    railRight: "Sleep is optional",
  },

  /* ----------------------------------------------------- The night plan */

  night: {
    scrollCue: "Keep going. This is where it gets worse. 😏",
  },

  plan: {
    eyebrow: "Phase one · the procedure",
    headingLead: "The plan is",
    headingAccent: "simple",
    headingEmoji: "😂",
    intro:
      "Five steps. We have never once made it past step four sober on sleep. 😏",
    steps: [
      {
        index: "01",
        title: "THE PREPARATION",
        emoji: "☕",
        body: "One of us makes tea, the other makes coffee. Or we both make both. We're not here to follow rules.",
      },
      {
        index: "02",
        title: "THE CALL",
        emoji: "📱",
        body: "Just a quick call... famous last words.",
      },
      {
        index: "03",
        title: "THE CONVERSATION",
        emoji: "😏",
        body: "Random stories, gossip, teasing, flirting, and conversations that make absolutely no sense at 3 AM.",
      },
      {
        index: "04",
        title: "THE DENIAL",
        emoji: "🥱",
        body: "Okay, last five minutes. Promise.",
      },
      {
        index: "05",
        title: "THE INCIDENT",
        emoji: "😂",
        body: "We wake up the next morning and discover that the call is STILL CONNECTED.",
      },
    ] satisfies PlanStep[],

    call: {
      label: "Call in progress",
      caption: "The part where hours disappear.",
      startSeconds: 5_003,
      speed: 4,
      archive: ["01:23:45", "02:47:19", "04:12:38"],
      archiveLabel: "Previous confirmed incidents",
      disclaimer:
        "A playful simulation only. No call is placed, no call data is read, nothing about you is tracked.",
    },

    lastFive: {
      label: "OK, LAST FIVE MINUTES",
      note: "Tap it. The counter is scientific.",
      /** Index 0 is the first tap; the last entry repeats forever. */
      replies: [
        "Five minutes. This time for real. 🥱",
        "That was twelve minutes ago. Keep going. 😏",
        "El call lazem y2fel. It will not close. 😂",
        "Five minutes, times four. New personal record. ✨",
        "At this point the phone needs a charger and an apology. 🔌",
      ],
    },
  },

  /* -------------------------------------------------- Things we both know */

  know: {
    eyebrow: "Phase two · the evidence",
    headingLead: "Things we both know,",
    headingAccent: "but pretend we don't",
    headingEmoji: "😏",
    intro:
      "Unverified claims. Completely deniable. Tap each one to make it official. 👇",
    messages: [
      "We said five minutes. We both knew that was a lie.",
      "Your voice is becoming a serious sleep schedule problem.",
      "I was supposed to sleep three hours ago. Anyway...",
      "Mesh 3ayzeen ne2fel el call wala eh? 😂",
      "The tea gets cold, but the conversation doesn't.",
      "Somehow, even silence on this call isn't awkward.",
    ],
    more: {
      label: "SHOW ME MORE TROUBLE",
      emoji: "💋",
      hint: "One more tap. Then we really sleep. 😌",
      exhausted: "That is all of it. Deny anything you like. 😏",
    },
    /** Revealed three at a time by the button above. */
    extras: [
      "If we both say goodnight first, nobody actually sleeps. 😌",
      "Our sleep schedule now has a mutual witness. 😂",
      "One more story. Then another. Then that one from 2019. ✨",
      "Coffee number three at 3 AM is a personality trait, not a choice. ☕",
      "We're not tired. We're just horizontal, with our phones. 🥱",
      "Ana bel2 al call y2fel, w betkellem laan enta betsama2. 😏",
      "Tomorrow's us already knows tonight's us won't listen. 💋",
      "The group chat is jealous of this call. ❤️‍🔥",
      "You laugh at the worst possible hour, on purpose. 😂",
    ],
  },

  /* ---------------------------------------------------- Final invitation */

  final: {
    eyebrow: "Phase three · the actual invite",
    headingLead: "So... are we",
    headingAccent: "doing this tonight",
    headingEmoji: "🌙",
    invitation:
      "Your official invitation to another completely unnecessary, ridiculously long, sleep-destroying conversation.",
    card: {
      label: "The 2 AM Protocol",
      number: "Nº 001",
      titleLead: "Admittedly scheduled for",
      titleAccent: "absolutely no sleep",
      rows: [
        { label: "Activity", value: "Tea, coffee & endless talking ☕" },
        { label: "Starting", value: "Whenever we say we're going to sleep." },
        { label: "Duration", value: "Nobody knows." },
        { label: "Location", value: "Wherever your phone and charger are." },
        {
          label: "Dress code",
          value: "Pajamas encouraged. 😏",
        },
        {
          label: "Exit strategy",
          value: "Apparently nonexistent.",
        },
      ] satisfies InvitationRow[],
      note: "Bring the stories. Leave the bedtime logic at the door. 🌙",
      stub: "Valid for one very long night",
    },
    cta: "OBVIOUSLY, LET'S DO IT",
    ctaEmoji: "❤️‍🔥",
    micro: "No pressure. Only tea. 🍵",
  },

  /* ------------------------------------------------------------ Accepted */

  accepted: {
    eyebrow: "Rsvp · unanimously approved",
    headingLead: "Excellent.",
    headingAccent: "The Insomnia Committee approves",
    headingEmoji: "😂",
    intro:
      "Two votes in favour, zero abstentions, and one phone that will be warm in the morning.",
    pouring: "Now go make your drink. I'll be waiting...",
    pourEmoji: "☕💋",
    cup: {
      tea: "Tea",
      coffee: "Coffee",
      hint: "Tap the cup to switch sides of this argument.",
    },
    psTitle: "P.S.",
    psBody:
      "If you fall asleep first, I'm still talking. You'll hear about it tomorrow. 😂",
    share: {
      label: "SEND MY ACCEPTANCE",
      emoji: "💌",
      message:
        "Officially accepting another night of tea, coffee, gossip, flirting and absolutely no sleeping. 😂☕🌙",
      hint: "Opens WhatsApp with the message ready. Just hit send.",
    },
    replay: "Back to the top of the night",
  },

  /* ------------------------------------------------------------ Easter eggs */

  /** Shown when a drifting decoration is tapped. */
  surprises: [
    { glyph: "🌙", label: "A floating moon", message: "The moon has been on this call longer than both of us. 🌙" },
    { glyph: "🍵", label: "A floating glass of tea", message: "Still warm? So is the gossip. 🍵" },
    { glyph: "☕", label: "A floating coffee cup", message: "This is your third cup. It is 2 AM. Proceed. ☕" },
    { glyph: "✨", label: "A floating star", message: "You found a star. It is also sleep-deprived. ✨" },
    { glyph: "💋", label: "A floating kiss", message: "Careful. That is how the whole thing starts. 💋" },
    { glyph: "🥱", label: "A floating yawn", message: "That yawn was three hours ago. Denial continues. 🥱" },
  ] satisfies Surprise[],

  footer: "Made at an hour we agreed never to mention again.",
} as const;

/** WhatsApp deep link. The message is encoded here — never hand-encode it. */
export const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
  invite.accepted.share.message,
)}`;

/**
 * Every word a visitor sees lives in this file.
 *
 * Change a string here, run `npm run build`, republish — nothing in the
 * components needs touching. Copy is English only; emoji do the work that
 * italics and exclamation marks cannot.
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

/** The three details the recipient gets to pick on the acceptance screen. */
export type TermGroupId = "starting" | "dress" | "exit";

export type TermGroup = {
  id: TermGroupId;
  label: string;
  options: readonly string[];
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
    question: "Tea or coffee? You know the drill.",
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

    duration: {
      label: "Expected call duration",
      value: "∞",
      caption: "Give or take a sunrise.",
      note: "I know we said it would be a five-minute call. 🤣",
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
      "Are we seriously thinking about ending this call? 😂",
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
      "I keep saying we should hang up. You keep talking because I'm listening. 😏",
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
      inMessage: { tea: "Tea 🍵", coffee: "Coffee ☕" },
      hint: "Tap the cup to switch sides of this argument.",
    },
    psTitle: "P.S.",
    psBody:
      "If you fall asleep first, I'm still talking. You'll hear about it tomorrow. 😂",
    terms: {
      eyebrow: "The rules, as agreed",
      intro:
        "Pick the details. They go straight into the message, so there is nothing left to negotiate. 😌",
      activityLabel: "Activity",
      durationLabel: "Duration",
      durationValue: "Infinity. We said five minutes. 🤣",
      locationLabel: "Location",
      locationValue: "Wherever your phone and charger are.",
      hint: "Everything above is already in the message. 💌",
      groups: [
        {
          id: "starting",
          label: "Starting",
          options: [
            "Whenever we say we're going to sleep",
            "After 11, when the house goes quiet",
            "2 AM sharp, obviously",
          ],
        },
        {
          id: "dress",
          label: "Dress code",
          options: [
            "Pajamas, encouraged 😏",
            "A hoodie that is technically mine",
            "Something reckless",
          ],
        },
        {
          id: "exit",
          label: "Exit strategy",
          options: [
            "Apparently nonexistent",
            "One last episode, then we mean it",
            "Sunrise, whichever comes first",
          ],
        },
      ] satisfies TermGroup[],
    },
    share: {
      label: "SEND MY ACCEPTANCE",
      emoji: "💌",
      message:
        "Officially accepting another night of tea, coffee, gossip, flirting and absolutely no sleeping. 😂☕🌙",
      hint: "Opens WhatsApp with tonight's rules and your picks already in the message. Just hit send.",
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

export type ShareDetails = {
  drink: string;
  starting: string;
  dress: string;
  exit: string;
};

/**
 * WhatsApp deep link, built from tonight's picks. Every line is encoded here —
 * never hand-encode the message.
 */
export function buildWhatsappUrl({
  drink,
  starting,
  dress,
  exit,
}: ShareDetails) {
  const { share, terms } = invite.accepted;
  const labelFor = (id: TermGroupId) =>
    terms.groups.find((group) => group.id === id)?.label ?? id;

  const lines = [
    share.message,
    `Drink: ${drink}`,
    `${labelFor("starting")}: ${starting}`,
    `${labelFor("dress")}: ${dress}`,
    `${labelFor("exit")}: ${exit}`,
    `${terms.durationLabel}: ${terms.durationValue}`,
  ];

  return `https://wa.me/?text=${encodeURIComponent(lines.join("\n"))}`;
}

export type ChurchEvent = {
  title: string;
  /** Exact day (YYYY-MM-DD) when it's known */
  date?: string;
  /** Month it happens in (YYYY-MM) when the exact day isn't set yet */
  month?: string;
  time?: string;
  /** Keeps the event listed but marks it as canceled */
  canceled?: boolean;
  description: string;
  link?: { label: string; href: string };
};

// To add an event, copy an entry below. Each event hides itself once its day
// (or its month, if no day is set) has passed, so nothing stale stays up.
export const events: ChurchEvent[] = [
  {
    title: "New Life Sisterhood",
    date: "2026-11-11",
    time: "5:00 PM to 7:00 PM",
    description:
      "New Life Sisterhood will meet at Shannon Terry's home. Ladies of every age are welcome to join us for fellowship and time together. We'd love to see you there!",
    link: { label: "About Women's Ministries", href: "/ministries#womens-ministries" },
  },
  {
    title: "Safe Spot Halloween Candy",
    date: "2026-10-31",
    time: "5:00 PM to 8:00 PM",
    description:
      "Find us at the Safe Spot at the Grayson County Fairgrounds! Treats on the Trail was canceled, but the candy collected for it isn't going to waste. We'll be passing it out to the children, so bring the kids by in their costumes and say hello. We'd love to see you there!",
    link: { label: "About Outreach", href: "/ministries#outreach" },
  },
];

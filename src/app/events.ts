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
    title: "Treats on the Trail",
    date: "2026-10-10",
    canceled: true,
    description:
      "Treats on the Trail has been canceled. Thank you for understanding, and we hope to see you at an upcoming event!",
  },
  {
    title: "New Life Sisterhood",
    date: "2026-10-13",
    time: "5:00 PM to 7:00 PM",
    description:
      "New Life Sisterhood will meet at Sherry McClure's home. Ladies of every age are welcome to join us for fellowship and time together. We'd love to see you there!",
    link: { label: "About Women's Ministries", href: "/ministries#womens-ministries" },
  },
  {
    title: "Fellowship Dinner",
    date: "2026-10-18",
    time: "Immediately following service",
    description:
      "Stay after Sunday service and share a meal with your church family. We'll be serving a variety of soups, sandwiches, breads, and desserts. Newcomers are always welcome at the table!",
    link: { label: "About Fellowship", href: "/ministries#fellowship" },
  },
];

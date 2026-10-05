export type ChurchEvent = {
  title: string;
  /** Exact day (YYYY-MM-DD) when it's known */
  date?: string;
  /** Month it happens in (YYYY-MM) when the exact day isn't set yet */
  month?: string;
  time?: string;
  description: string;
  link?: { label: string; href: string };
};

// To add an event, copy an entry below. Each event hides itself once its day
// (or its month, if no day is set) has passed, so nothing stale stays up.
export const events: ChurchEvent[] = [
  {
    title: "Treats on the Trail",
    date: "2026-10-10",
    description:
      "A fun, family-friendly fall event with treats for the kids. Bring the whole family and invite a friend. Everyone is welcome!",
  },
  {
    title: "Women's Ministries Meeting",
    date: "2026-10-13",
    description:
      "Ladies of every age, join us for prayer, Bible study, and time together. We'd love to see you there!",
    link: { label: "About Women's Ministries", href: "/ministries#womens-ministries" },
  },
  {
    title: "Fellowship Dinner",
    date: "2026-10-18",
    description:
      "Come share a meal and good conversation with your church family. Newcomers are always welcome at the table.",
    link: { label: "About Fellowship", href: "/ministries#fellowship" },
  },
];

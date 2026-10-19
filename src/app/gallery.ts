export type GalleryPhoto = {
  src: string;
  alt: string;
  /** The file's real pixel size (keeps the layout from jumping while it loads) */
  width: number;
  height: number;
  /** Which part stays in view when a card crops the photo, as CSS
   * object-position (e.g. "50% 20%" keeps the top). Defaults to the center. */
  focus?: string;
};

export type GalleryAlbum = {
  title: string;
  /** Month it happened (YYYY-MM), shown as "October 2026" */
  month?: string;
  /** One or two warm sentences, shown on the newest album only */
  description?: string;
  /** The first photo is the album's cover */
  photos: GalleryPhoto[];
};

// To add an event, copy an entry below and put it at the TOP of the list.
// The newest album is featured large on the home page and the next three
// show as cards; anything older stays here but drops off the page.
// Photos go in public/ as WebP (about 1600px on the long side), named like
// new-life-assembly-<event>[-<detail>].webp.
export const albums: GalleryAlbum[] = [
  {
    title: "Fall Fellowship Dinner",
    month: "2026-10",
    description:
      "Our church family stayed after Sunday service to share soups, sandwiches, breads, and desserts. Thank you to everyone who cooked, served, and pulled up a chair!",
    photos: [
      {
        src: "/new-life-assembly-fellowship-dinner.webp",
        alt: "Church family eating together at fall-decorated tables during a fellowship dinner at New Life Assembly",
        width: 1600,
        height: 1200,
      },
      {
        src: "/new-life-assembly-fellowship-dinner-serving.webp",
        alt: "Church members filling their plates from a line of slow cookers at a fellowship dinner",
        width: 1600,
        height: 1200,
      },
      {
        src: "/new-life-assembly-fellowship-dinner-tables.webp",
        alt: "Friends talking and laughing around a table at a New Life Assembly fellowship dinner",
        width: 1200,
        height: 1600,
      },
    ],
  },
  {
    title: "Christmas Play",
    photos: [
      {
        src: "/gallery-christmas-play-stage.webp",
        alt: "Christmas nativity play on stage at New Life Assembly",
        width: 1200,
        height: 407,
      },
      {
        src: "/gallery-christmas-play-angels.webp",
        alt: "Children dressed as angels in the Christmas play at New Life Assembly",
        width: 1200,
        height: 2131,
      },
      {
        src: "/gallery-christmas-play-kids.webp",
        alt: "Kids performing in the Christmas play at New Life Assembly",
        width: 1153,
        height: 1500,
      },
    ],
  },
  {
    title: "Vacation Bible School",
    photos: [
      {
        src: "/gallery-vbs-group.webp",
        alt: "VBS kids group photo at New Life Assembly",
        width: 1200,
        height: 1072,
      },
      {
        src: "/gallery-vbs-crafts.webp",
        alt: "Kids doing crafts and activities at VBS at New Life Assembly",
        width: 1200,
        height: 2131,
      },
    ],
  },
  {
    title: "Easter Egg Hunt",
    photos: [
      {
        src: "/gallery-egg-hunt-kid.webp",
        alt: "Child holding a basket of Easter eggs at the New Life Assembly egg hunt",
        width: 900,
        height: 1200,
        focus: "50% 10%",
      },
    ],
  },
];

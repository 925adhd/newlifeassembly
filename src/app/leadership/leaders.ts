export type Leader = {
  name: string;
  role: string;
  leads: string;
  bio: string;
  image?: string;
};

// Names and roles come from the church bulletin and the board list the church
// sent. Bios describe each role; swap in personal details as the church shares them.
export const leaders: Leader[] = [
  {
    name: "Tim Wilson",
    role: "Sunday School",
    leads: "Sunday School · Sundays at 10:00 AM",
    image: "/tim-wilson.webp",
    bio: "Tim Wilson leads our Sunday School hour, guiding adults through in-depth Bible study and discussion to start each Sunday in God's Word.",
  },
  {
    name: "Lee Sandlin",
    role: "Worship Leader",
    leads: "Sunday Worship · Sundays at 11:00 AM",
    image: "/lee-sandlin.webp",
    bio: "Lee Sandlin leads Sunday morning worship, blending contemporary praise with timeless hymns as our church family gathers in God's presence.",
  },
  {
    name: "Tammy Sandlin",
    role: "Children's Church",
    leads: "Children's Church · Sundays at 11:30 AM",
    image: "/tammy-sandlin.webp",
    bio: "Tammy Sandlin leads Children's Church, giving kids a safe, fun place to learn about God's love through lessons, crafts, games, and worship.",
  },
  {
    name: "Sherry McClure",
    role: "Secretary / Treasurer",
    leads: "Church Office & Finances",
    image: "/sherry-mcclure.webp",
    bio: "Sherry McClure serves as our church secretary and treasurer, faithfully keeping records and caring for the finances that support every ministry.",
  },
  {
    name: "Jared Wilson",
    role: "Sound Technician",
    leads: "Sound · Sunday Services",
    bio: "Jared Wilson runs sound for our services, making sure every song and every word of the message comes through clearly on Sunday mornings.",
  },
];

export const boardMembers: string[] = [
  "Pastor Tony Redmon",
  "Lee Sandlin",
  "Teon Embry",
  "Tim Wilson",
  "Shannon Terry",
  "Sherry McClure",
  "Tim Turner",
];

export const worshipTeam: string[] = [
  "Lee Sandlin",
  "Teon Embry",
  "Jennifer Douthitt",
  "Scott Terry",
  "Roderick Berry",
  "Robin Crocker",
  "Sarah Turner",
  "Pastor Tony Redmon",
  "Brent Redmon",
  "Rodney Douthitt",
  "Courtney Douthitt",
];

import {
  BookOpen,
  Infinity as InfinityIcon,
  Cross,
  Gift,
  Droplets,
  Flame,
  Sprout,
  Globe,
  HandHeart,
  Sunrise,
  type LucideIcon,
} from "lucide-react";

export type Belief = {
  title: string;
  icon: LucideIcon;
  description: string;
  scripture: string;
};

export const beliefs: Belief[] = [
  {
    title: "The Bible",
    icon: BookOpen,
    description:
      "The Scriptures, Old and New Testaments, are inspired by God and are the infallible, authoritative rule for faith and life.",
    scripture: "2 Timothy 3:15-17; 2 Peter 1:21",
  },
  {
    title: "The One True God",
    icon: InfinityIcon,
    description:
      "There is one God, eternally existing as Father, Son, and Holy Spirit. He is the Creator of heaven and earth and the Redeemer of mankind.",
    scripture: "Deuteronomy 6:4; Matthew 28:19",
  },
  {
    title: "Jesus Christ",
    icon: Cross,
    description:
      "Jesus is the eternal Son of God, born of a virgin and sinless in life. He died on the cross for our sins, rose bodily from the dead, and is exalted at the right hand of God.",
    scripture: "Matthew 1:23; 1 Corinthians 15:3-4; Philippians 2:9-11",
  },
  {
    title: "Salvation",
    icon: Gift,
    description:
      "Every person has sinned and is separated from God, but salvation is freely offered to all through repentance and faith in Jesus Christ, by grace.",
    scripture: "Romans 5:12; Ephesians 2:8-9; Romans 10:13",
  },
  {
    title: "Baptism & Communion",
    icon: Droplets,
    description:
      "Believers are baptized by immersion as a public testimony of new life in Christ, and share the Lord's Supper in remembrance of Him until He comes.",
    scripture: "Matthew 28:19; Romans 6:4; 1 Corinthians 11:26",
  },
  {
    title: "Baptism in the Holy Spirit",
    icon: Flame,
    description:
      "Every believer may receive the baptism in the Holy Spirit, which brings power for life and service and is evidenced by speaking in other tongues as the Spirit gives utterance.",
    scripture: "Acts 1:8; Acts 2:4",
  },
  {
    title: "A Holy Life",
    icon: Sprout,
    description:
      "By the power of the Holy Spirit, we are set apart from evil and dedicated to God, growing day by day in holiness.",
    scripture: "Romans 12:1-2; Hebrews 12:14; 1 Peter 1:15-16",
  },
  {
    title: "The Church & Its Mission",
    icon: Globe,
    description:
      "The Church is the body of Christ, called to reach the world with the Gospel, worship God, build up believers, and show His love and compassion to all.",
    scripture: "Matthew 28:19-20; Ephesians 4:11-16; James 1:27",
  },
  {
    title: "Divine Healing",
    icon: HandHeart,
    description:
      "Healing is part of the Gospel. Through Christ's work on the cross, God still heals today, and it is the privilege of every believer to pray for it.",
    scripture: "Isaiah 53:4-5; James 5:14-16",
  },
  {
    title: "Christ's Return",
    icon: Sunrise,
    description:
      "Jesus is coming again for His Church. He will reign, judge the world in righteousness, and make all things new in a new heaven and a new earth.",
    scripture: "1 Thessalonians 4:16-17; Revelation 20-22",
  },
];

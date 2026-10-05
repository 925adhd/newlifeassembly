export type Faq = {
  question: string;
  answer: string;
  link?: { label: string; href: string };
};

// Shared by the FAQ section and the FAQPage structured data in page.tsx
export const faqs: Faq[] = [
  {
    question: "What time are services?",
    answer:
      "Sunday School starts at 10:00 AM. Sunday worship begins with praise and worship at 11:00 AM, with preaching right after at 11:30 AM. Children's Church meets at 11:30 AM, and our Wednesday Bible Study is at 6:30 PM.",
  },
  {
    question: "How long is the Sunday service?",
    answer:
      "Praise and worship begins at 11:00 AM, and Pastor Tony's message starts at 11:30 AM and runs about 30 minutes.",
  },
  {
    question: "What should I wear?",
    answer:
      "There's no dress code. Wear whatever makes you comfortable. Come as you are.",
  },
  {
    question: "What instruments do you use in worship?",
    answer:
      "Our live praise band plays piano and keyboard, guitar, bass, and drums, along with tambourines. You may also hear the shofar, a ram's horn trumpet used in worship throughout Scripture. We blend contemporary praise with timeless hymns.",
  },
  {
    question: "Is there something for my kids?",
    answer:
      "Yes! Children's Church meets at 11:30 AM during the message. Kids learn about God's love in a safe, supervised setting through age-appropriate Bible lessons, crafts, games, and worship.",
    link: { label: "Learn about Children's Church", href: "/ministries#childrens-church" },
  },
  {
    question: "Do you practice snake handling?",
    answer:
      "No. Snake handling is not part of our worship or of Assemblies of God beliefs. Our services are safe and welcoming, centered on worship, prayer, and the preaching of God's Word.",
  },
  {
    question: "What do you believe?",
    answer:
      "We're an Assemblies of God church. We believe the Bible is God's inspired Word, that salvation comes through faith in Jesus Christ, and that the Holy Spirit empowers believers today.",
    link: { label: "Read what we believe", href: "/beliefs" },
  },
  {
    question: "Can I send a prayer request?",
    answer:
      "Absolutely. You can share a request online anytime, and Pastor Tony and our church family will pray for you. You can mark it confidential if you'd like only Pastor Tony to see it.",
    link: { label: "Send a prayer request", href: "/prayer" },
  },
];

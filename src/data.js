export const profile = {
  name: "Rahul Mahotra",
  role: "Software Engineer",
  tagline: "I build interfaces people actually enjoy using.",
  location: "Bengaluru, India",
  email: "rahulmahotra707@gmail.com",
  phone: "+91 7006852494",
  github: "https://github.com/rahulmahotra",
  linkedin: "https://www.linkedin.com/in/rahulmahotra",
  leetcode: "https://leetcode.com/rahulmahotra",
  resume: "/Rahul_Mahotra_Resume.pdf",
}

export const stats = [
  { value: "3+", label: "years building products" },
  { value: "10M+", label: "people using things I shipped" },
  { value: "1000+", label: "DSA problems solved" },
  { value: "100M+", label: "daily events rendered by my dashboards" },
]

export const experience = [
  {
    company: "FamPay",
    role: "Software Development Engineer II",
    period: "Oct 2025 — Present",
    location: "Bengaluru",
    accent: "#ff5a1f",
    points: [
      "Own the frontend for UPI and FamX card flows used by 10M+ teens and young adults. Rebuilt checkout and transaction screens: +12% payment completion, -30% payment support tickets.",
      "Led the move to a token-driven component library shared across web and React Native. 40% faster screen builds, 25K+ lines of duplicated UI removed.",
      "Cut cold-start time by 35% and pushed crash-free sessions to 99.9% with lazy loading, bundle splitting and render optimisation. Set up frontend observability on p95 latency and JS errors.",
      "Built the in-house A/B experimentation layer for onboarding and referrals: 20+ experiments a quarter, +15% KYC completion.",
    ],
  },
  {
    company: "Juspay",
    role: "Software Developer",
    period: "Sep 2023 — Oct 2025",
    location: "Bengaluru",
    accent: "#e2b96f",
    points: [
      "Built Lightbox, a real-time analytics dashboard visualising 100M+ transactions a day. Merchants resolve payment issues 40% faster; support load down 35%.",
      "Shipped an AI-powered, chat-based no-code assistant that lets merchants configure payments in plain English. Onboarding time halved.",
      "Automated migration of legacy payment-page configs. 80% less manual effort, 20+ support hours saved every week.",
      "Rebuilt Studio's frontend for scale: bundle -35%, load time -50%, 99.98% uptime for 200+ merchants.",
    ],
  },
  {
    company: "Tekion",
    role: "Software Developer Intern",
    period: "Jan 2023 — Jul 2023",
    location: "Bengaluru",
    accent: "#8f8a80",
    points: [
      "Shipped lead-tracking and follow-up features on the dealer CRM used by 500+ automotive dealerships.",
      "Built the templated email communication module: composer, scheduling and delivery tracking.",
    ],
  },
]

export const projects = [
  {
    title: "Lightbox",
    kind: "Data visualisation · Juspay",
    desc: "A real-time dashboard rendering 100M events a day without dropping a frame. Virtualised tables, streaming updates, zero jank.",
    stack: ["React", "TypeScript", "WebSockets", "Recharts"],
    year: "2024",
  },
  {
    title: "No-Code AI Assistant",
    kind: "AI tooling · Juspay",
    desc: "Describe what you want in plain English, get a working configuration. LLM in front, strict schema validation behind, humans still in control.",
    stack: ["React", "Node.js", "LLM APIs", "JSON Schema"],
    year: "2025",
  },
  {
    title: "Receiptify",
    kind: "Side project",
    desc: "Invoicing for freelancers who hate invoicing. Generate, email, track due dates, done.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    year: "2023",
    link: "https://github.com/rahulmahotra",
  },
  {
    title: "NFT Builder",
    kind: "Side project",
    desc: "Create, mint and sell NFTs from a single UI. Creator profiles, collection views and a payment gateway integration.",
    stack: ["React", "Material-UI", "Web3.js", "Solidity"],
    year: "2023",
    link: "https://github.com/rahulmahotra",
  },
]

export const skills = [
  "TypeScript", "React", "Next.js", "React Native", "Node.js", "Redux",
  "Tailwind CSS", "Python", "C++", "Java", "SQL", "PostgreSQL", "Redis",
  "Docker", "Kubernetes", "AWS", "Git", "CI/CD", "Framer Motion", "Web3",
]

export const quotes = [
  {
    text: "Simplicity is the ultimate sophistication.",
    by: "Leonardo da Vinci",
  },
  {
    text: "Any application that can be written in JavaScript will eventually be written in JavaScript.",
    by: "Atwood's Law",
  },
  {
    text: "The mountains are calling and I must go.",
    by: "John Muir",
  },
]

export const education = {
  school: "Indian Institute of Information Technology, Guwahati",
  degree: "B.Tech, Computer Science",
  period: "2019 — 2023",
  gpa: "8.21 GPA",
}

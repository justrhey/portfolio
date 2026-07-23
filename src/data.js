// Real content — pulled from /home/nami/portfolio (Justine Rhey).
// Public assets are resolved against Vite's base URL so they work under /portfolio/.
const asset = (p) => import.meta.env.BASE_URL + p;

export const profile = {
  initials: "JR",
  photo: asset("profile.png"),
  name: "Justine Rhey",
  stats: [
    { value: "7", label: "projects" },
    { value: "Full-stack", label: "developer" },
  ],
  link: "github.com/justrhey",
  linkHref: "https://github.com/justrhey",
};

export const navItems = [
  { icon: "home", label: "Home", to: "/" },
  { icon: "user", label: "About", to: "/about" },
  { icon: "grid", label: "Projects", to: "/projects" },
  { icon: "briefcase", label: "Experience", to: "/experience" },
  { icon: "mail", label: "Contact", to: "/contact" },
];

export const shortcuts = [
  { label: "GitHub", href: "https://github.com/justrhey" },
  { label: "LinkedIn", href: "#" },
  { label: "Resume / CV", href: "#" },
];

export const tabs = [
  { to: "/", label: "All", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
];

export const about = [
  { icon: "briefcase", text: "Full-stack developer — Rust, React & everything in between." },
  { icon: "pin", text: "Based in the Philippines." },
  { icon: "user", text: "Gender — all/in." },
  { icon: "signal", text: "Open to freelance & collaboration." },
];

// Home intro — halftone particle headline that assembles from scattered dots.
export const intro = {
  headline: ["FULL-STACK", "DEVELOPER"],
  tagline: "Full-stack developer — Rust, React & everything in between.",
  meta: "Philippines · 07 Projects · Open to work",
};

export const skills = [
  "Rust", "Actix-web", "React", "Next.js", "TypeScript", "Java", "Kotlin", "Spring Boot",
  "Python", "PHP", "Django REST", "Laravel", "PostgreSQL", "MySQL", "MariaDB",
  "JWT", "Linux", "Git", "Bash", "n8n", "Claude Code", "phpMyAdmin", "Soroban",
];

// Obsidian-style graph: center → category hubs → skills.
export const skillGraph = {
  center: "Justine",
  groups: [
    { name: "Languages", color: "#1877f2", skills: ["Rust", "Java", "Kotlin", "Python", "PHP", "Bash"] },
    { name: "Frontend", color: "#7c5cff", skills: ["React", "TypeScript"] },
    { name: "Frameworks", color: "#e0567a", skills: ["Next.js", "Django REST", "Spring Boot", "Laravel"] },
    { name: "Backend", color: "#12a5a0", skills: ["Actix-web", "JWT", "Soroban"] },
    { name: "Databases", color: "#e8883a", skills: ["PostgreSQL", "MySQL", "MariaDB"] },
    { name: "Tools", color: "#5b6b8c", skills: ["Linux", "Git", "n8n", "Claude Code", "phpMyAdmin"] },
  ],
};

// Top 3 — fanned app-card stack on the home page. co-map is #1 (front).
export const topProjects = [
  {
    pos: "left",
    badge: "#2 · GSAP LANDING",
    title: "BMW Unofficial",
    desc: "An unofficial BMW landing page — a cinematic, scroll-driven experience built with GSAP animations.",
    tags: ["GSAP", "React", "Vite"],
    url: "https://unofficial-bmw.vercel.app/",
    logo: asset("bmw-logo.png"),
    image: asset("projects/bmw.png"),
    cta: "Visit site",
  },
  {
    pos: "front",
    badge: "#1 · MAPPING PLATFORM",
    title: "Co-Map",
    desc: "Community-powered complaint mapping — residents pin potholes and broken streetlights on a MapLibre GL map with 3D buildings and gamified scoring.",
    tags: ["Django REST", "React 19", "MapLibre GL", "PostGIS"],
    url: "https://co-map.vercel.app/",
    logo: asset("co-map-logo.png"),
    image: asset("projects/co-map.png"),
    cta: "Visit site",
  },
  {
    pos: "right",
    badge: "#3 · BLOCKCHAIN",
    title: "EHR Blockchain",
    desc: "Blockchain-notarized Electronic Health Records in Rust + Actix-web, with AES-256-GCM encryption and on-chain SHA-256 hashing.",
    tags: ["Rust", "Actix-web", "Soroban"],
    url: "https://github.com/justrhey/capstone",
    cta: "View code",
  },
];

// Full list for the Projects page.
export const projects = [
  {
    name: "Co-Map",
    desc: "Community-powered complaint mapping platform. Residents pin issues like potholes and broken streetlights on a map with MapLibre GL, 3D building extrusions, and gamified scoring.",
    tags: ["Django REST", "React 19", "MapLibre GL", "PostGIS"],
    year: "2025",
    url: "https://co-map.vercel.app/",
    image: asset("projects/co-map.png"),
  },
  {
    name: "BMW Unofficial",
    desc: "An unofficial BMW landing page — a cinematic, scroll-driven experience built with GSAP animations.",
    tags: ["GSAP", "React", "Vite"],
    year: "2025",
    url: "https://unofficial-bmw.vercel.app/",
    image: asset("projects/bmw.png"),
  },
  {
    name: "EHR Blockchain",
    desc: "Blockchain-notarized Electronic Health Records system built in Rust with Actix-web. AES-256-GCM field-level encryption, SHA-256 content hashing anchored on-chain with full version history.",
    tags: ["Rust", "Actix-web", "React", "Stellar Soroban", "JWT"],
    year: "2024",
    url: "https://github.com/justrhey/capstone",
  },
  {
    name: "VÉLOUR",
    desc: "Premium wine showcase landing page with a procedurally generated 3D Bordeaux bottle in Three.js. Black-and-gold editorial design with parallax scroll narrative.",
    tags: ["Next.js 16", "React 19", "Three.js", "GSAP", "Lenis"],
    year: "2026",
    url: "https://ve-lour.vercel.app/",
    image: asset("projects/velour.png"),
  },
  {
    name: "Fresh Phones PH",
    desc: "Landing page for an iPhone reseller's \"paluwagan\" installment program. Y2K-inspired glassy-blue theme with 3D cloud art and animated hero.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4"],
    year: "2025",
    url: "https://freshphonesph.vercel.app/",
    image: asset("projects/fresh-phones.png"),
  },
  {
    name: "Cassie",
    desc: "Music discovery and streaming app with curated playlists, artist albums, a Top 50 chart, and seamless audio playback.",
    tags: ["Kotlin", "Node.js", "Express", "MongoDB", "Spotify API"],
    year: "2024",
    url: "https://github.com/justinebacurin1927/Cassie",
  },
  {
    name: "Ticketing System",
    desc: "Full-featured support ticket management with role-based access, ticket lifecycle workflows, priority queues, and real-time status updates.",
    tags: ["Java", "Spring Boot", "React", "PostgreSQL", "JWT"],
    year: "2023",
    url: "https://github.com/justrhey/capstone",
  },
];

// Real client projects — pulled from CV (AI Engineer @ TambayanPH + internship).
export const experience = [
  {
    role: "VetLevel",
    org: "TambayanPH · Feb 2025–Present",
    desc: "Facebook automation platform for veterinary businesses — lead capture and messaging flows built with n8n and Claude Code.",
    icon: "message",
  },
  {
    role: "RealmMLP → Notion Sync",
    org: "TambayanPH · 2025",
    desc: "Reverse-engineered an undocumented API and wired it into Notion as a live two-way integration.",
    icon: "sync",
  },
  {
    role: "DNS Automation SDK",
    org: "CallHounds Global / Virspacio · Internship",
    desc: "Java Swing SDK for ICMP/TCP network monitoring and DNS automation across company infrastructure.",
    icon: "terminal",
  },
];

export const education = [
  { role: "BS Information Technology", org: "University · 2022–2026" },
];

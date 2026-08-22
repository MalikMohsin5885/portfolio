/**
 * Project cards for the pinned wave-slider section.
 * Replace placeholders with your real projects, demo URLs, and screenshots.
 */

export const projectsShowcaseBg =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&h=1200&fit=crop";

export const projects = [
  {
    id: "reservify",
    title: "Reservify",
    tag: "Mobile App",
    description:
      "Hotel and flight booking app built with React Native and Firebase — search, reserve, and manage trips in one place.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=1000&fit=crop",
    demo: "",
    github: "https://github.com/MalikMohsin5885/Reservify",
    tags: ["React Native", "Firebase"],
    bg: "dawn",
  },
  {
    id: "healthcare",
    title: "Health Care Portal",
    tag: "Full Stack",
    description:
      "Online consultation platform with Node.js, Express, and MS SQL — appointments, payments, and patient records.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=1000&fit=crop",
    demo: "",
    github: "https://github.com/MalikMohsin5885/healthCare",
    tags: ["Node.js", "Express", "MS SQL"],
    bg: "cream",
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    tag: "Web",
    description:
      "Personal portfolio with React, Tailwind, and GSAP scroll animations — Wispr Flow–inspired design system.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=1000&fit=crop",
    demo: "",
    github: "https://github.com/MalikMohsin5885",
    tags: ["React", "Tailwind", "GSAP"],
    bg: "flare",
  },
  {
    id: "ecommerce",
    title: "ShopWave",
    tag: "E-Commerce",
    description:
      "Modern storefront with cart, checkout, and admin dashboard — Next.js App Router with Stripe payments.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=1000&fit=crop",
    demo: "",
    github: "https://github.com/MalikMohsin5885",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    bg: "green",
  },
  {
    id: "taskflow",
    title: "TaskFlow",
    tag: "Productivity",
    description:
      "Kanban-style task manager with drag-and-drop boards, labels, and real-time sync across devices.",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=1000&fit=crop",
    demo: "",
    github: "https://github.com/MalikMohsin5885",
    tags: ["React", "TypeScript", "Socket.io"],
    bg: "dawn",
  },
  {
    id: "weather",
    title: "SkyCast",
    tag: "API Project",
    description:
      "Weather dashboard with 7-day forecasts, location search, and animated conditions using OpenWeather API.",
    image:
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=1000&fit=crop",
    demo: "",
    github: "https://github.com/MalikMohsin5885",
    tags: ["JavaScript", "REST API", "Chart.js"],
    bg: "cream",
  },
  {
    id: "chat",
    title: "Pulse Chat",
    tag: "Real-Time",
    description:
      "Messaging app with private rooms, typing indicators, and read receipts — built on NestJS and MongoDB.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=1000&fit=crop",
    demo: "",
    github: "https://github.com/MalikMohsin5885",
    tags: ["NestJS", "MongoDB", "WebSocket"],
    bg: "flare",
  },
  {
    id: "finance",
    title: "Budgetly",
    tag: "FinTech",
    description:
      "Personal finance tracker with expense categories, monthly insights, and exportable reports.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=1000&fit=crop",
    demo: "",
    github: "https://github.com/MalikMohsin5885",
    tags: ["React", "Node.js", "MySQL"],
    bg: "green",
  },
  {
    id: "learning",
    title: "LearnHub",
    tag: "EdTech",
    description:
      "Course platform with video lessons, quizzes, and progress tracking for students and instructors.",
    image:
      "https://images.unsplash.com/photo-1501504905252-473a47e89271?w=800&h=1000&fit=crop",
    demo: "",
    github: "https://github.com/MalikMohsin5885",
    tags: ["Next.js", "Firebase", "Tailwind"],
    bg: "dawn",
  },
  {
    id: "devops",
    title: "DeployKit",
    tag: "DevOps",
    description:
      "CI/CD dashboard for monitoring builds, deployments, and server health across multiple environments.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=1000&fit=crop",
    demo: "",
    github: "https://github.com/MalikMohsin5885",
    tags: ["Docker", "GitHub Actions", "Vercel"],
    bg: "cream",
  },
];

const PROJECT_META = {
  reservify: {
    year: "2024",
    role: "Mobile Developer",
    longDescription:
      "End-to-end travel booking experience for hotels and flights. Built with React Native and Firebase for auth, search, reservations, and trip management with offline-friendly caching.",
    highlights: [
      "Unified search for hotels and flights",
      "Firebase auth and real-time booking state",
      "Responsive UI tuned for iOS and Android",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=800&fit=crop",
    ],
  },
  healthcare: {
    year: "2023",
    role: "Full Stack Developer",
    longDescription:
      "Healthcare consultation portal connecting patients with providers. Includes appointment scheduling, secure records, and payment flows backed by Node.js, Express, and MS SQL.",
    highlights: [
      "Role-based dashboards for patients and doctors",
      "Appointment booking with calendar sync",
      "Secure record storage and audit-friendly APIs",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1584438784894-089d6a62b8f0?w=1200&h=800&fit=crop",
    ],
  },
  portfolio: {
    year: "2025",
    role: "Frontend Engineer",
    longDescription:
      "Personal portfolio showcasing selected work with scroll-driven hero animations, GSAP pinned sections, and a Wispr Flow–inspired design system built in React and Tailwind.",
    highlights: [
      "Scroll-expansion hero with profile morph",
      "Pinned wave-slider project showcase",
      "Lenis smooth scrolling with GSAP ScrollTrigger",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop",
    ],
  },
};

export function getProjectById(id) {
  const project = projects.find((entry) => entry.id === id);
  if (!project) return null;
  return { ...project, ...(PROJECT_META[id] ?? {}) };
}

const FALLBACK_GALLERY = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop",
];

export function getProjectGalleryImages(project) {
  const fromMeta = project.gallery ?? [];
  const combined = [project.image, ...fromMeta, ...FALLBACK_GALLERY].filter(Boolean);
  return [...new Set(combined)].slice(0, 5);
}

export function getProjectGalleryItems(project) {
  return getProjectGalleryImages(project).map((src, index) => ({
    id: `${project.id}-image-${index}`,
    src,
    alt: `${project.title} screenshot ${index + 1}`,
  }));
}

export interface Project {
  slug: string;
  title: string;
  desc: string;
  status: "LIVE" | "IN PROGRESS" | "CASE STUDY";
  tech: string[];
  accent: "signal" | "ai";
  image: string;
  narrative: string;
  challenges: string;
  results: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    slug: "retailos",
    title: "RetailOS",
    desc: "Multi-tenant SaaS container platform for retail store inventory tracking, POS transactions, and staff logs.",
    status: "LIVE",
    tech: ["Next.js", "Firebase", "GCP Cloud Run", "Docker", "Tailwind CSS"],
    accent: "signal",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
    narrative: "RetailOS is a solo-developed SaaS platform designed to streamline retail operations. It provides robust multi-tenant isolation, allowing separate store branches to manage inventory collections, staff shifts, and checkouts autonomously.",
    challenges: "The primary challenge was managing database structure and multi-tenancy rules in a serverless environment without incurring high persistent connection costs. Deployed containers on GCP Cloud Run are stateless, which requires quick API cold starts.",
    results: "Designed a multi-stage Docker build that shrunk the container image from 1.2GB to 180MB. Programmed Collection Rules in Firebase Studio to safeguard store data boundaries. The platform is deployed and fully active for demo audits."
  },
  {
    slug: "agency-os",
    title: "Agency OS",
    desc: "Complete business analyst specification suite spanning requirements elicitation, workflow mapping, and sprint rollouts.",
    status: "CASE STUDY",
    tech: ["BRD/FRD", "Draw.io", "Excel MIS", "Agile Management"],
    accent: "ai",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80",
    narrative: "Agency OS is a case study in business analysis. Spanning 12 detailed specification documents, it represents the full documentation process for a mid-scale agency CRM, detailing every functional requirement, data field validation, and workflow state.",
    challenges: "Eliciting requirements from disparate stakeholder needs and translating them into developer-ready task descriptions without scope bloat.",
    results: "Drafted 12 comprehensive documents detailing 50+ detailed functional criteria, mapped to a 4-sprint rollout timeline. Incorporates wireframe maps, ER diagrams, and UML workflows."
  },
  {
    slug: "bitwise-consulting",
    title: "Bitwise Consulting",
    desc: "Next.js 14 design audit and complete front-end rebuild with focus on transition performance and visual fidelity.",
    status: "LIVE",
    tech: ["Next.js 14", "Framer Motion", "Tailwind CSS", "SEO Audit"],
    accent: "signal",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    narrative: "A frontend redesign for a consulting group, focused on creating a premium digital experience with slick scroll-triggered motion curves.",
    challenges: "Achieving high performance and 100/100 Lighthouse scores while running complex 3D overlays and layout spring animations.",
    results: "Restructured CSS layouts using vanilla Tailwind and optimized script loaders to prevent main thread blocking, achieving near-perfect metrics across SEO and accessibility audits."
  },
  {
    slug: "kanban-board",
    title: "Kanban Board for Startups",
    desc: "Interactive workflow management board designed for fast-paced startup teams to manage their entire workflows.",
    status: "LIVE",
    tech: ["Next.js", "DnD Kit", "Tailwind CSS", "Firebase"],
    accent: "signal",
    image: "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?w=600&auto=format&fit=crop&q=80",
    narrative: "An advanced workflow board built specifically to handle complex task management pipelines for startups with ease and speed.",
    challenges: "Ensuring butter-smooth drag-and-drop animations while instantly syncing state across collaborative team members.",
    results: "Implemented a zero-lag dnd system with optimistic UI updates and structured Firestore real-time listeners for instant synchronization."
  },
  {
    slug: "omni-keys",
    title: "Omni Keys",
    desc: "Lightweight background desktop assistant to instantly optimize, rewrite, translate, or explain text in any application using global hotkeys.",
    status: "LIVE",
    tech: ["Tauri v2", "Rust", "React 19", "TypeScript"],
    accent: "ai",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
    narrative: "Omni Keys is a background desktop assistant that intercepts selected text globally across the OS. By pressing a global hotkey, users can run slash commands to trigger AI actions in any active window (editors, browsers, or Slack).",
    challenges: "Capturing active OS-level text selection and performing clipboard operations reliably across operating systems without native focus issues.",
    results: "Built a Tauri v2 desktop application in Rust leveraging native OS hooks, securing local API credentials in encrypted storage, and executing Gemini/OpenRouter API calls."
  }
];

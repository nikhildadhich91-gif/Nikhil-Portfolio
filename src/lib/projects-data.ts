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
    slug: "pixeelnest",
    title: "Pixeelnest",
    desc: "Modular SaaS subscription scaffolding template with integrated payment hooks and client dashboards.",
    status: "LIVE",
    tech: ["Next.js", "Stripe API", "PostgreSQL", "Node.js"],
    accent: "signal",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&auto=format&fit=crop&q=80",
    narrative: "Pixeelnest is a developer starter template designed to cut SaaS setup time by offering built-in subscription webhooks and user workspaces.",
    challenges: "Managing webhooks and synchronizing Stripe billing events with internal user records without data lag.",
    results: "Built a fully decoupled billing handler middleware that handles subscription upgrades, downgrades, and cancellations instantly, logging errors to a centralized dashboard."
  },
  {
    slug: "shadway",
    title: "Shadway",
    desc: "WebGL 3D art portfolio showcase utilizing React Three Fiber and customized mesh shader materials.",
    status: "IN PROGRESS",
    tech: ["React Three Fiber", "Three.js", "GLSL Shaders", "WebGL"],
    accent: "ai",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=600&auto=format&fit=crop&q=80",
    narrative: "Shadway is a WebGL creative playground showcasing how custom GLSL shaders and Three.js physics pipelines can run smoothly on standard mobile browsers.",
    challenges: "Optimizing 3D rendering calculations and geometry counts to maintain a consistent 60fps on mobile viewports.",
    results: "Constructed low-poly mesh proxies and programmed procedural noise in GLSL to offload math calculations from the CPU to the GPU, preventing main thread lag."
  }
];

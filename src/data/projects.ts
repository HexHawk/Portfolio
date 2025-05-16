
export interface Project {
  id: string;
  title: string;
  url: string;
  description: string;
  year: string;
  type: 'active' | 'legacy';
}

export const projects: Project[] = [
  {
    id: "1",
    title: "NIDS-Classifier",
    url: "https://github.com/HexHawk/NIDS-Classifier",
    description: "Python ML tool for network intrusion detection with a Gradio UI, trained on NSL-KDD.",
    year: "2025",
    type: "active"
  },
  {
    id: "2",
    title: "BlockVote",
    url: "",
    description: "Blockchain-based secure voting platform with React front-end and smart contracts.",
    year: "2025",
    type: "active"
  },
  {
    id: "3",
    title: "Movie Streaming App",
    url: "",
    description: "React/Next.js app with TMDB integration, search, playback, and wishlist features.",
    year: "2024",
    type: "legacy"
  },
  {
    id: "4",
    title: "Pastebin Clone",
    url: "",
    description: "Lightweight PHP pastebin with unique URLs, input sanitization, and expiry option.",
    year: "2023",
    type: "legacy"
  },
  {
    id: "5",
    title: "Simple URL Shortener",
    url: "",
    description: "Flask-based URL shortener with basic analytics and SQLite backend.",
    year: "2021",
    type: "legacy"
  },
  {
    id: "6",
    title: "Self-Destructing Notes",
    url: "",
    description: "Node.js app for encrypted, one-time-view notes with auto-deletion.",
    year: "2021",
    type: "legacy"
  },
  {
    id: "7",
    title: "Port Scanner CLI",
    url: "",
    description: "Python multi-threaded port scanner with banner grabbing and CSV output.",
    year: "2020",
    type: "legacy"
  }
];

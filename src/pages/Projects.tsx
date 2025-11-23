import { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Award,
  AlertTriangle,
  Sparkles,
  Lightbulb,
  Cog,
  Server,
  Database,
  Cpu,
  Boxes,
  Share2,
  Flame,
  GitBranch,
  Terminal,
  Cloud,
  Zap,
  Layers,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";

const GPUNITY_URL = "https://sustaineo-page.vercel.app/";
const DEFAULT_CODE_URL = "https://github.com/aryansinghal";

const techIconMap: Record<string, ReactNode> = {
  Rust: <Cog className="h-3.5 w-3.5" />,
  Kubernetes: <Boxes className="h-3.5 w-3.5" />,
  gRPC: <Share2 className="h-3.5 w-3.5" />,
  PostgreSQL: <Database className="h-3.5 w-3.5" />,
  PyTorch: <Flame className="h-3.5 w-3.5" />,
  NetworkX: <GitBranch className="h-3.5 w-3.5" />,
  Python: <Terminal className="h-3.5 w-3.5" />,
  TensorFlow: <Cpu className="h-3.5 w-3.5" />,
  OpenCV: <Layers className="h-3.5 w-3.5" />,
  Transformers: <Sparkles className="h-3.5 w-3.5" />,
  FastAPI: <Zap className="h-3.5 w-3.5" />,
  Redis: <Database className="h-3.5 w-3.5" />,
  Docker: <Server className="h-3.5 w-3.5" />,
  AWS: <Cloud className="h-3.5 w-3.5" />,
};

const detailSections = [
  {
    key: "problem" as const,
    label: "Problem",
    accent: "text-gray-500",
    icon: AlertTriangle,
  },
  {
    key: "solution" as const,
    label: "Solution",
    accent: "text-emerald-400",
    icon: Sparkles,
  },
  {
    key: "learned" as const,
    label: "Learned",
    accent: "text-blue-400",
    icon: Lightbulb,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.06, duration: 0.45, ease: "easeOut" },
  }),
  hover: {
    y: -8,
    scale: 1.012,
    transition: { duration: 0.15, ease: "easeOut" },
  },
};

const quickHoverTransition = { duration: 0.12, ease: "easeOut" };

const slashVariants = {
  rest: { x: "-160%", opacity: 0 },
  hover: {
    x: ["-160%", "160%"],
    opacity: [0, 0.9, 0],
    transition: {
      duration: 0.85,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 0.4,
    },
  },
};

const cardAccents = [
  {
    cardBorder: "group-hover:border-violet-400/70",
    frameBorder: "group-hover:border-violet-300/60",
    glow: "from-violet-500/30 via-fuchsia-500/15 to-sky-400/20",
  },
  {
    cardBorder: "group-hover:border-emerald-400/70",
    frameBorder: "group-hover:border-emerald-300/60",
    glow: "from-emerald-500/30 via-teal-400/15 to-lime-300/20",
  },
  {
    cardBorder: "group-hover:border-amber-400/70",
    frameBorder: "group-hover:border-amber-300/60",
    glow: "from-amber-500/25 via-orange-400/15 to-rose-300/20",
  },
  {
    cardBorder: "group-hover:border-sky-400/70",
    frameBorder: "group-hover:border-sky-300/60",
    glow: "from-sky-500/25 via-cyan-400/15 to-indigo-400/20",
  },
];

export default function Projects() {
  const projects = [
    {
      title: "GPUnity",
      tagline: "AI-driven GPU orchestration",
      problem: "Current cloud infrastructure wastes massive amounts of energy and resources",
      solution: "Built an architecture that optimizes resource allocation and reduces waste by 40%",
      learned: "How to design systems that scale while staying efficient",
      tech: ["Kubernetes", "gRPC", "PostgreSQL"],
      github: "https://github.com/aryansinghal",
      featured: true,
    },
    {
      title: "Temporal GNN for Reddit Polarization",
      tagline: "Understanding how communities radicalize over time",
      problem: "Static analysis misses how polarization evolves",
      solution: "Temporal graph neural network that tracks community drift with 89% accuracy",
      learned: "Graph theory + time series = powerful insights into social dynamics",
      tech: ["PyTorch", "NetworkX", "Python"],
      github: "https://github.com/aryansinghal",
    },
    {
      title: "QViSTA Alzheimer's Detection",
      tagline: "Early detection through visual analysis",
      problem: "Alzheimer's diagnosis comes too late for effective intervention",
      solution: "Computer vision model that detects early markers from retinal scans",
      learned: "Medical AI requires extreme precision and interpretability",
      tech: ["TensorFlow", "OpenCV", "Python"],
    },
    {
      title: "Hate Speech Ensemble Model",
      tagline: "Multilingual content moderation that actually works",
      problem: "Single models fail across languages and contexts",
      solution: "Ensemble approach that achieves 94% F1 across 7 languages",
      learned: "Diversity in models beats sophistication in single approaches",
      tech: ["Transformers", "PyTorch", "FastAPI"],
      github: "https://github.com/aryansinghal",
    },
    {
      title: "ASTRA Multilingual Pipeline",
      tagline: "Claim verification at scale",
      problem: "Misinformation spreads faster than fact-checkers can work",
      solution: "Automated pipeline that verifies claims across 12 languages in real-time",
      learned: "Production ML is 10% model, 90% infrastructure",
      tech: ["Python", "Redis", "Docker", "AWS"],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatedBackground />
      <Navigation />

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-16">
            <h1 className="text-6xl md:text-7xl font-black mb-6">
              <span className="animated-gradient-text">
                PROJECTS
              </span>
            </h1>
            <p className="text-2xl text-gray-400">
              Things I've built that solve real problems.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {projects.map((project, index) => {
              const CardIcon = project.featured ? Award : null;
              const isGPUnity = project.title === "GPUnity";
              const waitlistLink = isGPUnity ? GPUNITY_URL : null;
              const codeLink = project.github ?? DEFAULT_CODE_URL;
              const accent = cardAccents[index % cardAccents.length];
              return (
                <motion.div
                  key={project.title}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  custom={index}
                  className={`group relative ${project.featured ? "lg:col-span-2" : ""}`}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-[34px] opacity-0 transition duration-300 group-hover:opacity-100">
                    <div
                      className={`absolute inset-0 rounded-[34px] border border-white/10 transition duration-300 ${accent.frameBorder}`}
                    />
                    <div
                      className={`absolute inset-[10px] rounded-[30px] bg-gradient-to-r ${accent.glow} blur-3xl opacity-0 transition duration-300 group-hover:opacity-85`}
                    />
                  </div>
                  <Card
                    className={`relative overflow-hidden rounded-[26px] border-2 border-zinc-900/70 bg-zinc-950/85 backdrop-blur-xl transition-all duration-200 ${accent.cardBorder}`}
                  >
                    <CardContent className="p-8 flex flex-col gap-6">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <h2 className="text-3xl font-bold text-white mb-1 transition-colors duration-100 group-hover:text-violet-200">
                            {project.title}
                          </h2>
                          <p className="text-lg text-violet-300 font-medium">{project.tagline}</p>
                        </div>
                        {CardIcon && (
                          <div className="flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-3 py-1 text-yellow-200 text-sm font-semibold">
                            <CardIcon className="h-4 w-4" />
                            Featured
                          </div>
                        )}
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        {detailSections.map((section) => {
                          const SectionIcon = section.icon;
                          const value = project[section.key];
                          if (!value) return null;
                          return (
                            <motion.div
                              key={`${project.title}-${section.key}`}
                              className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/10 via-white/0 to-transparent p-4"
                              whileHover={{
                                y: -4,
                                borderColor: "rgba(196, 181, 253, 0.45)",
                                boxShadow: "0 10px 30px rgba(139, 92, 246, 0.25)",
                              }}
                              transition={quickHoverTransition}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <SectionIcon className={`h-4 w-4 ${section.accent}`} />
                                <span className={`text-xs uppercase tracking-[0.2em] ${section.accent}`}>
                                  {section.label}
                                </span>
                              </div>
                              <p className="text-sm text-gray-300 leading-relaxed">{value}</p>
                            </motion.div>
                          );
                        })}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <motion.span
                            key={`${project.title}-${tech}`}
                            className="inline-flex items-center gap-1 rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-100 transition-colors duration-100 group-hover:border-violet-300/70 group-hover:text-white"
                            whileHover={{ y: -2, scale: 1.06 }}
                            transition={quickHoverTransition}
                          >
                            {techIconMap[tech] ?? <Server className="h-3.5 w-3.5" />}
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      <div className={`flex flex-wrap gap-3 ${isGPUnity ? "w-full justify-center" : ""}`}>
                        {waitlistLink && (
                          <Button
                            variant="outline"
                            className={`transition-all duration-150 hover:-translate-y-0.5 ${
                              isGPUnity
                                ? "relative isolate w-full max-w-md justify-center overflow-hidden rounded-2xl border border-transparent bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-400 py-4 px-6 text-base font-semibold text-white shadow-[0_12px_35px_rgba(139,92,246,0.45)] hover:brightness-110"
                                : "border-violet-500 text-violet-200 hover:bg-violet-500/20"
                            }`}
                            asChild
                          >
                            <motion.a
                              href={waitlistLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              initial="rest"
                              whileHover="hover"
                              className="relative flex w-full items-center justify-center gap-2 overflow-hidden"
                            >
                              <motion.span
                                aria-hidden="true"
                                variants={slashVariants}
                                className="pointer-events-none absolute inset-y-0 -left-4 w-[150%] -skew-x-[18deg] bg-white/70 blur-sm"
                              />
                              <span className="relative z-10 flex items-center gap-2">
                                <Sparkles className="h-4 w-4" />
                                Join the waitlist!
                              </span>
                            </motion.a>
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          className="border-violet-500 text-violet-200 transition-all duration-150 hover:-translate-y-0.5 hover:bg-violet-500/20"
                          asChild
                        >
                          <a href={codeLink} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            View Code
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

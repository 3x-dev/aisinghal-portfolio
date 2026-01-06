import { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  Cloud,
  Zap,
  Layers,
  Link,
  Network,
  Camera,
  Smile,
  CircuitBoard,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";

const GPUNITY_URL = "https://www.gpunity.dev/";
const DEFAULT_CODE_URL = "https://github.com/3x-dev";

const techIconMap: Record<string, ReactNode> = {
  Rust: <Cog className="h-3.5 w-3.5" />,
  Kubernetes: <Boxes className="h-3.5 w-3.5" />,
  gRPC: <Share2 className="h-3.5 w-3.5" />,
  PostgreSQL: <Database className="h-3.5 w-3.5" />,
  PyTorch: <Flame className="h-3.5 w-3.5" />,
  NetworkX: <GitBranch className="h-3.5 w-3.5" />,
  Python: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
      alt="Python"
      className="h-3.5 w-3.5"
    />
  ),
  JavaScript: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
      alt="JavaScript"
      className="h-3.5 w-3.5"
    />
  ),
  TypeScript: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
      alt="TypeScript"
      className="h-3.5 w-3.5"
    />
  ),
  "Reddit API": <MessageCircle className="h-3.5 w-3.5" />,
  LangChain: <Link className="h-3.5 w-3.5" />,
  GCP: <Cloud className="h-3.5 w-3.5" />,
  "Distributed Systems": <Network className="h-3.5 w-3.5" />,
  TensorFlow: <Cpu className="h-3.5 w-3.5" />,
  OpenCV: <Layers className="h-3.5 w-3.5" />,
  Transformers: <Sparkles className="h-3.5 w-3.5" />,
  FastAPI: <Zap className="h-3.5 w-3.5" />,
  JAX: <Cpu className="h-3.5 w-3.5" />,
  TensorCircuit: <CircuitBoard className="h-3.5 w-3.5" />,
  "Computer Vision": <Camera className="h-3.5 w-3.5" />,
  "Hugging Face": <Smile className="h-3.5 w-3.5" />,
  "RESTful API": <Share2 className="h-3.5 w-3.5" />,
  Redis: <Database className="h-3.5 w-3.5" />,
  Docker: <Server className="h-3.5 w-3.5" />,
  AWS: <Cloud className="h-3.5 w-3.5" />,
};

const detailSections = [
  {
    key: "problem" as const,
    label: "Problem",
    accent: "text-red-400",
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
    accent: "text-amber-300",
    icon: Lightbulb,
  },
];

const quickHoverTransition = { duration: 0.12, ease: "easeOut" };

const slashVariants = {
  rest: { x: "-160%", opacity: 0 },
  hover: {
    x: ["-160%", "160%"],
    opacity: [0, 0.9, 0],
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

const flipVariants = {
  enter: (direction: 1 | -1) => ({
    rotateY: direction > 0 ? 60 : -60,
    x: direction > 0 ? 180 : -180,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    rotateY: 0,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: 1 | -1) => ({
    rotateY: direction > 0 ? -60 : 60,
    x: direction > 0 ? -180 : 180,
    opacity: 0,
    scale: 0.96,
  }),
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

const defaultTheme = {
  cardBorder: "group-hover:border-violet-400/70",
  frameBorder: "group-hover:border-violet-300/60",
  glow: "from-violet-500/30 via-fuchsia-500/15 to-sky-400/20",
  titleHover: "group-hover:text-violet-200",
  tagline: "text-violet-300",
  chipBorder: "border-violet-500/40",
  chipBg: "bg-violet-500/10",
  chipText: "text-violet-100",
  chipHoverBorder: "group-hover:border-violet-300/70",
  chipHoverText: "group-hover:text-white",
  buttonBorder: "border-2 border-violet-400/80",
  buttonBg: "bg-violet-500/15",
  buttonText: "text-violet-100",
  buttonShadow: "shadow-[0_0_26px_rgba(139,92,246,0.32)]",
  buttonHoverBg: "hover:bg-violet-500/35",
  buttonHoverText: "hover:text-white",
  buttonHoverShadow: "hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]",
};

const projectThemes: Record<string, typeof defaultTheme> = {
  QViSTA: {
    cardBorder: "group-hover:border-sky-400/70",
    frameBorder: "group-hover:border-sky-300/60",
    glow: "from-sky-500/25 via-cyan-400/15 to-indigo-400/20",
    titleHover: "group-hover:text-sky-200",
    tagline: "text-sky-300",
    chipBorder: "border-sky-500/40",
    chipBg: "bg-sky-500/10",
    chipText: "text-sky-100",
    chipHoverBorder: "group-hover:border-sky-300/70",
    chipHoverText: "group-hover:text-white",
    buttonBorder: "border-2 border-sky-400/80",
    buttonBg: "bg-sky-500/15",
    buttonText: "text-sky-100",
    buttonShadow: "shadow-[0_0_26px_rgba(56,189,248,0.3)]",
    buttonHoverBg: "hover:bg-sky-500/35",
    buttonHoverText: "hover:text-white",
    buttonHoverShadow: "hover:shadow-[0_0_40px_rgba(56,189,248,0.5)]",
  },
  "Temporal GNN for Political Polarization": {
    cardBorder: "group-hover:border-orange-500/80",
    frameBorder: "group-hover:border-orange-400/70",
    glow: "from-orange-600/35 via-amber-500/18 to-rose-400/12",
    titleHover: "group-hover:text-orange-200",
    tagline: "text-orange-300",
    chipBorder: "border-orange-500/45",
    chipBg: "bg-orange-500/12",
    chipText: "text-orange-100",
    chipHoverBorder: "group-hover:border-orange-300/75",
    chipHoverText: "group-hover:text-white",
    buttonBorder: "border-2 border-orange-400/80",
    buttonBg: "bg-orange-500/18",
    buttonText: "text-orange-100",
    buttonShadow: "shadow-[0_0_26px_rgba(249,115,22,0.32)]",
    buttonHoverBg: "hover:bg-orange-500/35",
    buttonHoverText: "hover:text-white",
    buttonHoverShadow: "hover:shadow-[0_0_40px_rgba(249,115,22,0.55)]",
  },
  "Hate Speech Ensemble Model": {
    cardBorder: "group-hover:border-blue-500/80",
    frameBorder: "group-hover:border-blue-400/70",
    glow: "from-blue-800/35 via-sky-600/18 to-indigo-500/16",
    titleHover: "group-hover:text-blue-200",
    tagline: "text-blue-300",
    chipBorder: "border-blue-500/45",
    chipBg: "bg-blue-600/12",
    chipText: "text-blue-100",
    chipHoverBorder: "group-hover:border-blue-300/75",
    chipHoverText: "group-hover:text-white",
    buttonBorder: "border-2 border-blue-400/80",
    buttonBg: "bg-blue-600/18",
    buttonText: "text-blue-100",
    buttonShadow: "shadow-[0_0_26px_rgba(59,130,246,0.32)]",
    buttonHoverBg: "hover:bg-blue-600/35",
    buttonHoverText: "hover:text-white",
    buttonHoverShadow: "hover:shadow-[0_0_40px_rgba(59,130,246,0.55)]",
  },
  Forkprint: {
    cardBorder: "group-hover:border-emerald-400/70",
    frameBorder: "group-hover:border-emerald-300/60",
    glow: "from-emerald-500/30 via-teal-400/15 to-lime-300/20",
    titleHover: "group-hover:text-emerald-200",
    tagline: "text-emerald-300",
    chipBorder: "border-emerald-500/40",
    chipBg: "bg-emerald-500/10",
    chipText: "text-emerald-100",
    chipHoverBorder: "group-hover:border-emerald-300/70",
    chipHoverText: "group-hover:text-white",
    buttonBorder: "border-2 border-emerald-400/80",
    buttonBg: "bg-emerald-500/15",
    buttonText: "text-emerald-100",
    buttonShadow: "shadow-[0_0_26px_rgba(52,211,153,0.3)]",
    buttonHoverBg: "hover:bg-emerald-500/35",
    buttonHoverText: "hover:text-white",
    buttonHoverShadow: "hover:shadow-[0_0_40px_rgba(52,211,153,0.5)]",
  },
  "Multilingual Claim Verification Pipeline": {
    cardBorder: "group-hover:border-rose-400/70",
    frameBorder: "group-hover:border-rose-300/60",
    glow: "from-rose-500/25 via-red-400/15 to-orange-300/20",
    titleHover: "group-hover:text-rose-200",
    tagline: "text-rose-300",
    chipBorder: "border-rose-500/40",
    chipBg: "bg-rose-500/10",
    chipText: "text-rose-100",
    chipHoverBorder: "group-hover:border-rose-300/70",
    chipHoverText: "group-hover:text-white",
    buttonBorder: "border-2 border-rose-400/80",
    buttonBg: "bg-rose-500/15",
    buttonText: "text-rose-100",
    buttonShadow: "shadow-[0_0_26px_rgba(251,113,133,0.3)]",
    buttonHoverBg: "hover:bg-rose-500/35",
    buttonHoverText: "hover:text-white",
    buttonHoverShadow: "hover:shadow-[0_0_40px_rgba(251,113,133,0.5)]",
  },
};

export default function Projects() {
  const projects = [
    {
      title: "GPUnity (in progress)",
      tagline: "Risk-aware GPU decisions for modern ML.",
      problem:
        "Running ML jobs gets stupidly expensive and slow when you have to guess what GPU you need. The details that matter are buried across the repo, configs, and scripts, so people over-provision, miss deadlines, or waste hours comparing instance types by hand.",
      solution:
        "GPUnity reads your codebase and understands what the workload actually looks like. It infers things like model size, memory pressure, and how the job is likely to run, then gives you GPU options across providers with clear tradeoffs for cost, speed, and risk.",
      learned:
        "Pushed me into the messy parts of infra. Cloud APIs are flaky, GPU prices move constantly, and code signals are never clean. Most of the work ends up being about orchestration, handling uncertainty, and knowing where automation helps versus where humans are needed.",
      tech: [
        "Python",
        "JavaScript",
        "LangChain",
        "AWS",
        "FastAPI",
        "Distributed Systems",
        "PostgreSQL",
      ],
      featured: true,
      github: DEFAULT_CODE_URL,
    },
    {
      title: "QViSTA",
      tagline: "Quantum vision transformer for Alzheimer’s diagnosis",
      problem:
        "Alzheimer’s stages are hard to tell apart from MRI scans, and many models either oversimplify the problem or rely on heavy, compute-intensive architectures that don’t scale well.",
      solution:
        "A hybrid quantum–classical vision transformer for multi-stage Alzheimer’s classification from MRI scans. It swaps parts of a standard ViT with variational quantum circuits to reduce parameter count while maintaining comparable performance to classical models.",
      learned:
        "Most of the real work wasn’t quantum theory. It was data balancing, stabilizing training, and figuring out where quantum components actually add value versus unnecessary complexity.",
      tech: ["Python", "JAX", "PyTorch", "TensorCircuit", "Computer Vision"],
      github: "https://github.com/3x-dev/QViSTA",
    },
    {
      title: "Temporal GNN for Political Polarization",
      tagline: "Modeling how Redditors political opinions change over time",
      problem:
        "Most moderation and analysis tools treat online communities as static, so they miss how users gradually drift toward more polarized or extreme spaces over time.",
      solution:
        "Worked alongside researchers at UT Austin to build a temporal graph neural network over Reddit that models how users move between subreddits and how their topics evolve. This made it possible to track polarization trajectories over time instead of taking one-off snapshots.",
      learned:
        "Temporal graphs are expensive and fragile at scale. Getting this to work meant batching edges, profiling GPU memory, and rethinking how often the graph actually needs to update to be meaningful.",
      tech: ["Python", "PyTorch", "NetworkX", "Reddit API"],
      github: DEFAULT_CODE_URL,
    },
    {
      title: "Hate Speech Ensemble Model",
      tagline: "Severity-aware moderation for extremist forums",
      problem:
        "Most hate speech models flatten everything into a single label, losing nuance around severity, intent, and context. That makes them unreliable in extremist spaces where language is subtle and unevenly distributed.",
      solution:
        "Worked alongside researchers at UC Santa Barbara to build an ensemble NLP system that scores hate speech by severity. It combines tree-based models and neural models, and uses a semi-supervised pipeline to handle scarce and imbalanced labels.",
      learned:
        "Real hate speech data is sparse and skewed. Getting useful results meant learning how to train with semi-supervised signals, manage class imbalance, and evaluate models when clean labels are the exception.",
      tech: ["Python", "PyTorch"],
      github: DEFAULT_CODE_URL,
    },
    {
      title: "Multilingual Claim Verification Pipeline",
      tagline: "Fact-checking across 15 languages",
      problem:
        "Most fact-checking pipelines work well for English and fail silently in low-resource languages, which creates a huge gap in how misinformation is handled globally.",
      solution:
        "Built a multilingual claim verification pipeline that evaluates LLMs across 15 languages using direct inference, self-translation, and pre-translation. The system instruments accuracy, inconclusives, and translation bias to surface exactly where models degrade across language families and model sizes.",
      learned:
        "Multilingual failures are usually data and evaluation problems, not just model problems. Fairness across languages depends on translation strategy, metrics design, and infrastructure choices as much as raw model capability.",
      tech: ["Python", "Hugging Face", "LLMs"],
      github:
        "https://github.com/3x-dev/Comparative-Study-of-Bias-and-Accuracy-in-Multilingual-LLMs-for-Cross-Language-Claim-Verification",
    },
    {
      title: "Forkprint",
      tagline: "Fork over waste",
      problem:
        "Food waste mostly comes from bad tracking and vague awareness, not people being careless. In daily life, expiration dates get ignored, habits go unmeasured, and hence sustainability stays abstract.",
      solution:
        "Built a web app that helps users to turnsustainability into something concrete. It helps users track food expiration, log waste, and get AI-driven suggestions to reduce waste and make better use of what they already have.",
      learned:
        "Making environmental impact measurable matters more than adding flashy features. If a tool fits naturally into daily habits, people actually change their behavior.",
      tech: ["TypeScript", "JavaScript", "RESTful API"],
      github: "https://github.com/3x-dev/Forkprint",
    },
  ];
  const totalProjects = projects.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const swipeThreshold = 120;

  const handleFlip = (nextDirection: 1 | -1) => {
    setDirection(nextDirection);
    setActiveIndex(
      (current) => (current + nextDirection + totalProjects) % totalProjects
    );
  };

  const activeProject = projects[activeIndex];

  const renderProjectCard = (
    project: (typeof projects)[number],
    index: number
  ) => {
    const CardIcon = project.featured ? Award : null;
    const isGPUnity = project.title.startsWith("GPUnity");
    const waitlistLink = isGPUnity ? GPUNITY_URL : null;
    const codeLink = project.github ?? DEFAULT_CODE_URL;
    const accent = cardAccents[index % cardAccents.length];
    const theme = projectThemes[project.title] ?? {
      ...defaultTheme,
      ...accent,
    };

    return (
      <div className="group relative">
        <div className="relative rounded-[34px]">
          <div className="pointer-events-none absolute inset-0 rounded-[34px] overflow-hidden opacity-0 transition duration-300 group-hover:opacity-100">
            <div
              className={`absolute inset-0 rounded-[34px] border border-white/10 transition duration-300 ${theme.frameBorder}`}
            />
            <div
              className={`absolute inset-[10px] rounded-[30px] bg-gradient-to-r ${theme.glow} blur-3xl opacity-0 transition duration-300 group-hover:opacity-85`}
            />
          </div>
          {isGPUnity ? (
            <div className="relative rounded-[28px]">
              <Card
                className={`relative z-10 overflow-hidden rounded-[26px] border-2 border-zinc-900/70 bg-zinc-950/85 backdrop-blur-xl transition-all duration-200 ${theme.cardBorder}`}
              >
                <CardContent className="p-8 flex flex-col gap-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2
                        className={`text-3xl font-bold text-white mb-1 transition-colors duration-100 ${theme.titleHover}`}
                      >
                        {project.title}
                      </h2>
                      <p className={`text-lg font-medium ${theme.tagline}`}>
                        {project.tagline}
                      </p>
                    </div>
                    {CardIcon && (
                      <motion.div
                        className="relative flex items-center gap-2 overflow-hidden rounded-full border border-yellow-300/60 bg-gradient-to-r from-yellow-300/20 via-amber-200/10 to-yellow-300/20 px-3 py-1 text-yellow-100 text-sm font-semibold shadow-[0_0_18px_rgba(252,211,77,0.25)]"
                        animate={{
                          boxShadow: [
                            "0 0 18px rgba(252, 211, 77, 0.25)",
                            "0 0 26px rgba(253, 224, 71, 0.45)",
                            "0 0 18px rgba(252, 211, 77, 0.25)",
                          ],
                        }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <motion.span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-y-0 -left-1/3 w-4/3 -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/70 to-transparent blur-sm"
                          animate={{ x: ["-160%", "160%"] }}
                          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
                        />
                        <motion.span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-40"
                          animate={{ opacity: [0.2, 0.5, 0.2] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <CardIcon className="relative h-4 w-4" />
                        <span className="relative">Featured</span>
                      </motion.div>
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
                            borderColor:
                              "rgba(196, 181, 253, 0.45)",
                            boxShadow:
                              "0 10px 30px rgba(139, 92, 246, 0.25)",
                          }}
                          transition={quickHoverTransition}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <SectionIcon
                              className={`h-4 w-4 ${section.accent}`}
                            />
                            <span
                              className={`text-xs uppercase tracking-[0.2em] ${section.accent}`}
                            >
                              {section.label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 leading-relaxed">
                            {value}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <motion.span
                          key={`${project.title}-${tech}`}
                          className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-100 ${theme.chipBorder} ${theme.chipBg} ${theme.chipText} ${theme.chipHoverBorder} ${theme.chipHoverText}`}
                          whileHover={{ y: -2, scale: 1.06 }}
                          transition={quickHoverTransition}
                        >
                          {techIconMap[tech] ?? (
                            <Server className="h-3.5 w-3.5" />
                          )}
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                    {![
                      "GPUnity (in progress)",
                      "Temporal GNN for Political Polarization",
                      "Hate Speech Ensemble Model",
                    ].includes(project.title) && (
                      <Button
                        variant="outline"
                        className={`shrink-0 transition-all duration-150 hover:scale-[1.04] ${theme.buttonBorder} ${theme.buttonBg} ${theme.buttonText} ${theme.buttonShadow} ${theme.buttonHoverBg} ${theme.buttonHoverText} ${theme.buttonHoverShadow}`}
                        asChild
                      >
                        <a
                          href={codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          View Code
                        </a>
                      </Button>
                    )}
                  </div>

                  {waitlistLink && (
                    <div className="flex w-full justify-center">
                      <Button
                        variant="outline"
                        className="relative isolate w-full max-w-md justify-center overflow-hidden rounded-2xl border border-transparent bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-400 px-6 py-4 text-base font-semibold text-white shadow-[0_12px_35px_rgba(139,92,246,0.45)] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-110"
                        asChild
                      >
                        <motion.a
                          href={waitlistLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial="rest"
                          animate="rest"
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
                            We&apos;re live right now!
                          </span>
                        </motion.a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card
              className={`relative overflow-hidden rounded-[26px] border-2 border-zinc-900/70 bg-zinc-950/85 backdrop-blur-xl transition-all duration-200 ${theme.cardBorder}`}
            >
              <CardContent className="p-8 flex flex-col gap-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2
                      className={`text-3xl font-bold text-white mb-1 transition-colors duration-100 ${theme.titleHover}`}
                    >
                      {project.title}
                    </h2>
                    <p className={`text-lg font-medium ${theme.tagline}`}>
                      {project.tagline}
                    </p>
                  </div>
                  {CardIcon && (
                    <motion.div
                      className="relative flex items-center gap-2 overflow-hidden rounded-full border border-yellow-300/60 bg-gradient-to-r from-yellow-300/20 via-amber-200/10 to-yellow-300/20 px-3 py-1 text-yellow-100 text-sm font-semibold shadow-[0_0_18px_rgba(252,211,77,0.25)]"
                      animate={{
                        boxShadow: [
                          "0 0 18px rgba(252, 211, 77, 0.25)",
                          "0 0 26px rgba(253, 224, 71, 0.45)",
                          "0 0 18px rgba(252, 211, 77, 0.25)",
                        ],
                      }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <motion.span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 -left-1/3 w-4/3 -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/70 to-transparent blur-sm"
                        animate={{ x: ["-160%", "160%"] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
                      />
                      <motion.span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-40"
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <CardIcon className="relative h-4 w-4" />
                      <span className="relative">Featured</span>
                    </motion.div>
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
                          borderColor:
                            "rgba(196, 181, 253, 0.45)",
                          boxShadow:
                            "0 10px 30px rgba(139, 92, 246, 0.25)",
                        }}
                        transition={quickHoverTransition}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <SectionIcon
                            className={`h-4 w-4 ${section.accent}`}
                          />
                          <span
                            className={`text-xs uppercase tracking-[0.2em] ${section.accent}`}
                          >
                            {section.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {value}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <motion.span
                        key={`${project.title}-${tech}`}
                        className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-100 ${theme.chipBorder} ${theme.chipBg} ${theme.chipText} ${theme.chipHoverBorder} ${theme.chipHoverText}`}
                        whileHover={{ y: -2, scale: 1.06 }}
                        transition={quickHoverTransition}
                      >
                        {techIconMap[tech] ?? (
                          <Server className="h-3.5 w-3.5" />
                        )}
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  {![
                    "GPUnity (in progress)",
                    "Temporal GNN for Political Polarization",
                    "Hate Speech Ensemble Model",
                  ].includes(project.title) && (
                    <Button
                      variant="outline"
                      className={`shrink-0 transition-all duration-150 hover:scale-[1.04] ${theme.buttonBorder} ${theme.buttonBg} ${theme.buttonText} ${theme.buttonShadow} ${theme.buttonHoverBg} ${theme.buttonHoverText} ${theme.buttonHoverShadow}`}
                      asChild
                    >
                      <a
                        href={codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        View Code
                      </a>
                    </Button>
                  )}
                </div>

                {waitlistLink && (
                  <div className="flex w-full justify-center">
                    <Button
                      variant="outline"
                      className="relative isolate w-full max-w-md justify-center overflow-hidden rounded-2xl border border-transparent bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-400 px-6 py-4 text-base font-semibold text-white shadow-[0_12px_35px_rgba(139,92,246,0.45)] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-110"
                      asChild
                    >
                      <motion.a
                        href={waitlistLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial="rest"
                        animate="rest"
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
                          We&apos;re live right now!
                        </span>
                      </motion.a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  };

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
              <span className="animated-gradient-text">PROJECTS</span>
            </h1>
            <p className="text-2xl text-gray-400">
              A few things I'm building and iterating on.
            </p>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-lg text-gray-300">
                Swipe the card or use the arrows to flip through projects.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-xs uppercase tracking-[0.35em] text-zinc-500">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(totalProjects).padStart(2, "0")}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="h-10 w-10 rounded-full border-violet-500/50 p-0 text-violet-200 transition-all hover:-translate-y-0.5 hover:bg-violet-500/20"
                  onClick={() => handleFlip(-1)}
                  aria-label="Previous project"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-10 w-10 rounded-full border-violet-500/50 p-0 text-violet-200 transition-all hover:-translate-y-0.5 hover:bg-violet-500/20"
                  onClick={() => handleFlip(1)}
                  aria-label="Next project"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="relative mt-10">
            <div
              className="relative flex items-center justify-center overflow-hidden sm:overflow-visible"
              style={{ perspective: "1400px" }}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeProject.title}
                  custom={direction}
                  variants={flipVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 240, damping: 26 }}
                  style={{ transformStyle: "preserve-3d" }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.22}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > swipeThreshold) {
                      handleFlip(-1);
                    } else if (info.offset.x < -swipeThreshold) {
                      handleFlip(1);
                    }
                  }}
                  className="w-full max-w-5xl cursor-grab active:cursor-grabbing"
                >
                  {renderProjectCard(activeProject, activeIndex)}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

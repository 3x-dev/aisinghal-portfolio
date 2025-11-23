import { motion } from "framer-motion";
import { BookOpen, Code, Brain, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";

const GPUNITY_URL = "https://sustaineo-page.vercel.app/";

const withGPUnityLink = (text: string) =>
  text.split(/(GPUnity)/g).map((part, index) =>
    part === "GPUnity" ? (
      <a
        key={`gpunity-${index}-${text}`}
        href={GPUNITY_URL}
        target="_blank"
        rel="noreferrer"
        className="text-violet-300 underline decoration-dotted underline-offset-4 transition-colors hover:text-violet-100"
      >
        {part}
      </a>
    ) : (
      part
    )
  );

const accents = [
  {
    iconWrap: "bg-violet-600/20 text-violet-300",
    glow: "from-violet-600/40 via-fuchsia-500/20 to-transparent",
    border: "hover:border-violet-500/70",
  },
  {
    iconWrap: "bg-emerald-600/20 text-emerald-300",
    glow: "from-emerald-500/40 via-teal-500/20 to-transparent",
    border: "hover:border-emerald-500/70",
  },
  {
    iconWrap: "bg-sky-600/20 text-sky-300",
    glow: "from-sky-500/40 via-cyan-500/20 to-transparent",
    border: "hover:border-sky-500/70",
  },
  {
    iconWrap: "bg-fuchsia-600/20 text-fuchsia-300",
    glow: "from-fuchsia-500/40 via-rose-500/20 to-transparent",
    border: "hover:border-fuchsia-500/70",
  },
] as const;

export default function Now() {
  const sections = [
    {
      icon: Code,
      title: "Building",
      items: [
        "GPUnity: automatically recommends, provisions, and manages compute",
        "A pricing + availability engine for multi-cloud GPU markets",
        "Agentic workflows powered by MCP for infra automation"
      ],
    },
    {
      icon: Brain,
      title: "Exploring",
      items: [
        "Unified abstractions for heterogeneous compute (CUDA, ROCm, TPU)",
        "Autonomous agents that can provision, benchmark, and migrate workloads",
        "Patterns for reducing inference cost without killing performance"
      ],
    },
    {
      icon: BookOpen,
      title: "Learning",
      items: [
        "Systems-level design for large-scale compute",
        "Runtime scheduling strategies and kernel-level bottlenecks",
        "Compiler-driven optimizations in ML workloads"
      ],
    },
    {
      icon: Wrench,
      title: "Problems I'm Thinking About",
      items: [
        "How to elastically move workloads between providers without downtime",
        "How to model GPU markets with real price volatility",
        "Why infra teams keep reinventing the same broken orchestration stack"
      ],
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
          className="max-w-4xl mx-auto"
        >
          <div className="mb-16">
            <h1 className="text-6xl md:text-7xl font-black mb-6">
              <span className="animated-gradient-text">
                NOW
              </span>
            </h1>
            <p className="text-2xl text-gray-400">
              What I'm focused on right now. Updated regularly(ish).
            </p>
          </div>

          <div className="space-y-10">
            {sections.map((section, idx) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="relative group"
              >
                <div
                  className={`pointer-events-none absolute -inset-[1px] rounded-3xl opacity-0 blur-3xl transition duration-500 group-hover:opacity-100 bg-gradient-to-r ${
                    accents[idx % accents.length].glow
                  }`}
                />
                <Card
                  className={`relative overflow-hidden rounded-3xl bg-zinc-950/70 border-zinc-900 ${accents[idx % accents.length].border} transition-all duration-500 backdrop-blur-md`}
                >
                  <CardContent className="p-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start">
                      <motion.div
                        className={`p-4 rounded-2xl shadow-inner transition-colors duration-300 ${accents[idx % accents.length].iconWrap}`}
                        animate={{ rotate: [0, 2, -2, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                      >
                        <section.icon className="h-7 w-7" />
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h2 className="text-2xl font-bold text-white">
                            {section.title}
                          </h2>
                          <motion.span
                            className="text-sm uppercase tracking-[0.35em] text-zinc-500"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 3, repeat: Infinity, delay: idx * 0.3 }}
                          >
                            {String(idx + 1).padStart(2, "0")}
                          </motion.span>
                        </div>
                        <ul className="space-y-4">
                          {section.items.map((item, itemIdx) => (
                            <motion.li
                              key={itemIdx}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 + itemIdx * 0.08 }}
                              whileHover={{ x: 6, transition: { duration: 0.12 } }}
                              className="text-lg text-gray-300 flex items-start gap-3"
                            >
                              <motion.span
                                className="mt-1 text-violet-200"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, delay: itemIdx * 0.2 }}
                                whileHover={{ rotate: 90, scale: 1.1, transition: { duration: 0.1 } }}
                              >
                                →
                              </motion.span>
                              <span className="relative">
                                {withGPUnityLink(item)}
                                <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-150 group-hover:opacity-80" />
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center text-gray-500 text-sm"
          >
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

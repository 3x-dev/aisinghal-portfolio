import { motion } from "framer-motion";
import { Zap, BookOpen, Code, Brain, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";

export default function Now() {
  const sections = [
    {
      icon: Code,
      title: "Building",
      items: [
        "Sustaineo - Architecture for sustainable infrastructure",
        "Agentic systems with MCP integration",
        "GPU scheduling optimization tools",
      ],
    },
    {
      icon: Brain,
      title: "Exploring",
      items: [
        "Decentralized inference patterns",
        "Model Context Protocol implementations",
        "Compute orchestration at scale",
      ],
    },
    {
      icon: BookOpen,
      title: "Learning",
      items: [
        "Advanced data structures & algorithms",
        "Distributed systems design",
        "Systems programming in Rust",
      ],
    },
    {
      icon: Wrench,
      title: "Problems I'm Thinking About",
      items: [
        "How to make AI inference actually affordable",
        "Better metrics for multilingual LLM evaluation",
        "Why most compute orchestration is broken",
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
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                NOW
              </span>
            </h1>
            <p className="text-2xl text-gray-400">
              What I'm focused on right now. Updated regularly.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section, idx) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-zinc-900/50 border-zinc-800 hover:border-violet-600 transition-all duration-300 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-violet-600/20 rounded-lg">
                        <section.icon className="h-6 w-6 text-violet-400" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white mb-4">
                          {section.title}
                        </h2>
                        <ul className="space-y-3">
                          {section.items.map((item, itemIdx) => (
                            <motion.li
                              key={itemIdx}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: idx * 0.1 + itemIdx * 0.05 }}
                              className="text-lg text-gray-300 flex items-start gap-3"
                            >
                              <span className="text-violet-400 mt-1">→</span>
                              <span>{item}</span>
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

import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";
import { Link } from "react-router";

export default function Thinking() {
  const essays = [
    {
      title: "What metrics should actually measure multilingual LLMs?",
      date: "January 2025",
      preview: "Most evaluation frameworks miss the point. Here's what actually matters when measuring language model performance across languages.",
      tags: ["ML", "NLP", "Evaluation"],
      readTime: "8 min read",
    },
    {
      title: "Why compute orchestration is broken",
      date: "December 2024",
      preview: "Current approaches to GPU scheduling and resource allocation are fundamentally flawed. Let's talk about why and what needs to change.",
      tags: ["Infrastructure", "Systems"],
      readTime: "12 min read",
    },
    {
      title: "Lessons from martial arts that make you a better engineer",
      date: "November 2024",
      preview: "12 years of taekwondo taught me more about building software than most CS courses. Discipline, iteration, and knowing when to pivot.",
      tags: ["Personal", "Engineering"],
      readTime: "6 min read",
    },
    {
      title: "Why most AI ethics discourse is useless noise",
      date: "October 2024",
      preview: "We're having the wrong conversations. Ethics without implementation is philosophy. Here's what actually matters.",
      tags: ["AI", "Ethics", "Opinion"],
      readTime: "10 min read",
    },
    {
      title: "How to pick GPUs like an adult",
      date: "September 2024",
      preview: "Stop cargo-culting hardware decisions. A practical guide to choosing compute based on your actual workload, not hype.",
      tags: ["Hardware", "ML", "Guide"],
      readTime: "15 min read",
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
                THINKING
              </span>
            </h1>
            <p className="text-2xl text-gray-400">
              Essays, notes, and reflections on building, learning, and systems.
            </p>
          </div>

          <div className="space-y-6">
            {essays.map((essay, index) => (
              <motion.div
                key={essay.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
                className="group cursor-pointer"
              >
                <Card className="bg-zinc-900/50 border-zinc-800 hover:border-violet-600 transition-all duration-300 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors">
                          {essay.title}
                        </h2>
                        <p className="text-gray-400 text-lg mb-4 leading-relaxed">
                          {essay.preview}
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Calendar className="h-4 w-4" />
                            <span>{essay.date}</span>
                          </div>
                          <span className="text-gray-600">•</span>
                          <span className="text-gray-500 text-sm">{essay.readTime}</span>
                          <div className="flex gap-2 ml-auto">
                            {essay.tags.map((tag) => (
                              <Badge
                                key={tag}
                                className="bg-violet-600/20 text-violet-300 border-violet-600/50"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-6 w-6 text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-2" />
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
            More coming soon. Subscribe via RSS or check back regularly.
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

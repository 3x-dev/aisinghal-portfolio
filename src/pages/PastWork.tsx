import { motion } from "framer-motion";
import { FileText, Award, Presentation } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";

export default function PastWork() {
  const publications = [
    {
      title: "Temporal Graph Neural Networks for Understanding Online Polarization Dynamics",
      venue: "Conference on Computational Social Science",
      year: "2023",
      type: "publication",
      description: "Developed temporal GNN architecture to track community polarization on Reddit with 89% accuracy.",
    },
    {
      title: "ASTRA: Multilingual Claim Verification Pipeline",
      venue: "NLP Workshop",
      year: "2023",
      type: "publication",
      description: "Automated fact-checking system supporting 12 languages with real-time verification capabilities.",
    },
    {
      title: "Ensemble Methods for Multilingual Hate Speech Detection",
      venue: "AI Ethics Conference",
      year: "2023",
      type: "publication",
      description: "Achieved 94% F1 score across 7 languages using ensemble approach for content moderation.",
    },
  ];

  const posters = [
    {
      title: "QViSTA: Computer Vision for Early Alzheimer's Detection",
      venue: "Medical AI Symposium",
      year: "2023",
      type: "poster",
    },
    {
      title: "Bias Detection in Large Language Models",
      venue: "Fairness in ML Workshop",
      year: "2022",
      type: "poster",
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
                PAST WORK
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Before shifting toward engineering and product, I spent several years doing research 
              in NLP, bias detection, and computational social science.
            </p>
          </div>

          {/* Publications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-6 w-6 text-violet-400" />
              <h2 className="text-3xl font-bold text-white">Publications</h2>
            </div>
            <div className="space-y-6">
              {publications.map((pub, index) => (
                <motion.div
                  key={pub.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="relative group"
                >
                  <div className="pointer-events-none absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-violet-700/30 via-fuchsia-600/20 to-transparent opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />
                  <Card className="relative overflow-hidden rounded-3xl bg-zinc-950/70 border-zinc-900 hover:border-violet-500/70 transition-all duration-500 backdrop-blur-md">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-white">{pub.title}</h3>
                        <motion.span
                          className="text-xs uppercase tracking-[0.35em] text-violet-400/70"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                        >
                          {pub.type}
                        </motion.span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <Badge className="bg-violet-600/20 text-violet-200 border-violet-500/40 backdrop-blur">
                          {pub.venue}
                        </Badge>
                        <span className="text-gray-500">{pub.year}</span>
                      </div>
                      <p className="text-gray-400 leading-relaxed">{pub.description}</p>
                      <motion.div
                        className="h-px w-full bg-gradient-to-r from-transparent via-violet-500/60 to-transparent opacity-20"
                        animate={{ opacity: [0.2, 0.6, 0.2] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Posters & Workshops */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Presentation className="h-6 w-6 text-emerald-400" />
              <h2 className="text-3xl font-bold text-white">Posters & Workshops</h2>
            </div>
            <div className="space-y-4">
              {posters.map((poster, index) => (
                <motion.div
                  key={poster.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="relative group"
                >
                  <div className="pointer-events-none absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-emerald-500/30 via-teal-400/20 to-transparent opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />
                  <Card className="relative overflow-hidden rounded-3xl bg-zinc-950/60 border-zinc-900 hover:border-emerald-500/70 transition-all duration-500 backdrop-blur-md">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1">{poster.title}</h3>
                          <div className="flex items-center gap-3 text-sm">
                            <Badge className="bg-emerald-500/15 text-emerald-200 border-emerald-400/40 backdrop-blur">
                              {poster.venue}
                            </Badge>
                            <span className="text-gray-500">{poster.year}</span>
                          </div>
                        </div>
                        <motion.div
                          className="h-10 w-10 rounded-full bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center text-emerald-200"
                          animate={{ scale: [1, 1.05, 1], rotate: [0, 3, -3, 0] }}
                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                        >
                          <Award className="h-5 w-5" />
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

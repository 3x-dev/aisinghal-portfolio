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
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
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
                >
                  <Card className="bg-zinc-900/50 border-zinc-800 hover:border-violet-600 transition-all duration-300 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{pub.title}</h3>
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className="bg-violet-600/20 text-violet-300 border-violet-600/50">
                          {pub.venue}
                        </Badge>
                        <span className="text-gray-500 text-sm">{pub.year}</span>
                      </div>
                      <p className="text-gray-400">{pub.description}</p>
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
                >
                  <Card className="bg-zinc-900/50 border-zinc-800 hover:border-emerald-600 transition-all duration-300 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-white mb-2">{poster.title}</h3>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-emerald-600/20 text-emerald-300 border-emerald-600/50">
                          {poster.venue}
                        </Badge>
                        <span className="text-gray-500 text-sm">{poster.year}</span>
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

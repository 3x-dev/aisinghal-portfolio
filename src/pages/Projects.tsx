import { motion } from "framer-motion";
import { Github, ExternalLink, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";

export default function Projects() {
  const projects = [
    {
      title: "GPUnity",
      tagline: "Infrastructure for sustainable computing",
      problem: "Current cloud infrastructure wastes massive amounts of energy and resources",
      solution: "Built an architecture that optimizes resource allocation and reduces waste by 40%",
      learned: "How to design systems that scale while staying efficient",
      tech: ["Rust", "Kubernetes", "gRPC", "PostgreSQL"],
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

          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
                className="group"
              >
                <Card className={`bg-zinc-900/50 border-zinc-800 hover:border-violet-600 transition-all duration-300 backdrop-blur-sm ${project.featured ? "border-violet-600/50" : ""}`}>
                  <CardContent className="p-8">
                    {project.featured && (
                      <div className="flex items-center gap-2 mb-4">
                        <Award className="h-5 w-5 text-yellow-400" />
                        <span className="text-yellow-400 font-semibold">Featured Project</span>
                      </div>
                    )}
                    
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      <div className="flex-1">
                        <h2 className="text-4xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">
                          {project.title}
                        </h2>
                        <p className="text-xl text-violet-400 mb-6 font-semibold">
                          {project.tagline}
                        </p>

                        <div className="space-y-4 mb-6">
                          <div>
                            <span className="text-gray-500 font-semibold">Problem:</span>
                            <p className="text-gray-300 text-lg">{project.problem}</p>
                          </div>
                          <div>
                            <span className="text-emerald-400 font-semibold">Solution:</span>
                            <p className="text-gray-300 text-lg">{project.solution}</p>
                          </div>
                          <div>
                            <span className="text-blue-400 font-semibold">Learned:</span>
                            <p className="text-gray-300 text-lg">{project.learned}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map((tech) => (
                            <Badge
                              key={tech}
                              className="bg-violet-600/20 text-violet-300 border-violet-600/50"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {project.github && (
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="outline"
                            className="border-violet-600 text-violet-400 hover:bg-violet-600 hover:text-white"
                            asChild
                          >
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-2 h-4 w-4" />
                              View Code
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

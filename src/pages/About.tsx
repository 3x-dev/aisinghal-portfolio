import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const timeline = [
    {
      period: "2012-2024",
      title: "Taekwondo Journey",
      description: "12 years of discipline, competition, and learning how to push through limits.",
    },
    {
      period: "2021",
      title: "First Research Experience",
      description: "Dove into NLP and computational social science. Learned how to ask better questions.",
    },
    {
      period: "2022",
      title: "Bias & Oversight Work",
      description: "Worked on fairness, bias detection, and content moderation systems.",
    },
    {
      period: "2023",
      title: "UCSB Research",
      description: "Temporal graph neural networks for understanding online polarization.",
    },
    {
      period: "2023",
      title: "UT Austin",
      description: "Multilingual NLP and claim verification at scale with ASTRA.",
    },
    {
      period: "2024",
      title: "Purdue CS",
      description: "Started at Purdue. Shifted focus from pure research to building infrastructure and products.",
    },
    {
      period: "2024-Present",
      title: "Sustaineo & Beyond",
      description: "Building sustainable compute infrastructure. Exploring agentic systems, GPU scheduling, and decentralized inference.",
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
                ABOUT
              </span>
            </h1>
          </div>

          {/* Present */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">Present</h2>
            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
                  <p>
                    I'm a freshman at Purdue studying Computer Science. I build infrastructure and AI systems.
                  </p>
                  <p>
                    Currently working on <span className="text-violet-400 font-semibold">Sustaineo</span>, 
                    a startup focused on sustainable compute infrastructure. I'm exploring agentic architectures, 
                    GPU scheduling optimization, and decentralized inference patterns.
                  </p>
                  <p>
                    My interests sit at the intersection of <span className="text-emerald-400 font-semibold">intelligence</span>, 
                    <span className="text-blue-400 font-semibold"> behavior</span>, and 
                    <span className="text-fuchsia-400 font-semibold"> ethics</span>. I care about building 
                    systems that scale, work efficiently, and don't waste resources.
                  </p>
                  <p className="text-violet-400 font-semibold">
                    I don't wait for opportunities—I create them.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trajectory */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold mb-8 text-white">Trajectory</h2>
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="relative pl-8 border-l-2 border-violet-600"
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-violet-600 rounded-full" />
                  <div className="pb-8">
                    <div className="text-violet-400 font-mono text-sm mb-1">{item.period}</div>
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-lg">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

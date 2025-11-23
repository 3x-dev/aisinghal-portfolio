import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";

const GPUNITY_URL = "https://sustaineo-page.vercel.app/";

const withGPUnityLink = (text: string) =>
  text.split(/(GPUnity)/g).map((part, index) =>
    part === "GPUnity" ? (
      <a
        key={`about-gpunity-${index}-${text}`}
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

const timelineItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.4 + index * 0.08, duration: 0.45, ease: "easeOut" },
  }),
};

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
      title: "GPUnity & Beyond",
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
              <span className="animated-gradient-text">
                ABOUT
              </span>
            </h1>
          </div>

          {/* Present */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16 relative group"
            whileHover="hovered"
          >
            <motion.div
              className="pointer-events-none absolute -inset-2 rounded-[32px] bg-gradient-to-r from-violet-600/30 via-fuchsia-500/25 to-transparent opacity-0 blur-3xl transition duration-500 group-hover:opacity-100"
              variants={{ hovered: { opacity: 1 } }}
            />
            <h2 className="text-4xl font-bold mb-6 text-white">Present</h2>
            <Card className="relative overflow-hidden rounded-[28px] bg-zinc-950/70 border-zinc-900 transition-all duration-500 group-hover:border-violet-500/60 backdrop-blur-md">
              <CardContent className="p-8 relative">
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-radial from-violet-500/40 via-transparent to-transparent"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
                  <p>
                    I'm a freshman at Purdue studying Computer Science. I build infrastructure and AI systems.
                  </p>
                  <p>
                    {withGPUnityLink(
                      "Currently working on my startup, GPUnity, a startup focused on sustainable compute infrastructure. I'm exploring agentic architectures, GPU scheduling optimization, and decentralized inference patterns."
                    )}
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
                  custom={index}
                  variants={timelineItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ x: 6, transition: { duration: 0.12 } }}
                  className="relative pl-10"
                >
                  <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center">
                    <motion.span
                      className="h-full w-px bg-gradient-to-b from-violet-600/60 via-violet-400/30 to-transparent"
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
                    />
                    <motion.span
                      className="absolute -top-2 block h-4 w-4 rounded-full bg-violet-500 shadow-[0_0_15px_rgba(167,139,250,0.6)]"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.15 }}
                    />
                  </div>
                  <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-6 backdrop-blur transition-all duration-200 ease-out hover:border-violet-500/70 hover:bg-zinc-900/60">
                    <div className="text-violet-300 font-mono text-sm mb-2 tracking-[0.25em]">
                      {item.period}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{withGPUnityLink(item.title)}</h3>
                    <p className="text-gray-400 text-lg leading-relaxed">{item.description}</p>
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

import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";

const GPUNITY_URL = "https://www.gpunity.dev/";

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
      period: "2025-Present",
      title: "GPUnity",
      description: (
        <>
          Building agents that analyze ML code, reason about workload needs, and surface GPU options across clouds with explicit cost and risk tradeoffs.{" "}
          <a
            href={GPUNITY_URL}
            target="_blank"
            rel="noreferrer"
            className="text-violet-300 underline decoration-dotted underline-offset-4 transition-colors hover:text-violet-100"
          >
            We're live!
          </a>
          .
        </>
      ),
    },
    {
      period: "2025-Present",
      title: "Purdue Student",
      description:
        "Studying Artificial Intelligence at Purdue (Boiler Up!) with a planned Computer Science double.",
    },
    {
      period: "Mar 2024 - Aug 2025",
      title: "ASTRA: Association of Students for Research in AI",
      description:
        "Served on the executive board while leading and publishing research with high school collaborators, including a paper accepted to EMNLP.",
    },
    {
      period: "Oct 2023 - Aug 2025",
      title: "Q-Sight Labs · Co-Founder",
      description: (
        <>
          Co-built the first quantum vision transformer for multi-stage Alzheimer&apos;s detection. The science fair judges passed, so we shipped it to NeurIPS 2024 instead.{" "}
          <a
            href="https://openreview.net/pdf?id=suWYAfyWBa"
            target="_blank"
            rel="noreferrer"
            className="text-violet-300 underline decoration-dotted underline-offset-4 transition-colors hover:text-violet-100"
          >
            Read the paper
          </a>
          .
        </>
      ),
    },
    {
      period: "May 2024 - May 2025",
      title: "UT Austin · Machine Learning Research Intern",
      description:
        "Designed a multi-modal temporal graph neural network to track ideological migration across 2K+ subreddits. It predicts when communities drift, polarize, or collapse entirely.",
    },
    {
      period: "Aug 2024 - Apr 2025",
      title: "National AI Youth Council",
      description:
        "Led the research and innovation committee for writing AI policy briefs.",
    },
    {
      period: "Jun 2024 - Feb 2025",
      title: "Algoverse · Research Intern",
      description:
        "Prototyped RLHF evaluation harnesses and safety tests for early-stage language models. Lots of red-teaming, dataset curation, and cataloging honest failure modes.",
    },
    {
      period: "Jan 2024 - Feb 2025",
      title: "UC Santa Barbara · ML/Comms Research Intern",
      description:
        "Built gradient-boosted regressors to score hate speech severity (1–6 scale) for extremist forums. Learned how subjective “harm” becomes once you leave sanitized benchmarks.",
    },
    {
      period: "May 2023 - May 2024",
      title: "ASDRP · AI Researcher",
      description: (
        <>
          Mitigated political bias in ChatGPT by pairing Anthropic-style constitutional rules with chain-of-thought prompting. Published both the{" "}
          <a
            href="https://emerginginvestigators.org/articles/24-047"
            target="_blank"
            rel="noreferrer"
            className="text-violet-300 underline decoration-dotted underline-offset-4 transition-colors hover:text-violet-100"
          >
            constitutional AI case study
          </a>{" "}
          and the{" "}
          <a
            href="https://www.ijraset.com/research-paper/mitigating-political-bias-in-large-language-models"
            target="_blank"
            rel="noreferrer"
            className="text-violet-300 underline decoration-dotted underline-offset-4 transition-colors hover:text-violet-100"
          >
            chain-of-thought follow-up
          </a>
          , then presented it at SCCUR 2023.
        </>
      ),
    },
    {
      period: "2022",
      title: "First ML Research Experience",
      description: (
        <>
          Built a supervised Naive Bayes model to spot hate speech trends on Twitter. Pretty crappy model, but it began my AI obsession. Read about it{" "}
          <a
            href="https://github.com/3x-dev/Analyzing-Twitter-Hate-Speech-Trends-Using-Sentiment-Analysis"
            target="_blank"
            rel="noreferrer"
            className="text-violet-300 underline decoration-dotted underline-offset-4 transition-colors hover:text-violet-100"
          >
            here
          </a>
          .
        </>
      ),
    },
    {
      period: "2012-2022",
      title: "Martial Arts Journey",
      description:
        "Mom and dad signed me up for Taekwondo when I was 5 (classic Asian parents). 10+ years of drills, sparring, and teaching students to channel their power, I achieved my third-degree black belt. ",
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
              <span className="animated-gradient-text">ABOUT ME</span>
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
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-radial from-violet-500/40 via-transparent to-transparent"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
                <p>
                  I'm a first-year at Purdue studying Artificial Intelligence (planning on double majoring in CS).
                </p>
                <p>
                  Right now most of my time goes into{" "}
                  <a
                    href={GPUNITY_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-violet-300 underline decoration-dotted underline-offset-4 transition-colors hover:text-violet-100"
                  >
                    GPUnity
                  </a>{""}
                  , a GPU decision system where agents read an ML codebase, infer what kind of workload it represents, and recommend GPU options across cloud providers with clear cost and risk tradeoffs.
                </p>
                <p>
                  Most of what I care about lives between{" "}
                  <span className="text-emerald-400 font-semibold">intelligence</span>,
                  <span className="text-blue-400 font-semibold"> behavior</span>, and
                  <span className="text-fuchsia-400 font-semibold"> ethics</span>. I like seeing how systems behave in the wild, where they fall apart, and whether they are actually worth the compute they burn.
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
            <h2 className="text-4xl font-bold mb-8 text-white">My Journey</h2>
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
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {withGPUnityLink(item.title)}
                    </h3>
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

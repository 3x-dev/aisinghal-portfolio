import { motion } from "framer-motion";
import {
  FileText,
  Award,
  Presentation,
  Sparkles,
  Globe,
  Layers,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";

const highlightStats = [
  {
    label: "Peer-reviewed + workshops",
    value: "8",
    detail: "NeurIPS • EMNLP • SCCUR",
    accent: "from-violet-500 via-fuchsia-500 to-cyan-400",
  },
  {
    label: "Languages fact-checked",
    value: "15",
    detail: "Bias metrics + LLM evals",
    accent: "from-emerald-400 via-teal-400 to-sky-400",
  },
  {
    label: "Datasets released",
    value: "40K+",
    detail: "MRI scans • bias corpora",
    accent: "from-amber-400 via-orange-400 to-rose-500",
  },
];

export default function PastWork() {
  const publications = [
    {
      title:
        "A Comparative Study of Translation Bias and Accuracy in Multilingual Large Language Models for Cross-Language Claim Verification",
      venue: "NeurIPS 2024 (ATTRIB Workshop)",
      year: "2024",
      type: "publication",
      description:
        "Benchmarked GPT 4o, Llama 3.1, and Mistral on 600+ factual claims across 15 languages, defining accuracy and translation bias metrics that expose a 40 percent performance gap between high and low resource languages.",
    },
    {
      title:
        "QViSTA: Quantum Vision Transformers for Early Alzheimer’s Detection",
      venue: "NeurIPS 2024 (GenAI for Health Workshop)",
      year: "2024",
      type: "publication",
      description:
        "Introduced a quantum vision transformer that reaches 87 percent accuracy on multi stage Alzheimer’s diagnosis from MRI scans, using a variational quantum circuit to cut compute cost and releasing a 40K scan dataset for the community.",
    },
    {
      title: "Multilingual Fact-Checking Using Large Language Models",
      venue: "EMNLP 2024 (NLP for Social Good / NLP for Positive Impact)",
      year: "2024",
      type: "publication",
      description:
        "Built an end to end multilingual claim verification pipeline that combines prompting strategies, translation paths, and calibration to verify claims in 15 languages, with a focus on low resource settings and cross cultural robustness.",
    },
    {
      title:
        "Unveiling Bias in ChatGPT 3.5: Analyzing Constitutional AI Principles for Politically Biased Responses",
      venue: "Journal of Emerging Investigators",
      year: "2024",
      type: "journal",
      description:
        "Analyzed how different Constitutional AI principles shift ChatGPT’s answers on US politics and showed how to design constraints that reduce partisan leaning while preserving nuance and answer quality.",
    },
    {
      title:
        "Mitigating Political Bias in ChatGPT Using Chain of Thought and Constitutional AI",
      venue: "IJRASET",
      year: "2023",
      type: "journal",
      description:
        "Demonstrated that combining chain of thought prompting with targeted review principles can reduce directional political bias on open ended prompts without collapsing model usefulness.",
    },
  ];

  const posters = [
    {
      title:
        "Political Bias in ChatGPT and Responsible AI for Public Models",
      venue:
        "Southern California Conference for Undergraduate Research (SCCUR)",
      year: "2023",
      type: "poster",
      description:
        "Presented early work on measuring and mitigating political bias in ChatGPT using Constitutional AI techniques, aimed at making large public models safer for civic discussions.",
    },
    {
      title:
        "Severity Aware Hate Speech Detection in Extremist Online Communities",
      venue: "UC Santa Barbara CITS Research Symposium",
      year: "2024",
      type: "poster",
      description:
        "Showcased an ensemble model that scores hate speech severity on a 1 to 6 scale for real extremist forums, highlighting design choices for dealing with label noise and subtle coded language.",
    },
    {
      title:
        "Multilingual Claim Verification With LLMs in Low Resource Settings",
      venue: "ASTRA AI Lab Research Showcase",
      year: "2024",
      type: "poster",
      description:
        "Summarized the multilingual claim verification pipeline and bias metrics work, focusing on failure modes when fact checking news and social media content outside of English.",
    },
  ];

  const tickerItems = [...publications, ...posters].map((item) => ({
    title: item.title,
    venue: item.venue,
    tag: item.type,
  }));

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatedBackground />
      <Navigation />

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto space-y-14"
        >
          <section className="relative overflow-hidden rounded-[44px] border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-transparent p-10">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-fuchsia-500/5 to-cyan-500/10 blur-3xl"
              animate={{ opacity: [0.2, 0.45, 0.2], rotate: [0, 6, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative z-10 space-y-5">
              <Badge className="bg-white/10 text-white border-white/30">Past Work · Research</Badge>
              <div className="flex flex-wrap items-end gap-4">
                <h1 className="text-6xl md:text-7xl font-black">
                  <span className="animated-gradient-text">PAST WORK</span>
                </h1>
                <motion.div
                  className="flex items-center gap-2 text-sm text-gray-400"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="h-4 w-4 text-violet-300" />
                  NLP · quantum vision · multilingual fact-checking
                </motion.div>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
                Before going deep on infrastructure and agentic compute, I spent years doing research
                on NLP, computational social science, and multilingual evaluation—publishing at NeurIPS,
                EMNLP, SCCUR, and a handful of journals.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 bg-white/5">
                  <Globe className="h-4 w-4 text-emerald-300" />
                  Cross-language bias metrics
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 bg-white/5">
                  <Layers className="h-4 w-4 text-amber-300" />
                  Quantum + classical vision stacks
                </span>
              </div>
            </div>
          </section>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {highlightStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -6 }}
                className="relative rounded-3xl border border-white/10 bg-white/5 p-6 overflow-hidden"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.accent} opacity-0 blur-2xl`}
                  initial={{ opacity: 0.1 }}
                  animate={{ opacity: [0.1, 0.35, 0.1] }}
                  transition={{ duration: 6 + index, repeat: Infinity }}
                />
                <div className="relative z-10 space-y-2">
                  <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
                    {stat.label}
                  </p>
                  <p className="text-4xl font-black text-white">{stat.value}</p>
                  <p className="text-sm text-gray-300">{stat.detail}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <section className="grid gap-10 lg:grid-cols-[3fr,1.2fr]">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-violet-400" />
                <h2 className="text-3xl font-bold">Publications timeline</h2>
              </div>
              <div className="relative pl-6">
                <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/60 via-fuchsia-500/30 to-transparent" />
                <div className="space-y-10">
                  {publications.map((pub, index) => (
                    <motion.div
                      key={pub.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: index * 0.05 }}
                      className="relative pl-10"
                    >
                      <div className="absolute left-0 top-4 -translate-x-1/2">
                        <motion.span
                          className="h-3 w-3 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.7)]"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                        />
                      </div>
                      <Card className="rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-md">
                        <CardContent className="p-6 space-y-4">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <h3 className="text-xl font-bold">{pub.title}</h3>
                            <Badge className="bg-violet-500/15 text-violet-100 border-violet-400/40">
                              {pub.year}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                            <Badge className="bg-white/5 text-white border-white/10">
                              {pub.venue}
                            </Badge>
                            <span className="uppercase tracking-[0.3em] text-gray-500">
                              {pub.type}
                            </span>
                          </div>
                          <p className="text-gray-400 leading-relaxed">{pub.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Presentation className="h-6 w-6 text-emerald-400" />
                <h2 className="text-3xl font-bold">Live ticker</h2>
              </div>
              <Card className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                <CardContent className="p-0">
                  <div className="border-b border-white/5 px-6 py-4 text-sm text-gray-400 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-300" />
                    Constantly shipping ideas into venues
                  </div>
                  <div className="relative h-[320px] overflow-hidden">
                    <motion.div
                      className="flex flex-col gap-6 py-6"
                      animate={{ y: ["0%", "-50%"] }}
                      transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                    >
                      {[...tickerItems, ...tickerItems].map((item, index) => (
                        <div
                          key={`${item.title}-${index}`}
                          className="px-6 flex flex-col gap-2"
                        >
                          <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
                            {item.tag}
                          </p>
                          <p className="font-semibold text-white leading-snug line-clamp-2">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-400">{item.venue}</p>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Award className="h-6 w-6 text-amber-300" />
              <h2 className="text-3xl font-bold">Posters & showcases</h2>
            </div>
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4">
              {posters.map((poster, index) => (
                <motion.div
                  key={poster.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="snap-center min-w-[280px] md:min-w-[360px]"
                >
                  <Card className="relative h-full rounded-3xl border border-white/10 bg-zinc-950/90 backdrop-blur-xl overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-transparent opacity-60"
                      animate={{ opacity: [0.4, 0.8, 0.4], rotate: [0, 4, 0] }}
                      transition={{ duration: 8, repeat: Infinity, delay: index * 0.2 }}
                    />
                    <CardContent className="relative z-10 p-6 space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500 uppercase tracking-[0.3em]">
                          {poster.year}
                        </p>
                        <h3 className="text-lg font-semibold text-white">{poster.title}</h3>
                      </div>
                      <Badge className="bg-amber-500/15 text-amber-100 border-amber-400/40">
                        {poster.venue}
                      </Badge>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {poster.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { FileText, Award, Presentation, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";

export default function PastWork() {
  const publications = [
    {
      title:
        "A Comparative Study of Translation Bias and Accuracy in Multilingual Large Language Models for Cross-Language Claim Verification",
      venue: "NeurIPS 2024 (ATTRIB Workshop)",
      year: "2024",
      type: "publication",
      description:
        "Evaluated GPT 4o, Llama 3.1, and Mistral models on hundreds of factual claims across 15 languages, defining accuracy and translation bias metrics that reveal a large performance gap between high and low resource languages.",
    },
    {
      title:
        "QViSTA: Quantum Vision Transformers for Early Alzheimer’s Detection",
      venue: "NeurIPS 2024 (GenAI for Health Workshop)",
      year: "2024",
      type: "publication",
      description:
        "Introduced a quantum vision transformer for multi stage Alzheimer’s diagnosis from MRI scans, using a variational quantum circuit to cut compute cost while keeping accuracy competitive with classical baselines.",
    },
    {
      title: "Multilingual Fact-Checking Using Large Language Models",
      venue: "EMNLP 2024 (NLP for Positive Impact Workshop)",
      year: "2024",
      type: "publication",
      description:
        "Built a multilingual fact checking benchmark and pipeline across five languages using prompting strategies, translation paths, and calibration to study how well LLMs verify real world claims in low resource settings.",
    },
    {
      title:
        "Unveiling Bias in ChatGPT 3.5: Analyzing Constitutional AI Principles for Politically Biased Responses",
      venue: "Journal of Emerging Investigators",
      year: "2024",
      type: "journal",
      description:
        "Used Constitutional AI style principles to test whether rule based constraints can reduce political bias in ChatGPT 3.5, finding limited gains from off the shelf principles but promising reductions on some topics with a tailored principle and prompt template.",
    },
    {
      title:
        "Mitigating Political Bias in ChatGPT Using Chain of Thought and Constitutional AI",
      venue: "IJRASET",
      year: "2024",
      type: "journal",
      description:
        "Showed that chain of thought prompting can reduce directional political bias in ChatGPT on open ended prompts while maintaining response quality, by iteratively refining answers using measured bias scores.",
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
        "Presented early work on measuring and mitigating political bias in ChatGPT using prompt design and Constitutional AI ideas, aimed at making large public models safer for civic discussions.",
    },
    {
      title:
        "Severity Aware Hate Speech Detection in Extremist Online Communities",
      venue: "UC Santa Barbara CITS Research Symposium",
      year: "2024",
      type: "poster",
      description:
        "Showcased an ensemble model that scores hate speech severity on a 1 to 6 scale for real extremist forums, highlighting techniques for handling label noise and subtle coded language.",
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
          <div className="mb-16">
            <h1 className="text-6xl md:text-7xl font-black mb-6">
              <span className="animated-gradient-text">PAST WORK</span>
            </h1>
            <p className="text-2xl text-gray-400 max-w-3xl">
              My past research work in NLP, computer vision, and LLMs.
            </p>
          </div>

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
                <h2 className="text-3xl font-bold">Snapshot</h2>
              </div>
              <Card className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                <CardContent className="p-0">
                  <div className="border-b border-white/5 px-6 py-4 text-sm text-gray-400 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-300" />
                    <span>Recent papers and talks</span>
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
                  style={{ perspective: "1400px" }}
                >
                  <motion.div
                    whileHover={{ rotateY: 8, rotateX: -2, y: -8 }}
                    transition={{ type: "spring", stiffness: 120, damping: 14, mass: 0.8 }}
                    className="h-full"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Card className="relative h-full rounded-3xl border border-white/10 bg-zinc-950/90 backdrop-blur-xl overflow-hidden shadow-[0px_20px_50px_rgba(0,0,0,0.35)]">
                      <motion.div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-transparent opacity-60"
                        animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.02, 1] }}
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
                </motion.div>
              ))}
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

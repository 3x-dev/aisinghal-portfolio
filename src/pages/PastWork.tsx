import { motion } from "framer-motion";
import { FileText, Award, Presentation, Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";

export default function PastWork() {
  const publications = [
    {
      title:
        "QViSTA: A Novel Quantum Vision Transformer for Early Multi-Stage Alzheimer’s Diagnosis Using Optimized Variational Quantum Circuits",
      venue: "NeurIPS 2024 · GenAI4Health Workshop",
      year: "2024",
      paperUrl: "https://openreview.net/pdf?id=suWYAfyWBa",
      description:
        "Hybrid quantum vision transformer that pairs optimized variational quantum circuits with ViTs to stage Alzheimer’s from MRI while reducing feature space.",
    },
    {
      title:
        "Unveiling bias in ChatGPT-3.5: Analyzing constitutional AI principles for politically biased responses",
      venue: "Journal of Emerging Investigators",
      year: "2024",
      paperUrl: "https://emerginginvestigators.org/articles/24-047",
      description:
        "Tested constitutional AI principles to reduce political bias in ChatGPT-3.5, with measurable gains on select topics and limits elsewhere.",
    },
    {
      title:
        "Can LLMs Verify Arabic Claims? Evaluating the Arabic Fact-Checking Abilities of Multilingual LLMs",
      venue: "NeurIPS 2024 · Safe Generative AI Workshop",
      year: "2024",
      paperUrl: "https://arxiv.org/abs/2410.10303",
      description:
        "Benchmarked prompting strategies on 771 Arabic claims, showing cross-lingual prompting yields the strongest accuracy gains.",
    },
    {
      title:
        "Multilingual Fact-Checking using LLMs",
      venue: "EMNLP 2024 · NLP for Positive Impact Workshop",
      year: "2024",
      paperUrl: "https://aclanthology.org/2024.nlp4pi-1.2/",
      description:
        "Built a multilingual claim verification benchmark across five languages and compared prompting strategies, with strong results in low-resource settings.",
    },
    {
      title:
        "A Comparative Study of Translation Bias and Accuracy in Multilingual Large Language Models for Cross-Language Claim Verification",
      venue: "NeurIPS 2024 · ATTRIB Workshop",
      year: "2024",
      paperUrl: "https://openreview.net/pdf?id=3bdJJaxiwt",
      description:
        "Measured translation bias across 15 languages and compared pre-translation versus self-translation, highlighting the steep low-resource drop-off.",
    },
    {
      title:
        "Mitigating Political Bias in Large Language Models Using Chain of Thought Prompting Techniques",
      venue: "International Journal for Research in Applied Science & Engineering Technology",
      year: "2024",
      paperUrl: "https://www.ijraset.com/research-paper/mitigating-political-bias-in-large-language-models",
      description:
        "Iterative chain-of-thought prompting paired with bias scoring reduced political skew while preserving response quality.",
    },
    {
      title:
        "Inferring Hate Speech Trends for Contemporary Tweets Using a Novel Machine Learning Approach from Supervised Learning Algorithms",
      venue: "Monta Vista - The Research Journal",
      year: "2023",
      paperUrl: "https://sites.google.com/view/mvrj/the-research-journal",
      description:
        "Tracked hate speech prevalence across topics with Naive Bayes and NLP features, showing higher rates in controversial discussions.",
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
        "Poster on early bias measurement work and prompt strategies aimed at safer public model behavior.",
    },
    {
      title:
        "QViSTA: A Novel Quantum Vision Transformer for Early Multi-Stage Alzheimer’s Diagnosis",
      venue: "NeurIPS 2024 · GenAI4Health Workshop",
      year: "2024",
      type: "poster",
      linkType: "poster",
      posterUrl:
        "https://docs.google.com/presentation/d/1AryC1JMgUuqIdjBpS1Vf_-DPL8avO8H8KZcd3tqkiq0/edit?usp=sharing",
      description:
        "Poster on the QViSTA hybrid quantum ViT that stages Alzheimer’s from MRI using optimized variational quantum circuits.",
    },
    {
      title:
        "Multilingual Claim Verification With LLMs in Low Resource Settings",
      venue: "ASTRA AI Lab Research Showcase",
      year: "2024",
      type: "poster",
      linkType: "linkedin",
      posterUrl:
        "https://www.linkedin.com/posts/aryan-singhal-ai_last-week-i-had-the-incredible-opportunity-activity-7266348635246780416-nbXy?utm_source=share&utm_medium=member_desktop&rcm=ACoAADXhcw4BbowuabrWq25lI9IcTFHYpSgODaY",
      description:
        "LinkedIn post summarizing the multilingual claim verification pipeline, bias metrics, and low-resource failure modes.",
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
          className="max-w-6xl mx-auto space-y-14"
        >
          <div className="mb-16">
            <h1 className="text-6xl md:text-7xl font-black mb-6">
              <span className="animated-gradient-text">PAST WORK</span>
            </h1>
            <p className="text-2xl text-gray-400 max-w-3xl">
              An overview of my past advancements in research.
            </p>
          </div>

          <section className="grid gap-10 lg:grid-cols-[3fr,1.2fr]">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-violet-400" />
                <h2 className="text-3xl font-bold">Publications Timeline</h2>
              </div>
              <div className="relative pl-6">
                <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/60 via-fuchsia-500/30 to-transparent" />
                <div className="space-y-10">
                  {publications.map((pub, index) => (
                    <motion.div
                      key={pub.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      whileHover={{ y: -6, scale: 1.01 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: index * 0.05, type: "spring", stiffness: 160, damping: 18 }}
                      className="relative pl-10 group"
                    >
                      <div className="absolute left-0 top-4 -translate-x-1/2">
                        <motion.span
                          className="h-3 w-3 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.7)]"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                        />
                      </div>
                      <Card className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1 group-hover:border-violet-400/40 group-hover:shadow-[0_18px_45px_rgba(124,58,237,0.35)]">
                        <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-gradient-to-br from-violet-500/15 via-fuchsia-500/10 to-transparent" />
                        <CardContent className="p-6 space-y-4">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <h3 className="text-xl font-bold">{pub.title}</h3>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                            <Badge className="bg-white/5 text-white border-white/10 whitespace-normal text-left leading-snug max-w-full break-words">
                              {pub.venue}
                            </Badge>
                            <span className="uppercase tracking-[0.3em] text-gray-500">
                              {pub.year}
                            </span>
                          </div>
                          <p className="text-gray-400 leading-relaxed">{pub.description}</p>
                          {pub.paperUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-fit border-violet-400/40 text-violet-100 hover:bg-violet-500/10"
                              asChild
                            >
                              <a
                                href={pub.paperUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FileText className="h-4 w-4" />
                                Read the paper
                              </a>
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Award className="h-6 w-6 text-amber-300" />
              <h2 className="text-3xl font-bold">Posters & Showcases</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posters.map((poster, index) => (
                <motion.div
                  key={poster.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full group"
                  style={{ perspective: "1400px" }}
                >
                  <motion.div
                    whileHover={{ rotateY: 8, rotateX: -2, y: -8 }}
                    transition={{ type: "spring", stiffness: 120, damping: 14, mass: 0.8 }}
                    className="h-full"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Card className="relative h-full rounded-3xl border border-white/10 bg-zinc-950/90 backdrop-blur-xl overflow-hidden shadow-[0px_20px_50px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:border-amber-300/40 group-hover:shadow-[0_24px_60px_rgba(251,191,36,0.3)]">
                      <div className="pointer-events-none absolute -inset-6 opacity-0 transition duration-300 group-hover:opacity-100 bg-gradient-to-br from-amber-400/15 via-rose-400/10 to-transparent blur-2xl" />
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
                        <Badge className="bg-amber-500/15 text-amber-100 border-amber-400/40 whitespace-normal text-left leading-snug max-w-full break-words">
                          {poster.venue}
                        </Badge>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {poster.description}
                        </p>
                        {poster.posterUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-fit border-amber-400/40 text-amber-100 hover:bg-amber-500/10"
                            asChild
                          >
                            <a
                              href={poster.posterUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {poster.linkType === "linkedin" ? (
                                <>
                                  <Linkedin className="h-4 w-4" />
                                  View post
                                </>
                              ) : (
                                <>
                                  <Presentation className="h-4 w-4" />
                                  View poster
                                </>
                              )}
                            </a>
                          </Button>
                        )}
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

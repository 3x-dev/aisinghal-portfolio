import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { Activity, Bot, Cpu, Shield, Sparkles } from "lucide-react";

type ThoughtStream = {
  title: string;
  subtitle: string;
  description: string;
  questions: string[];
  experiments: string[];
  accent: {
    glow: string;
    border: string;
    iconWrap: string;
  };
  icon: LucideIcon;
};

type QuickSignal = {
  label: string;
  value: string;
  accent: string;
};

const thoughtStreams: ThoughtStream[] = [
  {
    title: "Programmable GPU Markets",
    subtitle: "Treating compute supply like a high-frequency clearing house",
    description:
      "Still turning GPUnity from a waitlist into a live constraint solver. I want GPU supply to feel like liquidity pools with hard guardrails around carbon, latency, and spend.",
    questions: [
      "Can a sealed-bid double auction keep idle capacity under 5% when demand spikes?",
      "What is the cleanest way to price energy + cooling costs into bids without destroying low-latency workloads?",
      "How do we expose guarantees builders actually understand instead of 20 Grafana tabs?",
    ],
    experiments: [
      "Pairing auction simulations with telemetry coming from the GPUnity waitlist.",
      "Building a nightly constraint solver that choreographs migrations before failover is needed.",
    ],
    icon: Activity,
    accent: {
      glow: "from-violet-600/40 via-fuchsia-500/20 to-cyan-500/20",
      border: "border-violet-500/40 hover:border-violet-300/80",
      iconWrap: "bg-violet-500/10 text-violet-100 border border-violet-400/40",
    },
  },
  {
    title: "Autonomous Infra Agents",
    subtitle: "LLM copilots that understand hardware limits",
    description:
      "MCP-powered agents can open tickets, but I want them to plan, provision, and roll back clusters without waking up an on-call human.",
    questions: [
      "How much context (logs, manifests, budgets) does an agent need before it is safer than a tired SRE?",
      "What is the minimal action space that still lets agents re-balance workloads across clouds?",
      "How do we make rollbacks auditable so trust recovers after the inevitable mistake?",
    ],
    experiments: [
      "Training evaluators that score MCP traces for blast radius before actions fire.",
      "Letting a sandboxed agent tune staging clusters nightly and diffing the results against human playbooks.",
    ],
    icon: Bot,
    accent: {
      glow: "from-emerald-600/40 via-teal-500/20 to-sky-500/20",
      border: "border-emerald-500/40 hover:border-emerald-300/80",
      iconWrap: "bg-emerald-500/10 text-emerald-100 border border-emerald-400/40",
    },
  },
  {
    title: "Reliability + Observability",
    subtitle: "Convincing AI infra to tell the truth about itself",
    description:
      "As stacks get weirder, debugging needs to feel like storytelling instead of archeology. I'm merging tracing, energy, and spend into one narrative timeline.",
    questions: [
      "How can we collapse tracing, energy, and cost into the same scroll without overwhelming operators?",
      "What guardrails stop AI-generated runbooks from hallucinating root causes?",
      "Can we surface customer-impact predictions before PagerDuty fires?",
    ],
    experiments: [
      "Designing narrative timelines that sync tracing spans with inference quality metrics.",
      "Hooking latency regressions into automated postmortem drafts so humans edit instead of rewrite.",
    ],
    icon: Shield,
    accent: {
      glow: "from-sky-500/40 via-indigo-500/20 to-violet-500/20",
      border: "border-sky-500/40 hover:border-sky-300/80",
      iconWrap: "bg-sky-500/10 text-sky-100 border border-sky-400/40",
    },
  },
  {
    title: "Operator UX That Sparks Joy",
    subtitle: "Dashboards should feel cinematic and tactile",
    description:
      "Infra tooling is still allergic to taste. I'm experimenting with micro-interactions, narrative copy, and haptics on the web so ops feels more like flying a spacecraft than filing tickets.",
    questions: [
      "What tactile cues keep long-running dashboards from numbing operators?",
      "How many gradients and particles are useful before signal gets drowned?",
      "Where can delight coexist with strict accessibility + performance budgets?",
    ],
    experiments: [
      "Prototyping WebGL overlays that react to live latency histograms.",
      "Writing style guides for ops copy so incident comms stay calm and human.",
    ],
    icon: Sparkles,
    accent: {
      glow: "from-amber-500/40 via-orange-500/20 to-rose-500/20",
      border: "border-amber-500/40 hover:border-amber-300/80",
      iconWrap: "bg-amber-500/10 text-amber-100 border border-amber-400/40",
    },
  },
];

const quickSignals: QuickSignal[] = [
  {
    label: "Currently reading",
    value: "Mechanism Design for Social Good + Systems Performance (McKenney)",
    accent: "text-sky-200",
  },
  {
    label: "Next release",
    value: "GPUnity beta telemetry + a pricing oracle for volatile GPU supply",
    accent: "text-violet-200",
  },
  {
    label: "Constraint",
    value: "Ship tools ops teams love without needing a 20-person SRE crew",
    accent: "text-emerald-200",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function Thinking() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatedBackground />
      <Navigation />

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="mb-16">
            <h1 className="text-6xl md:text-7xl font-black mb-6">
              <span className="animated-gradient-text">THINKING</span>
            </h1>
            <p className="text-2xl text-gray-400 leading-relaxed">
              Threads I'm actively pulling on. Expect messy notes, fast experiments, and more questions
              than answers.
            </p>
          </div>

          <div className="space-y-10">
            {thoughtStreams.map((stream, idx) => {
              const Icon = stream.icon;
              return (
                <motion.div
                  key={stream.title}
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  custom={idx}
                  whileHover={{ y: -6 }}
                  className="relative group"
                >
                  <div
                    className={`pointer-events-none absolute -inset-[1px] rounded-[32px] opacity-0 blur-3xl transition duration-500 group-hover:opacity-100 bg-gradient-to-r ${stream.accent.glow}`}
                  />
                  <Card
                    className={`relative overflow-hidden rounded-[30px] bg-white/5 backdrop-blur-xl border ${stream.accent.border} transition-all duration-500`}
                  >
                    <CardContent className="p-8 md:p-10 space-y-6">
                      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                        <div className="space-y-3">
                          <p className="text-xs uppercase tracking-[0.4em] text-gray-500">
                            Thread {String(idx + 1).padStart(2, "0")}
                          </p>
                          <div>
                            <h2 className="text-3xl font-bold text-white">{stream.title}</h2>
                            <p className="text-lg text-gray-300">{stream.subtitle}</p>
                          </div>
                        </div>
                        <motion.div
                          className={`self-start rounded-2xl p-4 shadow-inner ${stream.accent.iconWrap}`}
                          animate={{ rotate: [0, 4, -4, 0] }}
                          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                        >
                          <Icon className="h-8 w-8" />
                        </motion.div>
                      </div>

                      <p className="text-gray-300 leading-relaxed">{stream.description}</p>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="rounded-2xl border border-white/5 bg-white/5/0 p-5">
                          <h3 className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">
                            Questions
                          </h3>
                          <ul className="space-y-3">
                            {stream.questions.map((question) => (
                              <li key={`${stream.title}-q-${question}`} className="flex gap-3 text-sm text-gray-200">
                                <span className="text-violet-200 mt-1">•</span>
                                <span>{question}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-2xl border border-white/5 bg-white/5/0 p-5">
                          <h3 className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">
                            Active experiments
                          </h3>
                          <ul className="space-y-3">
                            {stream.experiments.map((experiment) => (
                              <li
                                key={`${stream.title}-e-${experiment}`}
                                className="flex gap-3 text-sm text-gray-200"
                              >
                                <span className="text-emerald-200 mt-1">→</span>
                                <span>{experiment}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {quickSignals.map((signal, idx) => (
              <motion.div
                key={signal.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-gray-500 mb-3">{signal.label}</p>
                <p className={`text-base font-medium leading-relaxed ${signal.accent}`}>{signal.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}



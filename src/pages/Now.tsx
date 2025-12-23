import { motion } from "framer-motion";
import { BookOpen, Code, Brain, Wrench, BookMarked } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";
import { GoodreadsRail, type GoodreadsShelf } from "@/components/GoodreadsRail";

const GPUNITY_URL = "https://sustaineo-page.vercel.app/";

const withGPUnityLink = (text: string) =>
  text.split(/(GPUnity)/g).map((part, index) =>
    part === "GPUnity" ? (
      <a
        key={`gpunity-${index}-${text}`}
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

const accents = [
  {
    iconWrap: "bg-violet-600/20 text-violet-300",
    glow: "from-violet-600/40 via-fuchsia-500/20 to-transparent",
    border: "hover:border-violet-500/70",
  },
  {
    iconWrap: "bg-emerald-600/20 text-emerald-300",
    glow: "from-emerald-500/40 via-teal-500/20 to-transparent",
    border: "hover:border-emerald-500/70",
  },
  {
    iconWrap: "bg-sky-600/20 text-sky-300",
    glow: "from-sky-500/40 via-cyan-500/20 to-transparent",
    border: "hover:border-sky-500/70",
  },
  {
    iconWrap: "bg-fuchsia-600/20 text-fuchsia-300",
    glow: "from-fuchsia-500/40 via-rose-500/20 to-transparent",
    border: "hover:border-fuchsia-500/70",
  },
] as const;

const readingAccent = {
  iconWrap: "bg-amber-500/20 text-amber-200",
  glow: "from-amber-500/40 via-orange-500/20 to-transparent",
  border: "hover:border-amber-400/80",
} as const;

const SHOW_GOODREADS_SECTION = false;

const humanCompatibleCover = new URL("../../books/human_compatible.png", import.meta.url).href;
const alignmentProblemCover = new URL("../../books/alignment_problem.png", import.meta.url).href;

const nowReadingBooks = [
  {
    title: "Human Compatible",
    subtitle: "Artificial Intelligence and the Problem of Control",
    author: "Stuart Russell",
    image: humanCompatibleCover,
    summary:
      "Russell maps out why traditional reward-driven AI could drift from human objectives and lays out a blueprint for provably beneficial systems that stay deferential to human intent.",
    palette: "from-emerald-500/30 via-cyan-500/10 to-transparent",
  },
  {
    title: "The Alignment Problem",
    subtitle: "Machine Learning and Human Values",
    author: "Brian Christian",
    image: alignmentProblemCover,
    summary:
      "Christian blends history and reporting to show how data, incentives, and opaque models can encode human bias, cataloging the technical and ethical hurdles in aligning ML with society.",
    palette: "from-sky-500/30 via-violet-500/10 to-transparent",
  },
] as const;

export default function Now() {
  const sections = [
    {
      icon: Code,
      title: "Building",
      items: [
        "GPUnity: automatically recommends, provisions, and manages hardware",
        "A pricing + availability engine for multi-cloud GPU markets",
        "Agentic workflows powered by MCP for infra automation"
      ],
    },
    {
      icon: Brain,
      title: "Exploring",
      items: [
        "Unified abstractions for heterogeneous compute (CUDA, ROCm, TPU)",
        "Autonomous agents that can provision, benchmark, and migrate workloads",
        "Patterns for reducing inference cost without killing performance"
      ],
    },
    {
      icon: BookOpen,
      title: "Learning",
      items: [
        "Systems-level design for large-scale compute",
        "Runtime scheduling strategies and kernel-level bottlenecks",
        "Compiler-driven optimizations in ML workloads"
      ],
    },
    {
      icon: Wrench,
      title: "Problems I'm Thinking About",
      items: [
        "How to elastically move workloads between providers without downtime",
        "How to model GPU markets with real price volatility",
        "Why infra teams keep reinventing the same broken orchestration stack"
      ],
    },
  ];

  const shelfSections: Array<{
    shelf: GoodreadsShelf;
    title: string;
    blurb: string;
    badge: string;
    limit: number;
  }> = [
    {
      shelf: "currently-reading",
      title: "Currently Reading",
      blurb: "Books that are cracked open right now — the ones shaping this week.",
      badge: "now playing",
      limit: 8,
    },
    {
      shelf: "to-read",
      title: "On Deck",
      blurb: "Next up in the queue once I finish the current stack.",
      badge: "queue",
      limit: 10,
    },
    {
      shelf: "read",
      title: "Recently Finished",
      blurb: "The freshest completions that earned a highlight.",
      badge: "done",
      limit: 12,
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
                NOW
              </span>
            </h1>
            <p className="text-2xl text-gray-400">
              What I'm focused on right now. Updated regularly(ish).
            </p>
          </div>

          <div className="space-y-10">
            {sections.map((section, idx) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="relative group"
              >
                <div
                  className={`pointer-events-none absolute -inset-[1px] rounded-3xl opacity-0 blur-3xl transition duration-500 group-hover:opacity-100 bg-gradient-to-r ${
                    accents[idx % accents.length].glow
                  }`}
                />
                <Card
                  className={`relative overflow-hidden rounded-3xl bg-zinc-950/70 border-zinc-900 ${accents[idx % accents.length].border} transition-all duration-500 backdrop-blur-md`}
                >
                  <CardContent className="p-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start">
                      <motion.div
                        className={`p-4 rounded-2xl shadow-inner transition-colors duration-300 ${accents[idx % accents.length].iconWrap}`}
                        animate={{ rotate: [0, 2, -2, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                      >
                        <section.icon className="h-7 w-7" />
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h2 className="text-2xl font-bold text-white">
                            {section.title}
                          </h2>
                          <motion.span
                            className="text-sm uppercase tracking-[0.35em] text-zinc-500"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 3, repeat: Infinity, delay: idx * 0.3 }}
                          >
                            {String(idx + 1).padStart(2, "0")}
                          </motion.span>
                        </div>
                        <ul className="space-y-4">
                          {section.items.map((item, itemIdx) => (
                            <motion.li
                              key={itemIdx}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 + itemIdx * 0.08 }}
                              whileHover={{ x: 6, transition: { duration: 0.12 } }}
                              className="text-lg text-gray-300 flex items-start gap-3"
                            >
                              <motion.span
                                className="mt-1 text-violet-200"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, delay: itemIdx * 0.2 }}
                                whileHover={{ rotate: 90, scale: 1.1, transition: { duration: 0.1 } }}
                              >
                                →
                              </motion.span>
                              <span className="relative">
                                {withGPUnityLink(item)}
                                <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-150 group-hover:opacity-80" />
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {SHOW_GOODREADS_SECTION && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="relative group mt-16"
            >
              <div
                className={`pointer-events-none absolute -inset-[1px] rounded-3xl opacity-0 blur-3xl transition duration-500 group-hover:opacity-100 bg-gradient-to-r ${readingAccent.glow}`}
              />
              <Card
                className={`relative overflow-hidden rounded-3xl bg-zinc-950/70 border-zinc-900 ${readingAccent.border} transition-all duration-500 backdrop-blur-md`}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col gap-8 md:flex-row md:items-start">
                    <motion.div
                      className={`p-4 rounded-2xl shadow-inner transition-colors duration-300 ${readingAccent.iconWrap}`}
                      animate={{ rotate: [0, 3, -3, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <BookMarked className="h-7 w-7" />
                    </motion.div>
                    <div className="flex-1 space-y-8">
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <h2 className="text-2xl font-bold text-white">What I&apos;m Reading</h2>
                        <span className="text-sm uppercase tracking-[0.35em] text-zinc-500">
                          live shelf
                        </span>
                      </div>
                      <p className="text-lg text-gray-300">
                        Direct pulls from Goodreads so the shelves below are always up to date. Each
                        row slow-scrolls when there&rsquo;s more than one book.
                      </p>
                      <div className="space-y-10">
                        {shelfSections.map((shelfSection) => (
                          <div key={shelfSection.shelf} className="space-y-3">
                            <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                              <div>
                                <h3 className="text-xl font-semibold text-white">
                                  {shelfSection.title}
                                </h3>
                                <p className="text-sm text-gray-400">{shelfSection.blurb}</p>
                              </div>
                              <span className="text-[0.6rem] uppercase tracking-[0.35em] text-zinc-500">
                                {shelfSection.badge}
                              </span>
                            </div>
                            <GoodreadsRail shelf={shelfSection.shelf} limit={shelfSection.limit} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <section className="mt-16 space-y-6">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-amber-300" />
              <div>
                <h2 className="text-3xl font-bold">On My Nightstand</h2>
                <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">reading right now</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {nowReadingBooks.map((book, index) => (
                <motion.div
                  key={book.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div
                    className={`pointer-events-none absolute -inset-[1px] rounded-3xl opacity-0 blur-3xl transition duration-500 group-hover:opacity-100 bg-gradient-to-r ${book.palette}`}
                  />
                  <Card className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl">
                    <div className="pointer-events-none absolute -top-32 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-gradient-to-tr from-amber-500/15 via-white/0 to-transparent blur-[120px] opacity-0 transition group-hover:opacity-40" />
                    <CardContent className="relative z-10 p-6 flex flex-col gap-5 md:flex-row md:items-center">
                      <motion.div
                        className="relative shrink-0 flex justify-center"
                        whileHover={{ rotateZ: -1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="absolute -inset-2 rounded-[28px] border border-white/10 opacity-0 group-hover:opacity-100 transition"
                          animate={{ rotate: [0, 2, -2, 0] }}
                          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: index * 0.4 }}
                        />
                        <img
                          src={book.image}
                          alt={`${book.title} cover`}
                          className="relative h-48 w-32 rounded-[26px] object-cover shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
                          loading="lazy"
                        />
                        <motion.div
                          className="absolute -bottom-4 left-1/2 h-1.5 w-2/3 -translate-x-1/2 rounded-full bg-gradient-to-r from-white/30 via-white/10 to-transparent blur-xl opacity-60"
                          animate={{ scaleX: [0.9, 1.1, 0.9], opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        />
                      </motion.div>
                      <div className="space-y-3 flex-1">
                        <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">currently reading</p>
                        <div>
                          <h3 className="text-2xl font-semibold text-white">{book.title}</h3>
                          <p className="text-md text-gray-400">{book.subtitle}</p>
                        </div>
                        <p className="text-sm text-amber-200">{book.author}</p>
                        <p className="text-sm text-gray-300 leading-relaxed">{book.summary}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center text-gray-500 text-sm"
          >
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";
import { Link } from "react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent } from "react";

const TYPEWRITER_PREFIX = "I ";
const TYPEWRITER_PHRASES = [
  "love chasing problems worth solving.",
  "build things that survive under constraints.",
  "like projects that force me to think.",
  "design for the edge cases everyone forgets.",
  "keep my work honest.",
  "love learning new things.",
  "build because leaving things broken annoys me.",
  "focus on what scales, not what trends.",
  "think you're awesome!",
  "hate overcomplicating things.",
  "solve problems that people only notice once they disappear.",
  "think better when the stakes are high.",
] as const;

export default function Home() {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const shuffledOrder = useRef<number[]>([]);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const tiltXSpring = useSpring(tiltX, { stiffness: 220, damping: 18, mass: 0.45 });
  const tiltYSpring = useSpring(tiltY, { stiffness: 220, damping: 18, mass: 0.45 });

  useEffect(() => {
    shuffledOrder.current = shuffleIndices(TYPEWRITER_PHRASES.length);
  }, []);

  const currentPhrase = useMemo(() => {
    const order = shuffledOrder.current;
    if (!order.length) {
      order.push(...shuffleIndices(TYPEWRITER_PHRASES.length));
    }
    const idx = order[phraseIndex % order.length];
    return TYPEWRITER_PHRASES[idx];
  }, [phraseIndex]);

  useEffect(() => {
    if (!currentPhrase) return;

    if (!isDeleting && displayText === currentPhrase) {
      const hold = setTimeout(() => setIsDeleting(true), 1200);
      return () => clearTimeout(hold);
    }

    if (isDeleting && displayText === "") {
      const next = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => {
          const order = shuffledOrder.current;
          const nextIndex = (prev + 1) % order.length;
          if (nextIndex === 0) {
            shuffledOrder.current = shuffleIndices(TYPEWRITER_PHRASES.length);
          }
          return nextIndex;
        });
      }, 200);
      return () => clearTimeout(next);
    }

    const timeout = setTimeout(() => {
      const nextLength = displayText.length + (isDeleting ? -1 : 1);
      setDisplayText(currentPhrase.slice(0, nextLength));
    }, isDeleting ? 45 : 95);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex, currentPhrase]);

  const handleTilt = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const xPercent = x / rect.width - 0.5;
    const yPercent = y / rect.height - 0.5;

    tiltX.set(-yPercent * 40);
    tiltY.set(xPercent * 40);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

function shuffleIndices(length: number) {
  const indices = Array.from({ length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Bottom gradient to prevent white space */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
      <AnimatedBackground />
      <Navigation />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex items-center justify-center relative px-4 pt-20 pb-12"
      >
        <div className="max-w-6xl w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 max-w-2xl text-center lg:text-left"
            >
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6, ease: "easeOut" }}
                className="text-lg md:text-xl tracking-[0.35em] uppercase text-[#b29bff] mb-4"
              >
                Hey there, I'm
              </motion.p>
              <h1 className="text-8xl md:text-9xl font-black mb-8 leading-none">
                <motion.span
                  className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  ARYAN
                </motion.span>
                <motion.span
                  className="block text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  SINGHAL
                </motion.span>
              </h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="space-y-6 mb-12"
              >
                <p className="text-3xl font-bold text-gray-300">
                  AI/ML Engineer | Full Stack Developer
                </p>
                <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                  I'm 18, studying Artificial Intelligence @ Purdue University.<br />Currently building{" "}
                  <a
                    href="https://www.gpunity.dev/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-violet-300 underline decoration-dotted underline-offset-4 transition-colors hover:text-violet-100"
                  >
                    GPUnity
                  </a>
                  .
                </p>
                {/* <p className="text-lg text-violet-400 font-semibold">
                  Learn more about me
                </p> */}
                <div className="font-mono text-xl flex items-center gap-2 justify-center lg:justify-start">
                  <span className="text-purple-400/70">▹</span>
                  <span className="bg-gradient-to-r from-[#4c1d95] via-[#6d28d9] to-[#a855f7] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(122,45,197,0.4)]">
                    {TYPEWRITER_PREFIX}
                    {displayText}
                    <motion.span
                      animate={{ opacity: [0.25, 1, 0.25] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="text-[#c084fc] inline-block"
                    >
                      |
                    </motion.span>
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-wrap gap-4 pb-2 justify-center lg:justify-start"
              >
                <motion.div
                  whileHover={{
                    y: -6,
                    scale: 1.03,
                    boxShadow: "0 25px 55px rgba(58, 16, 94, 0.6)",
                  }}
                  whileTap={{ scale: 0.97, y: -2 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                  className="rounded-2xl"
                >
                  <Button
                    size="lg"
                    className="group relative overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-br from-[#11061b] via-[#1e0f2c] to-[#331149] px-8 py-6 text-lg font-semibold tracking-wide text-violet-100 shadow-[0_20px_50px_rgba(6,2,14,0.85)]"
                    asChild
                  >
                    <Link to="/now" className="relative flex items-center gap-3 overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-600 group-hover:opacity-40" />
                      <span className="absolute inset-y-0 left-0 w-1/2 translate-x-[-100%] bg-gradient-to-r from-transparent via-[#a855f7]/30 to-transparent opacity-0 transition-all duration-600 group-hover:translate-x-[180%] group-hover:opacity-70" />
                      <span className="relative z-10">What I'm Doing Now</span>
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="relative z-10 text-violet-200"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.span>
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{
                    y: -6,
                    scale: 1.03,
                    boxShadow: "0 25px 55px rgba(124, 58, 237, 0.3)",
                  }}
                  whileTap={{ scale: 0.97, y: -2 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                  className="rounded-2xl"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="group relative overflow-hidden rounded-2xl border border-violet-500/50 bg-black/30 px-8 py-6 text-lg font-semibold text-violet-100 transition-colors"
                    asChild
                  >
                    <Link to="/projects" className="relative flex items-center gap-3">
                      <span className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-fuchsia-600/10 to-violet-600/10 opacity-0 transition-all duration-500 group-hover:opacity-100" />
                      <span className="absolute inset-0 translate-y-full bg-gradient-to-t from-violet-700/30 to-transparent opacity-50 transition duration-500 group-hover:translate-y-0" />
                      <span className="relative z-10">See What I've Built</span>
                      <span className="relative z-10">
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{
                    y: -6,
                    scale: 1.03,
                    boxShadow: "0 25px 55px rgba(16, 185, 129, 0.35)",
                  }}
                  whileTap={{ scale: 0.97, y: -2 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                  className="rounded-2xl w-full flex justify-center sm:w-auto"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="group relative overflow-hidden rounded-2xl border border-emerald-500/60 px-8 py-6 text-lg font-semibold text-emerald-300 transition"
                    asChild
                  >
                    <Link to="/contact" className="relative flex items-center gap-3">
                      <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />
                      <span className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-40 group-hover:bg-emerald-500/30 transition duration-500" />
                      <span className="relative z-10">Get In Touch</span>
                      <span className="relative z-10">
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="flex-1 w-full flex justify-center lg:justify-end"
            >
              <div
                className="w-full max-w-[360px]"
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                style={{ perspective: "1200px" }}
              >
                <motion.div
                  style={{
                    rotateX: tiltXSpring,
                    rotateY: tiltYSpring,
                    transformStyle: "preserve-3d",
                    backgroundSize: "200% 200%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    backgroundPosition: {
                      duration: 12,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    type: "spring",
                    stiffness: 200,
                    damping: 16,
                  }}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-[32px] bg-gradient-to-br from-violet-500/60 via-fuchsia-400/50 to-emerald-300/40 p-[2px] shadow-[0_32px_70px_rgba(72,26,128,0.45)]"
                >
                  <div className="rounded-[30px] bg-black/80 p-2">
                    <div className="relative aspect-square overflow-hidden rounded-[26px]">
                      <img
                        src="/me_cropped.png"
                        alt="Aryan Singhal"
                        className="h-full w-full object-cover"
                        style={{ transform: "translateZ(36px)" }}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 opacity-70" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

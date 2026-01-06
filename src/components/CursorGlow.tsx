import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CursorGlow() {
  const [isPointer, setIsPointer] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const baseX = useMotionValue(0);
  const baseY = useMotionValue(0);

  const springConfig = { stiffness: 400, damping: 25, mass: 0.5 };
  const dotX = useSpring(baseX, springConfig);
  const dotY = useSpring(baseY, springConfig);

  useEffect(() => {
    const update = () => {
      setIsPointer(window.matchMedia("(pointer: fine)").matches);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!isPointer) return;

    const handleMove = (e: MouseEvent) => {
      setIsActive(true);
      baseX.set(e.clientX);
      baseY.set(e.clientY);
    };

    const handleLeave = () => setIsActive(false);
    const handleEnter = () => setIsActive(true);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [isPointer, baseX, baseY]);

  if (!isPointer || !isActive) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[101]"
      style={{
        x: dotX,
        y: dotY,
        left: 0,
        top: 0,
        translateX: "-50%",
        translateY: "-50%",
        willChange: "transform",
      }}
    >
      <span className="relative block h-16 w-16">
        {/* far halo */}
        <span className="absolute -inset-8 rounded-full bg-violet-400/70 blur-[130px] mix-blend-screen" />
        {/* wide outer glow */}
        <span className="absolute -inset-4 rounded-full bg-fuchsia-400/70 blur-[90px] mix-blend-screen" />
        {/* core bloom */}
        <span className="absolute inset-0 rounded-full bg-violet-500/90 blur-[60px] mix-blend-screen" />
        {/* tight inner glow */}
        <span className="absolute inset-2 rounded-full bg-white/70 blur-2xl mix-blend-screen" />
        {/* bright center dot */}
        <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,0.85)]" />
      </span>
    </motion.div>
  );
}

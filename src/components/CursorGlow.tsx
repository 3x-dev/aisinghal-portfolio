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
      <span className="relative block h-10 w-10">
        {/* dark outer glow */}
        <span className="absolute inset-0 rounded-full bg-violet-700/40 blur-2xl" />
        {/* medium inner glow */}
        <span className="absolute inset-1 rounded-full bg-violet-600/60 blur-lg" />
        {/* bright center dot */}
        <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-300" />
      </span>
    </motion.div>
  );
}

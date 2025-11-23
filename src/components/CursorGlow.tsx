import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CursorGlow() {
  const [isPointer, setIsPointer] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const baseX = useMotionValue(0);
  const baseY = useMotionValue(0);

  // Smoother spring configuration
  const springConfig = { stiffness: 400, damping: 28, mass: 0.5 };
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

    const handleLeave = () => {
      setIsActive(false);
    };

    const handleEnter = () => {
      setIsActive(true);
    };

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
    <>
      <motion.div
        className="pointer-events-none fixed z-[101]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      >
        <div className="h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_15px_rgba(167,139,250,0.9)]" />
      </motion.div>
    </>
  );
}


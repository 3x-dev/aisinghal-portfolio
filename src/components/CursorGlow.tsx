import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CursorGlow() {
  const [isPointer, setIsPointer] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const baseX = useMotionValue(-100);
  const baseY = useMotionValue(-100);

  const glowX = useSpring(baseX, { stiffness: 120, damping: 18, mass: 0.5 });
  const glowY = useSpring(baseY, { stiffness: 120, damping: 18, mass: 0.5 });
  const dotX = useSpring(baseX, { stiffness: 400, damping: 25, mass: 0.7 });
  const dotY = useSpring(baseY, { stiffness: 400, damping: 25, mass: 0.7 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const update = (event?: MediaQueryListEvent) => {
      const matches = event ? event.matches : mediaQuery.matches;
      setIsPointer(matches);
      setIsActive(matches);
    };

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isPointer) return;
    const handleMove = (event: PointerEvent) => {
      setIsActive(true);
      baseX.set(event.clientX);
      baseY.set(event.clientY);
    };
    const handleEnter = () => setIsActive(true);
    const handleLeave = () => {
      setIsActive(false);
      baseX.set(-100);
      baseY.set(-100);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerenter", handleEnter);
    window.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerenter", handleEnter);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, [isPointer, baseX, baseY]);

  if (!isPointer || !isActive) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[100] mix-blend-screen"
        style={{ x: glowX, y: glowY, translateX: "-50%", translateY: "-50%" }}
      >
        <div className="h-16 w-16 rounded-full border border-violet-400/30 bg-gradient-to-br from-violet-500/25 via-fuchsia-500/20 to-indigo-500/15 blur-[60px] backdrop-blur-xl" />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed z-[101]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      >
        <div className="h-3 w-3 rounded-full border border-white/40 bg-gradient-to-br from-fuchsia-200 to-violet-300 shadow-[0_0_25px_rgba(168,85,247,0.85)]" />
      </motion.div>
    </>
  );
}
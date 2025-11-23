import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CursorGlow() {
  const [isPointer, setIsPointer] = useState(false);
  const baseX = useMotionValue(-100);
  const baseY = useMotionValue(-100);

  const glowX = useSpring(baseX, { stiffness: 120, damping: 18, mass: 0.5 });
  const glowY = useSpring(baseY, { stiffness: 120, damping: 18, mass: 0.5 });
  const dotX = useSpring(baseX, { stiffness: 400, damping: 25, mass: 0.7 });
  const dotY = useSpring(baseY, { stiffness: 400, damping: 25, mass: 0.7 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const update = (event?: MediaQueryListEvent) => {
      setIsPointer(event ? event.matches : mediaQuery.matches);
    };

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isPointer) return;
    const handleMove = (event: PointerEvent) => {
      baseX.set(event.clientX);
      baseY.set(event.clientY);
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [isPointer, baseX, baseY]);

  if (!isPointer) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[100] mix-blend-screen"
        style={{ x: glowX, y: glowY, translateX: "-50%", translateY: "-50%" }}
      >
        <div className="h-14 w-14 rounded-full border border-violet-400/40 bg-violet-500/15 blur-xl backdrop-blur-md" />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed z-[101]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      >
        <div className="h-3 w-3 rounded-full bg-white shadow-[0_0_25px_rgba(168,85,247,0.75)]" />
      </motion.div>
    </>
  );
}

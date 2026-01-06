import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { useReducedEffects } from "@/hooks/use-reduced-effects";

type PageTransitionProps = {
  children: ReactNode;
};

const pageEase = [0.33, 1, 0.68, 1] as const;

export function PageTransition({ children }: PageTransitionProps) {
  const prefersReducedMotion = useReducedMotion();
  const { shouldReduceEffects } = useReducedEffects();

  if (prefersReducedMotion || shouldReduceEffects) {
    return <>{children}</>;
  }

  const motionProps = {
    initial: { opacity: 0, y: 16, scale: 0.985 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -16, scale: 0.99 },
    transition: { duration: 0.35, ease: pageEase },
  };

  return (
    <motion.div
      className="relative will-change-transform will-change-opacity"
      style={{ isolation: "isolate" }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

export function RouteTransitionOverlay() {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const { shouldReduceEffects } = useReducedEffects();
  const [isActive, setIsActive] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const isInitialRender = useRef(true);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || shouldReduceEffects || !hasMounted) {
      return;
    }

    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    setAnimationKey((prev) => prev + 1);
    setIsActive(true);

    const timeout = setTimeout(() => setIsActive(false), 700);
    return () => clearTimeout(timeout);
  }, [location.pathname, prefersReducedMotion, hasMounted]);

  if (prefersReducedMotion || shouldReduceEffects) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={animationKey}
          className="pointer-events-none fixed inset-0 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: pageEase }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#130116] via-[#2b0a3c] to-[#16031f]"
            initial={{ scaleY: 0.65, opacity: 0.6, originY: 0 }}
            animate={{ scaleY: 1, opacity: 0.85 }}
            exit={{ scaleY: 0.3, opacity: 0 }}
            transition={{ duration: 0.4, ease: pageEase }}
          />
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.5, ease: pageEase }}
            style={{
              backgroundImage:
                "radial-gradient(circle at 28% 22%, rgba(193, 143, 255, 0.5), transparent 50%), radial-gradient(circle at 72% 78%, rgba(109, 40, 217, 0.4), transparent 45%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

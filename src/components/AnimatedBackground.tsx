import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect } from "react";

const FLOATING_ORBS = [
  {
    size: 560,
    color: "rgba(147,51,234,0.45)",
    position: { left: "5%", top: "10%" },
    animate: { x: [0, 80, -60, 0], y: [0, -70, 40, 0], scale: [1, 1.25, 1] },
    duration: 18,
    delay: 0,
  },
  {
    size: 460,
    color: "rgba(236,72,153,0.42)",
    position: { right: "8%", top: "15%" },
    animate: { x: [0, -60, 40, 0], y: [0, 60, -40, 0], scale: [1, 1.3, 1] },
    duration: 16,
    delay: 2,
  },
  {
    size: 520,
    color: "rgba(217,70,239,0.35)",
    position: { left: "18%", bottom: "10%" },
    animate: { x: [0, 90, -30, 0], y: [0, -40, 60, 0], scale: [1, 1.2, 1] },
    duration: 20,
    delay: 1,
  },
  {
    size: 420,
    color: "rgba(168,85,247,0.35)",
    position: { right: "20%", bottom: "12%" },
    animate: { x: [0, -80, 20, 0], y: [0, -20, 40, 0], scale: [1, 1.35, 1] },
    duration: 22,
    delay: 3,
  },
];

const PARTICLE_CONFIGS = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  size: 2 + (i % 3),
  left: `${(i * 13 + 7) % 100}%`,
  top: `${(i * 9 + 15) % 100}%`,
  delay: i * 0.35,
}));

export function AnimatedBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Create motion templates for complex style strings
  const orb1Left = useMotionTemplate`${mouseX}px`;
  const orb1Top = useMotionTemplate`${mouseY}px`;
  
  // We need to offset the position for the center of the orb (300px radius)
  // Since we can't easily do math in the template string with the motion value directly for the calc,
  // we'll use a transform to center it, or just accept the slight offset/lag which is fine for background.
  // Better approach: use a transform translate to center it.
  
  const maskImage = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, rgba(0,0,0,1) 0%, transparent 70%)`;
  const spotlightBackground = useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.16), transparent 55%)`;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <motion.div
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-0 blur-3xl opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)",
          left: orb1Left,
          top: orb1Top,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {FLOATING_ORBS.map((orb, index) => (
        <motion.div
          key={index}
          className="fixed rounded-full pointer-events-none z-0 blur-3xl opacity-30"
          style={{
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            ...orb.position,
          }}
          animate={orb.animate}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}

      {/* Aurora sweep */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0 mix-blend-screen opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(125deg, rgba(167,139,250,0.25), rgba(236,72,153,0.15), rgba(167,139,250,0.25))",
          backgroundSize: "300% 300%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      {PARTICLE_CONFIGS.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed w-2 h-2 rounded-full pointer-events-none z-0"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: "rgba(236,72,153,0.6)",
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -80, 40, 0],
            opacity: [0.1, 0.8, 0.1],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 6 + (particle.id % 5),
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Rotating gradient beam */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0 opacity-35 blur-[140px]"
        style={{
          background:
            "conic-gradient(from 90deg at 50% 50%, rgba(147,51,234,0.25), rgba(236,72,153,0.25), rgba(147,51,234,0.25))",
        }}
        animate={{
          rotate: [0, 15, -10, 0],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cursor-reveal texture layer */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0 opacity-30 mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.08) 2px, transparent 2px)",
          backgroundSize: "140px 140px",
          maskImage: maskImage,
          WebkitMaskImage: maskImage,
        }}
      />

      {/* Luminescent spotlight following the cursor */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: spotlightBackground,
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid pattern overlay with subtle animation */}
      <motion.div 
        className="fixed inset-0 bg-grid-pattern pointer-events-none z-0"
        animate={{
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
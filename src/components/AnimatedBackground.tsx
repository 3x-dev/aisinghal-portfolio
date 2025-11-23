import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Animated gradient orbs */}
      <motion.div
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-0 blur-3xl opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)",
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
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
      
      <motion.div
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0 blur-3xl opacity-20"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)",
          right: "10%",
          top: "20%",
        }}
      />

      <motion.div
        className="fixed w-[400px] h-[400px] rounded-full pointer-events-none z-0 blur-3xl opacity-25"
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
          left: "15%",
          bottom: "15%",
        }}
      />

      {/* Additional floating orbs for more movement */}
      <motion.div
        className="fixed w-[300px] h-[300px] rounded-full pointer-events-none z-0 blur-3xl opacity-15"
        animate={{
          x: [0, 120, 0],
          y: [0, -120, 0],
          scale: [1, 1.5, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)",
          left: "40%",
          top: "60%",
        }}
      />

      <motion.div
        className="fixed w-[350px] h-[350px] rounded-full pointer-events-none z-0 blur-3xl opacity-20"
        animate={{
          x: [0, -90, 0],
          y: [0, 90, 0],
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, rgba(217,70,239,0.3) 0%, transparent 70%)",
          right: "30%",
          bottom: "30%",
        }}
      />

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-2 h-2 rounded-full pointer-events-none z-0"
          style={{
            background: "rgba(139,92,246,0.6)",
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Cursor-reveal texture layer */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-30 mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.08) 2px, transparent 2px)",
          backgroundSize: "140px 140px",
          maskImage: `radial-gradient(420px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,1) 0%, transparent 70%)`,
          WebkitMaskImage: `radial-gradient(420px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,1) 0%, transparent 70%)`,
        }}
      />

      {/* Luminescent spotlight following the cursor */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.16), transparent 55%)`,
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
    </>
  );
}
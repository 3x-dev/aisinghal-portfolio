import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";
import { Link } from "react-router";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatedBackground />
      <Navigation />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex items-center justify-center relative px-4 pt-20"
      >
        <div className="max-w-4xl w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <span className="text-emerald-400 font-mono text-lg">$ whoami</span>
            </motion.div>

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
                Purdue CS. Builder. Infrastructure engineer.
              </p>
              <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                I build systems that scale. Currently working on Sustaineo and exploring 
                agentic architectures, GPU scheduling, and decentralized inference.
              </p>
              <p className="text-lg text-violet-400 font-semibold">
                Freshman who ships like a senior.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="bg-violet-600 hover:bg-violet-700 text-white font-bold group"
                asChild
              >
                <Link to="/projects">
                  See What I Build
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-violet-600 text-violet-400 hover:bg-violet-600/10"
                asChild
              >
                <Link to="/now">What I'm Doing Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-600 text-emerald-400 hover:bg-emerald-600/10"
                asChild
              >
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
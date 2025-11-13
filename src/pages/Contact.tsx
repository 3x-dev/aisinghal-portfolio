import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatedBackground />
      <Navigation />

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="mb-16 text-center">
            <h1 className="text-6xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                CONTACT
              </span>
            </h1>
            <p className="text-2xl text-gray-400">
              Let's build something together.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
              <CardContent className="p-12">
                <div className="space-y-8">
                  <div className="text-center">
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                      Got an idea? A problem to solve? Or just want to talk tech?
                      <br />
                      Drop me a line.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <Button
                      size="lg"
                      className="bg-violet-600 hover:bg-violet-700 text-white font-bold text-lg py-6"
                      asChild
                    >
                      <a href="https://mail.google.com/mail/?view=cm&fs=1&to=aryan.singhal2016@gmail.com" target="_blank" rel="noopener noreferrer">
                        <Mail className="mr-2 h-5 w-5" />
                        aryan.singhal2016@gmail.com
                      </a>
                    </Button>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-zinc-700" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-zinc-900 px-2 text-gray-500">
                          Or find me on
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="border-violet-600/50 bg-violet-600/10 text-violet-300 hover:bg-violet-600/30 hover:border-violet-400 hover:text-violet-200 py-6 transition-all"
                        asChild
                      >
                        <a href="https://github.com/aryansinghal" target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-5 w-5" />
                          GitHub
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="border-blue-600/50 bg-blue-600/10 text-blue-300 hover:bg-blue-600/30 hover:border-blue-400 hover:text-blue-200 py-6 transition-all"
                        asChild
                      >
                        <a href="https://linkedin.com/in/aryansinghal" target="_blank" rel="noopener noreferrer">
                          <Linkedin className="mr-2 h-5 w-5" />
                          LinkedIn
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="border-cyan-600/50 bg-cyan-600/10 text-cyan-300 hover:bg-cyan-600/30 hover:border-cyan-400 hover:text-cyan-200 py-6 transition-all"
                        asChild
                      >
                        <a href="https://twitter.com/aryansinghal" target="_blank" rel="noopener noreferrer">
                          <Twitter className="mr-2 h-5 w-5" />
                          Twitter
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="border-emerald-600/50 bg-emerald-600/10 text-emerald-300 hover:bg-emerald-600/30 hover:border-emerald-400 hover:text-emerald-200 py-6 transition-all"
                        asChild
                      >
                        <a href="https://scholar.google.com/citations?user=YOURUSERID" target="_blank" rel="noopener noreferrer">
                          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z"/>
                          </svg>
                          Google Scholar
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="text-center pt-8 border-t border-zinc-800">
                    <p className="text-gray-500 text-sm">
                      Response time: Usually within 24-48 hours
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
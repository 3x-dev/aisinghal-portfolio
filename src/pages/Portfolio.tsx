import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, Terminal, Zap, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const projects = [
    {
      title: "Project Alpha",
      description: "Built this because I was tired of existing solutions being garbage. Full-stack app with real-time sync that actually works.",
      tech: ["React", "Node.js", "MongoDB", "WebSocket"],
      github: "https://github.com/aryansinghal",
      impact: "Used by 500+ people daily"
    },
    {
      title: "ML Classifier",
      description: "Trained a model that beats industry benchmarks. 94% accuracy isn't luck—it's obsessive optimization.",
      tech: ["Python", "TensorFlow", "NumPy"],
      github: "https://github.com/aryansinghal",
      impact: "94% accuracy on test data"
    },
    {
      title: "Campus Connect",
      description: "Hackathon project that solved a real problem. Students needed better ways to collaborate. I built it.",
      tech: ["React Native", "Firebase", "TypeScript"],
      impact: "Built in 36 hours"
    }
  ];

  const skills = {
    "Languages": ["Python", "Java", "JavaScript", "TypeScript", "C++", "SQL"],
    "Frontend": ["React", "React Native", "Tailwind", "Framer Motion"],
    "Backend": ["Node.js", "Express", "MongoDB", "Firebase"],
    "Tools": ["Git", "Docker", "AWS", "Linux"]
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Cursor follower */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Hero Section */}
      <motion.section
        style={{ opacity }}
        className="min-h-screen flex items-center justify-center relative px-4"
      >
        <div className="max-w-5xl w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="text-emerald-400 font-mono text-sm">$ whoami</span>
            </motion.div>

            <h1 className="text-7xl md:text-9xl font-black mb-6 leading-none">
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
                ARYAN
              </span>
              <br />
              <span className="text-white">SINGHAL</span>
            </h1>

            <div className="space-y-4 mb-12 max-w-2xl">
              <p className="text-2xl md:text-3xl font-bold text-gray-300">
                CS @ Purdue. Builder. Problem solver.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                I don't wait for opportunities—I create them. Freshman who codes like a senior. 
                I build things that matter, break things that don't, and learn everything in between.
              </p>
              <p className="text-lg text-violet-400 font-semibold">
                Currently obsessed with: ML, full-stack dev, and making software that doesn't suck.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-violet-600 hover:bg-violet-700 text-white font-bold"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Zap className="mr-2 h-5 w-5" />
                See What I've Built
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-violet-600 text-violet-400 hover:bg-violet-600/10"
                asChild
              >
                <a href="mailto:aryan.singhal2016@gmail.com">
                  <Mail className="mr-2 h-5 w-5" />
                  Let's Talk
                </a>
              </Button>
            </div>

            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-violet-400" asChild>
                <a href="https://github.com/aryansinghal" target="_blank" rel="noopener noreferrer">
                  <Github className="h-6 w-6" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-violet-400" asChild>
                <a href="https://linkedin.com/in/aryansinghal" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-6 w-6" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-violet-400 text-2xl"
        >
          ↓
        </motion.div>
      </motion.section>

      {/* Skills Grid */}
      <section className="py-32 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black mb-4 flex items-center gap-4">
              <Terminal className="text-violet-400" />
              <span>TECH STACK</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12">Tools I use to build the future</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(skills).map(([category, items], idx) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-zinc-900 border-zinc-800 hover:border-violet-600 transition-all duration-300">
                    <CardContent className="pt-6">
                      <h3 className="text-violet-400 font-bold text-lg mb-4">{category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill) => (
                          <Badge 
                            key={skill} 
                            variant="secondary" 
                            className="bg-zinc-800 text-gray-300 hover:bg-violet-600 hover:text-white transition-colors"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black mb-4 flex items-center gap-4">
              <Coffee className="text-violet-400" />
              <span>PROJECTS</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12">Stuff I've built that actually works</p>

            <div className="space-y-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                  className="group"
                >
                  <Card className="bg-zinc-900 border-zinc-800 hover:border-violet-600 transition-all duration-300 overflow-hidden">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-gray-400 text-lg leading-relaxed mb-4">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.map((tech) => (
                              <Badge 
                                key={tech} 
                                className="bg-violet-600/20 text-violet-300 border-violet-600/50"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-emerald-400 font-semibold">
                            → {project.impact}
                          </p>
                        </div>
                        {project.github && (
                          <Button 
                            variant="outline" 
                            className="border-violet-600 text-violet-400 hover:bg-violet-600 hover:text-white"
                            asChild
                          >
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-2 h-4 w-4" />
                              View Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-32 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black mb-12">EXPERIENCE</h2>

            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border-l-4 border-violet-600 pl-8"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                  <h3 className="text-2xl font-bold text-white">Software Engineering Intern</h3>
                  <Badge className="bg-violet-600 text-white w-fit">Summer 2024</Badge>
                </div>
                <p className="text-violet-400 text-lg mb-3">Tech Company</p>
                <p className="text-gray-400 text-lg">
                  Shipped features that users actually wanted. Collaborated with teams who knew their stuff. 
                  Learned more in 3 months than most learn in a year.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border-l-4 border-emerald-600 pl-8"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                  <h3 className="text-2xl font-bold text-white">CS Teaching Assistant</h3>
                  <Badge className="bg-emerald-600 text-white w-fit">Fall 2024 - Present</Badge>
                </div>
                <p className="text-emerald-400 text-lg mb-3">Purdue University</p>
                <p className="text-gray-400 text-lg">
                  Helping students debug their code and their thinking. Teaching isn't just explaining—it's 
                  understanding how people learn and adapting.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 relative">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              LET'S BUILD SOMETHING
            </h2>
            <p className="text-2xl text-gray-400 mb-12">
              Got an idea? A problem to solve? Or just want to chat?
            </p>
            <Button 
              size="lg" 
              className="bg-violet-600 hover:bg-violet-700 text-white font-bold text-lg px-8 py-6"
              asChild
            >
              <a href="mailto:aryan.singhal2016@gmail.com">
                <Mail className="mr-2 h-6 w-6" />
                aryan.singhal2016@gmail.com
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-zinc-800">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500">
              © 2024 Aryan Singhal. Built with React, Convex, and caffeine.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/aryansinghal" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-violet-400 transition-colors">
                GitHub
              </a>
              <a href="https://linkedin.com/in/aryansinghal" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-violet-400 transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
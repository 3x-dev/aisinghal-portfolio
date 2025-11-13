import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Code2, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Portfolio() {
  const projects = [
    {
      title: "Project Alpha",
      description: "A full-stack web application built with React and Node.js, featuring real-time data synchronization and user authentication.",
      tech: ["React", "Node.js", "MongoDB", "WebSocket"],
      github: "https://github.com/aryansinghal",
      live: null,
      private: false
    },
    {
      title: "ML Classifier",
      description: "Machine learning model for image classification using TensorFlow and Python, achieving 94% accuracy on test data.",
      tech: ["Python", "TensorFlow", "NumPy", "Scikit-learn"],
      github: "https://github.com/aryansinghal",
      live: null,
      private: false
    },
    {
      title: "Campus Connect",
      description: "Mobile app connecting Purdue students for study groups and collaboration, built during a hackathon.",
      tech: ["React Native", "Firebase", "TypeScript"],
      github: null,
      live: null,
      private: true
    }
  ];

  const experiences = [
    {
      title: "Software Engineering Intern",
      company: "Tech Company",
      period: "Summer 2024",
      description: "Developed features for web applications, collaborated with cross-functional teams."
    },
    {
      title: "CS Teaching Assistant",
      company: "Purdue University",
      period: "Fall 2024 - Present",
      description: "Assisting students with programming concepts and debugging code."
    }
  ];

  const skills = [
    "Python", "Java", "JavaScript", "TypeScript", "React", "Node.js",
    "C++", "SQL", "Git", "AWS", "Docker", "Machine Learning"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="mb-8"
            >
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center text-6xl font-bold text-primary-foreground">
                AS
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Aryan Singhal
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Computer Science @ Purdue University
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-4 mb-12"
            >
              <Button variant="outline" size="icon" asChild>
                <a href="https://github.com/aryansinghal" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://linkedin.com/in/aryansinghal" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="mailto:aryan.singhal2016@gmail.com">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button size="lg" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                View My Work
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-muted-foreground"
          >
            ↓
          </motion.div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8 text-center">
              <GraduationCap className="inline-block mr-2 mb-2" />
              About Me
            </h2>
            <Card className="border-2">
              <CardContent className="pt-6">
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  I'm a freshman at Purdue University studying Computer Science, passionate about building 
                  innovative software solutions and exploring the intersection of technology and real-world problems.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Currently diving deep into full-stack development, machine learning, and competitive programming. 
                  Always eager to learn new technologies and collaborate on exciting projects.
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Badge variant="secondary" className="text-sm">
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-12 text-center">
              <Code2 className="inline-block mr-2 mb-2" />
              Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-2 hover:border-primary transition-colors cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between">
                        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                          {project.title}
                        </span>
                      </CardTitle>
                      <CardDescription className="text-base">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {project.github && !project.private && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-2" />
                              Code
                            </a>
                          </Button>
                        )}
                        {project.live && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={project.live} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Live
                            </a>
                          </Button>
                        )}
                        {project.private && (
                          <Badge variant="secondary" className="text-xs">
                            Private Repository
                          </Badge>
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
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-12 text-center">
              <Briefcase className="inline-block mr-2 mb-2" />
              Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-2">
                    <CardHeader>
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <CardTitle>{exp.title}</CardTitle>
                          <CardDescription className="text-base mt-1">
                            {exp.company}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">{exp.period}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{exp.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground mb-4">
              Let's build something amazing together
            </p>
            <Button asChild>
              <a href="mailto:aryan.singhal2016@gmail.com">
                Get In Touch
              </a>
            </Button>
            <p className="text-sm text-muted-foreground mt-8">
              © 2024 Aryan Singhal. Built with React & Convex.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

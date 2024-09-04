"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Menu,
  X,
  Moon,
  Sun,
  ExternalLink,
  Code,
  Database,
  Server,
  Send,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const [aiMessage, setAiMessage] = useState<string>("");
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Email sent:", result);
        toast({
          title: "Success",
          description: "Message sent successfully!",
        });
        reset();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Error sending message. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const projects = [
    {
      title: "Project 1",
      description:
        "A sophisticated web application leveraging cutting-edge technologies to solve complex business problems.",
      tags: ["React", "Node.js", "MongoDB"],
      github: "https://github.com/username/project1",
      live: "https://project1.example.com",
      image: "/placeholder.svg?height=200&width=400&text=Project+1",
    },
    {
      title: "Project 2",
      description:
        "An innovative mobile app that revolutionizes the way users interact with their daily tasks and routines.",
      tags: ["React Native", "Firebase", "Redux"],
      github: "https://github.com/username/project2",
      live: "https://project2.example.com",
      image: "/placeholder.svg?height=200&width=400&text=Project+2",
    },
    {
      title: "Project 3",
      description:
        "A robust backend system that handles millions of requests, ensuring scalability and high performance.",
      tags: ["Python", "Django", "PostgreSQL"],
      github: "https://github.com/username/project3",
      live: "https://project3.example.com",
      image: "/placeholder.svg?height=200&width=400&text=Project+3",
    },
  ];

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <div className="fixed inset-0 bg-gradient-to-br from-teal-100 via-blue-100 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          {!isDarkMode && (
            <div className="bubbles-container">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="bubble"
                  style={
                    {
                      "--size": `${2 + Math.random() * 4}rem`,
                      "--distance": `${6 + Math.random() * 4}rem`,
                      "--position": `${-5 + Math.random() * 110}%`,
                      "--time": `${2 + Math.random() * 2}s`,
                      "--delay": `${-1 * (2 + Math.random() * 2)}s`,
                    } as React.CSSProperties
                  }
                ></div>
              ))}
            </div>
          )}

          {isDarkMode && (
            <div className="stars-container">
              {[...Array(100)].map((_, i) => (
                <div
                  key={i}
                  className="star"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                ></div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="relative">
        <header className="sticky top-0 z-40 w-full border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
          <div className="container flex h-14 items-center justify-between px-10 ">
            <Link className="flex items-center space-x-2" href="/">
              <Image
                src="/logo.jpg"
                alt="Amit Mishra - Full Stack Developer"
                width={50}
                height={50}
                className="rounded-full border-4 border-teal-500 shadow-lg"
              />
              <span className="font-bold text-teal-600 dark:text-teal-400">
                Amit Mishra
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-bold ">
              <Link
                href="#about"
                className="text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 "
              >
                About
              </Link>
              <Link
                href="#projects"
                className="text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
              >
                Projects
              </Link>
              <Link
                href="#contact"
                className="text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
              >
                Contact
              </Link>
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600" />
                )}
              </Button>
            </nav>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {/* {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : ( */}
              <Menu className="h-5 w-5" />
              {/* )} */}
            </Button>
          </div>
        </header>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm   bg-gradient-to-br from-teal-100 via-blue-100 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 shadow-lg md:hidden"
            >
              <Button
                variant="ghost"
                size="icon"
                className="flex mb-2 border bottom-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <X className="h-6 w-6 " />
              </Button>
              <nav className="flex flex-col space-y-6 border-t-2  border-teal-500 items-center text-center font-semibold text-base">
                <Link
                  href="#about"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 mt-2 "
                >
                  About
                </Link>
                <Link
                  href="#projects"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
                >
                  Projects
                </Link>
                <Link
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
                >
                  Contact
                </Link>
                <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                  {isDarkMode ? (
                    <Sun className="h-5 w-5 text-yellow-400 " />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-600" />
                  )}
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="container mx-auto px-4 py-8">
          <section
            id="intro"
            className="py-20 md:py-40 flex flex-col md:flex-row items-center justify-between"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left md:w-1/2"
            >
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-teal-600 dark:text-teal-400">
                Amit Mishra
              </h1>
              <p className="mt-4 max-w-[700px] text-gray-600 dark:text-gray-300 md:text-xl">
                Full-stack developer passionate about creating elegant solutions
                to complex problems.
              </p>
              <div className="mt-8">
                <Button
                  asChild
                  className="bg-teal-600 hover:bg-teal-700 text-white dark:bg-teal-500 dark:hover:bg-teal-600"
                >
                  <Link href="#contact">Get in touch</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 md:mt-0 md:w-1/2 flex justify-center"
            >
              <Image
                src="/logo.jpg"
                alt="Amit Mishra - Full Stack Developer"
                width={400}
                height={400}
                className="rounded-full border-4 border-teal-500 shadow-lg"
              />
            </motion.div>
          </section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            id="about"
            className="py-20"
          >
            <h2 className="mb-8 text-3xl font-bold text-center text-teal-600 dark:text-teal-400">
              About Me
            </h2>
            <div className="grid gap-9 md:grid-cols-2">
              <div className="space-y-4 text-gray-900  dark:text-gray-300 ">
                <p>
                  I&apos;m a full-stack developer with 1.5 years of experience
                  in building web applications. I specialize in JavaScript,
                  React, Node.js, and have a strong foundation in database
                  design and API development.
                </p>
                <p>
                  When I&apos;m not coding, you can find me hiking, reading
                  sci-fi novels, or experimenting with new recipes in the
                  kitchen.
                </p>
                <div className="flex justify-around mt-8">
                  <div className="flex flex-col items-center self-center">
                    <Code
                      size={48}
                      className="text-teal-600 dark:text-teal-400"
                    />
                    <span className="mt-2 text-sm font-medium">Frontend</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Server
                      size={48}
                      className="text-teal-600 dark:text-teal-400"
                    />
                    <span className="mt-2 text-sm font-medium">Backend</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Database
                      size={48}
                      className="text-teal-600 dark:text-teal-400"
                    />
                    <span className="mt-2 text-sm font-medium">Database</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-4 text-xl font-semibold text-teal-600 dark:text-teal-400 ms-5">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2 ms-5">
                  {[
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "React",
                    "Node.js",
                    "TypeScript",
                    "Postgresql",
                    "MongoDB",
                    "Git",
                    "AWS",
                  ].map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            id="projects"
            className="py-20"
          >
            <h2 className="mb-8 text-3xl font-bold text-center text-teal-600 dark:text-teal-400">
              Projects
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <Card key={index} className="overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={200}
                    className="object-cover w-full h-48"
                  />
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between">
                      <Button asChild variant="outline" size="sm">
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          GitHub
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            id="contact"
            className="py-20"
          >
            <h2 className="mb-8 text-3xl font-bold text-center text-teal-600 dark:text-teal-400">
              Contact Me
            </h2>
            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Input
                    {...register("name")}
                    placeholder="Your name"
                    className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="your@email.com"
                    className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    {...register("subject")}
                    type="text"
                    placeholder="Subject"
                    className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                  />
                  {errors.subject && (
                    <p className="text-red-500">{errors.subject.message}</p>
                  )}
                </div>
                <div>
                  <Textarea
                    {...register("message")}
                    placeholder="Your message"
                    className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                    rows={4}
                  />
                  {errors.message && (
                    <p className="text-red-500">{errors.message.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white dark:bg-teal-500 dark:hover:bg-teal-600"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </motion.section>
        </main>

        <footer className="border-t border-gray-200 dark:border-gray-700 py-6 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-10">
            <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
              <p className="text-center text-sm leading-loose text-gray-600 dark:text-gray-300 md:text-left">
                © 2023 Jane Doe. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="#"
                className="text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
        </footer>

        {/* AI Assistant */}
        <div className="fixed bottom-4 right-4 z-50">
          {isAiOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-sm"
            >
              <h3 className="text-lg font-semibold mb-2 text-teal-600 dark:text-teal-400">
                AI Assistant
              </h3>
              <div className="h-40 overflow-y-auto mb-2 text-gray-600 dark:text-gray-300">
                {aiMessage || "Hello! How can I assist you today?"}
              </div>
              <div className="flex">
                <Input
                  placeholder="Ask me anything..."
                  className="flex-grow mr-2"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      setAiMessage(
                        "I'm processing your request. Please wait a moment..."
                      );
                      // Simulate AI response after 2 seconds
                      setTimeout(() => {
                        setAiMessage(
                          "Here's a simulated response to your query. In a real application, this would be generated by an AI model."
                        );
                      }, 2000);
                    }
                  }}
                />
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 w-full text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
                onClick={() => setIsAiOpen(false)}
              >
                Close
              </Button>
            </motion.div>
          ) : (
            <Button
              className="bg-teal-600 hover:bg-teal-700 text-white"
              onClick={() => setIsAiOpen(true)}
            >
              Open AI Assistant
            </Button>
          )}
        </div>
      </div>
      <style jsx global>{`
        .stars-container {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .star {
          position: absolute;
          background-color: #fff;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          opacity: 0;
          animation: twinkle 5s infinite;
        }
        @keyframes twinkle {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        .bubbles-container {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .bubble {
          position: absolute;
          left: var(--position, 50%);
          bottom: -75%;
          display: block;
          width: var(--size, 20px);
          height: var(--size, 20px);
          border-radius: 50%;
          animation: float var(--time, 4s) var(--delay, 0s) ease-in infinite;
        }
        .bubble::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(136, 246, 251, 0.3);
          border-radius: inherit;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes float {
          0% {
            bottom: -75%;
            opacity: 1;
          }
          100% {
            bottom: 120%;
            opacity: 0;
          }
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

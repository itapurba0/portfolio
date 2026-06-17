"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExternalLink, GitFork } from "lucide-react";

type Category = "Frontend" | "Full-Stack" | "Tools";

interface Project {
  title: string;
  description: string;
  tags: string[];
  category: Category;
  gradient: string;
  span?: "wide" | "tall";
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack shopping experience with React, Node.js, Stripe",
    tags: ["React", "Node.js", "Stripe", "PostgreSQL"],
    category: "Full-Stack",
    gradient: "linear-gradient(135deg, #00ff87, #60efff)",
    span: "wide",
  },
  {
    title: "AI Chat App",
    description: "Real-time AI-powered chat with Next.js, OpenAI, WebSockets",
    tags: ["Next.js", "OpenAI", "WebSockets", "Redis"],
    category: "Full-Stack",
    gradient: "linear-gradient(135deg, #6e45e2, #88d3ce)",
    span: "tall",
  },
  {
    title: "Task Manager",
    description: "Kanban-style productivity tool with drag-and-drop",
    tags: ["React", "DnD", "Zustand", "Supabase"],
    category: "Tools",
    gradient: "linear-gradient(135deg, #f093fb, #f5576c)",
  },
  {
    title: "Portfolio Website",
    description: "This very site! Built with Next.js, Three.js, GSAP",
    tags: ["Next.js", "Three.js", "GSAP", "Framer"],
    category: "Frontend",
    gradient: "linear-gradient(135deg, #4facfe, #00f2fe)",
    span: "wide",
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather with beautiful data visualization",
    tags: ["React", "D3.js", "OpenWeather", "Chart.js"],
    category: "Frontend",
    gradient: "linear-gradient(135deg, #43e97b, #38f9d7)",
  },
  {
    title: "Dev Blog",
    description: "A developer blog platform with MDX support",
    tags: ["Next.js", "MDX", "Tailwind", "Vercel"],
    category: "Full-Stack",
    gradient: "linear-gradient(135deg, #fa709a, #fee140)",
    span: "tall",
  },
];

const categories: ("All" | Category)[] = ["All", "Frontend", "Full-Stack", "Tools"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] as const },
  },
};

const filterVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const filterItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={cardVariants}
      layout
      className={cn(
        "group relative glass rounded-2xl overflow-hidden transition-all duration-500",
        "hover:glass-hover hover:glow-green",
        "flex flex-col",
        project.span === "wide" && "sm:col-span-2 lg:col-span-2",
        project.span === "tall" && "sm:row-span-2 lg:row-span-2",
      )}
    >
      <div
        className="relative h-48 sm:h-56 overflow-hidden transition-transform duration-700 ease-out group-hover:scale-105 shrink-0"
        style={{ background: project.gradient }}
      >
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:glow-text transition-all duration-500">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium glass rounded-full text-primary/80"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5 flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-primary text-background transition-all duration-300 hover:glow-green hover:brightness-110 cursor-default">
            <ExternalLink size={14} />
            Live Demo
          </span>
          <span className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl glass text-muted hover:text-foreground hover:glass-hover transition-all duration-300 cursor-default">
            <GitFork size={14} />
            GitHub
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((p) => p.category === activeFilter),
    [activeFilter],
  );

  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Showcasing some of my best work — from full-stack applications to frontend experiments."
        >
          Featured Projects
        </SectionHeading>

        <motion.div
          variants={filterVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              variants={filterItemVariants}
              onClick={() => setActiveFilter(cat)}
              className={cn(
                "px-5 py-2 text-sm font-medium rounded-full transition-all duration-300",
                activeFilter === cat
                  ? "bg-primary text-background glow-green"
                  : "glass text-muted hover:text-foreground hover:glass-hover",
              )}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto"
          >
            {filtered.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

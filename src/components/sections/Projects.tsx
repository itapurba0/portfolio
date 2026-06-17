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
    title: "HireOps — Agentic AI Hiring & Talent Evaluation SaaS",
    description:
      "Multi-tenant SaaS platform with role-based workspaces, JWT auth, and isolated tenant data. Real-time AI voice interviewing agent using WebRTC and OpenRouter LLM that dynamically generates questions from parsed resume data.",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "LiveKit", "OpenRouter"],
    category: "Full-Stack",
    gradient:
      "linear-gradient(135deg, oklch(0.7 0.25 145), oklch(0.4 0.2 160))",
    span: "wide",
  },
  {
    title: "WebChatt — Real-Time Chat Application",
    description:
      "Full-stack MERN chat app with persistent bi-directional messaging via Socket.io, concurrent rooms with real-time broadcast. JWT auth, Zustand state keeping re-renders under 16ms.",
    tags: ["MongoDB", "Express.js", "React", "Node.js", "Socket.io", "Zustand"],
    category: "Full-Stack",
    gradient:
      "linear-gradient(135deg, oklch(0.7 0.2 240), oklch(0.4 0.15 260))",
  },
  {
    title: "InterviewOS — AI Voice Interview Bot",
    description:
      "AI voice interview bot with local LLM inference via Ollama, browser Web Speech API — eliminating all external API costs. Dynamic question generation from parsed context.",
    tags: ["FastAPI", "Ollama", "Web Speech API", "Python"],
    category: "Tools",
    gradient:
      "linear-gradient(135deg, oklch(0.75 0.2 35), oklch(0.45 0.15 50))",
    span: "tall",
  },
  {
    title: "Textom — Content Sharing Platform",
    description:
      "Zero-account content sharing using auto-generated 6-digit codes with collision prevention. SSR delivering sub-200ms FCP. TTL indexes for auto-expiring content after 15 minutes.",
    tags: ["Next.js", "MongoDB", "Tailwind CSS", "SSR"],
    category: "Frontend",
    gradient:
      "linear-gradient(135deg, oklch(0.7 0.2 290), oklch(0.4 0.15 310))",
  },
];

const categories: ("All" | Category)[] = [
  "All",
  "Full-Stack",
  "Frontend",
  "Tools",
];

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
        "hover:glass-hover hover:glow-green hover:-translate-y-1",
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
          subtitle="A selection of projects I've built — from full-stack SaaS platforms to AI tools and real-time applications."
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

"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Code2, Database, GitBranch, Layers, Server, Cpu,
  BookOpen, Zap
} from "lucide-react";

type SkillCategory = "Frontend" | "Backend" | "DevOps" | "Languages";

const skillData: Record<SkillCategory, { name: string; level: number }[]> = {
  Frontend: [
    { name: "React.js", level: 92 },
    { name: "Next.js", level: 88 },
    { name: "Tailwind CSS", level: 90 },
    { name: "Zustand", level: 80 },
    { name: "HTML5/CSS3", level: 95 },
  ],
  Backend: [
    { name: "Node.js", level: 85 },
    { name: "Express.js", level: 83 },
    { name: "FastAPI", level: 75 },
    { name: "REST APIs", level: 88 },
    { name: "Socket.io", level: 78 },
  ],
  DevOps: [
    { name: "Git & GitHub", level: 90 },
    { name: "CI/CD", level: 72 },
    { name: "Docker", level: 60 },
    { name: "MongoDB", level: 85 },
    { name: "PostgreSQL", level: 80 },
    { name: "MySQL", level: 78 },
  ],
  Languages: [
    { name: "JavaScript (ES6+)", level: 90 },
    { name: "Python", level: 82 },
    { name: "Java", level: 70 },
    { name: "SQL", level: 85 },
  ],
};

const categories: SkillCategory[] = ["Frontend", "Backend", "DevOps", "Languages"];

const techMarquee = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "MongoDB",
  "PostgreSQL", "FastAPI", "Socket.io", "Docker", "Git", "REST APIs",
  "GraphQL", "Zustand", "Tailwind", "Express", "Java", "CI/CD",
];

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const width = useMotionValue(0);
  const springWidth = useSpring(width, { stiffness: 60, damping: 20 });
  const displayWidth = useTransform(springWidth, (v) => `${Math.round(v)}%`);

  useEffect(() => {
    if (isInView) width.set(level);
  }, [isInView, level, width]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
          {name}
        </span>
        <motion.span className="text-xs font-mono text-primary">
          {displayWidth}
        </motion.span>
      </div>
      <div className="h-2 rounded-full bg-zinc-800/50 overflow-hidden border border-zinc-700/30">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-green-400 to-green-300"
          style={{ width: displayWidth }}
        />
      </div>
    </motion.div>
  );
}

const faceAngles: Record<SkillCategory, { x: number; y: number }> = {
  Frontend: { x: 0, y: 0 },
  Backend: { x: 0, y: -90 },
  DevOps: { x: 0, y: -180 },
  Languages: { x: 90, y: 0 },
};

function SkillCube({ activeCategory, onSelect }: {
  activeCategory: SkillCategory;
  onSelect: (c: SkillCategory) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mouseRot, setMouseRot] = useState({ x: 0, y: 0 });
  const cubeRef = useRef<HTMLDivElement>(null);

  // When not hovered, smoothly animate to the active category face
  const target = isHovered ? mouseRot : faceAngles[activeCategory];

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cubeRef.current) return;
    const rect = cubeRef.current.getBoundingClientRect();
    // Mouse X controls rotateY, mouse Y controls rotateX (inverted)
    const x = -((e.clientY - rect.top) / rect.height - 0.5) * 30;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    setMouseRot({ x, y });
  }, []);

  return (
    <div
      ref={cubeRef}
      className="relative w-[200px] h-[200px] sm:w-[260px] sm:h-[260px]"
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMouseRot({ x: 0, y: 0 }); }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateX: target.x, rotateY: target.y }}
        transition={{ type: "spring", stiffness: 100, damping: 15, mass: 0.5 }}
      >
        {categories.map((cat, i) => {
          const faces = [
            "translateZ(100px) sm:translateZ(130px)",
            "translateZ(100px) sm:translateZ(130px) rotateY(90deg)",
            "translateZ(100px) sm:translateZ(130px) rotateY(180deg)",
            "translateZ(100px) sm:translateZ(130px) rotateX(-90deg)",
          ];
          const isActive = cat === activeCategory;
          return (
            <div
              key={cat}
              onClick={() => onSelect(cat)}
              className={cn(
                "absolute inset-0 rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center cursor-pointer",
                "border backdrop-blur-xl select-none",
                "transition-colors duration-500",
                isActive
                  ? "bg-emerald-500/15 border-emerald-400/50 shadow-[0_0_30px_rgba(74,222,128,0.15)]"
                  : "bg-zinc-900/40 border-zinc-700/40 hover:border-emerald-400/30"
              )}
              style={{ transform: faces[i], backfaceVisibility: "hidden" }}
            >
              <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-center leading-tight"
                style={{ textShadow: isActive ? "0 0 20px rgba(74,222,128,0.5)" : "none" }}>
                {cat}
              </span>
              <span className="text-xs text-zinc-400 mt-2 text-center">
                {skillData[cat].length} skills
              </span>
              <div className="mt-3 flex gap-1">
                {[...Array(4)].map((_, j) => (
                  <div
                    key={j}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all duration-300",
                      j < (isActive ? 4 : 2)
                        ? "bg-emerald-400"
                        : "bg-zinc-700/50"
                    )}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </motion.div>
      <div className="absolute -inset-8 sm:-inset-12 rounded-full bg-emerald-500/5 blur-3xl -z-10" />
    </div>
  );
}

function MarqueeBar() {
  return (
    <div className="relative overflow-hidden py-6 border-y border-zinc-800/30">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {[...techMarquee, ...techMarquee, ...techMarquee, ...techMarquee].map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="inline-flex items-center gap-3 text-sm font-display tracking-widest text-zinc-500/40 hover:text-emerald-400/60 transition-colors duration-300"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/30" />
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function SkillCloud() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const skills = useMemo(() =>
    Object.entries(skillData).flatMap(([cat, skills]) =>
      skills.map(s => ({ ...s, category: cat as SkillCategory }))
    ), []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden rounded-2xl bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/30 p-6 sm:p-8 min-h-[280px]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(74,222,128,0.05),transparent_60%)]" />

      <div className="relative flex flex-wrap justify-center gap-3">
        {skills.map((skill, i) => {
          // Reduced sensitivity: only 2px max movement instead of 12px
          const xOff = mousePos.x * ((i % 5) - 2) * 2;
          const yOff = mousePos.y * (Math.floor(i / 5) - 1.5) * 2;
          return (
            <motion.span
              key={skill.name}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.025, ease: [0.25, 1, 0.5, 1] }}
              className="relative px-4 py-2.5 rounded-xl text-sm font-medium border border-zinc-700/50 bg-zinc-900/30 backdrop-blur-sm cursor-pointer transition-colors duration-300 hover:border-emerald-400/60 hover:bg-emerald-500/10 hover:shadow-[0_0_30px_rgba(74,222,128,0.2)]"
              style={{ transform: `translate(${xOff}px, ${yOff}px)` }}
            >
              {skill.name}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("Frontend");
  const [hoveredCloud, setHoveredCloud] = useState(false);

  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(74,222,128,0.03),transparent_50%),radial-gradient(ellipse_at_70%_80%,rgba(74,222,128,0.02),transparent_50%)]" />
      <div className="absolute top-40 left-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px]" />

      <MarqueeBar />

      <div className="max-w-6xl mx-auto px-6 pt-16">
        <SectionHeading
          align="center"
          subtitle="Technologies and tools I work with — each one mastered through real-world projects"
        >
          Technical Arsenal
        </SectionHeading>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-8">
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          >
            <SkillCube activeCategory={activeCategory} onSelect={setActiveCategory} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="flex gap-2 mb-8 flex-wrap">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 border",
                    activeCategory === cat
                      ? "bg-emerald-500/15 border-emerald-400/40 text-emerald-400"
                      : "bg-zinc-900/40 text-zinc-400 border-zinc-700/40 hover:text-zinc-200 hover:border-emerald-400/30"
                  )}
                  style={activeCategory === cat ? { boxShadow: "0 0 20px rgba(74,222,128,0.15)" } : {}}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-3">
                  {skillData[activeCategory].map((skill, i) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onMouseEnter={() => setHoveredCloud(true)}
          onMouseLeave={() => setHoveredCloud(false)}
        >
          <h3 className="font-display text-lg font-bold tracking-wider text-center text-zinc-400 mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
              Skill Cloud
            </span>
            {hoveredCloud ? "" : " — hover to interact"}
          </h3>
          <SkillCloud />
        </motion.div>

        <motion.div
          className="mt-16 pt-12 border-t border-zinc-800/30 flex flex-wrap justify-center gap-12 sm:gap-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            { label: "Technologies", value: "18+", icon: Code2 },
            { label: "Projects Built", value: "5+", icon: Layers },
            { label: "CS Fundamentals", value: "4", icon: BookOpen },
            { label: "Databases", value: "3", icon: Database },
          ].map((stat) => (
            <GlassCard key={stat.label} hover={false} className="px-8 py-6 text-center min-w-[140px]">
              <stat.icon size={20} className="text-emerald-400 mx-auto mb-2" />
              <div className="font-display text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <p className="text-xs text-zinc-400 mt-1">{stat.label}</p>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

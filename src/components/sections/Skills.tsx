"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import {
  Code2,
  FileJson,
  FileType,
  FileCode,
  Globe,
  Paintbrush,
  Wind,
  Server,
  Terminal,
  Database,
  Box,
  Network,
  Plug,
  GitBranch,
  Package,
  Monitor,
  PenTool,
  Cloud,
  Triangle,
  Palette,
  Smartphone,
  Sparkles,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

interface Skill {
  name: string;
  icon: typeof Code2;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: Code2 },
      { name: "Next.js", icon: FileJson },
      { name: "TypeScript", icon: FileType },
      { name: "JavaScript", icon: FileCode },
      { name: "HTML5", icon: Globe },
      { name: "CSS3", icon: Paintbrush },
      { name: "Tailwind CSS", icon: Wind },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: Server },
      { name: "Python", icon: Terminal },
      { name: "PostgreSQL", icon: Database },
      { name: "MongoDB", icon: Box },
      { name: "GraphQL", icon: Network },
      { name: "REST APIs", icon: Plug },
    ],
  },
  {
    title: "Tools & DevOps",
    skills: [
      { name: "Git", icon: GitBranch },
      { name: "Docker", icon: Package },
      { name: "VS Code", icon: Monitor },
      { name: "Figma", icon: PenTool },
      { name: "AWS", icon: Cloud },
      { name: "Vercel", icon: Triangle },
    ],
  },
  {
    title: "Design",
    skills: [
      { name: "UI/UX Design", icon: Palette },
      { name: "Responsive Design", icon: Smartphone },
      { name: "Animations", icon: Sparkles },
      { name: "Design Systems", icon: Layers },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const easeOut = [0.25, 1, 0.5, 1] as const;

const categoryVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const skillVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: easeOut },
  },
};

const stats = [
  { target: 50, suffix: "+", label: "Projects Completed" },
  { target: 20, suffix: "+", label: "Technologies" },
  { target: 5, suffix: "+", label: "Years Experience" },
];

const offsets = ["mt-0", "mt-3", "mt-6", "mt-2", "mt-4", "mt-1", "mt-5"];
const tilts = ["-rotate-1", "rotate-1", "rotate-0", "rotate-2", "-rotate-2", "rotate-0"];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 80, damping: 20, mass: 0.5 });
  const display = useTransform(spring, (v) => `${Math.floor(v)}${suffix}`);

  useEffect(() => {
    if (isInView) {
      count.set(target);
    }
  }, [isInView, count, target]);

  return (
    <motion.span
      ref={ref}
      className="font-display text-4xl font-bold text-primary glow-text"
    >
      {display}
    </motion.span>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          align="center"
          subtitle="Tools and technologies I work with"
        >
          Skills & Technologies
        </SectionHeading>

        <motion.div
          className="space-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              variants={categoryVariants}
              className={cn(
                catIdx % 2 === 1 && "sm:ml-12 lg:ml-24",
                catIdx % 2 === 0 && "sm:mr-12 lg:mr-24",
              )}
            >
              <h3 className="font-display text-lg font-bold tracking-wider text-primary mb-6 glow-text">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill.name}
                    variants={skillVariants}
                    className={cn(
                      offsets[skillIdx % offsets.length],
                      tilts[skillIdx % tilts.length],
                    )}
                  >
                    <GlassCard
                      glow
                      className="px-4 py-3 flex items-center gap-2.5"
                    >
                      <skill.icon size={16} className="text-primary shrink-0" />
                      <span className="text-sm font-medium text-foreground whitespace-nowrap">
                        {skill.name}
                      </span>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-24 pt-12 border-t border-border/30"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-wrap justify-center gap-12 sm:gap-16 lg:gap-24">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                <p className="text-muted text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

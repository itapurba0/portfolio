"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Award } from "lucide-react";

const timeline = [
  {
    period: "Aug 2022 – Jun 2026",
    role: "B.Tech in Information Technology",
    company: "Asansol Engineering College",
    description: "CGPA 7.48 / 10",
    active: true,
  },
  {
    period: "2024 – Present",
    role: "Full-Stack Developer (Freelance)",
    company: "Self-Employed",
    description:
      "Build end-to-end web applications for clients using React, Next.js, Node.js, and PostgreSQL. Handle project architecture, deployment, and client communication independently.",
    active: false,
  },
  {
    period: "2025",
    role: "Project: HireOps SaaS",
    company: "Personal Project",
    description:
      "Built an AI-driven hiring platform with resume parsing, automated screening, and interview scheduling. Designed for scalability with modular microservices architecture.",
    active: false,
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-4xl">
        <SectionHeading subtitle="Academic background and professional path">
          Education & Journey
        </SectionHeading>

        <div className="relative">
          <div className="absolute left-[1.125rem] sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/40 to-border" />

          {timeline.map((item, index) => (
            <motion.div
              key={item.period}
              className={cn(
                "relative flex items-start gap-6 sm:gap-12 pb-16 last:pb-0",
                "flex-row"
              )}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="hidden sm:block sm:w-1/2 text-right pr-12">
                <span className={cn(
                  "inline-block font-display text-sm tracking-wider px-3 py-1 rounded-full border",
                  item.active
                    ? "text-primary border-primary/30 bg-primary/10"
                    : "text-muted border-border"
                )}>
                  {item.period}
                </span>
              </div>

              <div className="absolute left-[0.625rem] sm:left-1/2 sm:-translate-x-1/2 top-1">
                <div className={cn(
                  "w-3 h-3 rounded-full border-2 border-background transition-all duration-500",
                  item.active
                    ? "bg-primary shadow-[0_0_12px_var(--primary-glow)]"
                    : "bg-primary-dim shadow-none"
                )} />
              </div>

              <div className="sm:w-1/2 pl-10 sm:pl-12 sm:pr-0">
                <span className={cn(
                  "sm:hidden inline-block font-display text-xs tracking-wider px-2 py-0.5 rounded-full border mb-3",
                  item.active
                    ? "text-primary border-primary/30 bg-primary/10"
                    : "text-muted border-border"
                )}>
                  {item.period}
                </span>

                <GlassCard glow={item.active} className={cn(
                  item.active ? "border-primary/30" : ""
                )}>
                  <div className="space-y-3">
                    <div>
                      <h3 className={cn(
                        "font-display text-lg font-bold",
                        item.active ? "gradient-text" : "text-foreground"
                      )}>
                        {item.role}
                      </h3>
                      {item.company && (
                        <p className="text-sm text-muted mt-0.5">{item.company}</p>
                      )}
                    </div>
                    <p className="text-sm text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="glass rounded-2xl p-6 sm:p-8 glow-green border border-primary/20">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Award size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold gradient-text mb-2">
                  Built InterviewOS
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  AI voice interview bot with zero API costs — runs entirely on Ollama local LLM inference
                  paired with the Web Speech API for real-time voice interaction.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

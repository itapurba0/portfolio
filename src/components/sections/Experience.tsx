"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

const experiences = [
  {
    period: "Present",
    role: "Open to Opportunities",
    company: "Ready for the next challenge",
    description:
      "Actively seeking new opportunities where I can contribute my skills in full-stack development, solve meaningful problems, and grow alongside a talented team.",
    active: true,
  },
  {
    period: "2024 — 2025",
    role: "Freelance Developer",
    company: "Self-Employed",
    description:
      "Delivered end-to-end web solutions for diverse clients. Built responsive applications using React, Next.js, and Node.js. Managed project timelines and client communication independently.",
  },
  {
    period: "2023 — 2024",
    role: "Junior Developer Intern",
    company: "Tech Studio",
    description:
      "Collaborated on frontend development of internal tools and client websites. Gained hands-on experience with modern JavaScript frameworks, version control, and agile workflows.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          subtitle="My professional journey"
        >
          Experience
        </SectionHeading>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[1.125rem] sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary-dim to-border" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.period}
              className={cn(
                "relative flex items-start gap-6 sm:gap-12 pb-16 last:pb-0",
                "flex-row"
              )}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
            >
              {/* Date - left side on desktop */}
              <div className="hidden sm:block sm:w-1/2 text-right pr-12">
                <span className={cn(
                  "inline-block font-display text-sm tracking-wider px-3 py-1 rounded-full border",
                  exp.active
                    ? "text-primary border-primary/30 bg-primary/10"
                    : "text-muted border-border"
                )}>
                  {exp.period}
                </span>
              </div>

              {/* Timeline node */}
              <div className="absolute left-[0.625rem] sm:left-1/2 sm:-translate-x-1/2 top-1">
                <div className={cn(
                  "w-3 h-3 rounded-full border-2 border-background",
                  exp.active
                    ? "bg-primary shadow-[0_0_12px_oklch(70%_0.25_145/0.6)]"
                    : "bg-primary-dim"
                )} />
              </div>

              {/* Content - right side on desktop */}
              <div className="sm:w-1/2 pl-10 sm:pl-12 sm:pr-0">
                {/* Date - mobile only */}
                <span className={cn(
                  "sm:hidden inline-block font-display text-xs tracking-wider px-2 py-0.5 rounded-full border mb-3",
                  exp.active
                    ? "text-primary border-primary/30 bg-primary/10"
                    : "text-muted border-border"
                )}>
                  {exp.period}
                </span>

                <GlassCard glow={exp.active} className={cn(
                  exp.active ? "border-primary/30" : ""
                )}>
                  <div className="space-y-3">
                    <div>
                      <h3 className={cn(
                        "font-display text-lg font-bold",
                        exp.active ? "gradient-text" : "text-foreground"
                      )}>
                        {exp.role}
                      </h3>
                      {exp.company && (
                        <p className="text-sm text-muted mt-0.5">{exp.company}</p>
                      )}
                    </div>
                    <p className="text-sm text-muted leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Download, ArrowRight } from "lucide-react";

const stats = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 20, suffix: "+", label: "Projects" },
  { value: 10, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Technologies" },
];

function Counter({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <span className="font-display text-3xl sm:text-4xl font-bold gradient-text">
        {count}{suffix}
      </span>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          subtitle="Passionate about crafting digital experiences"
        >
          About Me
        </SectionHeading>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left - Avatar */}
          <motion.div
            className="lg:col-span-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="relative">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-primary via-primary-dim to-surface flex items-center justify-center shadow-2xl glow-green animate-[float_6s_ease-in-out_infinite]">
                <span className="font-display text-6xl sm:text-7xl font-bold text-foreground glow-text">
                  AP
                </span>
              </div>
              <div className="absolute -inset-4 rounded-full bg-primary/5 blur-3xl -z-10" />
            </div>
          </motion.div>

          {/* Right - Content */}
          <div className="lg:col-span-3 space-y-8">
            <motion.p
              className="text-lg sm:text-xl leading-relaxed text-muted"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            >
              I&apos;m a full-stack developer with a passion for building beautiful,
              performant web applications. I love combining creative design with
              clean code to deliver exceptional user experiences. When I&apos;m not
              coding, you&apos;ll find me exploring new technologies, contributing to
              open source, or writing about my learnings.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
            >
              {stats.map((stat) => (
                <GlassCard key={stat.label} hover={false} className="p-4">
                  <Counter target={stat.value} suffix={stat.suffix} label={stat.label} />
                </GlassCard>
              ))}
            </motion.div>

            {/* Download Resume */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 1, 0.5, 1] }}
            >
              <button className={cn(
                "group inline-flex items-center gap-3 px-6 py-3 rounded-xl",
                "glass hover:glass-hover transition-all duration-500",
                "text-foreground font-medium text-sm"
              )}>
                <Download size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                Download Resume
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

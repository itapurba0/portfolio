"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({ children, subtitle, className, align = "center" }: SectionHeadingProps) {
  return (
    <motion.div
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
    >
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
        <span className="gradient-text">{children}</span>
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted max-w-2xl mx-auto text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={cn(
        "mt-6 h-px w-20 bg-primary/50",
        align === "center" && "mx-auto"
      )} />
    </motion.div>
  );
}

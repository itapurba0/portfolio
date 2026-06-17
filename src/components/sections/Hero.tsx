"use client";

import { motion } from "framer-motion";
import { Code, Palette, Terminal, Sparkles, ChevronDown } from "lucide-react";

const floatingIcons = [
  { Icon: Code, x: "15%", y: "20%", delay: 0, duration: 6 },
  { Icon: Palette, x: "80%", y: "25%", delay: 1.5, duration: 7 },
  { Icon: Terminal, x: "20%", y: "70%", delay: 3, duration: 8 },
  { Icon: Sparkles, x: "75%", y: "65%", delay: 2, duration: 6.5 },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] as const },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-dim/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>

      {floatingIcons.map(({ Icon, x, y, delay, duration }) => (
        <div
          key={Icon.displayName}
          className="absolute text-primary-dim/20 hidden sm:block"
          style={{ left: x, top: y }}
        >
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          >
            <Icon size={32} />
          </motion.div>
        </div>
      ))}

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={itemVariants}
          className="text-primary font-display text-sm sm:text-base tracking-[0.3em] uppercase mb-4"
        >
          Welcome to my portfolio
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
        >
          <span className="glow-text">Apurba Roy</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-muted"
        >
          Full-Stack Developer & Creative Technologist
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="mt-4 text-muted text-base sm:text-lg max-w-lg leading-relaxed"
        >
          Building things that matter on the web
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#projects"
            className="glass rounded-xl px-8 py-3.5 font-medium text-foreground transition-all duration-500 hover:glass-hover hover:glow-green"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-xl px-8 py-3.5 font-medium text-background bg-primary transition-all duration-500 hover:bg-primary-dim hover:shadow-[0_0_30px_oklch(70%_0.25_145/0.4)]"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="text-muted" size={28} />
        </motion.div>
      </motion.div>
    </section>
  );
}

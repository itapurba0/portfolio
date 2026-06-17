"use client";

import { GitBranch, Globe, AtSign, Mail } from "lucide-react";

export default function Footer() {
  const links = [
    { icon: GitBranch, href: "https://github.com/apurba-roy", label: "GitHub" },
    { icon: Globe, href: "https://linkedin.com/in/apurba-roy", label: "LinkedIn" },
    { icon: AtSign, href: "https://x.com/apurba_roy", label: "X" },
    { icon: Mail, href: "mailto:apurba00237@gmail.com", label: "Email" },
  ];

  return (
    <footer className="border-t border-border/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="font-display text-lg font-bold tracking-wider glow-text">
              AP
            </span>
            <p className="mt-2 text-sm text-muted">
              Building scalable full-stack systems
            </p>
          </div>
          <div className="flex items-center gap-4">
            {links.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full glass hover:glass-hover text-muted hover:text-foreground transition-all duration-300"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border/30 text-center text-xs text-muted">
          &copy; {new Date().getFullYear()} Apurba Roy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

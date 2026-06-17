import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="font-display text-lg font-bold tracking-wider glow-text">
              AP
            </span>
            <p className="mt-2 text-sm text-muted">
              Building the future, one line at a time.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: "https://github.com" },
              { icon: Linkedin, href: "https://linkedin.com" },
              { icon: Twitter, href: "https://twitter.com" },
              { icon: Mail, href: "mailto:hello@apurba.dev" },
            ].map(({ icon: Icon, href }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full glass hover:glass-hover text-muted hover:text-foreground transition-all duration-300"
              >
                <Icon size={18} />
              </Link>
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

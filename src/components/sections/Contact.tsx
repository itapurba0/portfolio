"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Mail, MapPin, Code2, Globe, AtSign, Send, Loader2 } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@apurba.dev", href: "mailto:hello@apurba.dev" },
  { icon: MapPin, label: "Location", value: "Bangladesh" },
  { icon: Code2, label: "GitHub", value: "@apurba-roy", href: "https://github.com/apurba-roy" },
  { icon: Globe, label: "LinkedIn", value: "apurba-roy", href: "https://linkedin.com/in/apurba-roy" },
  { icon: AtSign, label: "Twitter", value: "@apurba_roy", href: "https://twitter.com/apurba_roy" },
];

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [focused, setFocused] = useState<keyof FormState | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email address";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    else if (form.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", form);
    setSubmitting(false);
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const fields: { key: keyof FormState; label: string; type: "text" | "email" | "textarea" }[] = [
    { key: "name", label: "Your Name", type: "text" },
    { key: "email", label: "Your Email", type: "email" },
    { key: "subject", label: "Subject", type: "text" },
    { key: "message", label: "Message", type: "textarea" },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          subtitle="Have a project in mind or just want to say hi? I&apos;d love to hear from you."
        >
          Get In Touch
        </SectionHeading>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left - Contact Info */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          >
            {contactInfo.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl glass flex items-center justify-center transition-all duration-500 group-hover:glass-hover">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm text-foreground font-medium">{item.value}</p>
                  </div>
                </div>
              );

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block"
                >
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}

            {/* Availability status */}
            <div className="flex items-center gap-3 pt-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
              </span>
              <span className="text-sm text-muted">
                Currently available for freelance work
              </span>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-12 text-center glow-green"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Send size={24} className="text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold gradient-text mb-2">Message Sent!</h3>
                <p className="text-muted text-sm">Thanks for reaching out. I&apos;ll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 space-y-5">
                {fields.map((field, i) => (
                  <motion.div
                    key={field.key}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: [0.25, 1, 0.5, 1] }}
                  >
                    <label
                      htmlFor={field.key}
                      className={cn(
                        "block text-sm font-medium mb-2 transition-colors duration-300",
                        focused === field.key ? "text-primary" : "text-muted"
                      )}
                    >
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.key}
                        rows={5}
                        value={form[field.key]}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        onFocus={() => setFocused(field.key)}
                        onBlur={() => setFocused(null)}
                        className={cn(
                          "w-full rounded-xl bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted/50",
                          "border transition-all duration-300 outline-none resize-none",
                          "focus:border-primary/50 focus:shadow-[0_0_20px_oklch(70%_0.25_145/0.1)]",
                          errors[field.key] ? "border-red-500/50" : "border-border"
                        )}
                      />
                    ) : (
                      <input
                        id={field.key}
                        type={field.type}
                        value={form[field.key]}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        onFocus={() => setFocused(field.key)}
                        onBlur={() => setFocused(null)}
                        className={cn(
                          "w-full rounded-xl bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted/50",
                          "border transition-all duration-300 outline-none",
                          "focus:border-primary/50 focus:shadow-[0_0_20px_oklch(70%_0.25_145/0.1)]",
                          errors[field.key] ? "border-red-500/50" : "border-border"
                        )}
                      />
                    )}
                    {errors[field.key] && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-400 mt-1.5"
                      >
                        {errors[field.key]}
                      </motion.p>
                    )}
                  </motion.div>
                ))}

                <motion.button
                  type="submit"
                  disabled={submitting}
                  className={cn(
                    "w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl",
                    "glass hover:glass-hover transition-all duration-500",
                    "text-foreground font-medium text-sm",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

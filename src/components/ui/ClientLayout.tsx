"use client";

import { type ReactNode } from "react";
import { ParticleBackground } from "./ParticleBackground";

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ParticleBackground />
      <div className="relative z-10">{children}</div>
    </>
  );
}

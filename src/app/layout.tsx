import type { Metadata } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";
import { ClientLayout } from "@/components/ui/ClientLayout";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apurba Roy | Full-Stack Developer & Creative Technologist",
  description:
    "Portfolio of Apurba Roy — a full-stack developer and creative technologist specializing in building beautiful, performant web applications.",
  openGraph: {
    title: "Apurba Roy | Full-Stack Developer",
    description:
      "Full-stack developer passionate about building beautiful, performant web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${orbitron.variable} ${spaceGrotesk.variable} h-full antialiased`}
      style={{ scrollBehavior: "smooth" }}
    >
      <body className="min-h-full flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

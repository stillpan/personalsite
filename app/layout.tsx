import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import "./globals.css";
const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yuki Zhang",
  description: "Electrical engineer at Brown. Researcher at CERN.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="bg-[#F7F4EF] text-[#0A0A0A]">
        {children}

        {/* Email — pinned to bottom, every page */}
        <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30">
          <a
            href="mailto:shuyue_zhang1@brown.edu"
            className="font-[family-name:var(--font-space)] text-[10px] tracking-widest uppercase text-[#0A0A0A]/30 hover:text-[#E8272A] transition-colors"
          >
            shuyue_zhang1@brown.edu
          </a>
        </div>
      </body>
    </html>
  );
}

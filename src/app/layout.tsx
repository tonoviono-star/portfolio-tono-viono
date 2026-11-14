import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../components/HomeExperience/HomeExperience.css";
import "../components/SplitFlapText/SplitFlapText.css";
import "../components/RippleGrid/RippleGrid.css";
import "../components/Lanyard/Lanyard.css";
import "../components/WarpText/WarpText.css";
import "../components/ScrollVelocity/ScrollVelocity.css";
import "../components/AboutSection/AboutSection.css";
import "../components/Folder/Folder.css";
import "../components/AccordionGallery/AccordionGallery.css";
import "../components/FlexCarousel/FlexCarousel.css";
import "../components/WorksSection/WorksSection.css";
import "../components/TrueFocus/TrueFocus.css";
import "../components/DriftWall/DriftWall.css";
import "../components/ContributeSection/ContributeSection.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tono Viono — Portfolio",
  description: "Portfolio personal Tono Viono",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

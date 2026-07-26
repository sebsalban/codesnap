import {
  Space_Grotesk,
  Inter,
  Fira_Code,
  JetBrains_Mono,
  IBM_Plex_Mono,
  Source_Code_Pro,
  Space_Mono,
} from "next/font/google";
import "./globals.css";
import { SnapProvider } from "@/hooks/useSnap";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "CodeSnap — Make your code worth sharing",
  description:
    "Generate beautiful, shareable images of your code. Pick a theme, background and font, then export as PNG or SVG.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${firaCode.variable} ${jetbrainsMono.variable} ${plexMono.variable} ${sourceCodePro.variable} ${spaceMono.variable} antialiased`}
    >
      <body>
        <SnapProvider>{children}</SnapProvider>
      </body>
    </html>
  );
}

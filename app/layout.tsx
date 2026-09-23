import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yeon — reliable handoffs between agents",
  description:
    "An in-process SDK and runtime for reliable, typed handoffs between AI agents.",
  icons: { icon: "/yeon/yeon-assets/yeon_logo.svg" },
};

export const viewport: Viewport = {
  themeColor: "#fcfbfb",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

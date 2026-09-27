import type { Viewport } from "next";
import "./globals.css";

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

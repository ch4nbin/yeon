"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./docs.module.css";

const navigation = [
  { label: "Introduction", href: "#introduction", id: "introduction" },
  { label: "Why Yeon", href: "#why-yeon", id: "why-yeon" },
  { label: "Documents", href: "#documents", id: "documents" },
  { label: "Representations", href: "#representations", id: "representations" },
  { label: "Schemas", href: "#schemas", id: "schemas" },
  { label: "Runtime", href: "#runtime", id: "runtime" },
  { label: "Lifecycle", href: "#lifecycle", id: "lifecycle" },
  { label: "Integrations", href: "#integrations", id: "integrations" },
  { label: "Roadmap", href: "#roadmap", id: "roadmap" },
];

export function DocsSidebar() {
  const [activeSection, setActiveSection] = useState(navigation[0].id);

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
      const readingLine = Math.min(180, window.innerHeight * 0.28);
      let current = navigation[0].id;

      for (const item of navigation) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= readingLine) {
          current = item.id;
        }
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = navigation.at(-1)?.id ?? current;
      }

      setActiveSection(current);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <aside className={styles.sidebar}>
      <Link className={styles.brand} href="/" aria-label="Yeon home">
        Yeon
      </Link>

      <nav className={styles.navigation} aria-label="Documentation sections">
        <p>Documentation</p>
        {navigation.map((link) => {
          const isActive = activeSection === link.id;

          return (
            <a
              className={isActive ? styles.activeNavLink : styles.navLink}
              href={link.href}
              key={link.id}
              aria-current={isActive ? "location" : undefined}
              onClick={() => setActiveSection(link.id)}
            >
              <span>{link.label}</span>
            </a>
          );
        })}

        <p className={styles.resourceLabel}>Resources</p>
        <a
          className={styles.navLink}
          href="https://github.com/ch4nbin/yeon"
          target="_blank"
          rel="noreferrer"
        >
          <span>GitHub <span aria-hidden="true">↗</span></span>
        </a>
      </nav>
    </aside>
  );
}

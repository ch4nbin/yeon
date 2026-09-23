"use client";

import { useState } from "react";

const installCommands = {
  npm: "npm install yeon",
  pnpm: "pnpm add yeon",
} as const;

type PackageManager = keyof typeof installCommands;

export function InstallCommand() {
  const [packageManager, setPackageManager] = useState<PackageManager>("npm");

  return (
    <section className="install-section" aria-label="Install Yeon">
      <nav className="package-managers" aria-label="Package manager">
        {(Object.keys(installCommands) as PackageManager[]).map((manager) => (
          <button
            key={manager}
            type="button"
            aria-pressed={packageManager === manager}
            onClick={() => setPackageManager(manager)}
          >
            {manager}
          </button>
        ))}
      </nav>
      <div className="install-command" aria-live="polite" aria-atomic="true">
        <code>{installCommands[packageManager]}</code>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";

export function HeroBackground() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <div className="hero-background" aria-hidden="true">
        <Image
          src="/yeon-assets/yeonbg.png"
          alt=""
          fill
          sizes="100vw"
          preload
          className="hero-art"
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
      </div>
      <div className="loading-screen" data-loaded={isLoaded} aria-live="polite">
        <span className="loading-line" aria-hidden="true" />
        <span className="sr-only">Loading background image</span>
      </div>
    </>
  );
}

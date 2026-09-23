"use client";

import Image from "next/image";
import { useState } from "react";

export function HeroBackground() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <div className="hero-background" aria-hidden="true">
        <Image
          src="/yeon/yeon-assets/yeonbg.png"
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
        <Image
          src="/yeon/yeon-assets/yeon_logo.svg"
          alt=""
          width={36}
          height={36}
          className="loading-logo"
          aria-hidden="true"
        />
        <span className="sr-only">Loading background image</span>
      </div>
    </>
  );
}

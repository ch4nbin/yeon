"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function HeroBackground() {
  const [isLoaded, setIsLoaded] = useState(false);
  const backgroundRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (backgroundRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <>
      <div className="hero-background" aria-hidden="true">
        <Image
          ref={backgroundRef}
          src="/yeon/yeon-assets/yeonbg-watercolor.png"
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

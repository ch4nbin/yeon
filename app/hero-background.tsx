"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function HeroBackground() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const backgroundRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (backgroundRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setIsLoaderVisible(false);
      return;
    }

    const timeout = window.setTimeout(() => setIsLoaderVisible(true), 180);
    return () => window.clearTimeout(timeout);
  }, [isLoaded]);

  const finishLoading = () => {
    setIsLoaded(true);
    setIsLoaderVisible(false);
  };

  return (
    <>
      <div className="hero-background" aria-hidden="true">
        <Image
          ref={backgroundRef}
          src="/yeon/yeon-assets/yeonbg-sakura-v2.png"
          alt=""
          fill
          sizes="100vw"
          preload
          className="hero-art"
          onLoad={finishLoading}
          onError={finishLoading}
        />
      </div>
      <div
        className="loading-screen"
        data-loaded={isLoaded}
        data-visible={isLoaderVisible && !isLoaded}
        aria-hidden={!isLoaderVisible || isLoaded}
        aria-live="polite"
      >
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

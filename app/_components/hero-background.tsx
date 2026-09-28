"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const BAYER_MATRIX = [
  0, 8, 2, 10,
  12, 4, 14, 6,
  3, 11, 1, 9,
  15, 7, 13, 5,
];

const PIXEL_SIZE = 2;
const LUMINANCE_LEVELS = 8;

const clampColor = (value: number) => Math.max(0, Math.min(255, Math.round(value)));

function colorAtLuminance(
  red: number,
  green: number,
  blue: number,
  sourceLuminance: number,
  targetLuminance: number,
) {
  if (targetLuminance >= sourceLuminance) {
    const amount = (targetLuminance - sourceLuminance) / Math.max(1, 255 - sourceLuminance);
    return [
      clampColor(red + (255 - red) * amount),
      clampColor(green + (255 - green) * amount),
      clampColor(blue + (255 - blue) * amount),
    ];
  }

  const amount = targetLuminance / Math.max(1, sourceLuminance);
  return [clampColor(red * amount), clampColor(green * amount), clampColor(blue * amount)];
}

function renderDitheredBackground(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  isMobile: boolean,
) {
  const ditherWidth = Math.ceil(width / PIXEL_SIZE);
  const ditherHeight = Math.ceil(height / PIXEL_SIZE);

  canvas.width = ditherWidth;
  canvas.height = ditherHeight;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const context = canvas.getContext("2d");
  const sampleCanvas = document.createElement("canvas");
  const sampleContext = sampleCanvas.getContext("2d", { willReadFrequently: true });

  if (!context || !sampleContext || !image.naturalWidth || !image.naturalHeight) return;

  sampleCanvas.width = ditherWidth;
  sampleCanvas.height = ditherHeight;

  const containScale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const scale = isMobile
    ? containScale * 1.55
    : Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const renderedWidth = image.naturalWidth * scale;
  const renderedHeight = image.naturalHeight * scale;
  const offsetX = isMobile ? width - renderedWidth : (width - renderedWidth) / 2;
  const offsetY = isMobile ? height - renderedHeight + 14 : (height - renderedHeight) / 2;

  sampleContext.fillStyle = "#ffffff";
  sampleContext.fillRect(0, 0, ditherWidth, ditherHeight);
  sampleContext.drawImage(
    image,
    offsetX / PIXEL_SIZE,
    offsetY / PIXEL_SIZE,
    renderedWidth / PIXEL_SIZE,
    renderedHeight / PIXEL_SIZE,
  );

  const imageData = sampleContext.getImageData(0, 0, ditherWidth, ditherHeight);
  const pixels = imageData.data;

  for (let y = 0; y < ditherHeight; y += 1) {
    for (let x = 0; x < ditherWidth; x += 1) {
      const index = (y * ditherWidth + x) * 4;
      const red = pixels[index];
      const green = pixels[index + 1];
      const blue = pixels[index + 2];
      const brightest = Math.max(red, green, blue);
      const darkest = Math.min(red, green, blue);
      const chroma = brightest - darkest;
      const luminance = red * 0.2126 + green * 0.7152 + blue * 0.0722;
      const sourceY = (y * PIXEL_SIZE - offsetY) / renderedHeight;
      const isAtmosphere = luminance > 190 && chroma < 28;
      const isPaperWhite = luminance > 250 && chroma < 8;

      if ((isAtmosphere && sourceY < 0.7) || isPaperWhite) {
        pixels[index] = 255;
        pixels[index + 1] = 255;
        pixels[index + 2] = 255;
        pixels[index + 3] = 255;
        continue;
      }

      const threshold = (BAYER_MATRIX[(y % 4) * 4 + (x % 4)] + 0.5) / 16;
      const scaledLuminance = (luminance / 255) * (LUMINANCE_LEVELS - 1);
      const lowerLevel = Math.floor(scaledLuminance);
      const upperLevel = Math.min(LUMINANCE_LEVELS - 1, lowerLevel + 1);
      const levelMix = scaledLuminance - lowerLevel;
      const outputLevel = threshold < levelMix ? upperLevel : lowerLevel;
      const targetLuminance = (outputLevel / (LUMINANCE_LEVELS - 1)) * 255;
      const outputColor = colorAtLuminance(red, green, blue, luminance, targetLuminance);
      const atmosphereMix = isAtmosphere
        ? Math.max(0, Math.min(1, (sourceY - 0.7) / 0.12))
        : 1;

      pixels[index] = clampColor(255 + (outputColor[0] - 255) * atmosphereMix);
      pixels[index + 1] = clampColor(255 + (outputColor[1] - 255) * atmosphereMix);
      pixels[index + 2] = clampColor(255 + (outputColor[2] - 255) * atmosphereMix);
      pixels[index + 3] = 255;
    }
  }

  context.putImageData(imageData, 0, 0);
}

export function HeroBackground() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSourceReady, setIsSourceReady] = useState(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const backgroundRef = useRef<HTMLImageElement>(null);
  const ditherRef = useRef<HTMLCanvasElement>(null);
  const renderedViewportRef = useRef<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return;

    const markSourceReady = () => setIsSourceReady(true);
    const finishWithFallback = () => {
      setIsLoaded(true);
      setIsLoaderVisible(false);
    };

    background.addEventListener("load", markSourceReady);
    background.addEventListener("error", finishWithFallback);

    if (background.complete) {
      if (background.naturalWidth) markSourceReady();
      else finishWithFallback();
    }

    return () => {
      background.removeEventListener("load", markSourceReady);
      background.removeEventListener("error", finishWithFallback);
    };
  }, []);

  useEffect(() => {
    const background = backgroundRef.current;
    const canvas = ditherRef.current;
    if (!isSourceReady || !background || !canvas) return;

    let animationFrame = 0;
    const render = (force = false) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = window.matchMedia("(max-width: 600px)").matches;
      const previousViewport = renderedViewportRef.current;

      if (!force && isMobile && previousViewport?.width === width) {
        return;
      }

      renderedViewportRef.current = { width, height };
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        renderDitheredBackground(background, canvas, width, height, isMobile);
        setIsLoaded(true);
        setIsLoaderVisible(false);
      });
    };

    const handleResize = () => render();

    render(true);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [isSourceReady]);

  useEffect(() => {
    if (isLoaded) {
      setIsLoaderVisible(false);
      return;
    }

    const timeout = window.setTimeout(() => setIsLoaderVisible(true), 180);
    return () => window.clearTimeout(timeout);
  }, [isLoaded]);

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
        />
        <canvas ref={ditherRef} className="hero-dither" data-ready={isLoaded} />
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

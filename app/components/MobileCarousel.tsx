"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { KeyboardEvent, ReactNode, useCallback, useEffect, useRef, useState } from "react";

type MobileCarouselProps = {
  as?: "div" | "ol" | "ul";
  id: string;
  label: string;
  className: string;
  children: ReactNode;
  role?: string;
  autoAdvanceMs?: number;
  continuous?: boolean;
  hideControls?: boolean;
};

export default function MobileCarousel({
  as = "div",
  id,
  label,
  className,
  children,
  role,
  autoAdvanceMs = 3000,
  continuous = false,
  hideControls = false,
}: MobileCarouselProps) {
  const trackRef = useRef<HTMLDivElement | HTMLOListElement | HTMLUListElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const updateControls = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    setCanGoBack(track.scrollLeft > 3);
    setCanGoForward(track.scrollLeft < maxScroll - 3);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateControls();
    const observer = new ResizeObserver(updateControls);
    observer.observe(track);
    return () => observer.disconnect();
  }, [updateControls]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReduceMotion(preference.matches);
    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => preference.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !autoAdvanceMs) return;
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(track);
    return () => observer.disconnect();
  }, [autoAdvanceMs]);

  useEffect(() => {
    if (!autoAdvanceMs || reduceMotion || !isInView) return;
    const mobileQuery = window.matchMedia("(max-width: 760px)");
    if (continuous) {
      let frame = 0;
      let previousTime = 0;
      const autoScroll = (time: number) => {
        const track = trackRef.current;
        const elapsed = previousTime ? Math.min(time - previousTime, 50) : 0;
        previousTime = time;
        if (track && mobileQuery.matches && !document.hidden && !track.matches(":hover") && !track.contains(document.activeElement)) {
          const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
          if (maxScroll > 0) track.scrollLeft = track.scrollLeft >= maxScroll - 1 ? 0 : track.scrollLeft + elapsed * 0.045;
        }
        frame = window.requestAnimationFrame(autoScroll);
      };
      frame = window.requestAnimationFrame(autoScroll);
      return () => window.cancelAnimationFrame(frame);
    }
    const timer = window.setInterval(() => {
      const track = trackRef.current;
      if (!track || !mobileQuery.matches || document.hidden || track.matches(":hover") || track.contains(document.activeElement)) return;
      const firstItem = track.firstElementChild as HTMLElement | null;
      if (!firstItem) return;
      const styles = window.getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");
      const distance = firstItem.getBoundingClientRect().width + gap;
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      const nextLeft = track.scrollLeft >= maxScroll - 3 ? 0 : Math.min(maxScroll, track.scrollLeft + distance);
      track.scrollTo({ left: nextLeft, behavior: "smooth" });
    }, autoAdvanceMs);
    return () => window.clearInterval(timer);
  }, [autoAdvanceMs, continuous, isInView, reduceMotion]);

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    const firstItem = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstItem) return;
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");
    const distance = firstItem.getBoundingClientRect().width + gap;
    track.scrollBy({ left: distance * direction, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    move(event.key === "ArrowLeft" ? -1 : 1);
  };

  const Track = as;
  const instructionsId = `${id}-instructions`;

  return (
    <>
      <Track
        id={id}
        ref={trackRef as never}
        className={`${className} mobile-carousel-track${continuous ? " is-continuous" : ""}`}
        role={role}
        aria-label={label}
        aria-describedby={instructionsId}
        tabIndex={0}
        onScroll={updateControls}
        onKeyDown={handleKeyDown}
      >
        {children}
      </Track>
      {hideControls ? (
        <span className="mobile-carousel-instructions" id={instructionsId}>Swipe horizontally to explore</span>
      ) : (
        <div className={`mobile-carousel-controls${!canGoBack && !canGoForward ? " is-static" : ""}`} aria-label={`${label} controls`}>
          <span className="mobile-carousel-instructions" id={instructionsId}>Swipe or use the arrow buttons to explore</span>
          <div>
            <button type="button" onClick={() => move(-1)} disabled={!canGoBack} aria-controls={id} aria-label={`Previous item in ${label}`}>
              <ChevronLeft aria-hidden="true" />
            </button>
            <button type="button" onClick={() => move(1)} disabled={!canGoForward} aria-controls={id} aria-label={`Next item in ${label}`}>
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

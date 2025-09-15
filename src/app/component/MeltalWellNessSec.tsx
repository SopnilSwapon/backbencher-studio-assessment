"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function MentalWellNessSec() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // tweak these to change how many px of scroll make the stack happen and vertical move afterwards
  const STACK_DISTANCE = 300; // px consumed to complete stacking
  const VERTICAL_DISTANCE = 600; // px consumed to move vertically after stacking
  const TOTAL_DISTANCE = STACK_DISTANCE + VERTICAL_DISTANCE;

  // raw motion values (fast, immediate)
  const stackMv = useMotionValue(0);
  const vertMv = useMotionValue(0);

  // springs for smoother visuals
  const stackSpring = useSpring(stackMv, { stiffness: 250, damping: 30 });
  const vertSpring = useSpring(vertMv, { stiffness: 250, damping: 30 });

  const [isPinned, setIsPinned] = useState(false); // pin animation wrapper to viewport while consuming scroll
  const [headerShown, setHeaderShown] = useState(false);

  const images = [
    "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    "https://images.pexels.com/photos/1109543/pexels-photo-1109543.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
  ];

  useEffect(() => {
    let rafId = 0;

    const clamp = (v: number, a: number, b: number) =>
      Math.min(Math.max(v, a), b);

    const handle = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const top = rect.top;

      // not reached top yet -> reset and unpin
      if (top > 0) {
        stackMv.set(0);
        vertMv.set(0);
        if (isPinned) setIsPinned(false);
        if (headerShown) setHeaderShown(false);
        return;
      }

      // how many px the section has scrolled past the viewport top
      const scrolled = -top;

      if (scrolled < TOTAL_DISTANCE) {
        // while we are within the stack+vertical consumption zone, pin the animation wrapper
        if (!isPinned) setIsPinned(true);

        // stacking progress (0..1)
        const stackProgress = clamp(scrolled / STACK_DISTANCE, 0, 1);
        stackMv.set(stackProgress);

        if (stackProgress < 1) {
          // stacking in progress -> freeze vertical movement
          vertMv.set(0);
          if (headerShown) setHeaderShown(false);
        } else {
          // stacking finished -> compute vertical progress from remaining scroll
          const extra = scrolled - STACK_DISTANCE;
          const vertProgress = clamp(extra / VERTICAL_DISTANCE, 0, 1);
          vertMv.set(vertProgress);
          if (!headerShown && vertProgress > 0) setHeaderShown(true);
        }
      } else {
        // consumed both stacking and vertical distances -> unpin and cap values
        if (isPinned) setIsPinned(false);
        stackMv.set(1);
        vertMv.set(1);
        if (!headerShown) setHeaderShown(true);
      }
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handle);
    };

    // initial run & listeners
    handle();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // note: we intentionally don't include motion values in deps to avoid re-registering listeners
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPinned, headerShown]);

  // transforms per image
  const xTransforms = images.map((_, i) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(stackSpring, (v) => {
      const leftShift = -205 * i; // fully stacked left offset
      const layerRightOffset = i * 8; // slight right offset per layer
      return leftShift * v + layerRightOffset * v;
    }),
  );

  const scaleTransforms = images.map((_, i) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(stackSpring, (v) => {
      const targetScale = 1 - 0.05 * i; // e.g. 1, 0.95, 0.9...
      // interpolate from 1 -> targetScale
      return 1 + (targetScale - 1) * v;
    }),
  );

  // IMPORTANT: use the raw stackMv (not the spring) for the freeze check so spring smoothing doesn't leak tiny vertical moves.
  const yTransform = useTransform(
    [stackMv, vertSpring],
    ([stackRaw, vSpring]) => {
      if (stackRaw < 1) return 0; // freeze vertical position while stacking (raw value)
      return -vSpring * 130; // allow vertical movement after stacking completes
    },
  );

  const headerOpacity = useTransform(stackSpring, [0.95, 1], [0, 1]);
  const headerX = useTransform(stackSpring, [0.8, 1], [200, 0]); // right to center

  return (
    <div className="min-h-[200vh] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <section ref={containerRef} className="h-screen relative overflow-hidden">
        {/* animation wrapper: fixed while pinned (so it doesn't move with page), absolute otherwise */}
        <div
          className={
            isPinned
              ? "fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none z-40"
              : "relative w-full h-screen flex items-center justify-center pointer-events-none"
          }
        >
          {/* Visual area (centered) */}
          <div className="relative w-[1030px] h-[400px] pointer-events-auto">
            {/* Header - fades in when stacking is complete */}
            {/* <motion.h2
              style={{ opacity: headerOpacity }}
              className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-lg font-semibold select-none pointer-events-none"
            >
              Stacking complete
            </motion.h2> */}
            <motion.h2
              style={{ opacity: headerOpacity, x: headerX }}
              className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-lg font-semibold select-none pointer-events-none"
            >
              Stacking complete
            </motion.h2>

            {/* Images */}
            {images.map((src, i) => {
              const baseLeft = i * 205;
              const z = 5 - i;
              return (
                <motion.div
                  key={i}
                  className="absolute top-0"
                  style={{
                    left: `${baseLeft}px`,
                    x: xTransforms[i],
                    y: yTransform,
                    scale: scaleTransforms[i],
                    zIndex: z,
                  }}
                >
                  <img
                    src={src}
                    alt={`Image ${i + 1}`}
                    className="w-[200px] h-[200px] object-cover rounded-lg shadow-2xl ring-2 ring-white/20"
                    draggable={false}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

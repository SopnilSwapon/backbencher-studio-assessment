// /* eslint-disable @next/next/no-img-element */
// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// export default function MentalWellNessSec() {
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   // tweak these to change how many px of scroll make the stack happen and vertical move afterwards
//   const STACK_DISTANCE = 300; // px consumed to complete stacking
//   const VERTICAL_DISTANCE = 600; // px consumed to move vertically after stacking
//   const TOTAL_DISTANCE = STACK_DISTANCE + VERTICAL_DISTANCE;

//   // raw motion values (fast, immediate)
//   const stackMv = useMotionValue(0);
//   const vertMv = useMotionValue(0);

//   // springs for smoother visuals
//   const stackSpring = useSpring(stackMv, { stiffness: 250, damping: 30 });
//   const vertSpring = useSpring(vertMv, { stiffness: 250, damping: 30 });

//   const [isPinned, setIsPinned] = useState(false); // pin animation wrapper to viewport while consuming scroll
//   const [headerShown, setHeaderShown] = useState(false);

//   const images = [
//     "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
//     "https://images.pexels.com/photos/1109543/pexels-photo-1109543.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
//     "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
//     "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
//     "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
//   ];

//   useEffect(() => {
//     let rafId = 0;

//     const clamp = (v: number, a: number, b: number) =>
//       Math.min(Math.max(v, a), b);

//     const handle = () => {
//       const el = containerRef.current;
//       if (!el) return;

//       const rect = el.getBoundingClientRect();
//       const top = rect.top;

//       // not reached top yet -> reset and unpin
//       if (top > 0) {
//         stackMv.set(0);
//         vertMv.set(0);
//         if (isPinned) setIsPinned(false);
//         if (headerShown) setHeaderShown(false);
//         return;
//       }

//       // how many px the section has scrolled past the viewport top
//       const scrolled = -top;

//       if (scrolled < TOTAL_DISTANCE) {
//         // while we are within the stack+vertical consumption zone, pin the animation wrapper
//         if (!isPinned) setIsPinned(true);

//         // stacking progress (0..1)
//         const stackProgress = clamp(scrolled / STACK_DISTANCE, 0, 1);
//         stackMv.set(stackProgress);

//         if (stackProgress < 1) {
//           // stacking in progress -> freeze vertical movement
//           vertMv.set(0);
//           if (headerShown) setHeaderShown(false);
//         } else {
//           // stacking finished -> compute vertical progress from remaining scroll
//           const extra = scrolled - STACK_DISTANCE;
//           const vertProgress = clamp(extra / VERTICAL_DISTANCE, 0, 1);
//           vertMv.set(vertProgress);
//           if (!headerShown && vertProgress > 0) setHeaderShown(true);
//         }
//       } else {
//         // consumed both stacking and vertical distances -> unpin and cap values
//         if (isPinned) setIsPinned(false);
//         stackMv.set(1);
//         vertMv.set(1);
//         if (!headerShown) setHeaderShown(true);
//       }
//     };

//     const onScroll = () => {
//       if (rafId) cancelAnimationFrame(rafId);
//       rafId = requestAnimationFrame(handle);
//     };

//     // initial run & listeners
//     handle();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     window.addEventListener("resize", onScroll);

//     return () => {
//       if (rafId) cancelAnimationFrame(rafId);
//       window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("resize", onScroll);
//     };
//     // note: we intentionally don't include motion values in deps to avoid re-registering listeners
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isPinned, headerShown]);

//   // transforms per image
//   const xTransforms = images.map((_, i) =>
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     useTransform(stackSpring, (v) => {
//       const leftShift = -205 * i; // fully stacked left offset
//       const layerRightOffset = i * 8; // slight right offset per layer
//       return leftShift * v + layerRightOffset * v;
//     }),
//   );

//   const scaleTransforms = images.map((_, i) =>
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     useTransform(stackSpring, (v) => {
//       const targetScale = 1 - 0.05 * i; // e.g. 1, 0.95, 0.9...
//       // interpolate from 1 -> targetScale
//       return 1 + (targetScale - 1) * v;
//     }),
//   );

//   // IMPORTANT: use the raw stackMv (not the spring) for the freeze check so spring smoothing doesn't leak tiny vertical moves.
//   const yTransform = useTransform(
//     [stackMv, vertSpring],
//     ([stackRaw, vSpring]) => {
//       if (stackRaw < 1) return 0; // freeze vertical position while stacking (raw value)
//       return -vSpring * 130; // allow vertical movement after stacking completes
//     },
//   );

//   const headerOpacity = useTransform(stackSpring, [0.95, 1], [0, 1]);
//   const headerX = useTransform(stackSpring, [0.8, 1], [200, 0]); // right to center

//   return (
//     <div className="min-h-[200vh] bg-[#E7E7E7]">
//       <section ref={containerRef} className="h-screen relative overflow-hidden">
//         {/* animation wrapper: fixed while pinned (so it doesn't move with page), absolute otherwise */}
//         <div
//           className={
//             isPinned
//               ? "fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none z-40"
//               : "relative w-full h-screen flex items-center justify-center pointer-events-none"
//           }
//         >
//           {/* Visual area (centered) */}
//           <div className="relative w-[1030px] h-[400px] pointer-events-auto">
//             <motion.h2
//               style={{ opacity: headerOpacity, x: headerX }}
//               className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-lg font-semibold select-none pointer-events-none"
//             >
//               Stacking complete
//             </motion.h2>

//             {/* Images */}
//             {images.map((src, i) => {
//               const baseLeft = i * 225;
//               const z = 5 - i;
//               return (
//                 <motion.div
//                   key={i}
//                   className="absolute top-20"
//                   style={{
//                     left: `${baseLeft}px`,
//                     x: xTransforms[i],
//                     y: yTransform,
//                     scale: scaleTransforms[i],
//                     zIndex: z,
//                   }}
//                 >
//                   <img
//                     src={src}
//                     alt={`Image ${i + 1}`}
//                     className="w-[380px] h-[240px] object-cover rounded-lg shadow-2xl ring-2 ring-white/20"
//                     draggable={false}
//                   />
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// ______________________latest this________________
// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// export default function MentalWellNessSec() {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const stickyRef = useRef<HTMLDivElement | null>(null);

//   // Motion values
//   const scrollProgress = useMotionValue(0);
//   const scrollProgressSpring = useSpring(scrollProgress, {
//     stiffness: 100,
//     damping: 30,
//   });

//   const [isSticky, setIsSticky] = useState(false);

//   const images = [
//     "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//     "https://images.pexels.com/photos/1109543/pexels-photo-1109543.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//     "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//     "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//     "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//   ];

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!containerRef.current) return;

//       const rect = containerRef.current.getBoundingClientRect();
//       const containerHeight = containerRef.current.offsetHeight;
//       const windowHeight = window.innerHeight;

//       // Calculate scroll progress
//       const scrollStart = 0;
//       const scrollEnd = containerHeight - windowHeight;
//       const currentScroll = Math.max(0, -rect.top);

//       let progress = 0;
//       if (scrollEnd > 0) {
//         progress = Math.min(
//           1,
//           Math.max(0, (currentScroll - scrollStart) / scrollEnd),
//         );
//       }

//       // Sticky behavior
//       if (rect.top <= 0 && rect.bottom > windowHeight) {
//         setIsSticky(true);
//       } else {
//         setIsSticky(false);
//       }

//       scrollProgress.set(progress);
//     };

//     handleScroll();
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     window.addEventListener("resize", handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       window.removeEventListener("resize", handleScroll);
//     };
//   }, [scrollProgress]);

//   // Transform calculations for each image
//   const getImageTransform = (index: number) => {
//     return useTransform(scrollProgressSpring, (progress) => {
//       // Initial positions (spread out horizontally)
//       const initialX = index * 27; // 27vw spacing like the original

//       // Final position (stacked)
//       const finalX = 0;

//       // Interpolate between initial and final positions
//       const currentX = initialX - (initialX - finalX) * progress;

//       return `${currentX}vw`;
//     });
//   };

//   const getImageScale = (index: number) => {
//     return useTransform(scrollProgressSpring, (progress) => {
//       const initialScale = 1;
//       const finalScale = 1 - index * 0.05; // Each image gets slightly smaller

//       return initialScale - (initialScale - finalScale) * progress;
//     });
//   };

//   // Content animation
//   const contentOpacity = useTransform(scrollProgressSpring, [0.8, 1], [0, 1]);
//   const contentX = useTransform(scrollProgressSpring, (progress) => {
//     return `${35 - 35 * progress}vw`;
//   });

//   return (
//     <div className="bg-[#E7E7E7]">
//       <section
//         ref={containerRef}
//         className="section-scroll-images relative"
//         style={{ height: "300vh" }} // Increased height for more scroll distance
//       >
//         <div
//           ref={stickyRef}
//           className={`sticky-horizontal-cards ${
//             isSticky ? "fixed top-0 left-0 w-full" : "relative"
//           } h-screen overflow-hidden`}
//         >
//           <div className="horizontal-cards h-full flex items-center justify-start relative">
//             <div className="h-cards-wrapper relative w-full h-full">
//               {/* Images */}
//               {images.map((src, index) => {
//                 const xTransform = getImageTransform(index);
//                 const scaleTransform = getImageScale(index);

//                 return (
//                   <motion.div
//                     key={index}
//                     className={`fr-${
//                       index + 1
//                     } absolute top-1/2 -translate-y-1/2`}
//                     style={{
//                       x: xTransform,
//                       scale: scaleTransform,
//                       zIndex: 10 - index,
//                       transformOrigin: "center center",
//                     }}
//                   >
//                     <img
//                       src={src}
//                       alt={`Mental wellness ${index + 1}`}
//                       className="cover-image w-[400px] h-[300px] object-cover rounded-2xl shadow-2xl"
//                       loading="lazy"
//                       draggable={false}
//                     />
//                   </motion.div>
//                 );
//               })}

//               {/* Content */}
//               <motion.div
//                 className="h-cards-content absolute top-1/2 -translate-y-1/2 text-center z-20"
//                 style={{
//                   opacity: contentOpacity,
//                   x: contentX,
//                 }}
//               >
//                 <div className="h-xl text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 max-w-2xl">
//                   Your mental wellness journey starts now
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Additional content sections for normal scrolling */}
//       <section className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center max-w-4xl mx-auto px-6">
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
//             Continue Your Journey
//           </h2>
//           <p className="text-xl text-gray-600 leading-relaxed">
//             Discover tools, resources, and support to help you on your path to
//             better mental health and wellbeing.
//           </p>
//         </div>
//       </section>

//       <section className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="text-center max-w-4xl mx-auto px-6">
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
//             Take the Next Step
//           </h2>
//           <p className="text-xl text-gray-600 leading-relaxed">
//             Ready to begin? Explore our comprehensive resources and start
//             building healthier habits today.
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// }
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function MentalWellNessSec() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const images = [
    "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    "https://images.pexels.com/photos/1109543/pexels-photo-1109543.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  ];

  // Stacking animation progress (0 to 0.6 of total scroll)
  const stackProgress = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);

  // Text animation (appears when stacking is almost done)
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const textX = useTransform(scrollYProgress, [0.5, 0.7], [100, 0]);

  // Container movement (moves up naturally after animation)
  const containerY = useTransform(scrollYProgress, [0, 1], [0, 0]); // No forced movement

  // Image transforms
  const getImageX = (index: number) => {
    return useTransform(stackProgress, (progress) => {
      const initialX = index * 300; // Initial spacing
      const finalX = index * 20; // Final stacked position
      return initialX - (initialX - finalX) * progress;
    });
  };

  const getImageScale = (index: number) => {
    return useTransform(stackProgress, (progress) => {
      const initialScale = 1;
      const finalScale = 1 - index * 0.05;
      return initialScale - (initialScale - finalScale) * progress;
    });
  };

  const getImageRotate = (index: number) => {
    return useTransform(stackProgress, (progress) => {
      const initialRotate = 0;
      const finalRotate = index * 2; // Slight rotation for depth
      return initialRotate + (finalRotate - initialRotate) * progress;
    });
  };

  return (
    <div className="bg-[#E7E7E7]">
      {/* Spacer before animation */}
      <div className="h-screen bg-[#E7E7E7] flex items-center justify-center">
        <h1 className="text-5xl font-bold text-gray-800">
          Scroll down to see the magic
        </h1>
      </div>

      {/* Main animation container */}
      <div
        ref={containerRef}
        className="relative bg-[#E7E7E7]"
        style={{ height: "400vh" }}
      >
        {/* Sticky wrapper */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="relative w-full max-w-7xl mx-auto px-8">
            {/* Images */}
            <div className="relative">
              {images.map((src, index) => {
                const x = getImageX(index);
                const scale = getImageScale(index);
                const rotate = getImageRotate(index);

                return (
                  <motion.div
                    key={index}
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{
                      x,
                      scale,
                      rotate,
                      zIndex: 10 - index,
                      left: "100px",
                    }}
                  >
                    <img
                      src={src}
                      alt={`Mental wellness ${index + 1}`}
                      className="w-[320px] h-[220px] object-cover rounded-2xl shadow-2xl ring-2 ring-white/30"
                      loading="lazy"
                      draggable={false}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Text content */}
            <motion.div
              className="absolute top-1/2 right-20 -translate-y-1/2 text-right z-20 max-w-2xl"
              style={{
                opacity: textOpacity,
                x: textX,
              }}
            >
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Your mental
                <br />
                wellness journey
                <br />
                <span className="text-blue-600">starts now</span>
              </h2>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                Discover tools and resources designed to support your mental
                health and overall wellbeing.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content sections that will naturally push the animation up */}
      <section className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
            Take Control of Your Mental Health
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Mental wellness is a journey, not a destination. Every small step
            you take towards understanding and caring for your mental health
            makes a significant difference.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Mindfulness
              </h3>
              <p className="text-gray-600">
                Practice being present and aware of your thoughts and feelings.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Self-Care
              </h3>
              <p className="text-gray-600">
                Develop healthy habits that nurture your mind and body.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Support
              </h3>
              <p className="text-gray-600">
                Connect with others and build a strong support network.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
            Start Your Wellness Journey Today
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-12">
            Your mental health matters. Take the first step towards a healthier,
            happier you.
          </p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
            Get Started
          </button>
        </div>
      </section>

      <section className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            You're Not Alone
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Remember, seeking help is a sign of strength, not weakness. Your
            journey to better mental health is valid and important.
          </p>
        </div>
      </section>
    </div>
  );
}

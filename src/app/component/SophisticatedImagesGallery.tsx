/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function SophisticatedImagesGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Center image transformations
  const centerImageWidth = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7],
    ["45vw", "80vw", "100vw"],
  );
  const centerImageHeight = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7],
    ["60vh", "80vh", "103vh"],
  );

  // Text overlay transformations
  const textOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.65, 0.8],
    [0, 1, 1],
  );
  const overlayOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 0.7]);

  // Side columns transformations
  const leftColX = useTransform(scrollYProgress, [0, 0.4], ["0vw", "-25vw"]);
  const rightColX = useTransform(scrollYProgress, [0, 0.4], ["0vw", "25vw"]);

  // Individual card transformations in left column
  const leftCard1Y = useTransform(scrollYProgress, [0, 0.3], ["0px", "-100px"]);
  const leftCard3Y = useTransform(scrollYProgress, [0, 0.3], ["0px", "100px"]);

  // Individual card transformations in right column
  const rightCard1Y = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["0px", "-100px"],
  );
  const rightCard3Y = useTransform(scrollYProgress, [0, 0.3], ["0px", "100px"]);

  // Center column transformations
  const centerCard1Y = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["0vh", "-20vh"],
  );
  const centerCard2Y = useTransform(scrollYProgress, [0, 0.3], ["0vh", "20vh"]);

  // Image URLs using the actual images from your HTML
  const images = {
    left: [
      "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f9c31841d04e272a85216f_bg-cloud-63.avif",
      "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f75435261184f880702d40_bg-cloud-43.avif",
      "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f9c6586f1024288c4e6ed8_bg-cloud-64.avif",
    ],
    center: [
      "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f9c6586f1024288c4e6ed8_bg-cloud-64.avif",
      "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f9d38f41d04e272a8d2926_bg-cloud-66.avif",
      "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f7ee4df847a9fb30978659_bg-cloud-54.avif",
    ],
    right: [
      "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f1eff7704d86833488bc4e_bg-cloud-17.avif",
      "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f89444d1d997a80bbd9c44_bg-cloud-61.avif",
      "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f288caa25e4431e4d74500_bg-cloud-30.avif",
    ],
  };

  return (
    <div className="relative mb-30">
      {/* Main gallery section */}
      <div ref={containerRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
          {/* Center expanding image */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              width: centerImageWidth,
              height: centerImageHeight,
            }}
          >
            <div className="relative w-full h-full rounded-[24px] overflow-hidden">
              <img
                src={images.center[0]}
                alt="Center feature"
                className={`w-full h-full object-cover opacity-[${overlayOpacity}]`}
              />

              {/* Text overlay */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: overlayOpacity }}
              >
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
              </motion.div>

              <motion.div
                className="absolute inset-0 bg:opacity-25 flex items-center justify-center z-20"
                style={{ opacity: textOpacity, background: "rgba(0,0,0,0.6)" }}
              >
                <div className="text-center text-white px-8">
                  <div className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-4">
                    Personal Growth
                  </div>
                  <h1 className="text-4xl md:text-7xl font-bold mb-4 leading-tight">
                    AI that understands <br /> your emotions
                  </h1>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Image gallery grid */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Left column */}
            <motion.div
              className="absolute -left-20 top-1/2 -translate-y-1/2 space-y-4 z-5"
              style={{ x: leftColX }}
            >
              <motion.div
                className="w-111 h-70 rounded-[24px] overflow-hidden shadow-lg"
                style={{ y: leftCard1Y }}
              >
                <img
                  src={images.left[0]}
                  alt="Left 1"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div className="w-111 h-70 rounded-[24px] overflow-hidden shadow-lg">
                <img
                  src={images.left[1]}
                  alt="Left 2"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                className="w-111 h-70 rounded-[24px] overflow-hidden shadow-lg"
                style={{ y: leftCard3Y }}
              >
                <img
                  src={images.left[2]}
                  alt="Left 3"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Center column (additional cards) */}
            <motion.div className="absolute inset-0 flex flex-col items-center justify-center space-y-8 z-1">
              <motion.div
                className="w-166 h-42 rounded-[24px] -mt-10 rounded-t-none overflow-hidden shadow-lg"
                style={{ y: centerCard1Y }}
              >
                <img
                  src={images.center[1]}
                  alt="Center top"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* Spacer for main center image */}
              <div className="w-54 h-70" />
              <motion.div
                className="w-166 h-32 mt-34 rounded-[24px] rounded-b-none overflow-hidden shadow-lg"
                style={{ y: centerCard2Y }}
              >
                <img
                  src={images.center[2]}
                  alt="Center bottom"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Right column */}
            <motion.div
              className="absolute -right-20 top-1/2 -translate-y-1/2 space-y-4 z-5"
              style={{ x: rightColX }}
            >
              <motion.div
                className="w-111 h-70 rounded-[24px] overflow-hidden shadow-lg"
                style={{ y: rightCard1Y }}
              >
                <img
                  src={images.right[0]}
                  alt="Right 1"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div className="w-111 h-70 rounded-[24px] overflow-hidden shadow-lg">
                <img
                  src={images.right[1]}
                  alt="Right 2"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                className="w-111 h-70 rounded-[24px] overflow-hidden shadow-lg"
                style={{ y: rightCard3Y }}
              >
                <img
                  src={images.right[2]}
                  alt="Right 3"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

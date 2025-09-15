/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const WebflowScrollGallery: React.FC = () => {
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
    ["60vh", "80vh", "100vh"],
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

  // Image URLs - using the actual images from your HTML
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
    <div className="relative bg-gray-50">
      {/* Initial content */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Scroll to Experience
          </h1>
          <p className="text-xl text-gray-600">Immersive Image Gallery</p>
        </div>
      </div>

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
                className="w-full h-full object-cover"
              />

              {/* Text overlay */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: overlayOpacity }}
              >
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
              </motion.div>

              <motion.div
                className="absolute inset-0 flex items-center justify-center z-20"
                style={{ opacity: textOpacity }}
              >
                <div className="text-center text-white px-8">
                  <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-4">
                    Personal Growth
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                    AI that understands your emotions
                  </h1>
                  <p className="text-lg md:text-xl opacity-90 max-w-2xl">
                    Experience the future of emotional intelligence with our
                    revolutionary AI technology
                  </p>
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
              <div className="w-54 h-70" /> {/* Spacer for main center image */}
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

      {/* Bottom content */}
      <div className="relative z-30 bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Continue Your Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover more about our innovative AI solutions that understand
              and respond to human emotions with unprecedented accuracy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Emotion Detection
              </h3>
              <p className="text-gray-600">
                Advanced algorithms that can identify and interpret human
                emotions in real-time through multiple channels.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Personalized Responses
              </h3>
              <p className="text-gray-600">
                Tailored interactions that adapt to individual emotional states
                and preferences for optimal engagement.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Analytics Dashboard
              </h3>
              <p className="text-gray-600">
                Comprehensive insights and analytics to track emotional patterns
                and improve AI performance over time.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Explore Our Technology
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebflowScrollGallery;

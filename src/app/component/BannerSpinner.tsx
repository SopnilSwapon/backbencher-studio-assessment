"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface CircularScrollGalleryProps {
  images?: string[];
}

const BannerSpinner: React.FC<CircularScrollGalleryProps> = ({
  images = [
    "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1624504/pexels-photo-1624504.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1366942/pexels-photo-1366942.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1624497/pexels-photo-1624497.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1040882/pexels-photo-1040882.jpeg?auto=compress&cs=tinysrgb&w=400",
  ],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth spring animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  // Transform scroll progress to different animation phases
  const circleFormationProgress = useTransform(
    smoothProgress,
    [0.1, 0.4],
    [0, 1],
  );
  const circleRotationProgress = useTransform(
    smoothProgress,
    [0.4, 0.7],
    [0, 1],
  );
  const contentProgress = useTransform(smoothProgress, [0.7, 0.8], [0, 1]);

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const unsubscribe = contentProgress.onChange((value) => {
      setShowContent(value > 0.5);
    });
    return unsubscribe;
  }, [contentProgress]);

  const getImageMotionValues = (index: number) => {
    const totalImages = images.length;
    const centerIndex = (totalImages - 1) / 2;

    // Initial horizontal positions (all aligned horizontally)
    const initialX = (index - centerIndex) * 205; // 200px width + 5px gap
    const initialY = 0;

    // Final circular positions
    const angle = index * (360 / totalImages); // Equal distribution around circle
    const radius = 150;
    const finalX = Math.cos((angle * Math.PI) / 180) * radius;
    const finalY = Math.sin((angle * Math.PI) / 180) * radius;

    // Animated position values
    const x = useTransform(circleFormationProgress, [0, 1], [initialX, finalX]);
    const y = useTransform(circleFormationProgress, [0, 1], [initialY, finalY]);

    // Size animation
    const size = useTransform(circleFormationProgress, [0, 1], [200, 160]);

    // Rotation animation for the entire circle
    const rotation = useTransform(circleRotationProgress, [0, 1], [0, 360]);

    return { x, y, size, rotation };
  };

  // Background color animation
  const backgroundColor = useTransform(
    circleFormationProgress,
    [0, 1],
    ["rgb(17, 24, 39)", "rgb(88, 28, 135)"],
  );

  return (
    <div className="relative">
      {/* Gallery Container */}
      <motion.div
        ref={containerRef}
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {images.map((src, index) => {
            const { x, y, size, rotation } = getImageMotionValues(index);

            return (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  x,
                  y,
                  width: size,
                  height: size,
                  rotate: rotation,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <motion.img
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg shadow-2xl"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(255, 255, 255, 0.5)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Center glow effect for circular mode */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 blur-xl"
            style={{
              opacity: useTransform(circleFormationProgress, [0, 1], [0, 0.3]),
              rotate: useTransform(circleRotationProgress, [0, 1], [0, 360]),
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Spacer for scroll */}
      <div className="h-[300vh]" />

      {/* Content that appears after circle animation */}
      <motion.div
        className="min-h-screen bg-white p-8"
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: showContent ? 1 : 0,
          y: showContent ? 0 : 100,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-gray-800 mb-8 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 50 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Welcome to Our Gallery
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: showContent ? 1 : 0,
                x: showContent ? 0 : -50,
              }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold text-gray-700">
                Amazing Transformation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                You just witnessed our unique circular gallery transformation
                powered by Framer Motion. The images started in a horizontal
                line, then gradually formed a perfect circle as you scrolled.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The left and right images moved down while the center images
                adjusted their positions to create the circular formation, then
                the entire circle rotated 360 degrees with buttery smooth
                animations.
              </p>
            </motion.div>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: showContent ? 1 : 0,
                x: showContent ? 0 : 50,
              }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold text-gray-700">
                Interactive Design
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Each image smoothly transitions from 200px to 160px during the
                circle formation, with spring-based animations for natural
                movement and hover effects for interactivity.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Try scrolling back up to see the reverse animation - the circle
                will transform back into the horizontal layout seamlessly with
                Framer Motions powerful animation system.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BannerSpinner;

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface CircularScrollGalleryProps {
  images?: string[];
}

const CircleImageGallery: React.FC<CircularScrollGalleryProps> = ({
  images = [
    "https://images.pexels.com/photos/1040882/pexels-photo-1040882.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f1eff7704d86833488bc4e_bg-cloud-17.avif",
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f89444d1d997a80bbd9c44_bg-cloud-61.avif",
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f288caa25e4431e4d74500_bg-cloud-30.avif",
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f9c6586f1024288c4e6ed8_bg-cloud-64.avif",
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f9d38f41d04e272a8d2926_bg-cloud-66.avif",
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f7ee4df847a9fb30978659_bg-cloud-54.avif",
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f9c31841d04e272a85216f_bg-cloud-63.avif",
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f75435261184f880702d40_bg-cloud-43.avif",
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f9c6586f1024288c4e6ed8_bg-cloud-64.avif",
  ],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end start"],
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
  const getImageMotionValues = (index: number) => {
    const totalImages = images.length;
    // Start at 90° (top center), distribute evenly around 360°
    const startAngle = 90;
    const angleStep = 360 / totalImages;
    const angle = startAngle + index * angleStep;
    const radius = 300;
    const finalX = Math.cos((angle * Math.PI) / 180) * radius;
    const finalY = Math.sin((angle * Math.PI) / 180) * radius;

    // Initial horizontal positions (all aligned horizontally)
    const centerIndex = (totalImages - 1) / 2;
    const initialX = (index - centerIndex) * 205;
    const initialY = 0;

    // Animated position values
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const x = useTransform(circleFormationProgress, [0, 1], [initialX, finalX]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const y = useTransform(circleFormationProgress, [0, 1], [initialY, finalY]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const size = useTransform(circleFormationProgress, [0, 1], [200, 200]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const rotation = useTransform(circleRotationProgress, [0, 1], [0, 360]);

    return { x, y, size, rotation };
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Gallery Container */}
      <motion.div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative w-full h-full flex justify-center items-center -mt-16">
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
                  className="w-full h-full object-cover rounded-[24px] shadow-2xl"
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
            className="w-32 h-32 rounded-full"
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
      <div className="h-[100vh]" />
    </div>
  );
};

export default CircleImageGallery;

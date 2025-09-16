"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

export default function StackImageGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress
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

  // Stacking animation progress
  const stackProgress = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);

  // Text animation
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const textX = useTransform(scrollYProgress, [0.5, 0.7], [100, 0]);

  return (
    <div className="bg-[#E7E7E7]">
      <div
        ref={containerRef}
        className="relative bg-[#E7E7E7]"
        style={{ height: "400vh" }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="relative w-full max-w-7xl mx-auto px-8">
            {/* stack images */}
            <div className="relative">
              {images.map((src, index) => {
                return (
                  <div key={index}>
                    <ImageCard
                      src={src}
                      index={index}
                      stackProgress={stackProgress}
                    />
                  </div>
                );
              })}
            </div>

            {/* text content*/}
            <motion.div
              className="absolute top-1/2 right-20 -translate-y-1/2 z-20 max-w-2xl"
              style={{ opacity: textOpacity, x: textX }}
            >
              <h2 className="text-5xl text-[#303a46] lg:text-6xl font-bold">
                Your mental
                <br />
                wellness journey
                <br />
                starts now
              </h2>
              <p className="text-xl text-[#303a46] mt-6 leading-relaxed">
                Discover tools and resources designed to support your mental
                health and overall wellbeing.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

type TImageCardProps = {
  src: string;
  index: number;
  stackProgress: MotionValue<number>;
};

const ImageCard = ({ src, index, stackProgress }: TImageCardProps) => {
  const x = useTransform(stackProgress, [0, 1], [index * 400, index * 20]);
  const scale = useTransform(stackProgress, [0, 1], [1, 1 - index * 0.05]);
  return (
    <motion.div
      key={index}
      className="absolute top-1/2 -translate-y-1/2"
      style={{ x, scale, zIndex: 10 - index, left: "0px" }}
    >
      <Image
        src={src}
        alt={`Mental wellness ${index + 1}`}
        width={380}
        height={360}
        className="w-[380px] h-[360px] object-cover rounded-2xl shadow-2xl ring-2 ring-white/30"
        draggable={false}
        priority={index === 0}
      />
    </motion.div>
  );
};

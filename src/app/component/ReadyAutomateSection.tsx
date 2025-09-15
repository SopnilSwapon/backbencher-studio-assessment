"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import AppButton from "./common/AppButton";

export default function ReadyAutomateSection() {
  // Static images (immutable tuple for strict typing)
  const images = [
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67ee1b85995266773abd081b_img-01.avif",
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f89444d1d997a80bbd9c44_bg-cloud-61.avif",
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f7f5b376f614a742795320_bg-cloud-59.avif",
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f9c6586f1024288c4e6ed8_bg-cloud-64.avif",
  ] as const;

  // Duplicate for seamless scroll
  const tickerImages = [...images, ...images];

  return (
    <section className="py-3 mx-34 px-6">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-3">
          {/* Left static image */}
          <div className="relative">
            <Image
              src="https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67fd3b3b64ef722b8bd2b5c4_bg-cloud-77.avif"
              alt="Cloud Background"
              width={554}
              height={660}
              className="md:h-[660px] lg:w-[554px] object-cover rounded-[24px]"
              priority
            />
          </div>

          {/* Right side's text, button ticker */}
          <div className="space-y-3">
            <div className="md:w-[554px] md:h-[448px] bg-[#EDF0F2] rounded-[24px] p-15">
              <AppButton
                className="bg-gray-200 text-sm"
                title="Ready to automate"
              />
              <h2 className="text-2xl md:text-3xl mt-3 text-[#303A46] font-semibold leading-snug">
                Stay on top of your recurring payments with ease
              </h2>
            </div>

            {/* Infinite scrolling ticker of images */}
            <div className="overflow-hidden rounded-[24px] relative w-full">
              <motion.div
                className="flex gap-3"
                style={{ width: "max-content" }}
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 25,
                  ease: "linear",
                }}
              >
                {tickerImages.map((image, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-50 h-50 rounded-[24px] overflow-hidden shadow-md"
                  >
                    <Image
                      src={image}
                      alt={`Ticker ${i + 1}`}
                      width={120}
                      height={120}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

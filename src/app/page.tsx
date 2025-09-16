import Navbar from "./component/Navbar";
import MentalWellNessSec from "./component/MeltalWellNessSec";
import Footer from "./component/Footer";
import FAQAccordion from "./component/FAQAccordion";
import ReadyAutomateSection from "./component/ReadyAutomateSection";
import { SophisticatedImagesGallery } from "./component/SophisticatedImagesGallery";
import CircleImageGallery from "./component/CircleImageGallery";
import BannerTitle from "./component/BannerTitle";
import AppButton from "./component/common/AppButton";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";
// import img1 from "@/images/10012.avif";
// import img2 from "@/images/10013.avif";
// import img3 from "@/images/10014.avif";
// import img4 from "@/images/10015.avif";
// import img5 from "@/images/10017.avif";
// import Image from "next/image";
export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <nav>
        <Navbar />
      </nav>
      <main className="sticky bg-white z-30 -mb-46 rounded-b-[60px]">
        {/* banner title section */}
        <BannerTitle />

        {/* Circle image gallery section */}
        <CircleImageGallery />

        <MentalWellNessSec />

        {/* hero spinner section */}
        <div className="content-spinner-wrapper mt-12 text-center">
          <div className="content-spinner">
            <div className="inner-heading-s">
              <div className="title-tag text-sm uppercase tracking-widest text-green-600 mb-2">
                Personal Growth
              </div>
              <div className="h-l text-2xl md:text-4xl font-semibold text-gray-900">
                A gentle space to understand yourself
              </div>
            </div>
          </div>
        </div>
        <SophisticatedImagesGallery />

        {/* Ready Automate section */}
        <ReadyAutomateSection />

        {/* FAQ Section */}
        <FAQAccordion />
        <AppButton
          className="fixed bottom-3 right-3 rounded-sm! font-semibold px-6 py-3 z-50"
          title="Get 50% OFF"
        />
      </main>

      {/* Footer section */}
      <Footer />
    </div>
  );
}

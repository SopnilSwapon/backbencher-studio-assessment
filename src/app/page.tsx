import Link from "next/link";
import Image from "next/image";
import Navbar from "./component/Navbar";
import BannerSpinner from "./component/BannerSpinner";
import MentalWellNessSec from "./component/MeltalWellNessSec";
import Footer from "./component/Footer";
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
      {/* <Navbar /> */}

      {/* Hero title section */}
      <div className="py-10">
        <div className="text-center mx-auto">
          <Link
            href="/request-demo"
            className="p-[6px] px-4 rounded-full bg-[#F1F1F1]"
          >
            Personal Growth
          </Link>
          <h1 className="text-4xl md:text-8xl font-bold text-[#303A46] my-6">
            Feel more <br /> human every day
          </h1>
          <Link
            href="/request-demo"
            className="px-[30px] py-4 rounded-full bg-[#D3EFA2] hover:bg-[#B7DB7D] transition"
          >
            Request demo
          </Link>
        </div>
      </div>
      <div className="py-10">
        <div className="text-center mx-auto">
          <Link
            href="/request-demo"
            className="p-[6px] px-4 rounded-full bg-[#F1F1F1]"
          >
            Personal Growth
          </Link>
          <h1 className="text-4xl md:text-8xl font-bold text-[#303A46] my-6">
            Feel more <br /> human every day
          </h1>
          <Link
            href="/request-demo"
            className="px-[30px] py-4 rounded-full bg-[#D3EFA2] hover:bg-[#B7DB7D] transition"
          >
            Request demo
          </Link>
        </div>
      </div>
      <div className="py-10">
        <div className="text-center mx-auto">
          <Link
            href="/request-demo"
            className="p-[6px] px-4 rounded-full bg-[#F1F1F1]"
          >
            Personal Growth
          </Link>
          <h1 className="text-4xl md:text-8xl font-bold text-[#303A46] my-6">
            Feel more <br /> human every day
          </h1>
          <Link
            href="/request-demo"
            className="px-[30px] py-4 rounded-full bg-[#D3EFA2] hover:bg-[#B7DB7D] transition"
          >
            Request demo
          </Link>
        </div>
      </div>

      <MentalWellNessSec />
      <BannerSpinner />

      {/* hero spinner section */}
      {/* Content */}
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
      {/* Footer section */}
      <Footer />
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import Navbar from "./component/Navbar"
import BannerSpinner from "./component/BannerSpinner";

export default function Home() {
  return (
   <div className="min-h-screen">
    {/* Navbar */}
    <Navbar/>

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
      Feel more <br/> human every day
    </h1>
     <Link
            href="/request-demo"
            className="px-[30px] py-4 rounded-full bg-[#D3EFA2] hover:bg-[#B7DB7D] transition"
          >
            Request demo
          </Link>
  </div>
</div>

{/* hero spinner section */}

<BannerSpinner/>
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
</div>
  );
}

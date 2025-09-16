import Navbar from "./component/Navbar";
import StackImageGallery from "./component/StackImageGallery";
import Footer from "./component/Footer";
import FAQAccordion from "./component/FAQAccordion";
import ReadyAutomateSection from "./component/ReadyAutomateSection";
import { SophisticatedImagesGallery } from "./component/SophisticatedImagesGallery";
import CircleImageGallery from "./component/CircleImageGallery";
import BannerTitle from "./component/BannerTitle";
import AppButton from "./component/common/AppButton";

export default function Home() {
  return (
    <div>
      {/* Navbar */}

      <Navbar />
      <main className="sticky bg-white z-30 -mb-46 rounded-b-[60px]">
        {/* banner title section */}
        <BannerTitle />

        {/* Circle image gallery section */}
        <CircleImageGallery />

        <StackImageGallery />

        {/* hero spinner section */}
        <SophisticatedImagesGallery />

        {/* Ready Automate section */}
        <ReadyAutomateSection />

        {/* FAQ Section */}
        <FAQAccordion />
        {/* Floating button of 50% off */}
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

/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer-wrapper z-10 bottom-0 sticky bg-[#1E3634] text-white">
      <img
        src="https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f55a2e134ca608203f58ec_zuno-logo-green.svg"
        loading="lazy"
        alt="Zuno logo"
        className="my-10 w-[90%] mx-auto"
      />
      <div className="px-16 pb-6 pt-28 gap-8 grid grid-cols-2 md:grid-cols-5">
        {/*Zuno Logo */}
        <Image
          src="https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67e725b86fdf9ee970fe1013_zuno-logo.svg"
          alt="Zuno Logo Green"
          width={64}
          height={64}
          className="w-16"
          priority
        />

        {/* Explore */}
        <div>
          <h3 className="text-sm font-semibold text-[#98a581] mb-3">Explore</h3>
          <ul className="space-y-2 text-[#abb1a0]">
            <li>
              <a href="/about-01" className="hover:underline">
                About Zuno
              </a>
            </li>
            <li>
              <a href="/about-02" className="hover:underline">
                Learn
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-sm font-semibold text-[#98a581] mb-3">Company</h3>
          <ul className="space-y-2 text-[#abb1a0]">
            <li>
              <a href="/about-03" className="hover:underline">
                Careers
              </a>
            </li>
            <li>
              <a href="/legal-pages" className="hover:underline">
                Terms of service
              </a>
            </li>
            <li>
              <a href="/legal-pages" className="hover:underline">
                Privacy policy
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact us
              </a>
            </li>
          </ul>
        </div>

        {/* Follow us */}
        <div>
          <h3 className="text-sm font-semibold text-[#98a581] mb-3">
            Follow us
          </h3>
          <ul className="space-y-2 text-[#abb1a0]">
            <li>
              <a
                href="https://www.instagram.com/jp.webflow"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                TikTok
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com/joaopaulots"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-sm font-semibold text-[#98a581] mb-3">
            Newsletter
          </h3>
          <form className="flex text-[#abb1a0] flex-col gap-2">
            <input
              type="email"
              placeholder="Email Address"
              className="px-3 py-2 rounded-md border-[#536e6c] border-1"
              required
            />
          </form>
          <p className="mt-4 text-xs text-[#abb1a0]">
            We only share your information in accordance with our privacy policy
            .
          </p>
        </div>
      </div>

      {/* Footer baseline */}
      <div className="border-t border-[#536e6c] pt-8 pb-11 mx-16 text-xs text-[#7e7e80]">
        Nullam quis risus eget urna mollis ornare vel eu leo. Integer posuere
        erat a ante venenatis dapibus posuere velit aliquet. Duis mollis, est
        non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem
        nec elit. Nulla vitae elit libero, a pharetra augue.. © Zuno 2025. All
        rights reserved.
      </div>
    </footer>
  );
}

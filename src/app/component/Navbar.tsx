"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [templateOpen, setTemplateOpen] = useState(false);

  return (
    <header className="fixed mx-auto w-full top-4 z-50">
      <nav className="max-w-[754px] text-[15px] bg-[#FBFBFB] border-1 border-[#adadad33] rounded-[8px] mx-auto flex items-center justify-between p-[6px] my-3">
        {/* Brand */}
        <Link href="/" className="flex items-center pl-3">
          <Image
            src="https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67ea1567f801b7bf3d63fad7_zuno-logo-b.svg"
            alt="Brand Logo"
            width={53}
            height={18}
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="hover:text-gray-500">
            Home
          </Link>

          {/* Dropdown Pages */}
          <div className="relative">
            <button
              onClick={() => setPagesOpen(!pagesOpen)}
              className="flex items-center hover:text-gray-500 gap-1 cursor-pointer"
            >
              Pages <ChevronDown size={16} />
            </button>
          </div>

          {/* Dropdown Template */}
          <div className="relative">
            <button
              onClick={() => setTemplateOpen(!templateOpen)}
              className="flex items-center hover:text-gray-500 gap-1 cursor-pointer"
            >
              Template <ChevronDown size={16} />
            </button>
          </div>

          <Link
            href="/request-demo"
            className="px-4 py-2 rounded-lg bg-[#D3EFA2] hover:bg-[#B7DB7D] transition"
          >
            Request demo
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow px-6 py-4 flex flex-col space-y-4">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link href="/about-01" className="hover:text-blue-600">
            About
          </Link>
          <Link href="/features-01" className="hover:text-blue-600">
            Features
          </Link>
          <Link
            href="/request-demo"
            className="px-4 py-2 rounded-lg bg-[#B7DB7D] text-white hover:bg-blue-700 transition text-center"
          >
            Request Demo
          </Link>
        </div>
      )}
    </header>
  );
}

import React, { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-red-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 bg-red-600 flex items-center justify-center text-white font-bold text-xl clip-edges">
            CC
          </div>
          <span className="font-bold text-xl tracking-wider">Cezary Czerwiński</span>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#home" className="font-medium hover:text-red-500 transition-colors">
            Home
          </a>
          <a href="#about" className="font-medium hover:text-red-500 transition-colors">
            About
          </a>
          <a href="#blog" className="font-medium hover:text-red-500 transition-colors">
            Blog
          </a>
          <a href="#contact" className="font-medium hover:text-red-500 transition-colors">
            Contact
          </a>
        </nav>
        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#home" className="font-medium hover:text-red-500 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Home
            </a>
            <a href="#about" className="font-medium hover:text-red-500 transition-colors" onClick={() => setIsMenuOpen(false)}>
              About
            </a>
            <a href="#blog" className="font-medium hover:text-red-500 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Blog
            </a>
            <a href="#contact" className="font-medium hover:text-red-500 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Contact
            </a>
          </div>
        </div>}
    </header>;
}
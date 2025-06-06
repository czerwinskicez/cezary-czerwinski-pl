import React, { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-red-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" 
           className="gtm-track-click" 
           data-gtm-event-category="Header" 
           data-gtm-event-action="click" 
           data-gtm-event-label="Logo"
        >
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-red-600 flex items-center justify-center text-white font-bold text-xl clip-edges">
              CC
            </div>
            <span className="font-bold text-xl tracking-wider">Cezary Czerwiński</span>
          </div>
        </a>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="/" 
             className="font-medium hover:text-red-500 transition-colors gtm-track-click" 
             data-gtm-event-category="Header" 
             data-gtm-event-action="click" 
             data-gtm-event-label="Desktop Nav - Home">
            Home
          </a>
          <a href="/blog" 
             className="font-medium hover:text-red-500 transition-colors gtm-track-click" 
             data-gtm-event-category="Header" 
             data-gtm-event-action="click" 
             data-gtm-event-label="Desktop Nav - Blog">
            Blog
          </a>
          <a href="#contact" 
             className="font-medium hover:text-red-500 transition-colors gtm-track-click" 
             data-gtm-event-category="Header" 
             data-gtm-event-action="click" 
             data-gtm-event-label="Desktop Nav - Contact">
            Contact
          </a>
        </nav>
        {/* Mobile Menu Button */}
        <button className="md:hidden gtm-track-click" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                data-gtm-event-category="Header" 
                data-gtm-event-action="click" 
                data-gtm-event-label="Mobile Menu Toggle">
          {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden bg-black border-b border-slate-200">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="/" 
               className="font-medium hover:text-red-500 transition-colors gtm-track-click" 
               onClick={() => setIsMenuOpen(false)}
               data-gtm-event-category="Header" 
               data-gtm-event-action="click" 
               data-gtm-event-label="Mobile Nav - Home">
              Home
            </a>
            <a href="/blog" 
               className="font-medium hover:text-red-500 transition-colors gtm-track-click" 
               onClick={() => setIsMenuOpen(false)}
               data-gtm-event-category="Header" 
               data-gtm-event-action="click" 
               data-gtm-event-label="Mobile Nav - Blog">
              Blog
            </a>
            <a href="#contact" 
               className="font-medium hover:text-red-500 transition-colors gtm-track-click" 
               onClick={() => setIsMenuOpen(false)}
               data-gtm-event-category="Header" 
               data-gtm-event-action="click" 
               data-gtm-event-label="Mobile Nav - Contact">
              Contact
            </a>
          </div>
        </div>}
    </header>;
}
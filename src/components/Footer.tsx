import React from 'react';
import { MailIcon, PhoneIcon, MapPinIcon, ArrowUpIcon, LinkedinIcon } from 'lucide-react';
import { LinkedIn, GitHub } from './SMIcons';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <footer id="contact" className="bg-black text-white relative">
      <div className="absolute -top-10 left-0 w-full h-24 bg-zinc-900 transform -skew-y-2" />
      <div className="container mx-auto max-w-6xl px-4 pb-16 pt-32 relative">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-10 w-10 bg-red-600 flex items-center justify-center text-white font-bold text-xl clip-edges">
                CC
              </div>
              <span className="font-bold text-xl tracking-wider">
                Cezary Czerwiński
              </span>
            </div>
            <p className="text-slate-300 mb-6">
              I'm not just to deliver services. <br />
              I'm an employee who thrives on being part of a company's culture, values, and mission — and seeing the real impact of my work. <br />
            </p>
            <div className="flex space-x-4">
              <LinkedIn />
              <GitHub />
            </div>
            <ul className="pt-10 space-y-4">
              <li className="flex items-start">
                <MailIcon size={20} className="mr-3 text-red-600 mt-1 flex-shrink-0" />
                <span className="text-slate-300">czerwinskicez@gmail.com</span>
              </li>
              <li className="flex items-start">
                <MapPinIcon size={20} className="mr-3 text-red-600 mt-1 flex-shrink-0" />
                <span className="text-slate-300">
                  Warsaw / Giżycko, Poland
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6">Get In Touch</h3>
            <form className="mb-6">
              <div className="grid gap-4 mb-4">
                <div>
                  <input type="text" id="name" name="name" placeholder="Full Name" className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-red-600 transition-colors" required />
                </div>
                <div>
                  <input type="email" id="email" name="email" placeholder="Email Address" className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-red-600 transition-colors" required />
                </div>
                <div>
                  <textarea id="message" name="message" rows={3} placeholder="Message" className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-red-600 transition-colors" required></textarea>
                </div>
              </div>
              <button type="submit" className="px-6 py-2 bg-red-600 text-white font-medium hover:bg-red-700 transition-colors">
                Send Message
              </button>
            </form>

          </div>
        </div>
        <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            {new Date().getFullYear()} Cezary Czerwiński
          </p>
          <button onClick={scrollToTop} className="h-10 w-10 bg-zinc-800 flex items-center justify-center hover:bg-red-600 transition-colors">
            <ArrowUpIcon size={20} />
          </button>
        </div>
      </div>
    </footer>;
}
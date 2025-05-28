import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
export function Hero() {
  return <section id="home" className="relative pt-16 pb-24 px-4 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-red-600 transform -skew-x-12" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/img/bg.jpeg')] bg-cover bg-center opacity-15" />
      <div className="container mx-auto max-w-5xl relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Hi, I'm Cezary
              <br />
              <span className="text-red-500">Enthusiast <br />of Future</span> <br />& Technology
            </h1>
            <p className="text-lg md:text-xl text-gray-400">
              {/* Sharing my journey and insights in technology, cloud architecture,
              and digital transformation. Let's explore the future of tech
              together. */}
              We shouldn't be scared of the future. <br />We should be excited about it, yet it comes with challenges and dificult decisions.
            </p>
            <div className="flex space-x-4">
              <a href="#blog" 
                 className="px-6 py-3 bg-red-600 text-white font-medium hover:bg-red-700 transition-colors flex items-center group gtm-track-click" 
                 data-gtm-event-category="Hero" 
                 data-gtm-event-action="click" 
                 data-gtm-event-label="CTA - Read Blog">
                Read Blog
                <ArrowRightIcon size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#about" 
                 className="px-6 py-3 bg-transparent border border-white text-white font-medium hover:border-red-600 hover:text-red-600 transition-colors gtm-track-click" 
                 data-gtm-event-category="Hero" 
                 data-gtm-event-action="click" 
                 data-gtm-event-label="CTA - About Me">
                About Me
              </a>
            </div>
          </div>
          <div className="relative grayscale-[.50] hover:grayscale-0 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-black/50 transform rotate-6" />
            <img src="/img/future.webp" alt="Technology consultant working" className="relative w-full object-cover h-[400px] hue-rotate-biased" />
          </div>
        </div>
      </div>
    </section>;
}
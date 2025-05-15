import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
export function Hero() {
  return <section id="home" className="relative pt-16 pb-24 px-4 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-red-600 transform -skew-x-12" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10" />
      <div className="container mx-auto max-w-5xl relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Hi, I'm John
              <br />
              <span className="text-red-500">Tech Enthusiast</span> & Writer
            </h1>
            <p className="text-lg md:text-xl text-gray-400">
              Sharing my journey and insights in technology, cloud architecture,
              and digital transformation. Let's explore the future of tech
              together.
            </p>
            <div className="flex space-x-4">
              <a href="#blog" className="px-6 py-3 bg-red-600 text-white font-medium hover:bg-red-700 transition-colors flex items-center group">
                Read Blog
                <ArrowRightIcon size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#about" className="px-6 py-3 bg-transparent border border-white text-white font-medium hover:border-red-600 hover:text-red-600 transition-colors">
                About Me
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-black/50 transform rotate-6" />
            <img src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-4.0.3" alt="Technology consultant working" className="relative w-full object-cover h-[400px] grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
        </div>
      </div>
    </section>;
}
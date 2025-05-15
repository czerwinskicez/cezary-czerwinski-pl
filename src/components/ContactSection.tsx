import React from 'react';

export function ContactSection() {
  return (
    <section id="newsletter" className="pb-20 bg-black text-white">
      
      <div className="absolute -top-10 left-0 w-full h-40 bg-black transform -skew-y-2 z-20" />
      <div className="container mx-auto max-w-3xl px-4">
        <div className="text-center mb-12 relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay In Touch</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-xl mx-auto">
            Subscribe to my newsletter to get the latest updates on tech insights, articles, and exclusive content.
          </p>
        </div>
        <form className="bg-zinc-900 p-8 md:p-12 shadow-xl">
          <div className="mb-6 text-center">
            <p className="text-slate-300 mb-6">
              Join my mailing list and be the first to know about new articles, resources, and industry updates.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="email" 
                id="newsletter-email" 
                name="email" 
                placeholder="Your email address" 
                className="flex-grow bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-red-600 transition-colors" 
                required 
              />
              <button 
                type="submit" 
                className="md:w-auto px-8 py-3 bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
              >
                Subscribe
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              I respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
} 
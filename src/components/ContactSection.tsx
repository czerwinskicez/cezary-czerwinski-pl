import React from 'react';

export function ContactSection() {
  return (
    <section id="contact-form" className="pb-20 bg-black text-white">
      
      <div className="absolute -top-10 left-0 w-full h-40 bg-black transform -skew-y-2 z-20" />
      <div className="container mx-auto max-w-3xl px-4">
        <div className="text-center mb-12 relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-xl mx-auto">
            Have a project in mind or just want to say hi? Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </div>
        <form className="bg-zinc-900 p-8 md:p-12 shadow-xl">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-slate-300 mb-2 font-medium">Full Name</label>
              <input type="text" id="name" name="name" className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-red-500 transition-colors" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-slate-300 mb-2 font-medium">Email Address</label>
              <input type="email" id="email" name="email" className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-red-500 transition-colors" required />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="subject" className="block text-slate-300 mb-2 font-medium">Subject</label>
            <input type="text" id="subject" name="subject" className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-red-500 transition-colors" required />
          </div>
          <div className="mb-8">
            <label htmlFor="message" className="block text-slate-300 mb-2 font-medium">Message</label>
            <textarea id="message" name="message" rows={5} className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-red-500 transition-colors" required></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="px-8 py-3 bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
} 
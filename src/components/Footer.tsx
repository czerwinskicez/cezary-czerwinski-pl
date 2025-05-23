import React, { useState } from 'react';
import { MailIcon, MapPinIcon, ArrowUpIcon } from 'lucide-react';
import { LinkedIn, GitHub } from './SMIcons';
import Link from 'next/link';

export function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    success: false,
    error: ''
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus(prev => ({ ...prev, submitting: true, error: '' }));

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({
          submitting: false,
          submitted: true,
          success: true,
          error: ''
        });
        // Reset form data
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus({
          submitting: false,
          submitted: true,
          success: false,
          error: data.message || 'Something went wrong. Please try again later.'
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setFormStatus({
        submitting: false,
        submitted: true,
        success: false,
        error: 'Failed to send message. Please try again later.'
      });
    }
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
            {formStatus.submitted && formStatus.success ? (
              <div className="p-4 bg-green-800/30 border border-green-600 mb-6">
                <p className="text-green-200">Your message has been sent! I'll get back to you soon.</p>
              </div>
            ) : null}
            
            {formStatus.submitted && !formStatus.success ? (
              <div className="p-4 bg-red-800/30 border border-red-600 mb-6">
                <p className="text-red-200">{formStatus.error}</p>
              </div>
            ) : null}
            
            <form className="mb-6" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4">
                <div>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Full Name" 
                    className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-red-600 transition-colors" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                    disabled={formStatus.submitting}
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Email Address" 
                    className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-red-600 transition-colors" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                    disabled={formStatus.submitting}
                  />
                </div>
                <div>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={3} 
                    placeholder="Message" 
                    className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-red-600 transition-colors" 
                    required
                    value={formData.message}
                    onChange={handleChange}
                    disabled={formStatus.submitting}
                  ></textarea>
                </div>
              </div>
              <button 
                type="submit" 
                className="px-6 py-2 bg-red-600 text-white font-medium hover:bg-red-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                disabled={formStatus.submitting}
              >
                {formStatus.submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            {new Date().getFullYear()} Cezary Czerwiński | <Link href="/privacy-policy" className="hover:text-red-600 transition-colors">Privacy Policy</Link>
          </p>
          <button onClick={scrollToTop} className="h-10 w-10 bg-zinc-800 flex items-center justify-center hover:bg-red-600 transition-colors">
            <ArrowUpIcon size={20} />
          </button>
        </div>
      </div>
    </footer>;
}
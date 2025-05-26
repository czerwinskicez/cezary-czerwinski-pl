import React, { useState } from 'react';
import { MailIcon, MapPinIcon, ArrowUpIcon } from 'lucide-react';
import { LinkedIn, GitHub } from './SMIcons';
import Link from 'next/link';

type ContactResponse = {
  success: boolean;
  message: string;
};

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
    message: ''
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
    setFormStatus({ ...formStatus, submitting: true, message: '' });


    try {
      const response = await fetch('https://cms.cezary-czerwinski.pl/contactMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin
        },
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify({ 
          name: formData.name, 
          email: formData.email, 
          message: formData.message 
        }),
      });

      const data: ContactResponse = await response.json();

      setFormStatus({
        submitting: false,
        submitted: true,
        success: data.success,
        message: data.message
      });

      if (data.success) {
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setFormStatus({
        submitting: false,
        submitted: true,
        success: false,
        message: 'Network error. Please try again later.'
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
            {formStatus.submitted && (
              <div className={`p-4 mb-6 ${formStatus.success ? 'bg-green-800/30 border border-green-600' : 'bg-red-800/30 border border-red-600'}`}>
                <p className={formStatus.success ? 'text-green-200' : 'text-red-200'}>
                  {formStatus.message} 
                </p>
              </div>
            )}
            
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
              
              <p className="text-gray-500 text-sm mb-4">
                I respect your privacy. <a href="/privacy-policy" className="text-red-600 hover:text-red-500">Privacy Policy</a>.
              </p>

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
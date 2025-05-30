import React, { useState } from 'react';

type NewsletterResponse = {
  success: boolean;
  message: string;
};

export function ContactSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    success: false,
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ ...status, submitting: true });

    try {
      const response = await fetch('https://cms.cezary-czerwinski.pl/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin
        },
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify({ email }),
      });

      const data: NewsletterResponse = await response.json();

      setStatus({
        submitting: false,
        submitted: true,
        success: data.success,
        message: data.message
      });

      if (data.success) {
        setEmail('');
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setStatus({
        submitting: false,
        submitted: true,
        success: false,
        message: 'Network error. Please try again later.'
      });
    }
  };

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
        <form className="bg-zinc-900 p-8 md:p-12 shadow-xl gtm-track-submit" 
              onSubmit={handleSubmit}
              data-gtm-event-category="Newsletter"
              data-gtm-event-action="submit" 
              data-gtm-event-label="Subscription Form">
          <div className="mb-6 text-center">
            <p className="text-slate-300 mb-6">
              Join my mailing list and be the first to know about new articles, resources, and industry updates.
            </p>
            
            {status.submitted && (
              <div className={`p-4 mb-6 ${status.success ? 'bg-green-800/30 border border-green-600' : 'bg-red-800/30 border border-red-600'}`}>
                <p className={status.success ? 'text-green-200' : 'text-red-200'}>
                  {status.message}
                </p>
              </div>
            )}
            
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="email" 
                id="newsletter-email" 
                name="email" 
                placeholder="Your email address" 
                className="flex-grow bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-red-600 transition-colors" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status.submitting}
              />
              <button 
                type="submit" 
                className="md:w-auto px-8 py-3 bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                disabled={status.submitting}
              >
                {status.submitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              I respect your privacy. <a href="/privacy-policy" 
                                       className="text-red-600 hover:text-red-500 gtm-track-click" 
                                       data-gtm-event-category="Newsletter"
                                       data-gtm-event-action="click"
                                       data-gtm-event-label="Privacy Policy Link">Privacy Policy</a>.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
} 
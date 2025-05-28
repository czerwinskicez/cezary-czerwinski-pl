'use client';

import React, { useState, useEffect } from 'react';

// Configuration
const LOCALSTORAGE_KEY = 'googleConsentSettings_v2';

interface ConsentType {
  name: string;
  description: string;
  default: 'granted' | 'denied';
  readonly: boolean;
  show: boolean;
}

export const CONSENT_TYPES: Record<string, ConsentType> = {
  'analytics_storage': {
    name: 'Analytics and Telemetry Cookies',
    description: 'These cookies allow me to measure and improve the performance of my site. They help me to know which pages are the most popular, how visitors move around the site, and to collect anonymized telemetry data for analytics.',
    default: 'denied',
    readonly: false,
    show: true
  },
  'ad_storage': {
    name: 'Advertising Cookies',
    description: 'These cookies may be set through my site by advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.',
    default: 'denied',
    readonly: false,
    show: false
  },
  'ad_user_data': {
    name: 'Advertising User Data',
    description: 'Consent for sending user data to Google for advertising purposes. This works in conjunction with Advertising Cookies.',
    default: 'denied',
    readonly: false,
    show: false
  },
  'ad_personalization': {
    name: 'Personalized Advertising',
    description: 'Consent for personalized advertising. This allows for features like remarketing. This works in conjunction with Advertising Cookies.',
    default: 'denied',
    readonly: false,
    show: false
  }
};

export interface ConsentSettings {
  [key: string]: 'granted' | 'denied';
}

// Ensure gtag function is available
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

function useConsent() {
  const [consent, setConsent] = useState<ConsentSettings>({});
  const [hasStoredConsent, setHasStoredConsent] = useState<boolean | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize gtag
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function() { window.dataLayer.push(arguments); };
    }
  }, []);

  // Helper functions
  const getStoredConsent = (): ConsentSettings | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem(LOCALSTORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object' && Object.keys(CONSENT_TYPES).some(key => parsed.hasOwnProperty(key))) {
          const currentConsent: ConsentSettings = {};
          for (const type in CONSENT_TYPES) {
            currentConsent[type] = parsed.hasOwnProperty(type) ? parsed[type] : CONSENT_TYPES[type].default;
          }
          return currentConsent;
        }
      }
    } catch (e) {
      console.error('Error reading consent from localStorage:', e);
    }
    return null;
  };

  const saveConsent = (consentSettings: ConsentSettings) => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(consentSettings));
    } catch (e) {
      console.error('Error saving consent to localStorage:', e);
    }
    
    // Update Google Consent Mode
    if (window.gtag) {
      window.gtag('consent', 'update', consentSettings);
    }
    console.log('CMP: Consent updated and saved:', consentSettings);
    
    setConsent(consentSettings);
    setHasStoredConsent(true);
  };

  const setDefaultConsent = () => {
    if (typeof window === 'undefined') return;
    
    const defaults: ConsentSettings = {};
    for (const type in CONSENT_TYPES) {
      defaults[type] = CONSENT_TYPES[type].default;
    }
    if (window.gtag) {
      window.gtag('consent', 'default', defaults);
    }
    console.log('CMP: Default consent set:', defaults);
    return defaults;
  };

  const getDefaultConsentObject = (): ConsentSettings => {
    const defaults: ConsentSettings = {};
    for (const type in CONSENT_TYPES) {
      defaults[type] = CONSENT_TYPES[type].default;
    }
    return defaults;
  };

  // Initialize consent management
  useEffect(() => {
    if (isInitialized || typeof window === 'undefined') return;
    
    // Set Google Consent Mode defaults immediately
    const defaults = setDefaultConsent();

    // Load consent from localStorage
    const storedConsent = getStoredConsent();

    if (storedConsent) {
      // If consent is stored, update Google Consent Mode with stored values
      if (window.gtag) {
        window.gtag('consent', 'update', storedConsent);
      }
      console.log('CMP: Loaded and applied stored consent:', storedConsent);
      setConsent(storedConsent);
      setHasStoredConsent(true);
    } else {
      // If no consent is stored, use defaults
      setConsent(defaults || getDefaultConsentObject());
      setHasStoredConsent(false);
    }
    
    setIsInitialized(true);
  }, [isInitialized]);

  // Action functions
  const acceptAll = () => {
    const allGranted: ConsentSettings = {};
    for (const type in CONSENT_TYPES) {
      allGranted[type] = 'granted';
    }
    saveConsent(allGranted);
  };

  const denyAll = () => {
    const allDenied: ConsentSettings = {};
    for (const type in CONSENT_TYPES) {
      allDenied[type] = CONSENT_TYPES[type].readonly && CONSENT_TYPES[type].default === 'granted' 
        ? 'granted' 
        : 'denied';
    }
    saveConsent(allDenied);
  };

  const updateConsent = (type: string, granted: boolean) => {
    const newConsent: ConsentSettings = {
      ...consent,
      [type]: granted ? 'granted' as const : 'denied' as const
    };
    setConsent(newConsent);
  };

  const saveCustomConsent = () => {
    saveConsent(consent);
  };

  const resetConsent = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LOCALSTORAGE_KEY);
      const defaults = getDefaultConsentObject();
      setConsent(defaults);
      setHasStoredConsent(false);
    }
  };

  const hasConsent = (): boolean => {
    return hasStoredConsent === true;
  };

  return {
    consent,
    hasStoredConsent,
    isInitialized,
    acceptAll,
    denyAll,
    updateConsent,
    saveCustomConsent,
    resetConsent,
    hasConsent
  };
}

export function ConsentManager() {
  const [showPopup, setShowPopup] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [showManageButton, setShowManageButton] = useState(false);
  
  const {
    hasConsent,
    consent,
    acceptAll,
    denyAll,
    updateConsent,
    saveCustomConsent,
    hasStoredConsent,
    isInitialized
  } = useConsent();

  useEffect(() => {
    if (isInitialized && hasStoredConsent === false) {
      setTimeout(() => setShowPopup(true), 50);
    } else if (isInitialized && hasStoredConsent === true) {
      setShowManageButton(true);
    }
  }, [isInitialized, hasStoredConsent]);

  const handleAcceptAll = () => {
    acceptAll();
    setShowPopup(false);
    setShowManageButton(true);
  };

  const handleDenyAll = () => {
    denyAll();
    setShowPopup(false);
    setShowManageButton(true);
  };

  const handleCustomize = () => {
    setShowCustomize(true);
  };

  const handleSavePreferences = () => {
    saveCustomConsent();
    setShowPopup(false);
    setShowCustomize(false);
    setShowManageButton(true);
  };

  const handleBackToMain = () => {
    setShowCustomize(false);
  };

  const handleManageConsent = () => {
    setShowManageButton(false);
    setShowPopup(true);
  };

  const handleToggleConsent = (type: string, value: boolean) => {
    updateConsent(type, value);
  };

  if (!isInitialized) return null;

  return (
    <>
      {/* Manage Consent Button */}
      {showManageButton && (
        <button
          onClick={handleManageConsent}
          className="fixed bottom-4 left-4 px-3 py-2 text-xs sm:text-sm bg-red-600 text-white font-medium hover:bg-red-700 transition-colors shadow-lg z-40 sm:px-4 sm:bottom-5 sm:left-5 flex items-center gap-1.5"
        >
          Cookies
        </button>
      )}

      {/* Consent Popup */}
      {showPopup && (
        <div className="fixed bottom-0 left-0 w-full bg-zinc-900 border-t border-red-600 p-4 sm:p-5 shadow-2xl z-50 font-system animate-slide-up">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">I Value Your Privacy</h3>
            <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-5 leading-relaxed">
              I use cookies and similar technologies to enhance your browsing experience, personalize content, 
              and analyze my traffic. By clicking "Accept All", you consent to the use of 
              all the cookies. However, you may visit cookie settings to provide a controlled consent.
            </p>

            {!showCustomize ? (
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-red-600 text-white text-sm sm:text-base font-medium hover:bg-red-700 transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={handleDenyAll}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-transparent border border-white text-white text-sm sm:text-base font-medium hover:border-red-600 hover:text-red-600 transition-colors"
                >
                  Deny All
                </button>
                <button
                  onClick={handleCustomize}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-transparent border border-white text-white text-sm sm:text-base font-medium hover:border-red-600 hover:text-red-600 transition-colors"
                >
                  Cookie Settings
                </button>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Customize Consent Preferences</h4>
                
                {Object.entries(CONSENT_TYPES)
                  .filter(([type, config]) => config.show)
                  .map(([type, config]) => (
                  <div key={type} className="p-3 sm:p-4 border border-zinc-700 bg-zinc-800 rounded">
                    <div className="flex items-start sm:items-center justify-between mb-2 gap-3">
                      <strong className="text-sm sm:text-base text-white font-semibold flex-1">{config.name}</strong>
                      {config.readonly ? (
                        <span className="text-green-500 text-xs sm:text-sm italic whitespace-nowrap">Always Active</span>
                      ) : (
                        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={consent[type] === 'granted'}
                            onChange={(e) => handleToggleConsent(type, e.target.checked)}
                          />
                          <div className={`w-10 h-5 sm:w-11 sm:h-6 rounded-full transition-colors ${
                            consent[type] === 'granted' 
                              ? 'bg-red-600' 
                              : 'bg-zinc-600'
                          }`}>
                            <div className={`w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full transition-transform transform ${
                              consent[type] === 'granted' 
                                ? 'translate-x-5 sm:translate-x-5' 
                                : 'translate-x-0'
                            } mt-0.5 ml-0.5`}></div>
                          </div>
                        </label>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{config.description}</p>
                  </div>
                ))}

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
                  <button
                    onClick={handleSavePreferences}
                    className="px-4 py-2 sm:px-6 sm:py-3 bg-red-600 text-white text-sm sm:text-base font-medium hover:bg-red-700 transition-colors"
                  >
                    Save Preferences
                  </button>
                  <button
                    onClick={handleBackToMain}
                    className="px-4 py-2 sm:px-6 sm:py-3 bg-transparent border border-white text-white text-sm sm:text-base font-medium hover:border-red-600 hover:text-red-600 transition-colors"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
} 
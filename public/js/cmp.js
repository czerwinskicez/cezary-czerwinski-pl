(function() {
  'use strict';

  // --- Configuration ---
  const CMP_VERSION = '1.0.0';
  const LOCALSTORAGE_KEY = 'googleConsentSettings_v2';
  const POPUP_ID = 'gdpr-consent-popup';
  const MANAGE_BUTTON_ID = 'gdpr-manage-consent-button';

  const CONSENT_TYPES = {
      'analytics_storage': {
          name: 'Analytics Cookies',
          description: 'These cookies allow us to measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.',
          default: 'denied', // or 'granted' if you want opt-out by default
          readonly: false // e.g., for strictly necessary cookies
      },
      'ad_storage': {
          name: 'Advertising Cookies',
          description: 'These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.',
          default: 'denied',
          readonly: false
      },
      'ad_user_data': {
          name: 'Advertising User Data',
          description: 'Consent for sending user data to Google for advertising purposes. This works in conjunction with Advertising Cookies.',
          default: 'denied',
          readonly: false
      },
      'ad_personalization': {
          name: 'Personalized Advertising',
          description: 'Consent for personalized advertising. This allows for features like remarketing. This works in conjunction with Advertising Cookies.',
          default: 'denied',
          readonly: false
      },
      // Example of a "strictly necessary" type that user cannot disable
      // 'functionality_storage': {
      //     name: 'Functional Cookies',
      //     description: 'These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages.',
      //     default: 'granted',
      //     readonly: true // User cannot change this
      // }
  };

  // Ensure gtag function is available
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }

  // --- Helper Functions ---
  function getStoredConsent() {
      try {
          const stored = localStorage.getItem(LOCALSTORAGE_KEY);
          if (stored) {
              const parsed = JSON.parse(stored);
              // Basic validation: check if it has at least one known consent type
              if (parsed && typeof parsed === 'object' && CONSENT_TYPES.hasOwnProperty(Object.keys(parsed)[0])) {
                   // Ensure all current consent types are present, adding defaults if missing
                  const currentConsent = {};
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
  }

  function saveConsent(consent) {
      try {
          localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(consent));
      } catch (e) {
          console.error('Error saving consent to localStorage:', e);
      }
      // Update Google Consent Mode
      gtag('consent', 'update', consent);
      console.log('CMP: Consent updated and saved:', consent);
  }

  function setDefaultConsent() {
      const defaults = {};
      for (const type in CONSENT_TYPES) {
          defaults[type] = CONSENT_TYPES[type].default;
      }
      gtag('consent', 'default', defaults);
      console.log('CMP: Default consent set:', defaults);
  }

  // --- UI Functions ---
  function createPopup() {
      if (document.getElementById(POPUP_ID)) return; // Popup already exists

      const popup = document.createElement('div');
      popup.id = POPUP_ID;
      popup.style.cssText = `
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: #18181b;
          border-top: 1px solid #ef4444;
          padding: 20px;
          box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
          z-index: 9999;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 14px;
          color: #ffffff;
          box-sizing: border-box;
          animation: slideUpCMP 0.3s ease-out;
      `;

      let htmlContent = `
          <div style="max-width: 900px; margin: 0 auto;">
              <h3 style="margin-top:0; margin-bottom:12px; color: #ffffff; font-size: 1.5rem; font-weight: 600;">We Value Your Privacy</h3>
              <p style="margin-bottom:20px; color: #d1d5db; font-size: 1rem; line-height: 1.6;">We use cookies and similar technologies to enhance your browsing experience, personalize content and ads, provide social media features, and analyze our traffic. By clicking "Accept All", you consent to the use of ALL the cookies. However, you may visit "Cookie Settings" to provide a controlled consent.</p>
              <div id="cmp-main-view">
                  <button id="cmp-accept-all" class="${buttonStyle()}">Accept All Optional</button>
                  <button id="cmp-deny-all" class="${buttonStyle('secondary')}" style="margin-left:10px;">Deny All Optional</button>
                  <button id="cmp-customize" class="${buttonStyle('secondary')}" style="margin-left:10px;">Cookie Settings</button>
              </div>
              <div id="cmp-customize-view" style="display:none; margin-top:20px;">
                  <h4 style="color: #ffffff; font-size: 1.25rem; font-weight: 600; margin-bottom: 16px;">Customize Consent Preferences</h4>
      `;

      for (const type in CONSENT_TYPES) {
          const config = CONSENT_TYPES[type];
          htmlContent += `
              <div style="margin-bottom:16px; padding:16px; border:1px solid #3f3f46; background-color: #27272a; border-radius: 4px;">
                  <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom: 8px;">
                      <strong style="font-size:1rem; color: #ffffff; font-weight: 600;">${config.name}</strong>
                      ${config.readonly ? 
                          '<span style="color:#10b981; font-style:italic; font-size: 0.875rem;">Always Active</span>' :
                          `<label class="cmp-switch">
                              <input type="checkbox" id="cmp-checkbox-${type}" data-type="${type}" ${getStoredConsentValue(type) === 'granted' ? 'checked' : ''}>
                              <span class="cmp-slider"></span>
                          </label>`
                      }
                  </div>
                  <p style="font-size:0.875rem; margin:0; color:#9ca3af; line-height: 1.5;">${config.description}</p>
              </div>
          `;
      }

      htmlContent += `
                  <button id="cmp-save-preferences" class="${buttonStyle()}">Save Preferences</button>
                  <button id="cmp-back-to-main" class="${buttonStyle('secondary')}" style="margin-left:10px;">Back</button>
              </div>
          </div>
      `;
      popup.innerHTML = htmlContent;
      document.body.appendChild(popup);
      addPopupStyles(); // Inject CSS for switches etc.
      attachPopupEventListeners();
  }
  
  function getStoredConsentValue(type) {
      const storedConsent = getStoredConsent();
      if (storedConsent && storedConsent[type]) {
          return storedConsent[type];
      }
      return CONSENT_TYPES[type].default;
  }

  function addPopupStyles() {
      const styleSheet = document.createElement("style");
      styleSheet.type = "text/css";
      styleSheet.innerText = `
          @keyframes slideUpCMP {
              from { transform: translateY(100%); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
          }
          
          .cmp-button-primary {
              padding: 10px 16px; 
              border: none; 
              cursor: pointer; 
              font-size: 14px; 
              font-weight: 500; 
              transition: all 0.2s ease;
              font-family: inherit;
              background-color: #ef4444; 
              color: #ffffff;
              border: 1px solid #ef4444;
          }
          
          .cmp-button-primary:hover {
              background-color: #dc2626; 
              border-color: #dc2626;
          }
          
          .cmp-button-secondary {
              padding: 10px 16px; 
              border: none; 
              cursor: pointer; 
              font-size: 14px; 
              font-weight: 500; 
              transition: all 0.2s ease;
              font-family: inherit;
              background-color: #3f3f46; 
              color: #ffffff;
              border: 1px solid #52525b;
          }
          
          .cmp-button-secondary:hover {
              background-color: #52525b;
          }
          
          #${MANAGE_BUTTON_ID} {
              position: fixed;
              bottom: 20px;
              left: 20px;
              background-color: #ef4444;
              color: #ffffff;
              padding: 10px 16px;
              border: none;
              cursor: pointer;
              z-index: 9990;
              font-size: 14px;
              font-weight: 500;
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              box-shadow: 0 4px 12px rgba(0,0,0,0.3);
              transition: all 0.2s ease;
              border: 1px solid #ef4444;
          }
          
          #${MANAGE_BUTTON_ID}:hover {
              background-color: #dc2626;
              border-color: #dc2626;
              transform: translateY(-1px);
              box-shadow: 0 6px 16px rgba(0,0,0,0.4);
          }
          
          .cmp-switch { 
              position: relative; 
              display: inline-block; 
              width: 44px; 
              height: 24px; 
          }
          .cmp-switch input { 
              opacity: 0; 
              width: 0; 
              height: 0; 
          }
          .cmp-slider { 
              position: absolute; 
              cursor: pointer; 
              top: 0; 
              left: 0; 
              right: 0; 
              bottom: 0; 
              background-color: #3f3f46; 
              transition: .3s ease; 
              border-radius: 24px;
              border: 1px solid #52525b;
          }
          .cmp-slider:before { 
              position: absolute; 
              content: ""; 
              height: 18px; 
              width: 18px; 
              left: 2px; 
              bottom: 2px; 
              background-color: #ffffff; 
              transition: .3s ease; 
              border-radius: 50%; 
              box-shadow: 0 1px 3px rgba(0,0,0,0.3);
          }
          input:checked + .cmp-slider { 
              background-color: #ef4444; 
              border-color: #dc2626;
          }
          input:focus + .cmp-slider { 
              box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.3); 
          }
          input:checked + .cmp-slider:before { 
              transform: translateX(20px); 
          }
          .cmp-slider:hover {
              background-color: #52525b;
          }
          input:checked + .cmp-slider:hover {
              background-color: #dc2626;
          }
      `;
      document.head.appendChild(styleSheet);
  }

  function buttonStyle(type = 'primary') {
      if (type === 'primary') {
          return 'cmp-button-primary';
      }
      return 'cmp-button-secondary';
  }

  function attachPopupEventListeners() {
      const popup = document.getElementById(POPUP_ID);
      if (!popup) return;

      popup.querySelector('#cmp-accept-all').addEventListener('click', () => {
          const consent = {};
          for (const type in CONSENT_TYPES) {
              consent[type] = 'granted';
          }
          saveConsent(consent);
          closePopup();
      });

      popup.querySelector('#cmp-deny-all').addEventListener('click', () => {
          const consent = {};
          for (const type in CONSENT_TYPES) {
               // Respect readonly flags - they can't be denied if default is granted
              consent[type] = CONSENT_TYPES[type].readonly && CONSENT_TYPES[type].default === 'granted' ? 'granted' : 'denied';
          }
          saveConsent(consent);
          closePopup();
      });

      popup.querySelector('#cmp-customize').addEventListener('click', () => {
          popup.querySelector('#cmp-main-view').style.display = 'none';
          popup.querySelector('#cmp-customize-view').style.display = 'block';
          // Update checkboxes based on current (potentially default) consent
          const currentConsent = getStoredConsent() || getDefaultConsentObject();
           for (const type in CONSENT_TYPES) {
              if (!CONSENT_TYPES[type].readonly) {
                  const checkbox = popup.querySelector(`#cmp-checkbox-${type}`);
                  if (checkbox) {
                       checkbox.checked = currentConsent[type] === 'granted';
                  }
              }
          }
      });
      
      popup.querySelector('#cmp-back-to-main').addEventListener('click', () => {
          popup.querySelector('#cmp-customize-view').style.display = 'none';
          popup.querySelector('#cmp-main-view').style.display = 'block';
      });

      popup.querySelector('#cmp-save-preferences').addEventListener('click', () => {
          const consent = {};
          for (const type in CONSENT_TYPES) {
              if (CONSENT_TYPES[type].readonly) {
                  consent[type] = CONSENT_TYPES[type].default; // Or whatever logic for readonly
              } else {
                  const checkbox = popup.querySelector(`#cmp-checkbox-${type}`);
                  consent[type] = checkbox.checked ? 'granted' : 'denied';
              }
          }
          saveConsent(consent);
          closePopup();
      });
  }

  function closePopup() {
      const popup = document.getElementById(POPUP_ID);
      if (popup) {
          popup.remove();
      }
      showManageButton(); // Show the button to re-open settings
  }

  function showManageButton() {
      if (document.getElementById(MANAGE_BUTTON_ID)) return;

      const button = document.createElement('button');
      button.id = MANAGE_BUTTON_ID;
      button.textContent = 'Manage Consent';
      
      button.addEventListener('click', () => {
          button.remove(); // Remove itself
          createPopup(); // Re-create the main popup
           // In customize view, ensure checkboxes reflect currently saved state
          const currentConsent = getStoredConsent() || getDefaultConsentObject();
          const popupNode = document.getElementById(POPUP_ID);
          if (popupNode) {
              for (const type in CONSENT_TYPES) {
                  if (!CONSENT_TYPES[type].readonly) {
                      const checkbox = popupNode.querySelector(`#cmp-checkbox-${type}`);
                      if (checkbox) checkbox.checked = currentConsent[type] === 'granted';
                  }
              }
          }
      });
      document.body.appendChild(button);
  }

  function getDefaultConsentObject() {
      const defaults = {};
      for (const type in CONSENT_TYPES) {
          defaults[type] = CONSENT_TYPES[type].default;
      }
      return defaults;
  }

  // --- Initialization ---
  function init() {
      // 1. Set Google Consent Mode defaults *immediately*
      // This must happen before any Google tags fire.
      setDefaultConsent();

      // 2. Load consent from localStorage
      const storedConsent = getStoredConsent();

      if (storedConsent) {
          // 3a. If consent is stored, update Google Consent Mode with stored values
          gtag('consent', 'update', storedConsent);
          console.log('CMP: Loaded and applied stored consent:', storedConsent);
          showManageButton(); // Show manage button if consent already given/denied
      } else {
          // 3b. If no consent is stored (first visit or cleared), show the popup
          // We wait a tiny moment for the page to render a bit, not strictly necessary
          // but can feel a bit smoother.
          setTimeout(createPopup, 50); 
      }
  }

  // Run on DOMContentLoaded or right away if already loaded
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
  } else {
      init();
  }

})();
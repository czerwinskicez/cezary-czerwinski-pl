export const LOCALSTORAGE_KEY = 'googleConsentSettings_v2';

export interface ConsentType {
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
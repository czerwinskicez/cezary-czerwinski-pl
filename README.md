# Cezary Czerwiński - Personal Website

A modern, responsive personal website built with Next.js and hosted on Vercel. The website serves as a professional portfolio and blog platform for Cezary Czerwiński, a Technology Consultant & Developer.

## 🌟 Features

### Core Functionality
- Responsive design optimized for all devices
- Server-side rendering for optimal performance
- Static site generation for blog content
- Google Tag Manager integration for analytics
- SEO optimized with proper meta tags

### Main Sections
1. **Homepage**
   - Hero section with main introduction
   - About section
   - Latest blog posts preview
   - Contact section

2. **Blog System**
   - Dynamic blog post pages
   - Category-based filtering
   - Tag-based organization
   - Reading time estimation
   - Featured images support

3. **Contact Features**
   - Contact form with validation
   - Newsletter subscription system
   - Privacy policy page

### Technical Features
- TypeScript for type safety
- Tailwind CSS for styling
- Firebase integration for data storage
- Automatic revalidation of static pages
- CORS protection
- Environment-based configuration

## 🚀 Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Hosting**: Vercel
- **Analytics**: Google Tag Manager

## 🔧 Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## 🔐 Environment Variables

Required environment variables:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PRIVATE_REVALIDATION_TOKEN`

## 📝 License

All rights reserved. This project is proprietary and confidential.

## Project Structure

```
src/
├── components/     # React components
├── pages/         # Next.js pages and API routes
├── styles/        # Global styles and Tailwind config
├── types/         # TypeScript type definitions
└── lib/           # Utility functions and helpers
```

## AI Usage
This code is almost fully _vibe-coded_.

## Contact

For any questions or concerns, please reach out through the contact form on the website.

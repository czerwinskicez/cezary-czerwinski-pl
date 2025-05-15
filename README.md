# Cezary Czerwiński - Personal Website

A modern, responsive personal website for Cezary Czerwiński built with Next.js, server-side rendering, and deployed on Vercel.

## Features

- Server-Side Rendered (SSR) with Next.js
- Responsive design with Tailwind CSS
- Blog functionality with markdown support
- Newsletter subscription
- Contact form
- Privacy policy page

## Getting Started

### Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with the required environment variables (see `.env.example` for reference)
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Build

To create a production build:

```bash
npm run build
```

To run the production build locally:

```bash
npm start
```

## Deployment on Vercel

This project is optimized for deployment on Vercel:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project in the Vercel dashboard
3. Configure the required environment variables:
   - `NEXT_PUBLIC_BASE_URL`: Your production domain (e.g., https://cezary-czerwinski.pl)
   - `EMAIL_HOST`: SMTP server for sending emails
   - `EMAIL_USER`: Email account username
   - `EMAIL_PASS`: Email account password
   - `CONTACT_EMAIL`: Email where contact form submissions will be sent
   - `MONGODB_URI`: MongoDB connection string for newsletter subscriptions
4. Deploy

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework with SSR
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering
- [MongoDB](https://www.mongodb.com/) - Database for newsletter subscriptions
- [Nodemailer](https://nodemailer.com/) - Email sending functionality
- [Vercel](https://vercel.com/) - Deployment platform

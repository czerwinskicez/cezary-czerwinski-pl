/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#fff',
            h1: {
              color: '#fff',
              fontSize: '2.5em',
              fontWeight: '700',
              marginBottom: '1em',
            },
            h2: {
              color: '#fff',
              fontSize: '2em',
              fontWeight: '600',
              marginTop: '2em',
              marginBottom: '1em',
            },
            h3: {
              color: '#fff',
              fontSize: '1.5em',
              fontWeight: '600',
              marginTop: '1.5em',
              marginBottom: '0.75em',
            },
            p: {
              color: '#d1d5db',
              fontSize: '1.125em',
              lineHeight: '1.75',
              marginBottom: '1.25em',
            },
            a: {
              color: '#ef4444',
              '&:hover': {
                color: '#dc2626',
              },
            },
            strong: {
              color: '#fff',
              fontWeight: '600',
            },
            ul: {
              color: '#d1d5db',
              marginBottom: '1.25em',
            },
            ol: {
              color: '#d1d5db',
              marginBottom: '1.25em',
            },
            li: {
              marginBottom: '0.5em',
            },
            blockquote: {
              color: '#d1d5db',
              borderLeftColor: '#ef4444',
              fontStyle: 'italic',
            },
            code: {
              color: '#ef4444',
              backgroundColor: '#1f2937',
              padding: '0.2em 0.4em',
              borderRadius: '0.25em',
            },
            pre: {
              backgroundColor: '#1f2937',
              color: '#d1d5db',
              padding: '1em',
              borderRadius: '0.5em',
              overflowX: 'auto',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
}
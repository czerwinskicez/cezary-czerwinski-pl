# Building a Modern Personal Website with Next.js and Firebase CMS

## Introduction

In today's digital age, having a professional online presence is crucial for technology consultants and developers. This article explores the architecture and implementation of a modern personal website system that combines a Next.js frontend with a Firebase-powered CMS. The system serves as both a professional portfolio and a content management platform, demonstrating best practices in web development and content management.

## System Architecture

### Overview

The system consists of two main components:
1. A Next.js-based frontend website (www.cezary-czerwinski.pl)
2. A Firebase-powered CMS (cms.cezary-czerwinski.pl)

This separation of concerns allows for a clean architecture where the frontend focuses on presentation and user experience, while the CMS handles content management and data operations.

### Frontend Architecture

The frontend is built using Next.js, a React framework that provides:
- Server-side rendering (SSR) for optimal performance
- Static site generation (SSG) for blog content
- API routes for dynamic functionality
- Built-in TypeScript support
- Automatic code splitting

The frontend is structured into several key sections:
- Homepage with hero section and about information
- Blog system with category and tag support
- Contact system with form validation
- Newsletter subscription system

### CMS Architecture

The CMS is built on Firebase's suite of services:
- Firestore for database operations
- Firebase Functions for serverless backend
- Firebase Storage for media management
- Firebase Authentication for secure access
- Firebase Hosting for the CMS interface

## Key Features and Implementation

### 1. Blog System

The blog system is a core feature that demonstrates the integration between the frontend and CMS:

```typescript
// Example of blog post fetching in Next.js
export const getStaticProps: GetStaticProps = async () => {
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, orderBy('date', 'desc'), limit(3));
  const querySnapshot = await getDocs(q);
  
  const latestPosts = querySnapshot.docs.map(doc => ({
    slug: doc.data().slug,
    title: doc.data().title,
    date: doc.data().date.toDate().toISOString(),
    // ... other post data
  }));

  return {
    props: { latestPosts },
    revalidate: 60 * 60 * 24, // Revalidate daily
  };
};
```

### 2. Content Revalidation

A crucial feature of the system is automatic content revalidation. When content is updated in the CMS, the frontend pages are automatically revalidated:

```javascript
// Firebase Function for revalidation
exports.revalidateBlogContent = onDocumentWritten(
  {
    document: "posts/{postId}",
    region: "europe-central2",
  },
  async (event) => {
    const pathsToRevalidate = ["/", "/blog"];
    if (event.data.after.data().slug) {
      pathsToRevalidate.push(`/blog/${event.data.after.data().slug}`);
    }
    // Trigger revalidation for each path
  }
);
```

### 3. Contact and Newsletter System

The system implements secure contact and newsletter functionality:

```javascript
// Contact form handling
exports.sendContactMessage = onRequest(
  { region: "europe-central2" },
  async (req, res) => {
    const { name, email, message } = req.body;
    // Validation and storage in Firestore
  }
);

// Newsletter subscription
exports.subscribeToNewsletter = onRequest(
  { region: "europe-central2" },
  async (req, res) => {
    const email = req.body.email;
    // Email validation and subscription management
  }
);
```

## Security Considerations

The system implements several security measures:

1. **CORS Protection**
   - Strict origin checking
   - Predefined allowed origins
   - Secure headers configuration

2. **Data Validation**
   - Input sanitization
   - Type checking
   - Email validation

3. **Access Control**
   - Role-based authentication
   - IP tracking
   - Rate limiting

## Performance Optimization

The system employs various optimization techniques:

1. **Frontend**
   - Static site generation for blog content
   - Image optimization
   - Code splitting
   - Caching strategies

2. **Backend**
   - Serverless functions for scalability
   - Efficient database queries
   - Caching mechanisms

## Development Workflow

The development process follows modern best practices:

1. **Local Development**
   ```bash
   # Frontend
   npm install
   npm run dev

   # CMS
   firebase init
   firebase serve
   ```

2. **Deployment**
   - Frontend: Vercel
   - CMS: Firebase Hosting
   - Functions: Firebase Cloud Functions

## Future Enhancements

Potential areas for future development:

1. **Content Features**
   - Advanced media management
   - Multi-language support
   - Content versioning

2. **Technical Improvements**
   - Edge caching
   - Advanced analytics
   - Performance monitoring

## Conclusion

This system demonstrates how modern web technologies can be combined to create a robust, scalable, and maintainable personal website platform. The separation of frontend and CMS concerns, combined with serverless architecture, provides a solid foundation for future growth and feature additions.

The combination of Next.js and Firebase offers a powerful solution for developers looking to build professional websites with advanced content management capabilities. The system's architecture ensures good performance, security, and maintainability while providing a great user experience for visitors.
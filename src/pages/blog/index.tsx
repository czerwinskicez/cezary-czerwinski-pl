import React, { useState, useEffect, useMemo } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
// import Link from 'next/link'; // No longer needed directly
// import Image from 'next/image'; // No longer needed directly
import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { BlogCard } from '../../components/BlogCard'; // Import the new component
import { db } from '../../lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { BlogIndexProps, BlogPost } from '../../types/blog';
// import { ArrowRightIcon } from '@heroicons/react/24/outline'; // No longer needed directly

export default function BlogIndex({ posts }: BlogIndexProps) {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    posts.forEach(post => {
      if (post.category) categories.add(post.category);
    });
    return Array.from(categories).sort();
  }, [posts]);

  useEffect(() => {
    if (!router.isReady) return;

    const currentPathParts = router.asPath.split('#');
    const currentPathWithoutHash = currentPathParts[0];
    const currentHashContent = currentPathParts[1];

    if (currentHashContent) {
      // Hash exists in URL. Try to parse it.
      if (allCategories.length > 0) {
        const encodedSlugsFromHash = currentHashContent.split(',');
        const decodedCategoriesFromHash: string[] = [];

        encodedSlugsFromHash.forEach(encodedSlug => {
          try {
            const decodedSlug = decodeURIComponent(encodedSlug.trim()); // trim potential whitespace
            if (decodedSlug) { // Ensure not an empty string from splitting ",," or trailing/leading comma
              const matchedCategory = allCategories.find(
                (cat) => cat.toLowerCase().replace(/\s+/g, '-') === decodedSlug
              );
              if (matchedCategory) {
                decodedCategoriesFromHash.push(matchedCategory);
              }
            }
          } catch (e) {
            console.warn("Error decoding URI component from hash:", encodedSlug, e);
          }
        });

        // Update selectedCategories state
        setSelectedCategories((prevSelected) => {
          const sortedPrev = [...prevSelected].sort();
          // Ensure uniqueness in decodedCategoriesFromHash before sorting for comparison
          const uniqueNewCategories = Array.from(new Set(decodedCategoriesFromHash)).sort();
          if (JSON.stringify(sortedPrev) === JSON.stringify(uniqueNewCategories)) {
            return prevSelected; // No change in actual selected categories
          }
          return uniqueNewCategories;
        });

        // Normalize URL: ensure hash only contains valid, sorted, uniquely slugified categories
        if (decodedCategoriesFromHash.length > 0) {
          const uniqueValidCategories = Array.from(new Set(decodedCategoriesFromHash));
          const newNormalizedHash = uniqueValidCategories
              .slice()
              .sort() // Sort category names alphabetically
              .map(cat => cat.toLowerCase().replace(/\s+/g, '-'))
              .map(slug => encodeURIComponent(slug))
              .join(',');
          
          const expectedNormalizedPath = `${currentPathWithoutHash}#${newNormalizedHash}`;
          if (router.asPath !== expectedNormalizedPath) {
              router.replace(expectedNormalizedPath, undefined, { shallow: true });
          }
        } else {
          // Hash was present but parsed into zero valid categories. Remove hash.
          if (router.asPath !== currentPathWithoutHash) {
              router.replace(currentPathWithoutHash, undefined, { shallow: true });
          }
        }
      } else { 
        // Hash exists in URL, but allCategories is empty (e.g. still loading or genuinely no categories).
        // Clear selected categories and remove the hash as it can't be validated.
        setSelectedCategories(prev => prev.length > 0 ? [] : prev);
        if (router.asPath !== currentPathWithoutHash) {
          router.replace(currentPathWithoutHash, undefined, { shallow: true });
        }
      }
    } else { // No hash in URL
      // Ensure selectedCategories is empty if it's not already.
      setSelectedCategories((prevSelected) => {
        if (prevSelected.length > 0) {
          return [];
        }
        return prevSelected;
      });
    }
  }, [router.isReady, router.asPath, allCategories, router]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategories(prev => {
      const updatedSelectedCategories = prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category];

      const currentPathWithoutHash = router.asPath.split('#')[0];
      let newTargetRouterPath: string | undefined = undefined;

      if (updatedSelectedCategories.length > 0) {
        const categorySlugs = updatedSelectedCategories
          .slice() // Create a copy
          .sort() // Sort category names alphabetically for consistent slug order
          .map(cat => cat.toLowerCase().replace(/\s+/g, '-'))
          .map(slug => encodeURIComponent(slug));
        const hashString = categorySlugs.join(',');
        const potentialPath = `${currentPathWithoutHash}#${hashString}`;
        
        if (router.asPath !== potentialPath) {
          newTargetRouterPath = potentialPath;
        }
      } else { // updatedSelectedCategories.length === 0, means clear hash
        const potentialPath = currentPathWithoutHash;
        // Only update if there was a hash to remove or if path isn't already the base path
        if (router.asPath !== potentialPath && router.asPath.includes('#')) { 
          newTargetRouterPath = potentialPath;
        }
      }

      if (newTargetRouterPath) {
        router.replace(newTargetRouterPath, undefined, { shallow: true });
      }
      
      return updatedSelectedCategories; 
    });
  };

  const filteredPosts = useMemo(() => {
    if (selectedCategories.length === 0) {
      return posts;
    }
    return posts.filter(post => post.category && selectedCategories.includes(post.category));
  }, [posts, selectedCategories]);

  return (
    <>
      <Head>
        <title>Blog - Cezary Czerwiński</title>
        <meta 
          name="description" 
          content="Articles and insights on technology, software development, and digital transformation by Cezary Czerwiński."
        />
      </Head>
      <Layout>
        <Header />
        <section className="py-20 bg-black">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Blog
              </h1>
              <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Insights and analysis on the latest technology trends and how
                they're reshaping the business landscape.
              </p>
            </div>

            {/* Category Filters */}
            {allCategories.length > 0 && (
              <div className="mb-12 text-center">
                <p className="text-lg text-gray-400 mb-4">Filter by category:</p>
                <div className="flex flex-wrap justify-center items-center gap-3">
                  {allCategories.map(category => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className={`px-4 py-2 font-medium text-sm transition-colors border
                                  ${selectedCategories.includes(category) 
                                    ? 'bg-red-600 text-white border-red-700' 
                                    : 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white'}`}
                    >
                      {category}
                    </button>
                  ))}
                  {/* <button
                    onClick={() => {
                      setSelectedCategories([]);
                      if (router.asPath.includes('#')) {
                        const newPath = '/blog';
                        if (router.asPath !== newPath) {
                            router.replace(newPath, undefined, { shallow: true });
                        }
                      }
                    }}
                    className={`px-4 py-2 font-medium text-sm transition-all duration-300 border
                                ${selectedCategories.length > 0 
                                  ? 'opacity-100 pointer-events-auto border-gray-500 text-gray-400 hover:bg-gray-500 hover:text-white' 
                                  : 'opacity-0 pointer-events-none border-transparent text-transparent'}`}
                  >
                    Clear Filters
                  </button> */}
                </div>
              </div>
            )}
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts && filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))
              ) : (
                <p className="text-gray-400 col-span-full text-center">
                  {selectedCategories.length > 0 
                    ? "No blog posts found for the selected criteria. Try adjusting your filters." 
                    : "No blog posts found. Check back later!"}
                </p>
              )}
            </div>
          </div>
        </section>
        <Footer />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // console.log('BlogIndex - getStaticProps: Fetching posts...');
  try {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    
    // console.log('BlogIndex - getStaticProps: querySnapshot empty?', querySnapshot.empty);
    // console.log('BlogIndex - getStaticProps: querySnapshot size:', querySnapshot.size);

    const posts: BlogPost[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // console.log('BlogIndex - getStaticProps: Processing doc:', doc.id, data);
      posts.push({
        slug: data.slug,
        title: data.title,
        date: data.date.toDate().toISOString(),
        category: data.category || '',
        excerpt: data.excerpt,
        tags: data.tags || [],
        heroImageUrl: data.heroImageUrl,
        readingTime: data.readingTime,
        createdAt: data.createdAt.toDate().toISOString(),
        updatedAt: data.updatedAt.toDate().toISOString()
      });
    });
    // console.log('BlogIndex - getStaticProps: Processed posts:', posts);

    return {
      props: {
        posts,
      },
      revalidate: 60 * 60 * 24, // Revalidate every 24 hours
    };
  } catch (error) {
    console.error('Error fetching blog posts for blog index page:', error);
    return {
      props: {
        posts: [],
      },
      revalidate: 60, // Revalidate every 1 minute in case of error
    };
  }
};
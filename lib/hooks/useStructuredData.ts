import { useEffect } from 'react';

/**
 * Hook to inject JSON-LD structured data into the page
 * Helps search engines understand page content
 */
export function useStructuredData(schema: any) {
  useEffect(() => {
    // Remove old structured data
    const existing = document.querySelector('script[type="application/ld+json"]');
    if (existing) {
      existing.remove();
    }

    // Create and inject new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [schema]);
}

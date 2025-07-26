import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  structuredData?: object;
}

export default function SEOHead({
  title = "دارچو - بهترین پلتفرم خرید و فروش املاک در ایران",
  description = "خرید و فروش ویلا، آپارتمان، زمین و املاک تجاری در ایران. بهترین قیمت‌ها، مشاوره رایگان و تضمین قانونی. پلتفرم معتبر املاک دارچو.",
  keywords = "خرید خانه، فروش ملک، املاک ایران، ویلا، آپارتمان، زمین، املاک تجاری، مشاور املاک، سرمایه گذاری املاک، دارچو",
  canonical,
  ogTitle,
  ogDescription,
  ogImage = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630",
  ogType = "website",
  ogUrl,
  structuredData
}: SEOProps) {
  
  useEffect(() => {
    // Set document title
    document.title = title;
    
    // Helper function to set or update meta tags
    const setMetaTag = (name: string, content: string, property?: string) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Set or update link tags
    const setLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    // Basic meta tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMetaTag('author', 'دارچو - پلتفرم املاک');
    setMetaTag('language', 'fa');
    
    // Open Graph tags
    setMetaTag('og:title', ogTitle || title, 'property');
    setMetaTag('og:description', ogDescription || description, 'property');
    setMetaTag('og:image', ogImage, 'property');
    setMetaTag('og:type', ogType, 'property');
    setMetaTag('og:site_name', 'دارچو', 'property');
    setMetaTag('og:locale', 'fa_IR', 'property');
    
    if (ogUrl) {
      setMetaTag('og:url', ogUrl, 'property');
    }

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', ogTitle || title);
    setMetaTag('twitter:description', ogDescription || description);
    setMetaTag('twitter:image', ogImage);

    // Additional SEO meta tags
    setMetaTag('format-detection', 'telephone=yes');
    setMetaTag('mobile-web-app-capable', 'yes');
    setMetaTag('apple-mobile-web-app-capable', 'yes');
    setMetaTag('apple-mobile-web-app-status-bar-style', 'default');
    setMetaTag('theme-color', '#2563eb');

    // Canonical URL
    if (canonical) {
      setLinkTag('canonical', canonical);
    }

    // Structured Data (JSON-LD)
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
    
  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogImage, ogType, ogUrl, structuredData]);

  return null;
}

// Utility function to generate structured data for real estate
export const generateRealEstateStructuredData = (property?: any, isHomePage = false): object | undefined => {
  if (isHomePage) {
    return {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "دارچو",
      "description": "بهترین پلتفرم خرید و فروش املاک در ایران",
      "url": "https://darchoo.replit.app",
      "logo": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      "telephone": "+98-996-148-8645",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IR",
        "addressLocality": "تهران"
      },
      "areaServed": "ایران",
      "serviceType": [
        "خرید و فروش ویلا",
        "خرید و فروش آپارتمان", 
        "خرید و فروش زمین",
        "املاک تجاری",
        "مشاوره املاک"
      ],
      "sameAs": [
        "https://instagram.com/darchoo",
        "https://t.me/darchoo"
      ]
    };
  }

  if (property) {
    return {
      "@context": "https://schema.org",
      "@type": "Residence",
      "name": property.title,
      "description": property.description,
      "image": property.images?.[0],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": property.location,
        "addressCountry": "IR"
      },
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": property.area,
        "unitText": "متر مربع"
      },
      "numberOfRooms": property.bedrooms,
      "offers": {
        "@type": "Offer",
        "price": property.price,
        "priceCurrency": "IRR",
        "availability": "https://schema.org/InStock"
      }
    };
  }

  return undefined;
};
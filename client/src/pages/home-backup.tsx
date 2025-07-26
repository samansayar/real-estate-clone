import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SearchForm from "@/components/search-form";
import PropertyCard from "@/components/property-card";
import ManagerBanner from "@/components/manager-banner";
import SEOHead, { generateRealEstateStructuredData } from "@/components/seo-head";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { type Property } from "@shared/schema";
import { propertyTypes } from "@/lib/persian-utils";

export default function Home() {
  const { data: featuredVillas, isLoading: villasLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties/featured", "villa"],
    queryFn: async () => {
      const response = await fetch("/api/properties/featured?type=villa");
      return response.json();
    }
  });

  const { data: featuredLands, isLoading: landsLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties/featured", "land"],
    queryFn: async () => {
      const response = await fetch("/api/properties/featured?type=land");
      return response.json();
    }
  });

  const { data: featuredApartments, isLoading: apartmentsLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties/featured", "apartment"],
    queryFn: async () => {
      const response = await fetch("/api/properties/featured?type=apartment");
      return response.json();
    }
  });

  const { data: featuredCommercial, isLoading: commercialLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties/featured", "commercial"],
    queryFn: async () => {
      const response = await fetch("/api/properties/featured?type=commercial");
      return response.json();
    }
  });

  const propertyCategories = [
    { type: "villa", label: "خرید ویلا", color: "from-green-50 to-green-100", hoverColor: "text-green-600", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
    { type: "apartment", label: "خرید آپارتمان", color: "from-blue-50 to-blue-100", hoverColor: "text-blue-600", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
    { type: "land", label: "خرید زمین", color: "from-yellow-50 to-yellow-100", hoverColor: "text-yellow-600", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
    { type: "commercial", label: "خرید اداری", color: "from-purple-50 to-purple-100", hoverColor: "text-purple-600", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
    { type: "commercial", label: "خرید تجاری", color: "from-red-50 to-red-100", hoverColor: "text-red-600", image: "https://images.unsplash.com/photo-1555636222-cae831e670b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
    { type: "industrial", label: "خرید صنعتی", color: "from-gray-50 to-gray-100", hoverColor: "text-gray-600", image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="دارچو - بهترین پلتفرم خرید و فروش املاک در ایران | ویلا، آپارتمان، زمین"
        description="خرید و فروش ویلا، آپارتمان، زمین و املاک تجاری در ایران. بیش از 1000 ملک فروخته شده، مشاوره رایگان و تضمین قانونی. پلتفرم معتبر املاک دارچو با 15 سال تجربه."
        keywords="خرید خانه، فروش ملک، املاک ایران، ویلا دریایی، آپارتمان تهران، زمین شهرکی، املاک تجاری، مشاور املاک، سرمایه گذاری املاک، دارچو، قیمت خانه"
        canonical="https://darchoo.replit.app"
        ogTitle="دارچو - معتبرترین پلتفرم املاک ایران"
        ogDescription="با بیش از 15 سال تجربه و 1000+ ملک فروخته شده، دارچو بهترین فرصت‌های خرید و فروش املاک را ارائه می‌دهد."
        ogUrl="https://darchoo.replit.app"
        ogImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630"
        structuredData={generateRealEstateStructuredData(undefined, true) || undefined}
      />
      
      <Header />
      
      {/* Hero Section with Framer Motion - Mobile-first */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-gradient-to-l from-blue-600 to-blue-800 text-white py-12 md:py-20"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-8 md:mb-12"
          >
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight"
            >
              خرید و فروش املاک در ایران
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto"
            >
              بهترین فرصت‌های سرمایه‌گذاری را با ما کشف کنید
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <SearchForm />
          </motion.div>
        </div>
      </motion.section>

      {/* Property Categories with Framer Motion - Mobile-first */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-8 md:py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-12 text-gray-800"
          >
            دسته‌بندی املاک
          </motion.h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {propertyCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={`/search?type=${category.type}`}>
                  <span className="group block cursor-pointer">
                    <div className={`bg-gradient-to-b ${category.color} rounded-lg md:rounded-xl p-3 sm:p-4 md:p-6 text-center hover:shadow-lg transition-all duration-300 min-h-[120px] sm:min-h-[140px] md:min-h-auto`}>
                      <motion.img 
                        src={category.image} 
                        alt={category.label} 
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-4 rounded-md md:rounded-lg object-cover"
                        whileHover={{ rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      />
                      <h3 className={`font-semibold text-xs sm:text-sm md:text-base text-gray-800 group-hover:${category.hoverColor} leading-tight`}>
                        {category.label}
                      </h3>
                    </div>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Villas with Framer Motion - Mobile-first */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-8 md:py-16 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-6 md:mb-12"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">ویلاهای ویژه</h2>
            <Link href="/search?type=villa&featured=true">
              <motion.span 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-primary hover:text-blue-700 font-medium text-sm md:text-base cursor-pointer"
              >
                مشاهده بیشتر
              </motion.span>
            </Link>
          </motion.div>

          {villasLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="animate-pulse">
                    <div className="h-40 sm:h-44 md:h-48 bg-gray-200"></div>
                    <CardContent className="p-3 sm:p-4 md:p-6">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-4 w-2/3"></div>
                      <div className="h-6 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {featuredVillas?.map((villa, index) => (
                <motion.div
                  key={villa.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <PropertyCard property={villa} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Special Villa Section with Video Cards */}
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-12 text-gray-800">ویلا های ویژه</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Villa Card 1 - Beachfront Villa */}
            <Link href="/property/26048b7f-1657-4797-9410-da660f258d67">
              <a className="block relative bg-white rounded-lg md:rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300" 
                    alt="فروش ویلا تریپلکس، ساحلی، چشم‌نواز"
                    className="w-full h-48 md:h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white rounded-full p-3 transition-colors duration-200 z-10">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm">
                    فروش ویلا تریپلکس، ساحلی، چشم‌نواز
                  </div>
                </div>
              </a>
            </Link>

            {/* Villa Card 2 - Coastal Villa */}
            <Link href="/property/16c9c93e-6ce4-4065-b7e8-5724ca0adcb9">
              <a className="block relative bg-white rounded-lg md:rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300" 
                    alt="فروش ویلا ساحلی در بجک نوشهر"
                    className="w-full h-48 md:h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white rounded-full p-3 transition-colors duration-200 z-10">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm">
                    فروش ویلا ساحلی در بجک نوشهر
                  </div>
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                    جدید
                  </div>
                </div>
              </a>
            </Link>

            {/* Villa Card 3 - Tourist Villa */}
            <Link href="/property/26048b7f-1657-4797-9410-da660f258d67">
              <a className="block relative bg-white rounded-lg md:rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300" 
                    alt="فروش ویلا در منطقه توریستی چمستان"
                    className="w-full h-48 md:h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white rounded-full p-3 transition-colors duration-200 z-10">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm">
                    فروش ویلا در منطقه توریستی چمستان
                  </div>
                </div>
              </a>
            </Link>

            {/* Villa Card 4 - Beach Villa */}
            <Link href="/property/16c9c93e-6ce4-4065-b7e8-5724ca0adcb9">
              <a className="block relative bg-white rounded-lg md:rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300" 
                    alt="ویلا منطقه زیبای خلیج"
                    className="w-full h-48 md:h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white rounded-full p-3 transition-colors duration-200 z-10">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm">
                    ویلا منطقه زیبای خلیج
                  </div>
                </div>
              </a>
            </Link>

            {/* Villa Card 5 - Villa in Nokon */}
            <Link href="/property/26048b7f-1657-4797-9410-da660f258d67">
              <a className="block relative bg-white rounded-lg md:rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300" 
                    alt="فروش ویلا ۷۵۰ متری در نکن نوشهر ایتیکان"
                    className="w-full h-48 md:h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white rounded-full p-3 transition-colors duration-200 z-10">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm">
                    فروش ویلا ۷۵۰ متری در نکن نوشهر ایتیکان
                  </div>
                </div>
              </a>
            </Link>

            {/* Villa Card 6 - City Villa */}
            <Link href="/property/16c9c93e-6ce4-4065-b7e8-5724ca0adcb9">
              <a className="block relative bg-white rounded-lg md:rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300" 
                    alt="فروش ویلا شهری در آرتان نوشهر"
                    className="w-full h-48 md:h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white rounded-full p-3 transition-colors duration-200 z-10">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm">
                    فروش ویلا شهری در آرتان نوشهر
                  </div>
                </div>
              </a>
            </Link>
          </div>

          {/* View More Button */}
          <div className="text-center mt-8">
            <Link href="/search?type=villa&featured=true">
              <a className="inline-block bg-white border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary px-8 py-3 rounded-lg font-medium transition-colors duration-200">
                مشاهده بیشتر
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Manager Banner */}
      <ManagerBanner />

      {/* Featured Lands - Mobile-first */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">زمین‌های ویژه</h2>
            <Link href="/search?type=land&featured=true">
              <a className="text-primary hover:text-blue-700 font-medium text-sm md:text-base">مشاهده بیشتر</a>
            </Link>
          </div>

          {landsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-32 sm:h-36 md:h-40 bg-gray-200"></div>
                  <CardContent className="p-3 sm:p-4">
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded mb-3 w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredLands?.map((land) => (
                <PropertyCard key={land.id} property={land} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Apartments */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-800">آپارتمان‌های ویژه</h2>
            <Link href="/search?type=apartment&featured=true">
              <a className="text-primary hover:text-blue-700 font-medium">مشاهده بیشتر</a>
            </Link>
          </div>

          {apartmentsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4 w-2/3"></div>
                    <div className="h-6 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredApartments?.map((apartment) => (
                <PropertyCard key={apartment.id} property={apartment} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Commercial Properties */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-800">املاک تجاری و اداری</h2>
            <Link href="/search?type=commercial&featured=true">
              <a className="text-primary hover:text-blue-700 font-medium">مشاهده بیشتر</a>
            </Link>
          </div>

          {commercialLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-36 bg-gray-200"></div>
                  <CardContent className="p-4">
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded mb-3 w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredCommercial?.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PropertyCard from "@/components/property-card";
import AdvancedSearchFilters from "@/components/advanced-search-filters";
import SEOHead, { generateRealEstateStructuredData } from "@/components/seo-head";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { type Property } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

interface SearchFilters {
  type?: string;
  province?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  rooms?: number[];
  amenities?: string[];
  propertyAge?: string;
  transactionType?: "خرید" | "اجاره";
}

export default function Search() {
  const [location, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [sortBy, setSortBy] = useState("newest");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Parse URL parameters
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const [filters, setFilters] = useState<SearchFilters>(() => {
    const initialFilters: SearchFilters = {};
    
    // Parse URL parameters
    if (urlParams.get('type')) initialFilters.type = urlParams.get('type')!;
    if (urlParams.get('province')) initialFilters.province = urlParams.get('province')!;
    if (urlParams.get('city')) initialFilters.city = urlParams.get('city')!;
    if (urlParams.get('minPrice')) initialFilters.minPrice = parseInt(urlParams.get('minPrice')!);
    if (urlParams.get('maxPrice')) initialFilters.maxPrice = parseInt(urlParams.get('maxPrice')!);
    if (urlParams.get('minArea')) initialFilters.minArea = parseInt(urlParams.get('minArea')!);
    if (urlParams.get('maxArea')) initialFilters.maxArea = parseInt(urlParams.get('maxArea')!);
    if (urlParams.get('transactionType')) initialFilters.transactionType = urlParams.get('transactionType') as "خرید" | "اجاره";
    
    return initialFilters;
  });

  const searchMutation = useMutation({
    mutationFn: async (searchFilters: SearchFilters) => {
      const response = await apiRequest("POST", "/api/properties/search", searchFilters);
      return await response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/properties/search", filters], data);
    },
  });

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties/search", filters],
    queryFn: async () => {
      const response = await apiRequest("POST", "/api/properties/search", filters);
      return await response.json();
    },
  });

  useEffect(() => {
    searchMutation.mutate(filters);
  }, [filters]);

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    
    // Update URL
    const searchParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          if (value.length > 0) searchParams.set(key, value.join(','));
        } else {
          searchParams.set(key, value.toString());
        }
      }
    });
    
    setLocation(`/search?${searchParams.toString()}`);
  };

  const handleSearch = () => {
    searchMutation.mutate(filters);
    setShowMobileFilters(false);
  };

  const clearAllFilters = () => {
    setFilters({});
    setLocation('/search');
  };

  const sortedProperties = properties ? [...properties].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "area-small":
        return a.area - b.area;
      case "area-large":
        return b.area - a.area;
      case "newest":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  }) : [];

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.type) count++;
    if (filters.province) count++;
    if (filters.city) count++;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.minArea || filters.maxArea) count++;
    if (filters.rooms?.length) count++;
    if (filters.amenities?.length) count++;
    if (filters.propertyAge) count++;
    if (filters.transactionType) count++;
    return count;
  };

  const structuredData = generateRealEstateStructuredData();

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="جستجوی پیشرفته املاک - دارچو | فیلتر براساس قیمت، موقعیت و امکانات"
        description="جستجوی پیشرفته املاک در ایران با فیلترهای حرفه‌ای. انتخاب براساس قیمت، موقعیت، متراژ، تعداد اتاق و امکانات. یافتن بهترین ملک برای خرید و اجاره."
        keywords="جستجوی املاک، فیلتر املاک، قیمت خانه، خرید آپارتمان، اجاره ویلا، املاک تهران، جستجوی پیشرفته، فیلتر قیمت"
        canonical="https://darchoo.replit.app/search"
        structuredData={structuredData || undefined}
      />
      
      <Header />
      
      {/* Search Header */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-l from-blue-600 to-blue-800 text-white py-8 md:py-12"
      >
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-4xl font-bold text-center mb-4"
          >
            جستجوی پیشرفته املاک
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center text-blue-100 text-lg"
          >
            با فیلترهای حرفه‌ای بهترین ملک را پیدا کنید
          </motion.p>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block">
            <AdvancedSearchFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onSearch={handleSearch}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Mobile Filters Button & Results Header */}
            <div className="flex flex-col space-y-4 mb-8">
              {/* Mobile Filter Button */}
              <div className="lg:hidden">
                <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
                  <SheetTrigger asChild>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <SlidersHorizontal className="w-5 h-5 ml-2" />
                      فیلترهای جستجو
                      {getActiveFiltersCount() > 0 && (
                        <Badge variant="secondary" className="mr-2 bg-white text-blue-600">
                          {getActiveFiltersCount()}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:w-96 overflow-y-auto">
                    <AdvancedSearchFilters
                      filters={filters}
                      onFiltersChange={handleFiltersChange}
                      onSearch={handleSearch}
                    />
                  </SheetContent>
                </Sheet>
              </div>

              {/* Active Filters */}
              {getActiveFiltersCount() > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2 items-center"
                >
                  <span className="text-sm font-medium text-gray-600">فیلترهای فعال:</span>
                  
                  {filters.type && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      نوع: {filters.type}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => handleFiltersChange({ ...filters, type: undefined })}
                      />
                    </Badge>
                  )}
                  
                  {filters.province && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      استان: {filters.province}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => handleFiltersChange({ ...filters, province: undefined, city: undefined })}
                      />
                    </Badge>
                  )}
                  
                  {filters.city && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      شهر: {filters.city}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => handleFiltersChange({ ...filters, city: undefined })}
                      />
                    </Badge>
                  )}
                  
                  {(filters.minPrice || filters.maxPrice) && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      بازه قیمت
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => handleFiltersChange({ ...filters, minPrice: undefined, maxPrice: undefined })}
                      />
                    </Badge>
                  )}
                  
                  {filters.rooms && filters.rooms.length > 0 && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      اتاق: {filters.rooms.join('، ')}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => handleFiltersChange({ ...filters, rooms: undefined })}
                      />
                    </Badge>
                  )}
                  
                  {filters.amenities && filters.amenities.length > 0 && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {filters.amenities.length} امکانات
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => handleFiltersChange({ ...filters, amenities: undefined })}
                      />
                    </Badge>
                  )}
                  
                  <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                    پاک کردن همه
                  </Button>
                </motion.div>
              )}

              {/* Results Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <motion.h2 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xl md:text-2xl font-bold text-gray-800 mb-2"
                  >
                    نتایج جستجو
                  </motion.h2>
                  {properties && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-gray-600"
                    >
                      {properties.length} ملک یافت شد
                    </motion.p>
                  )}
                </div>
                
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">مرتب‌سازی:</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">جدیدترین</SelectItem>
                      <SelectItem value="price-low">قیمت (کم به زیاد)</SelectItem>
                      <SelectItem value="price-high">قیمت (زیاد به کم)</SelectItem>
                      <SelectItem value="area-small">متراژ (کم به زیاد)</SelectItem>
                      <SelectItem value="area-large">متراژ (زیاد به کم)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            {(isLoading || searchMutation.isPending) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Card className="animate-pulse">
                      <div className="h-48 bg-gray-200"></div>
                      <CardContent className="p-6">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded mb-4 w-2/3"></div>
                        <div className="h-6 bg-gray-200 rounded"></div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : sortedProperties.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {sortedProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <div className="max-w-md mx-auto">
                  <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">ملکی یافت نشد</h3>
                  <p className="text-gray-500 mb-6">
                    با تغییر فیلترهای جستجو، املاک بیشتری را بررسی کنید
                  </p>
                  <Button onClick={clearAllFilters} variant="outline">
                    پاک کردن فیلترها
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PropertyCard from "@/components/property-card";
import SearchFiltersSidebar from "@/components/search-filters-sidebar";
import SEOHead, { generateRealEstateStructuredData } from "@/components/seo-head";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Filter, SlidersHorizontal, X, Search as SearchIcon, Grid3X3, List } from "lucide-react";
import { type Property } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useSearchStore } from "@/stores/search-store";

export default function Search() {
  const [location, setLocation] = useLocation();
  const queryClient = useQueryClient();
  
  const { 
    filters, 
    sortBy, 
    isLoading,
    showMobileFilters,
    setFilters,
    setSortBy,
    setIsLoading,
    setShowMobileFilters,
    clearFilters,
    getActiveFiltersCount,
    updateFilter
  } = useSearchStore();

  // Parse URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const urlFilters: any = {};
    
    if (urlParams.get('type')) urlFilters.type = urlParams.get('type');
    if (urlParams.get('province')) urlFilters.province = urlParams.get('province');
    if (urlParams.get('city')) urlFilters.city = urlParams.get('city');
    if (urlParams.get('minPrice')) urlFilters.minPrice = parseInt(urlParams.get('minPrice')!);
    if (urlParams.get('maxPrice')) urlFilters.maxPrice = parseInt(urlParams.get('maxPrice')!);
    if (urlParams.get('transactionType')) urlFilters.transactionType = urlParams.get('transactionType');
    
    if (Object.keys(urlFilters).length > 0) {
      setFilters(urlFilters);
    }
  }, []);

  const searchMutation = useMutation({
    mutationFn: async (searchFilters: any) => {
      setIsLoading(true);
      const response = await apiRequest("POST", "/api/properties/search", searchFilters);
      return await response.json();
    },
    onSuccess: (data) => {
      setIsLoading(false);
      queryClient.setQueryData(["/api/properties/search", filters], data);
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const { data: properties } = useQuery<Property[]>({
    queryKey: ["/api/properties/search", filters],
    queryFn: async () => {
      const response = await apiRequest("POST", "/api/properties/search", filters);
      return await response.json();
    },
    enabled: false, // We'll trigger this manually
  });

  const handleSearch = () => {
    // Update URL
    const searchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          if (value.length > 0) searchParams.set(key, value.join(','));
        } else {
          searchParams.set(key, value.toString());
        }
      }
    });
    
    setLocation(`/search?${searchParams.toString()}`);
    searchMutation.mutate(filters);
    setShowMobileFilters(false);
  };

  const handleClearFilters = () => {
    clearFilters();
    setLocation('/search');
    searchMutation.mutate({});
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
      
      {/* Clean Modern Header */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white border-b border-gray-200 py-8"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-50 rounded-xl">
              <SearchIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">جستجوی املاک</h1>
              <p className="text-gray-600 mt-1">بهترین ملک را با فیلترهای پیشرفته پیدا کنید</p>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block">
            <SearchFiltersSidebar onSearch={handleSearch} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Mobile Filter & Controls */}
            <div className="flex flex-col space-y-4 mb-6">
              {/* Mobile Filter Button */}
              <div className="lg:hidden">
                <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
                  <SheetTrigger asChild>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl shadow-sm">
                      <SlidersHorizontal className="w-5 h-5 ml-2" />
                      فیلترهای جستجو
                      {getActiveFiltersCount() > 0 && (
                        <Badge variant="secondary" className="mr-2 bg-white text-blue-600 font-medium">
                          {getActiveFiltersCount()}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:w-96 overflow-y-auto p-0">
                    <SheetHeader className="p-6 border-b border-gray-100">
                      <SheetTitle className="text-right">فیلترهای جستجو</SheetTitle>
                    </SheetHeader>
                    <div className="p-4">
                      <SearchFiltersSidebar onSearch={handleSearch} />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Active Filters */}
              {getActiveFiltersCount() > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-4 border border-gray-200"
                >
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm font-medium text-gray-700">فیلترهای فعال:</span>
                    
                    {filters.type && (
                      <Badge variant="secondary" className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200">
                        نوع: {filters.type}
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-blue-900" 
                          onClick={() => updateFilter("type", undefined)}
                        />
                      </Badge>
                    )}
                    
                    {filters.province && (
                      <Badge variant="secondary" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
                        استان: {filters.province}
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-green-900" 
                          onClick={() => {
                            updateFilter("province", undefined);
                            updateFilter("city", undefined);
                          }}
                        />
                      </Badge>
                    )}
                    
                    {filters.city && (
                      <Badge variant="secondary" className="flex items-center gap-1 bg-purple-50 text-purple-700 border-purple-200">
                        شهر: {filters.city}
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-purple-900" 
                          onClick={() => updateFilter("city", undefined)}
                        />
                      </Badge>
                    )}
                    
                    {(filters.minPrice || filters.maxPrice) && (
                      <Badge variant="secondary" className="flex items-center gap-1 bg-yellow-50 text-yellow-700 border-yellow-200">
                        بازه قیمت
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-yellow-900" 
                          onClick={() => {
                            updateFilter("minPrice", undefined);
                            updateFilter("maxPrice", undefined);
                          }}
                        />
                      </Badge>
                    )}
                    
                    {filters.rooms && filters.rooms.length > 0 && (
                      <Badge variant="secondary" className="flex items-center gap-1 bg-red-50 text-red-700 border-red-200">
                        اتاق: {filters.rooms.join('، ')}
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-red-900" 
                          onClick={() => updateFilter("rooms", undefined)}
                        />
                      </Badge>
                    )}
                    
                    {filters.amenities && filters.amenities.length > 0 && (
                      <Badge variant="secondary" className="flex items-center gap-1 bg-indigo-50 text-indigo-700 border-indigo-200">
                        {filters.amenities.length} امکانات
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-indigo-900" 
                          onClick={() => updateFilter("amenities", undefined)}
                        />
                      </Badge>
                    )}
                    
                    <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-gray-500 hover:text-gray-700">
                      پاک کردن همه
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Results Header */}
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <Grid3X3 className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">نتایج جستجو</h2>
                      {properties && (
                        <p className="text-sm text-gray-600">
                          {properties.length} ملک یافت شد
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700">مرتب‌سازی:</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48 h-10">
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
            </div>

            {/* Results Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Card className="animate-pulse border border-gray-200">
                      <div className="h-48 bg-gray-200"></div>
                      <CardContent className="p-4">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded mb-4 w-2/3"></div>
                        <div className="h-6 bg-gray-200 rounded"></div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : sortedProperties && sortedProperties.length > 0 ? (
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
                <div className="bg-white rounded-xl p-12 border border-gray-200 max-w-md mx-auto">
                  <div className="p-4 bg-gray-50 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <SearchIcon className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">ملکی یافت نشد</h3>
                  <p className="text-gray-600 mb-6">
                    با تغییر فیلترهای جستجو، املاک بیشتری را بررسی کنید
                  </p>
                  <Button onClick={handleClearFilters} variant="outline" className="rounded-lg">
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
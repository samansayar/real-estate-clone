import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SearchForm from "@/components/search-form";
import PropertyCard from "@/components/property-card";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type Property } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function Search() {
  const [location] = useLocation();
  const queryClient = useQueryClient();
  const [sortBy, setSortBy] = useState("newest");
  
  // Parse URL parameters
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const initialFilters = Object.fromEntries(urlParams);

  const searchMutation = useMutation({
    mutationFn: async (filters: any) => {
      const response = await apiRequest("POST", "/api/properties/search", filters);
      return await response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/properties/search", initialFilters], data);
    },
  });

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties/search", initialFilters],
    queryFn: async () => {
      const response = await apiRequest("POST", "/api/properties/search", initialFilters);
      return await response.json();
    },
  });

  useEffect(() => {
    searchMutation.mutate(initialFilters);
  }, [location]);

  const handleSearch = (filters: any) => {
    searchMutation.mutate(filters);
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

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Search Header */}
      <section className="bg-gradient-to-l from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">جستجوی املاک</h1>
          <div className="max-w-4xl mx-auto">
            <SearchForm onSubmit={handleSearch} />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">نتایج جستجو</h2>
              {properties && (
                <p className="text-gray-600">
                  {properties.length} ملک یافت شد
                </p>
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

          {/* Results Grid */}
          {(isLoading || searchMutation.isPending) ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(9)].map((_, i) => (
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
          ) : sortedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-500 text-lg mb-4">هیچ ملکی با این مشخصات یافت نشد</div>
              <p className="text-gray-400">لطفاً فیلترهای جستجو را تغییر دهید</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

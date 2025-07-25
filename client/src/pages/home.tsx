import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SearchForm from "@/components/search-form";
import PropertyCard from "@/components/property-card";
import ManagerBanner from "@/components/manager-banner";
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
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-l from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">خرید و فروش املاک در ایران</h1>
            <p className="text-xl md:text-2xl text-blue-100">بهترین فرصت‌های سرمایه‌گذاری را با ما کشف کنید</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Property Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">دسته‌بندی املاک</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {propertyCategories.map((category, index) => (
              <Link key={index} href={`/search?type=${category.type}`}>
                <a className="group">
                  <div className={`bg-gradient-to-b ${category.color} rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
                    <img 
                      src={category.image} 
                      alt={category.label} 
                      className="w-16 h-16 mx-auto mb-4 rounded-lg object-cover"
                    />
                    <h3 className={`font-semibold text-gray-800 group-hover:${category.hoverColor}`}>
                      {category.label}
                    </h3>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Villas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-800">ویلاهای ویژه</h2>
            <Link href="/search?type=villa&featured=true">
              <a className="text-primary hover:text-blue-700 font-medium">مشاهده بیشتر</a>
            </Link>
          </div>

          {villasLoading ? (
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
              {featuredVillas?.map((villa) => (
                <PropertyCard key={villa.id} property={villa} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Manager Banner */}
      <ManagerBanner />

      {/* Featured Lands */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-800">زمین‌های ویژه</h2>
            <Link href="/search?type=land&featured=true">
              <a className="text-primary hover:text-blue-700 font-medium">مشاهده بیشتر</a>
            </Link>
          </div>

          {landsLoading ? (
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

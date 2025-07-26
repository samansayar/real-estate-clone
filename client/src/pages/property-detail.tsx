import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Bed, Bath, Car, MapPin, Phone, Mail, ArrowRight, Building, Calendar, FileText, Home, User } from "lucide-react";
import { type Property } from "@shared/schema";
import { formatPrice, toPersianNumber, propertyTypes } from "@/lib/persian-utils";
import PropertyCard from "@/components/property-card";

export default function PropertyDetail() {
  const params = useParams();
  const propertyId = params.id;

  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: ["/api/properties", propertyId],
    queryFn: async () => {
      const response = await fetch(`/api/properties/${propertyId}`);
      if (!response.ok) {
        throw new Error("Property not found");
      }
      return response.json();
    },
  });

  // Fetch similar properties
  const { data: similarProperties } = useQuery<Property[]>({
    queryKey: ["/api/properties/similar", propertyId],
    queryFn: async () => {
      const response = await fetch(`/api/properties/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: property?.type,
          city: property?.city,
        }),
      });
      const allProperties = await response.json();
      // Filter out current property and limit to 6 results
      return allProperties.filter((p: Property) => p.id !== propertyId).slice(0, 6);
    },
    enabled: !!property,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-2/3"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
              <div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">ملک یافت نشد</h1>
          <p className="text-gray-600 mb-8">ملک مورد نظر حذف شده یا موجود نیست</p>
          <Link href="/">
            <Button>
              <ArrowRight className="w-4 h-4 ml-2" />
              بازگشت به صفحه اصلی
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-reverse space-x-2 text-sm">
            <Link href="/">
              <a className="text-primary hover:underline">خانه</a>
            </Link>
            <span className="text-gray-500">/</span>
            <Link href={`/search?type=${property.type}`}>
              <a className="text-primary hover:underline">
                {propertyTypes[property.type as keyof typeof propertyTypes]}
              </a>
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-700">{property.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
          {property.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {property.images.slice(1, 5).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${property.title} - تصویر ${index + 2}`}
                  className="h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                />
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.title}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 ml-2" />
                  <span>{property.address}، {property.city}، {property.province}</span>
                </div>
              </div>
              {property.featured && (
                <Badge className="bg-secondary text-white">
                  ویژه
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="text-3xl font-bold text-primary">
                {formatPrice(property.price)}
              </div>
              <div className="text-xl text-gray-600">
                {toPersianNumber(property.area)} متر مربع
              </div>
            </div>

            {/* Property Features */}
            {(property.bedrooms || property.bathrooms || property.parking) && (
              <div className="flex items-center space-x-reverse space-x-8 mb-8 text-gray-600">
                {property.bedrooms && (
                  <div className="flex items-center">
                    <Bed className="w-5 h-5 ml-2" />
                    <span>{toPersianNumber(property.bedrooms)} خواب</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center">
                    <Bath className="w-5 h-5 ml-2" />
                    <span>{toPersianNumber(property.bathrooms)} حمام</span>
                  </div>
                )}
                {property.parking && (
                  <div className="flex items-center">
                    <Car className="w-5 h-5 ml-2" />
                    <span>پارکینگ</span>
                  </div>
                )}
              </div>
            )}

            <Separator className="mb-8" />

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">توضیحات</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {/* Property Specifications */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">مشخصات ملک</h2>
              <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Type */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Building className="w-5 h-5 text-gray-600 ml-3" />
                      <span className="text-gray-700">نوع:</span>
                    </div>
                    <span className="font-medium text-gray-800">
                      {property.type === 'villa' ? 'مسکونی' : propertyTypes[property.type as keyof typeof propertyTypes]}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-gray-600 ml-3" />
                      <span className="text-gray-700">موقعیت:</span>
                    </div>
                    <span className="font-medium text-gray-800">ساحلی</span>
                  </div>

                  {/* Built Area */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Home className="w-5 h-5 text-gray-600 ml-3" />
                      <span className="text-gray-700">متراژ بنا (مترمربع):</span>
                    </div>
                    <span className="font-medium text-gray-800">
                      {toPersianNumber(Math.floor(property.area * 0.7))} مترمربع
                    </span>
                  </div>

                  {/* Land Area */}
                  <div className="flex items-center justify-between border border-dashed border-gray-300 p-2 rounded">
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-dashed border-gray-600 ml-3"></div>
                      <span className="text-gray-700">متراژ زمین (مترمربع):</span>
                    </div>
                    <span className="font-medium text-gray-800">
                      {toPersianNumber(property.area)} مترمربع
                    </span>
                  </div>

                  {/* Year Built */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-600 ml-3" />
                      <span className="text-gray-700">سال ساخت:</span>
                    </div>
                    <span className="font-medium text-gray-800">{toPersianNumber(1404)}</span>
                  </div>

                  {/* Document */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-600 ml-3" />
                      <span className="text-gray-700">سند:</span>
                    </div>
                    <span className="font-medium text-gray-800">دارد</span>
                  </div>

                  {/* Rooms Count */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Home className="w-5 h-5 text-gray-600 ml-3" />
                      <span className="text-gray-700">تعداد اتاق:</span>
                    </div>
                    <span className="font-medium text-gray-800">
                      {toPersianNumber(property.bedrooms || 5)}
                    </span>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Price Section */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">خرید</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">قیمت کل / تومان:</span>
                      <span className="font-bold text-xl text-primary">
                        {formatPrice(property.price)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">قیمت هر متر:</span>
                      <span className="font-medium text-gray-800">
                        {formatPrice(Math.floor(property.price / property.area))} تومان
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Contact Card */}
          <div>
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">تماس با فروشنده</h3>
                
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">{property.contactName}</h4>
                  <p className="text-gray-600 text-sm">مشاور املاک</p>
                </div>

                <div className="space-y-3 mb-6">
                  <a 
                    href={`tel:${property.contactPhone}`}
                    className="block w-full"
                  >
                    <Button className="w-full bg-primary text-white hover:bg-blue-700">
                      <Phone className="w-4 h-4 ml-2" />
                      {property.contactPhone}
                    </Button>
                  </a>
                  
                  <Button variant="outline" className="w-full">
                    <Mail className="w-4 h-4 ml-2" />
                    ارسال پیام
                  </Button>
                </div>

                <Separator className="mb-4" />

                <div className="text-sm text-gray-600 text-center">
                  <p>پاسخگویی از ساعت ۹ صبح تا ۱۰ شب</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Properties Section */}
        {similarProperties && similarProperties.length > 0 && (
          <div className="mt-16 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">آگهی‌های مشابه</h2>
            
            <div className="relative">
              <Carousel
                opts={{
                  align: "start",
                  direction: "rtl",
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {similarProperties.map((similarProperty) => (
                    <CarouselItem key={similarProperty.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <PropertyCard property={similarProperty} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute -right-12 top-1/2 -translate-y-1/2" />
                <CarouselNext className="absolute -left-12 top-1/2 -translate-y-1/2" />
              </Carousel>
            </div>

            <div className="text-center mt-8">
              <Link href={`/search?type=${property.type}&city=${property.city}`}>
                <Button variant="outline" size="lg">
                  مشاهده همه آگهی‌های مشابه
                  <ArrowRight className="w-4 h-4 mr-2" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

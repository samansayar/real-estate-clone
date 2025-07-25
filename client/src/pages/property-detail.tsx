import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bed, Bath, Car, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { type Property } from "@shared/schema";
import { formatPrice, toPersianNumber, propertyTypes } from "@/lib/persian-utils";

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

            {/* Property Type & Subtype */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">نوع ملک</h3>
                <p className="text-gray-600">
                  {propertyTypes[property.type as keyof typeof propertyTypes]}
                </p>
              </div>
              {property.subType && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">زیر دسته</h3>
                  <p className="text-gray-600">{property.subType}</p>
                </div>
              )}
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
      </div>

      <Footer />
    </div>
  );
}

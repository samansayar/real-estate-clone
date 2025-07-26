import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Car } from "lucide-react";
import { type Property } from "@shared/schema";
import { formatPrice, toPersianNumber } from "@/lib/persian-utils";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export default function PropertyCard({ property, className = "" }: PropertyCardProps) {
  return (
    <Link href={`/property/${property.id}`}>
      <a className={`block ${className}`}>
        <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
          <div className="relative">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-40 sm:h-44 md:h-48 object-cover"
            />
            {property.featured && (
              <Badge className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-secondary text-white text-xs">
                ویژه
              </Badge>
            )}
          </div>
          
          <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow">
            <h3 className="font-bold text-sm sm:text-base md:text-lg mb-2 line-clamp-2 leading-tight">{property.title}</h3>
            <p className="text-gray-600 text-xs sm:text-sm mb-3 md:mb-4 line-clamp-1">
              {property.address}، {property.city}
            </p>
            
            <div className="flex items-center justify-between mb-3 md:mb-4 mt-auto">
              <span className="text-primary font-bold text-sm sm:text-lg md:text-xl">
                {formatPrice(property.price)}
              </span>
              <span className="text-gray-500 text-xs sm:text-sm">
                {toPersianNumber(property.area)} متر
              </span>
            </div>
            
            {(property.bedrooms || property.bathrooms || property.parking) && (
              <div className="flex items-center space-x-reverse space-x-2 sm:space-x-3 md:space-x-4 text-xs sm:text-sm text-gray-600">
                {property.bedrooms && (
                  <span className="flex items-center">
                    <Bed className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                    <span className="hidden sm:inline">{toPersianNumber(property.bedrooms)} خواب</span>
                    <span className="sm:hidden">{toPersianNumber(property.bedrooms)}</span>
                  </span>
                )}
                {property.bathrooms && (
                  <span className="flex items-center">
                    <Bath className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                    <span className="hidden sm:inline">{toPersianNumber(property.bathrooms)} حمام</span>
                    <span className="sm:hidden">{toPersianNumber(property.bathrooms)}</span>
                  </span>
                )}
                {property.parking && (
                  <span className="flex items-center">
                    <Car className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                    <span className="hidden sm:inline">پارکینگ</span>
                    <span className="sm:hidden">پ</span>
                  </span>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}

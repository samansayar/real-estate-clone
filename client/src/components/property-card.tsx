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
        <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="relative">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            {property.featured && (
              <Badge className="absolute top-3 right-3 bg-secondary text-white">
                ویژه
              </Badge>
            )}
          </div>
          
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-2 line-clamp-2">{property.title}</h3>
            <p className="text-gray-600 text-sm mb-4">
              {property.address}، {property.city}
            </p>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-primary font-bold text-xl">
                {formatPrice(property.price)}
              </span>
              <span className="text-gray-500 text-sm">
                {toPersianNumber(property.area)} متر
              </span>
            </div>
            
            {(property.bedrooms || property.bathrooms || property.parking) && (
              <div className="flex items-center space-x-reverse space-x-4 text-sm text-gray-600">
                {property.bedrooms && (
                  <span className="flex items-center">
                    <Bed className="w-4 h-4 ml-1" />
                    {toPersianNumber(property.bedrooms)} خواب
                  </span>
                )}
                {property.bathrooms && (
                  <span className="flex items-center">
                    <Bath className="w-4 h-4 ml-1" />
                    {toPersianNumber(property.bathrooms)} حمام
                  </span>
                )}
                {property.parking && (
                  <span className="flex items-center">
                    <Car className="w-4 h-4 ml-1" />
                    پارکینگ
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

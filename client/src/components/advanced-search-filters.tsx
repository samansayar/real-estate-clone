import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { X, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { iranProvinces, priceRanges, propertyTypes } from "@/lib/persian-utils";

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

interface AdvancedSearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: () => void;
  className?: string;
}

const amenitiesList = [
  "آبگرمکن", "آسانسور", "آیفون تصویری", "استخر", "انباری", 
  "بخاری", "پارکینگ", "سالن اجتماعات", "سالن ورزشی", "سرویس فرنگی",
  "سونا", "شوفاژ", "فول فرنیش", "کاغذ دیواری"
];

const citiesByProvince: Record<string, string[]> = {
  "تهران": ["تهران", "کرج", "شهریار", "ورامین", "رباط کریم", "پاکدشت", "دماوند"],
  "اصفهان": ["اصفهان", "کاشان", "نجف آباد", "خمینی‌شهر", "شاهین‌شهر", "فولادشهر"],
  "فارس": ["شیراز", "مرودشت", "کازرون", "جهرم", "فسا", "لارستان"],
  "خراسان رضوی": ["مشهد", "نیشابور", "سبزوار", "کاشمر", "تربت حیدریه"],
  "آذربایجان شرقی": ["تبریز", "مراغه", "میانه", "اهر", "بناب", "شبستر"],
  "گیلان": ["رشت", "انزلی", "لاهیجان", "آستارا", "تالش", "رودسر"],
  "مازندران": ["ساری", "بابل", "آمل", "قائمشهر", "بابلسر", "نوشهر"],
  "گلستان": ["گرگان", "علی‌آباد کتول", "آزادشهر", "کردکوی", "بندرگز"],
};

const priceRangesDetailed = [
  { label: "تا 500 میلیون تومان", min: 0, max: 500000000 },
  { label: "500 میلیون تا 1 میلیارد", min: 500000000, max: 1000000000 },
  { label: "1 تا 2 میلیارد تومان", min: 1000000000, max: 2000000000 },
  { label: "2 تا 3 میلیارد تومان", min: 2000000000, max: 3000000000 },
  { label: "3 تا 5 میلیارد تومان", min: 3000000000, max: 5000000000 },
  { label: "بالای 5 میلیارد تومان", min: 5000000000, max: Infinity },
];

export default function AdvancedSearchFilters({ 
  filters, 
  onFiltersChange, 
  onSearch,
  className = "" 
}: AdvancedSearchFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    location: true,
    price: true,
    details: false,
    amenities: false
  });

  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    if (filters.province && citiesByProvince[filters.province]) {
      setCities(citiesByProvince[filters.province]);
    } else {
      setCities([]);
    }
  }, [filters.province]);

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    if (key === "province") {
      newFilters.city = undefined; // Reset city when province changes
    }
    onFiltersChange(newFilters);
  };

  const toggleAmenity = (amenity: string) => {
    const currentAmenities = filters.amenities || [];
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(a => a !== amenity)
      : [...currentAmenities, amenity];
    updateFilter("amenities", newAmenities);
  };

  const toggleRoom = (room: number) => {
    const currentRooms = filters.rooms || [];
    const newRooms = currentRooms.includes(room)
      ? currentRooms.filter(r => r !== room)
      : [...currentRooms, room];
    updateFilter("rooms", newRooms);
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

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

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-2xl shadow-xl ${className}`}
    >
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Filter className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">فیلترجستجو</h2>
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {getActiveFiltersCount()} فیلتر فعال
              </Badge>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            پاک کردن همه
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Transaction Type */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">نوع معامله</h3>
          <div className="flex gap-4">
            <Button
              variant={filters.transactionType === "خرید" ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilter("transactionType", "خرید")}
              className="flex-1"
            >
              خرید
            </Button>
            <Button
              variant={filters.transactionType === "اجاره" ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilter("transactionType", "اجاره")}
              className="flex-1"
            >
              اجاره
            </Button>
          </div>
        </div>

        <Separator />

        {/* Property Type */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">نوع ملک</h3>
          <Select value={filters.type} onValueChange={(value) => updateFilter("type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="مسکونی" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">آپارتمان</SelectItem>
              <SelectItem value="villa">ویلا</SelectItem>
              <SelectItem value="land">زمین</SelectItem>
              <SelectItem value="commercial">تجاری</SelectItem>
              <SelectItem value="industrial">صنعتی</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Location Section */}
        <div className="space-y-4">
          <button
            onClick={() => toggleSection("location")}
            className="flex items-center justify-between w-full text-right"
          >
            <h3 className="font-semibold text-gray-800">موقعیت مکانی</h3>
            {expandedSections.location ? 
              <ChevronUp className="w-5 h-5 text-gray-500" /> : 
              <ChevronDown className="w-5 h-5 text-gray-500" />
            }
          </button>
          
          <AnimatePresence>
            {expandedSections.location && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 overflow-hidden"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">استان</label>
                  <Select value={filters.province} onValueChange={(value) => updateFilter("province", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      {iranProvinces.map((province) => (
                        <SelectItem key={province} value={province}>{province}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {cities.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">شهر</label>
                    <Select value={filters.city} onValueChange={(value) => updateFilter("city", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="انتخاب کنید" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Separator />

        {/* Price Section */}
        <div className="space-y-4">
          <button
            onClick={() => toggleSection("price")}
            className="flex items-center justify-between w-full text-right"
          >
            <h3 className="font-semibold text-gray-800">قیمت خرید</h3>
            {expandedSections.price ? 
              <ChevronUp className="w-5 h-5 text-gray-500" /> : 
              <ChevronDown className="w-5 h-5 text-gray-500" />
            }
          </button>
          
          <AnimatePresence>
            {expandedSections.price && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">از</label>
                    <Select onValueChange={(value) => {
                      const range = priceRangesDetailed.find(r => r.label === value);
                      if (range) updateFilter("minPrice", range.min);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="انتخاب" />
                      </SelectTrigger>
                      <SelectContent>
                        {priceRangesDetailed.map((range) => (
                          <SelectItem key={range.label} value={range.label}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">تا</label>
                    <Select onValueChange={(value) => {
                      const range = priceRangesDetailed.find(r => r.label === value);
                      if (range) updateFilter("maxPrice", range.max === Infinity ? undefined : range.max);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="انتخاب" />
                      </SelectTrigger>
                      <SelectContent>
                        {priceRangesDetailed.map((range) => (
                          <SelectItem key={range.label} value={range.label}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Separator />

        {/* Room Count */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">تعداد اتاق</h3>
          <div className="flex flex-wrap gap-2">
            {[0, 1, 2, 3, 4, "5+"].map((room) => (
              <Button
                key={room}
                variant={filters.rooms?.includes(typeof room === "number" ? room : 5) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleRoom(typeof room === "number" ? room : 5)}
                className="min-w-[50px]"
              >
                {room}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Property Details */}
        <div className="space-y-4">
          <button
            onClick={() => toggleSection("details")}
            className="flex items-center justify-between w-full text-right"
          >
            <h3 className="font-semibold text-gray-800">جزئیات ملک</h3>
            {expandedSections.details ? 
              <ChevronUp className="w-5 h-5 text-gray-500" /> : 
              <ChevronDown className="w-5 h-5 text-gray-500" />
            }
          </button>
          
          <AnimatePresence>
            {expandedSections.details && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 overflow-hidden"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">سن بنا</label>
                  <Select value={filters.propertyAge} onValueChange={(value) => updateFilter("propertyAge", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">تا 5 سال</SelectItem>
                      <SelectItem value="medium">5 تا 15 سال</SelectItem>
                      <SelectItem value="old">بالای 15 سال</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">متراژ از</label>
                    <Select onValueChange={(value) => updateFilter("minArea", parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="حداقل" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50 متر</SelectItem>
                        <SelectItem value="80">80 متر</SelectItem>
                        <SelectItem value="100">100 متر</SelectItem>
                        <SelectItem value="150">150 متر</SelectItem>
                        <SelectItem value="200">200 متر</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">متراژ تا</label>
                    <Select onValueChange={(value) => updateFilter("maxArea", parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="حداکثر" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100">100 متر</SelectItem>
                        <SelectItem value="150">150 متر</SelectItem>
                        <SelectItem value="200">200 متر</SelectItem>
                        <SelectItem value="300">300 متر</SelectItem>
                        <SelectItem value="500">500 متر</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Separator />

        {/* Amenities */}
        <div className="space-y-4">
          <button
            onClick={() => toggleSection("amenities")}
            className="flex items-center justify-between w-full text-right"
          >
            <h3 className="font-semibold text-gray-800">امکانات</h3>
            {expandedSections.amenities ? 
              <ChevronUp className="w-5 h-5 text-gray-500" /> : 
              <ChevronDown className="w-5 h-5 text-gray-500" />
            }
          </button>
          
          <AnimatePresence>
            {expandedSections.amenities && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-3">
                  {amenitiesList.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id={amenity}
                        checked={filters.amenities?.includes(amenity) || false}
                        onCheckedChange={() => toggleAmenity(amenity)}
                      />
                      <label
                        htmlFor={amenity}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search Button */}
        <div className="pt-6">
          <Button 
            onClick={onSearch} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
            size="lg"
          >
            اعمال فیلترها و جستجو
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
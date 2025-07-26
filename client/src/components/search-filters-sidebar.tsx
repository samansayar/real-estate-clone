import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Filter, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
import { iranProvinces } from "@/lib/persian-utils";
import { useSearchStore } from "@/stores/search-store";
import { useState } from "react";

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
};

const priceRanges = [
  { label: "تا 500 میلیون", min: 0, max: 500000000 },
  { label: "500 میلیون تا 1 میلیارد", min: 500000000, max: 1000000000 },
  { label: "1 تا 2 میلیارد", min: 1000000000, max: 2000000000 },
  { label: "2 تا 3 میلیارد", min: 2000000000, max: 3000000000 },
  { label: "3 تا 5 میلیارد", min: 3000000000, max: 5000000000 },
  { label: "بالای 5 میلیارد", min: 5000000000, max: Infinity },
];

interface SearchFiltersSidebarProps {
  onSearch: () => void;
  className?: string;
}

export default function SearchFiltersSidebar({ onSearch, className = "" }: SearchFiltersSidebarProps) {
  const { 
    filters, 
    updateFilter, 
    clearFilters, 
    toggleAmenity, 
    toggleRoom,
    getActiveFiltersCount 
  } = useSearchStore();

  const [expandedSections, setExpandedSections] = useState({
    location: true,
    price: true,
    details: false,
    amenities: false
  });

  const cities = filters.province && citiesByProvince[filters.province] ? citiesByProvince[filters.province] : [];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-xl shadow-lg border border-gray-100 ${className}`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Filter className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">فیلتر جستجو</h2>
              {getActiveFiltersCount() > 0 && (
                <p className="text-sm text-gray-500">{getActiveFiltersCount()} فیلتر فعال</p>
              )}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="text-gray-400 hover:text-gray-600 p-2"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Transaction Type */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">نوع معامله</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={filters.transactionType === "خرید" ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilter("transactionType", "خرید")}
              className="h-10 text-sm"
            >
              خرید
            </Button>
            <Button
              variant={filters.transactionType === "اجاره" ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilter("transactionType", "اجاره")}
              className="h-10 text-sm"
            >
              اجاره
            </Button>
          </div>
        </div>

        <Separator />

        {/* Property Type */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">نوع ملک</h3>
          <Select value={filters.type} onValueChange={(value) => updateFilter("type", value)}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="انتخاب نوع ملک" />
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
        <div className="space-y-3">
          <button
            onClick={() => toggleSection("location")}
            className="flex items-center justify-between w-full text-right group"
          >
            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              موقعیت مکانی
            </h3>
            {expandedSections.location ? 
              <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" /> : 
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            }
          </button>
          
          <AnimatePresence>
            {expandedSections.location && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3 overflow-hidden"
              >
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">استان</label>
                  <Select value={filters.province} onValueChange={(value) => updateFilter("province", value)}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="انتخاب استان" />
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
                    <label className="block text-xs font-medium text-gray-600 mb-2">شهر</label>
                    <Select value={filters.city} onValueChange={(value) => updateFilter("city", value)}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="انتخاب شهر" />
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
        <div className="space-y-3">
          <button
            onClick={() => toggleSection("price")}
            className="flex items-center justify-between w-full text-right group"
          >
            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              بازه قیمت
            </h3>
            {expandedSections.price ? 
              <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" /> : 
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            }
          </button>
          
          <AnimatePresence>
            {expandedSections.price && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3 overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">حداقل</label>
                    <Select onValueChange={(value) => {
                      const range = priceRanges.find(r => r.label === value);
                      if (range) updateFilter("minPrice", range.min);
                    }}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="از" />
                      </SelectTrigger>
                      <SelectContent>
                        {priceRanges.map((range) => (
                          <SelectItem key={range.label} value={range.label}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">حداکثر</label>
                    <Select onValueChange={(value) => {
                      const range = priceRanges.find(r => r.label === value);
                      if (range) updateFilter("maxPrice", range.max === Infinity ? undefined : range.max);
                    }}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="تا" />
                      </SelectTrigger>
                      <SelectContent>
                        {priceRanges.map((range) => (
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
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">تعداد اتاق</h3>
          <div className="flex flex-wrap gap-2">
            {[0, 1, 2, 3, 4, "5+"].map((room) => (
              <Button
                key={room}
                variant={filters.rooms?.includes(typeof room === "number" ? room : 5) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleRoom(typeof room === "number" ? room : 5)}
                className="h-8 w-12 text-sm"
              >
                {room}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Property Details */}
        <div className="space-y-3">
          <button
            onClick={() => toggleSection("details")}
            className="flex items-center justify-between w-full text-right group"
          >
            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              جزئیات ملک
            </h3>
            {expandedSections.details ? 
              <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" /> : 
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            }
          </button>
          
          <AnimatePresence>
            {expandedSections.details && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3 overflow-hidden"
              >
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">سن بنا</label>
                  <Select value={filters.propertyAge} onValueChange={(value) => updateFilter("propertyAge", value)}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="انتخاب سن بنا" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">تا 5 سال</SelectItem>
                      <SelectItem value="medium">5 تا 15 سال</SelectItem>
                      <SelectItem value="old">بالای 15 سال</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">حداقل متراژ</label>
                    <Select onValueChange={(value) => updateFilter("minArea", parseInt(value))}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="از" />
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
                    <label className="block text-xs font-medium text-gray-600 mb-2">حداکثر متراژ</label>
                    <Select onValueChange={(value) => updateFilter("maxArea", parseInt(value))}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="تا" />
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
        <div className="space-y-3">
          <button
            onClick={() => toggleSection("amenities")}
            className="flex items-center justify-between w-full text-right group"
          >
            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              امکانات
            </h3>
            {expandedSections.amenities ? 
              <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" /> : 
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
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
                <div className="grid grid-cols-1 gap-3 max-h-48 overflow-y-auto">
                  {amenitiesList.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id={amenity}
                        checked={filters.amenities?.includes(amenity) || false}
                        onCheckedChange={() => toggleAmenity(amenity)}
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <label
                        htmlFor={amenity}
                        className="text-sm text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
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
        <div className="pt-4">
          <Button 
            onClick={onSearch} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-12 rounded-lg"
            size="lg"
          >
            اعمال فیلترها
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
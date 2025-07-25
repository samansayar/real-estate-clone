import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { iranProvinces, priceRanges, propertyTypes } from "@/lib/persian-utils";

interface SearchFormProps {
  className?: string;
  onSubmit?: (filters: any) => void;
}

export default function SearchForm({ className = "", onSubmit }: SearchFormProps) {
  const [, setLocation] = useLocation();
  const [filters, setFilters] = useState({
    type: "",
    province: "",
    priceRange: ""
  });

  const handleSubmit = () => {
    const searchParams = new URLSearchParams();
    
    if (filters.type && filters.type !== "all") searchParams.set("type", filters.type);
    if (filters.province && filters.province !== "all") searchParams.set("province", filters.province);
    if (filters.priceRange && filters.priceRange !== "all") {
      const range = priceRanges.find(r => r.label === filters.priceRange);
      if (range) {
        if (range.min > 0) searchParams.set("minPrice", range.min.toString());
        if (range.max !== Infinity) searchParams.set("maxPrice", range.max.toString());
      }
    }

    if (onSubmit) {
      onSubmit(Object.fromEntries(searchParams));
    } else {
      setLocation(`/search?${searchParams.toString()}`);
    }
  };

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-2xl ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">نوع ملک</label>
          <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="انتخاب کنید" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه</SelectItem>
              {Object.entries(propertyTypes).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">استان</label>
          <Select value={filters.province} onValueChange={(value) => setFilters(prev => ({ ...prev, province: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="انتخاب استان" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه استان‌ها</SelectItem>
              {iranProvinces.map((province) => (
                <SelectItem key={province} value={province}>{province}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">محدوده قیمت</label>
          <Select value={filters.priceRange} onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="انتخاب قیمت" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه قیمت‌ها</SelectItem>
              {priceRanges.map((range) => (
                <SelectItem key={range.label} value={range.label}>{range.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">&nbsp;</label>
          <Button onClick={handleSubmit} className="w-full bg-primary text-white hover:bg-blue-700">
            <Search className="w-4 h-4 ml-2" />
            جستجو
          </Button>
        </div>
      </div>
    </div>
  );
}

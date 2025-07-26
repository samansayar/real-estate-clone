import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowRight, Search, Filter, Menu, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSearchStore } from "@/stores/search-store";

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showFilter?: boolean;
  onFilterClick?: () => void;
  rightAction?: React.ReactNode;
}

export default function MobileHeader({ 
  title = "دارچو", 
  showBack = false, 
  showSearch = false,
  showFilter = false,
  onFilterClick,
  rightAction 
}: MobileHeaderProps) {
  const [, setLocation] = useLocation();
  const { getActiveFiltersCount } = useSearchStore();

  return (
    <motion.header 
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 safe-area-top"
    >
      <div className="h-16 px-4 flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-3 min-w-0">
          {showBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowRight className="w-5 h-5 text-gray-700" />
            </Button>
          )}
          
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-gray-900 truncate">{title}</h1>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {showSearch && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation('/search')}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Search className="w-5 h-5 text-gray-700" />
            </Button>
          )}

          {showFilter && onFilterClick && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onFilterClick}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            >
              <Filter className="w-5 h-5 text-gray-700" />
              {getActiveFiltersCount() > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 bg-blue-600 text-white text-xs flex items-center justify-center">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </Button>
          )}

          {rightAction}
        </div>
      </div>


    </motion.header>
  );
}
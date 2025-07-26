import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Home, Search, Heart, User, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    id: 'home',
    path: '/',
    icon: Home,
    label: 'خانه',
    activeColor: 'text-blue-600'
  },
  {
    id: 'search',
    path: '/search',
    icon: Search,
    label: 'جستجو',
    activeColor: 'text-blue-600'
  },
  {
    id: 'categories',
    path: '/categories',
    icon: Grid3X3,
    label: 'دسته‌ها',
    activeColor: 'text-blue-600'
  },
  {
    id: 'favorites',
    path: '/favorites',
    icon: Heart,
    label: 'علاقه‌مندی‌ها',
    activeColor: 'text-blue-600'
  },
  {
    id: 'profile',
    path: '/profile',
    icon: User,
    label: 'پروفایل',
    activeColor: 'text-blue-600'
  }
];

export default function MobileBottomNav() {
  const [location, setLocation] = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location === '/';
    return location.startsWith(path);
  };

  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-100 safe-area-bottom"
    >
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => setLocation(item.path)}
              className="h-full flex flex-col items-center justify-center gap-1 rounded-none relative overflow-hidden"
            >
              {/* Active indicator */}
              {active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-blue-50"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <div className="relative z-10 flex flex-col items-center gap-1">
                <motion.div
                  animate={{ 
                    scale: active ? 1.1 : 1,
                    color: active ? '#2563eb' : '#6b7280'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <IconComponent className="w-5 h-5" />
                </motion.div>
                
                <motion.span 
                  className="text-xs font-medium"
                  animate={{ 
                    color: active ? '#2563eb' : '#6b7280',
                    fontWeight: active ? 600 : 500
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>
              </div>
            </Button>
          );
        })}
      </div>

      {/* Safe area spacer for iOS */}
      <div className="h-4 bg-white/95 pb-safe" />
    </motion.nav>
  );
}
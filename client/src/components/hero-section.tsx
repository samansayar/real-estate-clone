import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import SearchForm from "@/components/search-form";
import { Star, Award, Users, CheckCircle, Phone, MapPin, Clock } from 'lucide-react';

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: "1000+", label: "ملک فروخته شده", icon: CheckCircle },
    { number: "500+", label: "مشتری راضی", icon: Users },
    { number: "15+", label: "سال تجربه", icon: Award },
    { number: "4.9", label: "امتیاز مشتریان", icon: Star },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background with animated images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={image} 
              alt={`نمای ${index + 1} از دفتر املاک دارچو`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left side - Main content */}
          <div className="text-white space-y-8">
            <div className="space-y-6">
              <Badge className="bg-blue-600/90 text-white border-blue-400/50 text-lg px-4 py-2">
                <Award className="w-5 h-5 ml-2" />
                معتبرترین مشاور املاک ایران
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight">
                <span className="block">دارچو</span>
                <span className="block text-blue-400 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  پلتفرم املاک
                </span>
                <span className="block text-2xl md:text-3xl lg:text-4xl font-semibold mt-2">
                  رویای خانه‌دار شدن
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl">
                با بیش از 15 سال تجربه در صنعت املاک، 
                <span className="text-blue-300 font-semibold"> بهترین فرصت‌های سرمایه‌گذاری </span>
                را برای شما فراهم می‌کنیم
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                  <CardContent className="p-4 text-center">
                    <stat.icon className="w-6 h-6 mx-auto mb-2 text-blue-300" />
                    <div className="text-2xl font-bold text-blue-300">{stat.number}</div>
                    <div className="text-sm text-gray-200">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 h-auto">
                <Phone className="w-5 h-5 ml-2" />
                مشاوره رایگان
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 h-auto backdrop-blur-sm"
              >
                <MapPin className="w-5 h-5 ml-2" />
                مشاهده املاک
              </Button>
            </div>
          </div>

          {/* Right side - Manager profile and search */}
          <div className="space-y-8">
            
            {/* Manager Profile Card */}
            <Card className="bg-white/95 backdrop-blur-lg border-white/20 shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="relative inline-block">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300" 
                      alt="مدیر املاک دارچو"
                      className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">علی احمدی</h3>
                    <p className="text-blue-600 font-semibold">مدیر عامل و مشاور ارشد املاک</p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-gray-600 mr-2">(4.9 از 5)</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-right">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-800">۰۹۹۶-۱۴۸-۸۶۴۵</p>
                        <p className="text-sm text-gray-600">تماس مستقیم با مدیر</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-800">شنبه تا پنج‌شنبه</p>
                        <p className="text-sm text-gray-600">۸:۰۰ - ۲۰:۰۰</p>
                      </div>
                    </div>
                  </div>

                  <Badge className="bg-green-100 text-green-800 px-4 py-2">
                    <CheckCircle className="w-4 h-4 ml-1" />
                    آماده پاسخگویی
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Search */}
            <Card className="bg-white/95 backdrop-blur-lg border-white/20 shadow-2xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  جستجوی سریع املاک
                </h3>
                <SearchForm />
              </CardContent>
            </Card>
            
          </div>
        </div>
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-blue-500 w-8' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Office showcase section */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center text-white">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <p className="font-semibold">دفتر مرکزی تهران</p>
              <p className="text-sm text-gray-300">خیابان ولیعصر</p>
            </div>
            <div className="text-center text-white">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <p className="font-semibold">تیم متخصص</p>
              <p className="text-sm text-gray-300">۲۰+ مشاور</p>
            </div>
            <div className="text-center text-white">
              <Award className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <p className="font-semibold">مجوز رسمی</p>
              <p className="text-sm text-gray-300">اتحادیه املاک</p>
            </div>
            <div className="text-center text-white">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <p className="font-semibold">تضمین قانونی</p>
              <p className="text-sm text-gray-300">۱۰۰% امن</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
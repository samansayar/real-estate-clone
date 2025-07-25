import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export default function ManagerBanner() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-l from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" 
                alt="مهندس عبدالله صالحی" 
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>
            <div className="flex-grow text-center md:text-right">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">مهندس عبدالله صالحی</h3>
              <p className="text-blue-100 text-lg mb-4">برنده جایزه معماری برترین سازنده کشور</p>
              <p className="text-blue-100 mb-6">
                با بیش از ۱۵ سال تجربه در زمینه املاک و مستغلات، آماده ارائه بهترین خدمات مشاوره املاک به شما هستیم.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                <a href="tel:09961488645">
                  <Button className="bg-white text-blue-800 hover:bg-gray-100">
                    <Phone className="w-4 h-4 ml-2" />
                    ۰۹۹۶۱۴۸۸۶۴۵
                  </Button>
                </a>
                <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-800">
                  درخواست مشاوره رایگان
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

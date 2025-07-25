import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-primary">دارچو</h3>
            <p className="text-gray-300 mb-4">بهترین پلتفرم خرید و فروش املاک در ایران</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">دسترسی سریع</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/search?type=villa&subType=jungle">
                  <a className="text-gray-300 hover:text-white transition-colors">خرید ویلا جنگلی</a>
                </Link>
              </li>
              <li>
                <Link href="/search?type=villa&subType=beachfront">
                  <a className="text-gray-300 hover:text-white transition-colors">خرید ویلا ساحلی</a>
                </Link>
              </li>
              <li>
                <Link href="/search?type=villa&subType=urban">
                  <a className="text-gray-300 hover:text-white transition-colors">خرید ویلا شهرکی</a>
                </Link>
              </li>
              <li>
                <Link href="/search?type=land">
                  <a className="text-gray-300 hover:text-white transition-colors">خرید زمین</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h4 className="text-lg font-semibold mb-4">شهرهای محبوب</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/search?city=چمستان">
                  <a className="text-gray-300 hover:text-white transition-colors">خرید ویلا در چمستان</a>
                </Link>
              </li>
              <li>
                <Link href="/search?city=نور">
                  <a className="text-gray-300 hover:text-white transition-colors">خرید ویلا در نور</a>
                </Link>
              </li>
              <li>
                <Link href="/search?city=رویان">
                  <a className="text-gray-300 hover:text-white transition-colors">خرید ویلا در رویان</a>
                </Link>
              </li>
              <li>
                <Link href="/search?city=نوشهر">
                  <a className="text-gray-300 hover:text-white transition-colors">خرید ویلا در نوشهر</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">تماس با ما</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-4 h-4 ml-3 text-primary" />
                <span className="text-gray-300">۰۹۹۶۱۴۸۸۶۴۵</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 ml-3 text-primary" />
                <span className="text-gray-300">info@darchoo.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 ml-3 text-primary" />
                <span className="text-gray-300">تهران، ایران</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-300">© ۲۰۲۵ دارچو. تمام حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}

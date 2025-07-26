import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "خانه" },
    { href: "/search?type=villa", label: "خرید ویلا" },
    { href: "/search?type=apartment", label: "خرید آپارتمان" },
    { href: "/search?type=land", label: "خرید زمین" },
    { href: "/search?type=commercial", label: "املاک تجاری" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-primary cursor-pointer">دارچو</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-reverse space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`text-gray-700 hover:text-primary transition-colors cursor-pointer ${
                    location === item.href ? "text-primary font-medium" : ""
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Contact Button */}
          <div className="hidden md:block">
            <a href="tel:09961488645">
              <Button className="bg-primary text-white hover:bg-blue-700">
                <Phone className="w-4 h-4 ml-2" />
                تماس با کارشناس
              </Button>
            </a>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <span
                      className="block text-lg py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </span>
                  </Link>
                ))}
                <div className="pt-4 border-t">
                  <a href="tel:09961488645">
                    <Button className="w-full bg-primary text-white hover:bg-blue-700">
                      <Phone className="w-4 h-4 ml-2" />
                      تماس با کارشناس
                    </Button>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}

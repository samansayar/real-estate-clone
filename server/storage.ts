import { type Property, type InsertProperty } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Property methods
  getProperty(id: string): Promise<Property | undefined>;
  getAllProperties(): Promise<Property[]>;
  getFeaturedProperties(type?: string): Promise<Property[]>;
  searchProperties(filters: any): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
}

export class MemStorage implements IStorage {
  private properties: Map<string, Property>;

  constructor() {
    this.properties = new Map();
    this.seedData();
  }

  private seedData() {
    const sampleProperties = [
      // Featured Villas
      {
        title: "فروش ویلا در منطقه توریستی جوربند",
        description: "ویلای زیبا با چشم‌انداز کوهستان در منطقه توریستی جوربند",
        type: "villa",
        subType: "mountain",
        province: "البرز",
        city: "کرج",
        address: "جوربند، منطقه توریستی",
        price: 8500000000,
        area: 350,
        bedrooms: 3,
        bathrooms: 2,
        parking: true,
        images: ["https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"],
        featured: true,
        contactPhone: "09961488645",
        contactName: "مهندس عبدالله صالحی"
      },
      {
        title: "فروش ویلا ساحلی در چلک نوشهر",
        description: "ویلای لوکس ساحلی با دسترسی مستقیم به دریا",
        type: "villa",
        subType: "beachfront",
        province: "مازندران",
        city: "نوشهر",
        address: "چلک، نوشهر",
        price: 12800000000,
        area: 450,
        bedrooms: 4,
        bathrooms: 3,
        parking: true,
        images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"],
        featured: true,
        contactPhone: "09961488645",
        contactName: "مهندس عبدالله صالحی"
      },
      {
        title: "فروش ویلا تریبلکس منطقه سیسنگان",
        description: "ویلای سه طبقه با فضای باز و باغ زیبا",
        type: "villa",
        subType: "triplex",
        province: "مازندران",
        city: "نوشهر",
        address: "سیسنگان، نوشهر",
        price: 15200000000,
        area: 600,
        bedrooms: 5,
        bathrooms: 4,
        parking: true,
        images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"],
        featured: true,
        contactPhone: "09961488645",
        contactName: "مهندس عبدالله صالحی"
      },
      {
        title: "فروش ویلا شهرکی در انارور نوشهر",
        description: "ویلای مدرن در شهرک مسکونی با امکانات کامل",
        type: "villa",
        subType: "urban",
        province: "مازندران",
        city: "نوشهر",
        address: "انارور، نوشهر",
        price: 9500000000,
        area: 300,
        bedrooms: 3,
        bathrooms: 2,
        parking: true,
        images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"],
        featured: true,
        contactPhone: "09961488645",
        contactName: "مهندس عبدالله صالحی"
      },
      {
        title: "فروش ویلا ۷۵۰ متری در نگین نوشهر لتینگان",
        description: "ویلای بزرگ و لوکس با فضای سبز وسیع",
        type: "villa",
        subType: "luxury",
        province: "مازندران",
        city: "نوشهر",
        address: "لتینگان، نوشهر",
        price: 18000000000,
        area: 750,
        bedrooms: 6,
        bathrooms: 5,
        parking: true,
        images: ["https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"],
        featured: true,
        contactPhone: "09961488645",
        contactName: "مهندس عبدالله صالحی"
      },
      {
        title: "ویلا منطقه زیبای چلک",
        description: "ویلای دو طبقه با نمای مدرن و باغ زیبا",
        type: "villa",
        subType: "modern",
        province: "مازندران",
        city: "نوشهر",
        address: "چلک، نوشهر",
        price: 11300000000,
        area: 420,
        bedrooms: 4,
        bathrooms: 3,
        parking: true,
        images: ["https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"],
        featured: true,
        contactPhone: "09961488645",
        contactName: "مهندس عبدالله صالحی"
      },
      // Land properties
      {
        title: "فروش زمین شهرکی دریاچه الیمالات نور",
        description: "زمین مسکونی با چشم‌انداز دریاچه",
        type: "land",
        subType: "residential",
        province: "مازندران",
        city: "نور",
        address: "الیمالات، نور",
        price: 3200000000,
        area: 500,
        bedrooms: null,
        bathrooms: null,
        parking: false,
        images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"],
        featured: true,
        contactPhone: "09961488645",
        contactName: "مهندس عبدالله صالحی"
      },
      {
        title: "فروش زمین ساحلی در چلک نوشهر",
        description: "زمین ساحلی با دسترسی به دریا",
        type: "land",
        subType: "beachfront",
        province: "مازندران",
        city: "نوشهر",
        address: "چلک، نوشهر",
        price: 4800000000,
        area: 350,
        bedrooms: null,
        bathrooms: null,
        parking: false,
        images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"],
        featured: true,
        contactPhone: "09961488645",
        contactName: "مهندس عبدالله صالحی"
      },
      // Apartments
      {
        title: "آپارتمان لوکس در تهران",
        description: "آپارتمان مدرن در بهترین منطقه تهران",
        type: "apartment",
        subType: "luxury",
        province: "تهران",
        city: "تهران",
        address: "ولنجک، تهران",
        price: 8500000000,
        area: 120,
        bedrooms: 2,
        bathrooms: 2,
        parking: true,
        images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"],
        featured: true,
        contactPhone: "09961488645",
        contactName: "مهندس عبدالله صالحی"
      },
      {
        title: "آپارتمان باغ در اصفهان",
        description: "آپارتمان در مجموعه باغ با فضای سبز",
        type: "apartment",
        subType: "garden",
        province: "اصفهان",
        city: "اصفهان",
        address: "فولادشهر، اصفهان",
        price: 4200000000,
        area: 95,
        bedrooms: 2,
        bathrooms: 1,
        parking: true,
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"],
        featured: true,
        contactPhone: "09961488645",
        contactName: "مهندس عبدالله صالحی"
      },
      // Commercial properties
      {
        title: "مجتمع اداری در تهران",
        description: "مجتمع اداری مدرن در قلب تهران",
        type: "commercial",
        subType: "office",
        province: "تهران",
        city: "تهران",
        address: "میدان ونک، تهران",
        price: 25000000000,
        area: 800,
        bedrooms: null,
        bathrooms: null,
        parking: true,
        images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"],
        featured: true,
        contactPhone: "09961488645",
        contactName: "مهندس عبدالله صالحی"
      },
      {
        title: "مرکز خرید در اصفهان",
        description: "مرکز تجاری در موقعیت عالی",
        type: "commercial",
        subType: "retail",
        province: "اصفهان",
        city: "اصفهان",
        address: "خیابان چهارباغ، اصفهان",
        price: 45000000000,
        area: 1500,
        bedrooms: null,
        bathrooms: null,
        parking: true,
        images: ["https://images.unsplash.com/photo-1555636222-cae831e670b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"],
        featured: true,
        contactPhone: "09961488645",
        contactName: "مهندس عبدالله صالحی"
      }
    ];

    sampleProperties.forEach(property => {
      const id = randomUUID();
      const fullProperty: Property = {
        ...property,
        subType: property.subType ?? null,
        id,
        createdAt: new Date()
      };
      this.properties.set(id, fullProperty);
    });
  }

  async getProperty(id: string): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getAllProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getFeaturedProperties(type?: string): Promise<Property[]> {
    const properties = Array.from(this.properties.values())
      .filter(p => p.featured && (!type || p.type === type))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    return properties.slice(0, 6);
  }

  async searchProperties(filters: any): Promise<Property[]> {
    let properties = Array.from(this.properties.values());

    if (filters.type) {
      properties = properties.filter(p => p.type === filters.type);
    }

    if (filters.province) {
      properties = properties.filter(p => p.province === filters.province);
    }

    if (filters.city) {
      properties = properties.filter(p => p.city === filters.city);
    }

    if (filters.minPrice) {
      properties = properties.filter(p => p.price >= filters.minPrice);
    }

    if (filters.maxPrice) {
      properties = properties.filter(p => p.price <= filters.maxPrice);
    }

    if (filters.minArea) {
      properties = properties.filter(p => p.area >= filters.minArea);
    }

    if (filters.maxArea) {
      properties = properties.filter(p => p.area <= filters.maxArea);
    }

    if (filters.bedrooms) {
      properties = properties.filter(p => p.bedrooms === filters.bedrooms);
    }

    if (filters.featured) {
      properties = properties.filter(p => p.featured);
    }

    return properties.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = randomUUID();
    const property: Property = {
      ...insertProperty,
      id,
      createdAt: new Date()
    };
    this.properties.set(id, property);
    return property;
  }
}

export const storage = new MemStorage();

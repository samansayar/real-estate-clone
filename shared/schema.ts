import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const properties = pgTable("properties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // villa, apartment, land, commercial, industrial
  subType: text("sub_type"), // beachfront, urban, etc.
  province: text("province").notNull(),
  city: text("city").notNull(),
  address: text("address").notNull(),
  price: integer("price").notNull(), // in tomans
  area: integer("area").notNull(), // in square meters
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  parking: boolean("parking").default(false),
  images: text("images").array().notNull(),
  featured: boolean("featured").default(false),
  contactPhone: text("contact_phone").notNull(),
  contactName: text("contact_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  createdAt: true,
});

export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof properties.$inferSelect;

// Search filters schema
export const searchFiltersSchema = z.object({
  type: z.string().optional(),
  province: z.string().optional(),
  city: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  minArea: z.number().optional(),
  maxArea: z.number().optional(),
  bedrooms: z.number().optional(),
  featured: z.boolean().optional(),
});

export type SearchFilters = z.infer<typeof searchFiltersSchema>;

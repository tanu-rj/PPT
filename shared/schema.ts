import { pgTable, text, serial, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tools = pgTable("tools", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  useCase: text("use_case").notNull(),
  logoInitial: varchar("logo_initial", { length: 2 }).notNull(),
  logoUrl: text("logo_url"),
});

export const industrySectors = pgTable("industry_sectors", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  useCases: text("use_cases").array().notNull(),
});

export const insertToolSchema = createInsertSchema(tools).omit({ id: true });
export const insertIndustrySectorSchema = createInsertSchema(industrySectors).omit({ id: true });

export type Tool = typeof tools.$inferSelect;
export type InsertTool = z.infer<typeof insertToolSchema>;

export type IndustrySector = typeof industrySectors.$inferSelect;
export type InsertIndustrySector = z.infer<typeof insertIndustrySectorSchema>;

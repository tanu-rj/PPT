import { db } from "./db";
import {
  tools,
  industrySectors,
  type Tool,
  type IndustrySector,
  type InsertTool,
  type InsertIndustrySector
} from "@shared/schema";

export interface IStorage {
  getTools(): Promise<Tool[]>;
  createTool(tool: InsertTool): Promise<Tool>;
  getIndustrySectors(): Promise<IndustrySector[]>;
  createIndustrySector(sector: InsertIndustrySector): Promise<IndustrySector>;
}

export class DatabaseStorage implements IStorage {
  async getTools(): Promise<Tool[]> {
    return await db.select().from(tools);
  }

  async createTool(tool: InsertTool): Promise<Tool> {
    const [newTool] = await db.insert(tools).values(tool).returning();
    return newTool;
  }

  async getIndustrySectors(): Promise<IndustrySector[]> {
    return await db.select().from(industrySectors);
  }

  async createIndustrySector(sector: InsertIndustrySector): Promise<IndustrySector> {
    const [newSector] = await db.insert(industrySectors).values(sector).returning();
    return newSector;
  }
}

export const storage = new DatabaseStorage();

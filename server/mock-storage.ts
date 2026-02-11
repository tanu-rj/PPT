import { type Tool, type IndustrySector, type InsertTool, type InsertIndustrySector } from "@shared/schema";

let toolId = 1;
let sectorId = 1;

class InMemoryStorage {
  private tools: Tool[] = [];
  private sectors: IndustrySector[] = [];

  async getTools(): Promise<Tool[]> {
    return this.tools;
  }

  async createTool(tool: InsertTool): Promise<Tool> {
    const newTool: any = { id: String(toolId++), ...tool };
    this.tools.push(newTool);
    return newTool;
  }

  async getIndustrySectors(): Promise<IndustrySector[]> {
    return this.sectors;
  }

  async createIndustrySector(sector: InsertIndustrySector): Promise<IndustrySector> {
    const newSector: any = { id: String(sectorId++), ...sector };
    this.sectors.push(newSector);
    return newSector;
  }
}

export const storage = new InMemoryStorage();

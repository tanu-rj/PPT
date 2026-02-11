import type { Express } from "express";
import type { Server } from "http";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // choose storage implementation depending on whether a DB is configured
  const storageModule = process.env.DATABASE_URL
    ? await import("./storage")
    : await import("./mock-storage");

  const { storage } = storageModule as { storage: any };

  app.get(api.tools.list.path, async (req, res) => {
    const tools = await storage.getTools();
    res.json(tools);
  });

  app.get(api.industrySectors.list.path, async (req, res) => {
    const sectors = await storage.getIndustrySectors();
    res.json(sectors);
  });

  // Seed data
  const existingTools = await storage.getTools();
  if (existingTools.length === 0) {
    const toolsData = [
      { name: "ChatGPT", category: "Conversational AI / Code / Research", description: "Multi-domain reasoning (code + logic + writing). Strong contextual memory in single session. Rapid prototyping assistant. Can simulate roles (architect, backend dev, security expert).", useCase: "Generate full backend architecture with folder structure in minutes.", logoInitial: "CG", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
      { name: "Blackbox AI", category: "Code Search + Generation", description: "Extracts code from videos. Searches real code examples fast. Strong for quick snippets.", useCase: "Find working implementation of rare APIs quickly.", logoInitial: "BB", logoUrl: "https://www.blackbox.ai/images/blackbox-logo.png" },
      { name: "Gemini CLI", category: "Terminal AI Assistant", description: "Works inside terminal. Command-based AI interaction. Developer workflow focused.", useCase: "Automate tasks from terminal with AI support.", logoInitial: "Ge", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" },
      { name: "Lovable", category: "AI App Builder", description: "Converts prompts into full-stack apps. UI + backend scaffolding. Fast prototype builder.", useCase: "Build SaaS MVP without manual setup.", logoInitial: "Lv", logoUrl: "https://lovable.dev/favicon.ico" },
      { name: "Figma", category: "UI/UX Design", description: "AI-assisted design. Auto layout + component systems. Real-time collaboration.", useCase: "Generate UI wireframes quickly.", logoInitial: "Fi", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
      { name: "Dora AI", category: "AI Website Builder", description: "Text to animated website. No-code motion design. Visual storytelling focused.", useCase: "Create landing page from prompt.", logoInitial: "Do", logoUrl: "https://www.dora.run/favicon.ico" },
      { name: "Emergent", category: "AI-native Development Tool", description: "AI-generated product systems. Focused on structured building. Designed for AI-assisted workflows.", useCase: "Generate structured app blueprint.", logoInitial: "Em", logoUrl: "https://emergent.ai/favicon.ico" },
      { name: "GitHub Copilot", category: "IDE AI Assistant", description: "Real-time code suggestions. Context-aware inside IDE. Learns from file context.", useCase: "Write repetitive logic 2–3x faster.", logoInitial: "GC", logoUrl: "https://github.githubassets.com/images/modules/site/features/copilot/copilot-logo.png" },
      { name: "Midjourney", category: "AI Image Generation", description: "Artistic quality output. Style control. Prompt-based creativity.", useCase: "Generate branding visuals instantly.", logoInitial: "Mj", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.svg" },
      { name: "Notion AI", category: "Productivity AI", description: "Integrated inside workspace. Notes summarization. Task automation.", useCase: "Convert meeting notes to action plan.", logoInitial: "No", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg" },
      { name: "Claude", category: "Long-context AI", description: "Handles very large documents. Strong reasoning tone. Safer output style.", useCase: "Analyze large technical documentation.", logoInitial: "Cl", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Claude_AI_logo.svg" },
      { name: "Perplexity", category: "AI Research Engine", description: "Real-time web citations. Research-focused answers. Source linking.", useCase: "Fast academic research summary.", logoInitial: "Px", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Perplexity_AI_logo.svg" },
      { name: "Cursor AI", category: "AI Code Editor", description: "Codebase-aware AI. Can edit entire files. Understands project context.", useCase: "Refactor large project with AI.", logoInitial: "Cu", logoUrl: "https://mintlify.s3-us-west-1.amazonaws.com/cursor/logo/light.png" },
      { name: "Vercel AI", category: "AI Deployment & SDK", description: "AI SDK for building AI apps. Fast deployment. Optimized for Next.js.", useCase: "Deploy AI-powered web apps easily.", logoInitial: "Ve", logoUrl: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png" },
      { name: "Hugging Face", category: "AI Model Hub", description: "Open-source model hosting. Transformers library. Community datasets.", useCase: "Access pre-trained models.", logoInitial: "HF", logoUrl: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" },
      { name: "Runway ML", category: "AI Video Generation", description: "Text-to-video. Background removal. Video editing AI.", useCase: "Create AI-generated promotional videos.", logoInitial: "Rw", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/52/Runway_ML_Logo.svg" },
      { name: "Canva AI", category: "AI Design Platform", description: "AI presentation generator. Text-to-image. Auto layout.", useCase: "Create presentations in minutes.", logoInitial: "Ca", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Canva_logo.svg" },
    ];

    for (const tool of toolsData) {
      await storage.createTool(tool);
    }

    const sectorData = [
      { title: "Healthcare", useCases: ["Drug Discovery", "Personalized Treatment", "Medical Imaging Analysis"] },
      { title: "Finance", useCases: ["Fraud Detection", "Algorithmic Trading", "Risk Assessment"] },
      { title: "Manufacturing", useCases: ["Predictive Maintenance", "Quality Control", "Supply Chain Optimization"] },
      { title: "Education", useCases: ["Personalized Tutors", "Automated Grading", "Content Generation"] },
      { title: "Cybersecurity", useCases: ["Threat Detection", "Phishing Prevention", "Automated Response"] },
      { title: "Agriculture", useCases: ["Crop Monitoring", "Yield Prediction", "Precision Farming"] },
    ];

    for (const sector of sectorData) {
      await storage.createIndustrySector(sector);
    }
  }

  return httpServer;
}

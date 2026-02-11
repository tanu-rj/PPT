import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowDown, Code2, Cpu, Brain, Terminal, ShieldAlert, CheckCircle2, ChevronRight, Zap, ChevronLeft } from "lucide-react";
import { SectionContainer, fadeInUp, staggerContainer } from "@/components/SectionContainer";
import { NeonCard } from "@/components/NeonCard";
import { useTools } from "@/hooks/use-tools";
import { useIndustrySectors } from "@/hooks/use-industry-sectors";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { data: tools, isLoading: loadingTools } = useTools();
  const { data: sectors, isLoading: loadingSectors } = useIndustrySectors();
  
  const [activeToolIndex, setActiveToolIndex] = useState(0);

  const nextTool = useCallback(() => {
    if (tools && tools.length > 0) {
      setActiveToolIndex((prev) => (prev + 1) % tools.length);
    }
  }, [tools]);

  const prevTool = useCallback(() => {
    if (tools && tools.length > 0) {
      setActiveToolIndex((prev) => (prev - 1 + tools.length) % tools.length);
    }
  }, [tools]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextTool();
      if (e.key === "ArrowLeft") prevTool();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextTool, prevTool]);

  const activeTool = tools?.[activeToolIndex];
  const iconsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // scroll the active icon into view when it changes
    try {
      const selector = `[data-tool-index=\"${activeToolIndex}\"]`;
      const el = iconsRef.current?.querySelector(selector) as HTMLElement | null;
      el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    } catch (e) {
      // ignore in case DOM isn't ready
    }
  }, [activeToolIndex]);

  useEffect(() => {
    // focus icons container so arrow keys work immediately
    iconsRef.current?.focus();
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-background text-foreground min-h-screen selection:bg-primary/20 snap-y snap-mandatory h-screen overflow-y-scroll overflow-x-hidden scroll-smooth">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-secondary transform origin-left z-50"
        style={{ scaleX }}
      />

      {/* 1. Hero Section */}
      <SectionContainer className="flex items-center justify-center text-center relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
           <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto space-y-8"
        >
          <motion.div variants={fadeInUp} className="inline-block">
            <span className="px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium tracking-wider uppercase font-display">
              Future of Development
            </span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-black tracking-tighter font-title leading-tight">
            AI as a <span className="text-gradient">Force Multiplier</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto">
            From Prompt Engineering to Industrial Automation. Elevate your workflow from coding to architecting.
          </motion.p>

          <motion.div variants={fadeInUp} className="pt-8">
            <button 
              onClick={scrollToNext}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-white/20 hover:border-primary/50 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
            >
              <span className="relative z-10 text-lg font-medium group-hover:text-primary transition-colors">Start Exploration</span>
              <ArrowDown className="w-5 h-5 relative z-10 group-hover:translate-y-1 transition-transform group-hover:text-primary" />
              <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </motion.div>
        </motion.div>
      </SectionContainer>

      {/* 2. About Section */}
      <SectionContainer id="about">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold font-title text-white">
              The Presenter
            </motion.h2>
            <motion.div variants={fadeInUp} className="w-20 h-1 bg-primary rounded-full" />
            
            <motion.div variants={fadeInUp} className="space-y-2">
              <h3 className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Kartik Sharma
              </h3>
              <p className="text-xl text-primary font-medium">AI & Full Stack Intern</p>
              <p className="text-muted-foreground text-lg">BCA Student (2nd Year)</p>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-lg text-gray-400 leading-relaxed border-l-2 border-primary/30 pl-6">
              "My mission is to bridge the gap between theoretical AI concepts and practical, production-ready applications that solve real-world problems."
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <NeonCard className="h-full min-h-[400px] flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary to-purple-900 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">About Petsgo</h3>
                  <p className="text-gray-400">
                    A tech-driven company focused on innovative solutions for pet care. Leveraging modern web technologies and AI to create seamless experiences for pet owners.
                  </p>
                </div>

                <div className="flex gap-3 flex-wrap">
                  {['React', 'Node.js', 'AI Integration', 'Cloud Native'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-sm text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </NeonCard>
          </motion.div>
        </div>
      </SectionContainer>

      {/* 3. Generative AI Explained */}
      <SectionContainer>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold font-title">
              Generative AI <span className="text-primary">Decoded</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Understanding the engine behind the revolution.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div variants={fadeInUp}>
              <NeonCard className="h-full" variant="blue">
                <Brain className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-3 font-display">What is GenAI?</h3>
                <p className="text-gray-400 leading-relaxed">
                  A class of artificial intelligence capable of generating new content—text, code, images, audio—based on patterns learned from vast datasets.
                </p>
              </NeonCard>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <NeonCard className="h-full" variant="purple">
                <Cpu className="w-12 h-12 text-secondary mb-6" />
                <h3 className="text-xl font-bold mb-3 font-display">LLMs (Large Language Models)</h3>
                <p className="text-gray-400 leading-relaxed">
                  Models trained on billions of parameters to understand and generate human-like text. Examples include GPT-4, Claude 3.5, and Llama 3.
                </p>
              </NeonCard>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <NeonCard className="h-full" variant="blue">
                <Terminal className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-3 font-display">Token Prediction</h3>
                <p className="text-gray-400 leading-relaxed">
                  At its core, GenAI is a sophisticated prediction engine, determining the most likely next token (word/part of word) in a sequence.
                </p>
                <div className="mt-4 p-3 bg-black/40 rounded border border-white/5 font-mono text-xs text-green-400">
                  Input: "The sky is"<br/>
                  Output: [" blue" (92%), " dark" (5%)]
                </div>
              </NeonCard>
            </motion.div>
          </div>
        </motion.div>
      </SectionContainer>

      {/* 4. The Perfect Prompt Formula */}
      <SectionContainer className="bg-gradient-to-b from-background to-black/40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold font-title">
              The Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Prompt Formula</span>
            </motion.h2>
            
            <motion.p variants={fadeInUp} className="text-lg text-gray-400">
              Garbage in, garbage out. Mastering prompt engineering is the first step to leveraging AI effectively.
            </motion.p>

            <div className="space-y-4">
              {[
                { label: "Role", desc: "Act as a Senior React Engineer..." },
                { label: "Task", desc: "Create a responsive navigation component..." },
                { label: "Context", desc: "For a fintech dashboard using Tailwind..." },
                { label: "Constraints", desc: "No external CSS, use Lucide icons..." },
                { label: "Output Format", desc: "Return only the .tsx code block..." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={fadeInUp}
                  className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{item.label}</h4>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#0D1117] rounded-xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/5 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              <span className="ml-2 text-xs text-gray-500 font-mono">prompt_v1.txt</span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed text-gray-300">
              <p className="text-purple-400 mb-2"># Role</p>
              <p className="mb-4">Act as a Senior Backend Developer specialized in Node.js and PostgreSQL.</p>
              
              <p className="text-blue-400 mb-2"># Task</p>
              <p className="mb-4">Design a database schema for an inventory management system.</p>
              
              <p className="text-green-400 mb-2"># Constraints</p>
              <p className="mb-4">- Use 3rd normal form<br/>- Include indexes for frequent queries<br/>- Handle soft deletes</p>
              
              <div className="h-px bg-white/10 my-4" />
              <p className="text-gray-500 animate-pulse">Waiting for response...</p>
            </div>
          </motion.div>
        </div>
      </SectionContainer>

      {/* 5. Tools Swipe - Upgraded with Icon Swap Animation */}
      <SectionContainer className="overflow-hidden flex flex-col justify-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-title mb-4">
            Essential <span className="text-primary">AI Stack</span>
          </h2>
          <p className="text-gray-400">Use arrow keys or click icons to switch tools.</p>
        </motion.div>

        {loadingTools ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto w-full space-y-12">
            {/* Icon Row */}
            <div className="relative flex items-center gap-4">
              <button 
                onClick={prevTool}
                className="hidden md:flex p-3 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 text-white transition-all z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div
                ref={iconsRef}
                className="flex-1 flex justify-start items-center gap-4 md:gap-8 overflow-x-auto py-8 scrollbar-hide pl-6 pr-6 md:pl-12 md:pr-12"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") {
                    e.preventDefault();
                    nextTool();
                  }
                  if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    prevTool();
                  }
                }}
              >
                {tools?.map((tool, idx) => (
                  <motion.div
                    key={tool.id}
                    onClick={() => setActiveToolIndex(idx)}
                    data-tool-index={idx}
                    // keep layout stable: don't use static Tailwind scale classes
                    className={`relative cursor-pointer shrink-0 transition-all duration-500 ${
                      activeToolIndex === idx ? "z-10" : "opacity-40"
                    }`}
                    animate={{
                      scale: activeToolIndex === idx ? 1.25 : 1,
                      opacity: activeToolIndex === idx ? 1 : 0.4,
                    }}
                    style={{ transformOrigin: "center", willChange: "transform, opacity" }}
                  >
                    <div className={`w-16 h-16 md:w-20 md:h-20 min-w-[64px] min-h-[64px] rounded-2xl flex items-center justify-center overflow-hidden border-2 transition-colors ${
                      activeToolIndex === idx ? "border-primary shadow-[0_0_20px_rgba(0,240,255,0.4)]" : "border-white/10"
                    } bg-black/40 backdrop-blur-xl`}>
                      {tool.logoUrl ? (
                        <>
                          <img
                            src={tool.logoUrl}
                            alt={tool.name}
                            className="w-10 h-10 object-contain block"
                            draggable={false}
                            loading="lazy"
                            onError={(e) => {
                              const img = e.currentTarget as HTMLImageElement;
                              img.style.display = "none";
                              const fallback = img.parentElement?.querySelector('[data-fallback]') as HTMLElement | null;
                              if (fallback) fallback.style.display = "flex";
                            }}
                          />
                          <span data-fallback style={{ display: "none" }} className="text-xl font-bold font-title text-primary select-none">
                            {tool.logoInitial}
                          </span>
                        </>
                      ) : (
                        <span className="text-xl font-bold font-title text-primary select-none">{tool.logoInitial}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <button 
                onClick={nextTool}
                className="hidden md:flex p-3 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 text-white transition-all z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Content Display */}
            <AnimatePresence mode="wait">
              {activeTool && (
                <motion.div
                  key={activeTool.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full"
                >
                  <NeonCard variant="blue" className="w-full max-w-2xl mx-auto backdrop-blur-2xl bg-white/5 border-white/10">
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                      <div className="space-y-4 flex-1">
                        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-widest">
                          {activeTool.category}
                        </div>
                        <h3 className="text-4xl font-black font-title text-white">{activeTool.name}</h3>
                        <p className="text-gray-400 text-lg leading-relaxed">
                          {activeTool.description}
                        </p>
                        <div className="pt-6 flex flex-wrap gap-4 justify-center md:justify-start">
                          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/40 border border-white/5">
                            <Zap className="w-5 h-5 text-primary" />
                            <span className="text-sm font-mono text-primary">{activeTool.useCase}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NeonCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </SectionContainer>

      {/* 6. AI in Industry */}
      <SectionContainer>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-title text-center">
            Industry <span className="text-secondary">Impact</span>
          </h2>

          {loadingSectors ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin w-8 h-8 border-2 border-secondary border-t-transparent rounded-full" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sectors?.map((sector) => (
                <motion.div key={sector.id} variants={fadeInUp}>
                  <NeonCard variant="purple" className="h-full">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                      {sector.title}
                    </h3>
                    <ul className="space-y-2">
                      {sector.useCases.map((useCase, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </NeonCard>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </SectionContainer>

      {/* 7. Risks & Ethics (Darker Section) */}
      <SectionContainer className="bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-12 relative z-10"
        >
          <div className="flex items-center gap-4 justify-center text-red-500 mb-8">
            <ShieldAlert className="w-8 h-8" />
            <h2 className="text-4xl md:text-5xl font-bold font-title">Risks & Ethics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Hallucinations",
                desc: "AI can confidently generate incorrect or fabricated information. Always verify critical outputs.",
                icon: "👻"
              },
              {
                title: "Data Privacy",
                desc: "Be cautious with proprietary code and sensitive data. Public LLMs may train on your inputs.",
                icon: "🔒"
              },
              {
                title: "Job Disruption",
                desc: "Roles will evolve, not disappear. Adaptation is key to survival in the new ecosystem.",
                icon: "⚠️"
              }
            ].map((risk, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <NeonCard variant="red" className="h-full group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{risk.icon}</div>
                  <h3 className="text-xl font-bold text-red-500 mb-3">{risk.title}</h3>
                  <p className="text-gray-400">{risk.desc}</p>
                </NeonCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SectionContainer>

      {/* 8. Final Statement */}
      <SectionContainer className="flex items-center justify-center text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto space-y-8"
        >
          <h2 className="text-5xl md:text-7xl font-black font-title leading-tight">
            AI will not replace developers.
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-gray-500">
            Developers who use AI will replace those who don't.
          </h3>
          
          <div className="pt-12">
             <button className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors flex items-center gap-2 mx-auto">
               Let's Connect <ChevronRight className="w-4 h-4" />
             </button>
          </div>
        </motion.div>
      </SectionContainer>
    </div>
  );
}

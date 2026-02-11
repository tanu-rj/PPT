import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Heart, Globe, Copy, Check } from "lucide-react";
import { useState } from "react";
import { SectionContainer, fadeInUp, staggerContainer } from "@/components/SectionContainer";
import { NeonCard } from "@/components/NeonCard";

export default function Connect() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const socialLinks = [
    {
      title: "Portfolio",
      description: "View my complete portfolio and projects",
      icon: Globe,
      link: "https://kartiksharma.site",
      color: "from-blue-500 to-cyan-500",
      bgVariant: "blue" as const,
    },
    {
      title: "Mekozza Petsgo",
      description: "Innovative pet care solutions and services",
      icon: Heart,
      link: "https://www.mekozza.com",
      color: "from-pink-500 to-rose-500",
      bgVariant: "purple" as const,
    },
    {
      title: "GitHub",
      description: "Check out my code and projects",
      icon: Github,
      link: "https://github.com/kartiksharma4448",
      color: "from-gray-600 to-gray-800",
      bgVariant: "blue" as const,
    },
    {
      title: "LinkedIn",
      description: "Connect with me professionally",
      icon: Linkedin,
      link: "https://linkedin.com/in/kartik-sharma06",
      color: "from-blue-600 to-blue-800",
      bgVariant: "blue" as const,
    },
  ];

  const directLinks = [
    { label: "Portfolio", url: "https://kartiksharma.site", id: "portfolio" },
    { label: "Mekozza Petsgo", url: "https://www.mekozza.com", id: "petsgo" },
    { label: "GitHub", url: "https://github.com/kartiksharma4448", id: "github" },
    { label: "LinkedIn", url: "https://linkedin.com/in/kartik-sharma06", id: "linkedin" },
    { label: "Email", url: "kartikuma9261@gmail.com", id: "email" },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen selection:bg-primary/20 snap-y snap-mandatory h-screen overflow-y-scroll overflow-x-hidden scroll-smooth">
      {/* Hero Section */}
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
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.div variants={fadeInUp} className="inline-block">
            <span className="px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium tracking-wider uppercase font-display">
              Let's Connect
            </span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-black tracking-tighter font-title leading-tight">
            Get in <span className="text-gradient">Touch</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto">
            Explore my portfolio, discover Mekozza Petsgo, or connect with me across different platforms.
          </motion.p>
        </motion.div>
      </SectionContainer>

      {/* Portfolio & Petsgo Links Section */}
      <SectionContainer>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.div variants={fadeInUp} className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold font-title">
              Primary <span className="text-primary">Destinations</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              My portfolio showcasing personal projects and Mekozza Petsgo - the future of pet care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Portfolio Card */}
            <motion.div variants={fadeInUp}>
              <a href="https://kartiksharma.site" target="_blank" rel="noopener noreferrer">
                <NeonCard variant="blue" className="h-full group cursor-pointer transform transition-all duration-300 hover:scale-105">
                  <div className="space-y-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all">
                      <Globe className="w-8 h-8 text-white" />
                    </div>

                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                        Portfolio
                        <ExternalLink className="w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-gray-400 leading-relaxed text-lg">
                        Explore my complete portfolio featuring AI-powered applications, full-stack projects, and innovative solutions I've built.
                      </p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <h4 className="font-semibold text-white text-sm uppercase tracking-wider">Featured Projects:</h4>
                      <ul className="space-y-2 text-sm text-gray-400">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          AI-Powered Analytics Dashboard
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          Real-time Notification System
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          Cloud-Native Applications
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4">
                      {['React', 'Node.js', 'TypeScript', 'AI/ML'].map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </NeonCard>
              </a>
            </motion.div>

            {/* Mekozza Petsgo Card */}
            <motion.div variants={fadeInUp}>
              <a href="https://www.mekozza.com" target="_blank" rel="noopener noreferrer">
                <NeonCard variant="purple" className="h-full group cursor-pointer transform transition-all duration-300 hover:scale-105">
                  <div className="space-y-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-pink-500/30 transition-all">
                      <Heart className="w-8 h-8 text-white" />
                    </div>

                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                        Mekozza Petsgo
                        <ExternalLink className="w-6 h-6 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-gray-400 leading-relaxed text-lg">
                        Revolutionizing pet care with AI-driven solutions, seamless services, and a community-driven platform for pet owners.
                      </p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <h4 className="font-semibold text-white text-sm uppercase tracking-wider">Key Services:</h4>
                      <ul className="space-y-2 text-sm text-gray-400">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                          Pet Health Tracking & Wellness
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                          Veterinary Consultation Network
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                          Community & Pet Social Network
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4">
                      {['Pet Tech', 'Healthcare', 'Community', 'AI'].map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-medium text-pink-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </NeonCard>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </SectionContainer>

      {/* Social Media & Contact Section */}
      <SectionContainer>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-12"
        >
          <motion.div variants={fadeInUp} className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold font-title">
              Connect On <span className="text-secondary">Social Media</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Follow me on various platforms to stay updated with my latest work and insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {socialLinks.slice(2).map((social) => {
              const Icon = social.icon;
              return (
                <motion.div key={social.title} variants={fadeInUp}>
                  <a href={social.link} target="_blank" rel="noopener noreferrer">
                    <NeonCard variant={social.bgVariant} className="h-full group cursor-pointer transform transition-all duration-300 hover:scale-105">
                      <div className="flex items-start gap-6">
                        <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${social.color} flex items-center justify-center group-hover:shadow-lg transition-all flex-shrink-0`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                            {social.title}
                            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h3>
                          <p className="text-gray-400 text-sm">{social.description}</p>
                        </div>
                      </div>
                    </NeonCard>
                  </a>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </SectionContainer>

      {/* Direct Links Section */}
      <SectionContainer>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.div variants={fadeInUp} className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold font-title">
              Direct <span className="text-primary">Links</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Copy or click any link below to connect with me instantly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {directLinks.map((item) => (
              <motion.div key={item.id} variants={fadeInUp}>
                <div className="group relative p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                  onClick={() => copyToClipboard(item.url, item.id)}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-primary uppercase tracking-wide mb-1">{item.label}</h3>
                      <p className="text-xs md:text-sm text-gray-400 break-all font-mono hover:text-white transition-colors">
                        {item.url}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(item.url, item.id);
                      }}
                      className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors flex-shrink-0 text-primary"
                      title="Copy to clipboard"
                    >
                      {copied === item.id ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SectionContainer>

      {/* Contact CTA Section */}
      <SectionContainer className="flex items-center justify-center text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto space-y-8"
        >
          <h2 className="text-5xl md:text-6xl font-black font-title leading-tight">
            Let's build the <span className="text-primary">future</span> together.
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Whether it's a collaboration, question, or just to say hello—feel free to reach out!
          </p>

          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:kartikuma9261@gmail.com"
              className="px-8 py-3 rounded-full bg-primary text-black font-bold hover:bg-primary/80 transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Send an Email
            </a>
            <a
              href="https://kartiksharma.site"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full border border-primary/50 text-white hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
            >
              <Globe className="w-5 h-5" />
              Visit Portfolio
            </a>
          </div>
        </motion.div>
      </SectionContainer>
    </div>
  );
}

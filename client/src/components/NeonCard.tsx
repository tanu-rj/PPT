import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NeonCardProps {
  children: ReactNode;
  className?: string;
  variant?: "blue" | "purple" | "red";
}

export function NeonCard({ children, className, variant = "blue" }: NeonCardProps) {
  const borderClass = 
    variant === "blue" ? "hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]" : 
    variant === "purple" ? "hover:border-secondary/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]" :
    "hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        "bg-background/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-300",
        borderClass,
        className
      )}
    >
      {children}
    </motion.div>
  );
}

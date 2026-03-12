"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
}

const getInitial = (direction: string) => {
  switch (direction) {
    case "up":
      return { opacity: 0, y: 50 };
    case "down":
      return { opacity: 0, y: -50 };
    case "left":
      return { opacity: 0, x: 50 };
    case "right":
      return { opacity: 0, x: -50 };
    default:
      return { opacity: 0, y: 50 };
  }
};

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={getInitial(direction)}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

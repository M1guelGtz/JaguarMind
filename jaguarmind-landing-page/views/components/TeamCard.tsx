"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { TeamMember } from "@/models/team";

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

export default function TeamCard({ member, index }: TeamCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 80, rotateY: -15, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        delay: index * 0.15,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -12 }}
      style={{ perspective: "1200px" }}
    >
      {/* Outer neon glow ring — pulses on hover */}
      <motion.div
        className="absolute -inset-[2px] rounded-2xl opacity-0 z-0"
        animate={isHovered ? {
          opacity: [0.5, 1, 0.5],
          transition: { repeat: Infinity, duration: 2 }
        } : { opacity: 0 }}
        style={{
          background: "linear-gradient(135deg, #f59e0b, #ff6b00, #fbbf24, #f59e0b)",
          backgroundSize: "300% 300%",
          animation: isHovered ? "gradient-spin 3s linear infinite" : undefined,
          filter: "blur(4px)",
        }}
      />

      {/* Card body */}
      <div className="relative rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/[0.06] z-10">
        {/* Animated gradient border on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-20"
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "linear-gradient(135deg, rgba(245,158,11,0.3), transparent 40%, transparent 60%, rgba(251,191,36,0.2))",
          }}
        />

        {/* Photo section */}
        <div className="relative h-56 overflow-hidden">
          {/* Photo */}
          <motion.div
            className="absolute inset-0"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={member.avatar}
              alt={member.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </motion.div>

          {/* Dark gradient overlay bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent z-10" />

          {/* Neon scanline effect on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute left-0 right-0 h-[2px] z-20"
                style={{
                  background: "linear-gradient(90deg, transparent, #f59e0b, #fbbf24, #f59e0b, transparent)",
                  boxShadow: "0 0 15px #f59e0b, 0 0 30px rgba(245,158,11,0.5)",
                }}
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            )}
          </AnimatePresence>

          {/* Alias badge — floats in from right */}
          <motion.div
            className="absolute top-3 right-3 z-20"
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.5, duration: 0.5 }}
          >
            <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-accent/30 text-accent text-xs font-bold tracking-wider uppercase">
              {member.alias}
            </div>
          </motion.div>

          {/* Hexagonal particles overlay on hover */}
          <AnimatePresence>
            {isHovered && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-accent/60 z-20"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                      y: [0, -30 - Math.random() * 20],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 1.5 + Math.random(),
                      repeat: Infinity,
                      delay: Math.random() * 0.5,
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Info section */}
        <div className="relative z-10 px-5 pb-5 -mt-2">
          {/* Name with neon glow on hover */}
          <motion.h3
            className="text-lg font-bold text-foreground leading-tight"
            animate={isHovered ? {
              textShadow: "0 0 10px rgba(245,158,11,0.4), 0 0 20px rgba(245,158,11,0.2)",
            } : {
              textShadow: "0 0 0px transparent",
            }}
            transition={{ duration: 0.3 }}
          >
            {member.name}
          </motion.h3>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-text-muted text-sm">{member.age} years</span>
            <span className="w-1 h-1 rounded-full bg-accent/50" />
            <motion.span
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20"
              animate={isHovered ? {
                borderColor: "rgba(245,158,11,0.5)",
                boxShadow: "0 0 10px rgba(245,158,11,0.15), inset 0 0 8px rgba(245,158,11,0.05)",
              } : {
                borderColor: "rgba(245,158,11,0.2)",
                boxShadow: "none",
              }}
              transition={{ duration: 0.3 }}
            >
              {member.role}
            </motion.span>
          </div>

          {/* Social Links — slide up on hover */}
          <motion.div
            className="flex gap-2 mt-4"
            initial={false}
            animate={isHovered ? { y: 0, opacity: 1 } : { y: 5, opacity: 0.7 }}
            transition={{ duration: 0.3 }}
          >
            <motion.a
              href={member.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/[0.04] text-text-muted hover:text-white hover:bg-white/[0.08] transition-all duration-200 border border-transparent hover:border-white/10"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(255,255,255,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              aria-label={`${member.name} GitHub`}
            >
              <GithubIcon />
              <span className="text-xs font-medium hidden sm:inline">GitHub</span>
            </motion.a>
            <motion.a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/[0.04] text-text-muted hover:text-[#0a66c2] hover:bg-[#0a66c2]/10 transition-all duration-200 border border-transparent hover:border-[#0a66c2]/20"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(10,102,194,0.15)",
              }}
              whileTap={{ scale: 0.95 }}
              aria-label={`${member.name} LinkedIn`}
            >
              <LinkedinIcon />
              <span className="text-xs font-medium hidden sm:inline">LinkedIn</span>
            </motion.a>
            <motion.a
              href={`mailto:${member.email}`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/[0.04] text-text-muted hover:text-accent hover:bg-accent/10 transition-all duration-200 border border-transparent hover:border-accent/20"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(245,158,11,0.15)",
              }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Email ${member.name}`}
            >
              <EmailIcon />
              <span className="text-xs font-medium hidden sm:inline">Email</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom neon line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] z-20"
          animate={isHovered ? {
            background: "linear-gradient(90deg, transparent, #f59e0b, #fbbf24, #f59e0b, transparent)",
            opacity: 1,
          } : {
            background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.2), transparent)",
            opacity: 0.5,
          }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useTeamViewModel } from "@/viewmodels/useTeamViewModel";
import TeamCard from "./TeamCard";
import ScrollReveal from "./ScrollReveal";

export default function TeamSection() {
  const { members, isLoading } = useTeamViewModel();

  if (isLoading) {
    return (
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="py-16 sm:py-32 px-4 sm:px-6 relative">
      {/* Section background glow — neon enhanced */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[700px] sm:h-[700px] bg-accent/[0.05] rounded-full blur-[150px]" />
        <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-[#ff6b00]/[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[180px] h-[180px] sm:w-[350px] sm:h-[350px] bg-accent-light/[0.025] rounded-full blur-[90px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header with enhanced animation */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <motion.div
              className="inline-block mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/[0.05] text-accent text-sm font-medium tracking-wider uppercase"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Builders
            </motion.div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Meet the{" "}
              <span className="bg-gradient-to-r from-accent via-[#ff6b00] to-accent-light bg-clip-text text-transparent neon-text-glow">
                Team
              </span>
            </h2>
            <p className="text-text-muted mt-4 text-lg max-w-2xl mx-auto">
              The minds behind Jaguarmind — building the future of decentralized technology.
            </p>
          </div>
        </ScrollReveal>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {members.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCommunityViewModel } from "@/viewmodels/useCommunityViewModel";
import ScrollReveal from "./ScrollReveal";

const STATUS_COLORS: Record<string, string> = {
  online: "#22c55e",
  away: "#f59e0b",
  offline: "#6b7280",
};

export default function CommunitySection() {
  const { users, isLoading, totalOnline } = useCommunityViewModel();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  if (isLoading) return null;

  return (
    <section id="community" className="py-24 px-6 relative">
      {/* Background glow — neon enhanced */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#ff6b00]/[0.03] rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent-light/[0.025] rounded-full blur-[80px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              The{" "}
              <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                Network
              </span>
            </h2>
            <p className="text-text-muted mt-4 text-lg max-w-2xl mx-auto">
              A growing community of builders and innovators.{" "}
              <span className="text-accent font-medium">{totalOnline} online</span> now.
            </p>
          </div>
        </ScrollReveal>

        {/* Network Graph — Desktop */}
        <div
          ref={containerRef}
          className="relative hidden md:block w-full h-[500px] rounded-2xl border border-accent/[0.1] bg-white/[0.01] overflow-hidden neon-border"
        >
          {/* SVG connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {dimensions.width > 0 &&
              users.map((user) =>
                user.connections.map((connId) => {
                  const target = users.find((u) => u.id === connId);
                  if (!target || user.id > connId) return null;
                  return (
                    <line
                      key={`${user.id}-${connId}`}
                      x1={user.position.x * dimensions.width}
                      y1={user.position.y * dimensions.height}
                      x2={target.position.x * dimensions.width}
                      y2={target.position.y * dimensions.height}
                      stroke="rgba(245,158,11,0.2)"
                      strokeWidth={1.5}
                      strokeDasharray="5 5"
                      style={{ animation: "dash 20s linear infinite" }}
                    />
                  );
                })
              )}
          </svg>

          {/* User nodes */}
          {users.map((user, i) => (
            <motion.div
              key={user.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${user.position.x * 100}%`,
                top: `${user.position.y * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
            >
              <div className="group relative flex flex-col items-center gap-1">
                {/* Node */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-surface to-black border border-white/10 flex items-center justify-center text-xs font-bold text-accent group-hover:border-accent/40 transition-colors">
                    {user.username.slice(0, 2).toUpperCase()}
                  </div>
                  {/* Status dot */}
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-black"
                    style={{
                      backgroundColor: STATUS_COLORS[user.status],
                      animation:
                        user.status === "online"
                          ? "pulse-glow 2s ease-in-out infinite"
                          : undefined,
                    }}
                  />
                </div>
                {/* Username tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-text-muted bg-black/80 px-2 py-0.5 rounded whitespace-nowrap">
                  {user.username}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile — Horizontal Scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {users.map((user, i) => (
            <motion.div
              key={user.id}
              className="flex-shrink-0 w-32 p-4 rounded-xl border border-white/[0.08] bg-white/[0.03] flex flex-col items-center gap-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-accent-dark/20 border border-white/10 flex items-center justify-center text-xs font-bold text-accent">
                  {user.username.slice(0, 2).toUpperCase()}
                </div>
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-black"
                  style={{ backgroundColor: STATUS_COLORS[user.status] }}
                />
              </div>
              <span className="text-xs text-text-muted truncate w-full text-center">
                {user.username}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

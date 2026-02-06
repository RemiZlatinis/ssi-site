"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function MobileClientMockup() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="relative w-full max-w-3xs mx-auto cursor-pointer"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Phone Frame */}
      <div className="relative bg-zinc-800 rounded-[2.5rem] p-2 shadow-2xl">
        {/* Phone Inner Bezel */}
        <div className="relative bg-black rounded-[2rem] overflow-hidden">
          {/* Status Bar */}
          <div className="relative w-full h-6 bg-black">
            <Image
              src="/screenshots/mobile-status-bar.png"
              alt="Status Bar"
              fill
              className="object-cover"
            />
          </div>

          {/* Screen Content - Base layer (always visible) */}
          <div className="relative aspect-[9/19.5] overflow-hidden">
            {/* Collapsed image - base layer */}
            <Image
              src="/screenshots/mobile-app-screenshot.png"
              alt="SSI Mobile App"
              fill
              className="object-cover"
            />

            {/* Expanded image - overlay with fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0"
            >
              <Image
                src="/screenshots/mobile-app-screenshot-expand.png"
                alt="SSI Mobile App Expanded"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Hover Hint */}
            <motion.div
              animate={{ opacity: isExpanded ? 0 : 1 }}
              transition={{ duration: 0.1 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full"
            >
              <span className="text-[10px] text-white/80">Hover to expand</span>
            </motion.div>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/30 rounded-full" />
        </div>
      </div>

      {/* Phone Shadow */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/20 blur-xl rounded-full" />
    </div>
  );
}

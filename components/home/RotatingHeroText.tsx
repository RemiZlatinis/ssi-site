"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const texts = ["Confidence", "Service Status Indicator"];

export function RotatingHeroText() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="relative inline-block overflow-hidden"
      style={{ height: "1.2em", verticalAlign: "bottom" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 40, opacity: 0, rotateX: -45 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -40, opacity: 0, rotateX: 45 }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 whitespace-nowrap ${
            currentIndex === 1 ? "font-[var(--font-bruno-ace)]" : ""
          }`}
          style={{
            transformOrigin: "center center",
            display: "inline-block",
            fontFamily:
              currentIndex === 1 ? "var(--font-bruno-ace)" : "inherit",
            fontSize: currentIndex === 1 ? "0.70em" : "inherit",
          }}
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

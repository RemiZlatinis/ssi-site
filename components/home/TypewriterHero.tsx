"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const commands = [
  {
    text: "wget -qO- https://service-status-indicator.com/install.sh | bash -",
    description: "Install the SSI Agent on your machine",
  },
  {
    text: "ssi auth register",
    description: "Register using the 6-digit code in the SSI app",
  },
  {
    text: "ssi service add library/system-updates.bash",
    description:
      "Add a service script (`library` contains first-party scripts)",
  },
  {
    text: "ssi service list",
    description: "List all installed services",
  },
  {
    text: "ssi debug logs -f",
    description: "Debug your script output as needed",
  },
];

export function TypewriterHero() {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const goToCommand = useCallback((index: number) => {
    const newIndex =
      ((index % commands.length) + commands.length) % commands.length;
    setCurrentCommandIndex(newIndex);
    setDisplayedText("");
    setIsTyping(true);
    setIsPaused(false);
  }, []);

  const goToNext = useCallback(() => {
    goToCommand(currentCommandIndex + 1);
  }, [currentCommandIndex, goToCommand]);

  const goToPrevious = useCallback(() => {
    goToCommand(currentCommandIndex - 1);
  }, [currentCommandIndex, goToCommand]);

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Swipe threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    touchStartX.current = null;
  };

  // Auto-play typing effect
  useEffect(() => {
    if (isPaused) return;

    const currentCommand = commands[currentCommandIndex].text;

    if (isTyping) {
      // Typing phase
      if (displayedText.length < currentCommand.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentCommand.slice(0, displayedText.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, pause before deleting
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsPaused(true);
        const timeout = setTimeout(() => {
          setIsPaused(false);
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      // Deleting phase
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        // Finished deleting, move to next command
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsTyping(true);
        setCurrentCommandIndex((prev) => (prev + 1) % commands.length);
      }
    }
  }, [displayedText, isTyping, isPaused, currentCommandIndex]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Terminal Window */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-900 shadow-2xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between gap-2 px-4 py-3 bg-zinc-800 border-b border-zinc-700">
          <div className="flex gap-1.5 w-12">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-zinc-400 font-mono">
            Your Machine - Terminal
          </span>
          <div className="w-12"></div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 min-h-[120px]">
          <div className="font-mono text-sm">
            {/* Prompt */}
            <span className="text-green-400">user@server</span>
            <span className="text-zinc-400">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-zinc-400">$ </span>

            {/* Typing text */}
            <span className="text-zinc-100">{displayedText}</span>

            {/* Cursor */}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-green-400 ml-0.5"
            />
          </div>

          {/* Command Description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCommandIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-4 text-sm text-zinc-500 font-mono"
            >
              <span className="text-zinc-600"># </span>
              {commands[currentCommandIndex].description}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between px-4 pb-4">
          {/* Previous Button (Desktop) */}
          <button
            onClick={goToPrevious}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
            aria-label="Previous command"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Prev</span>
          </button>

          {/* Progress Indicators */}
          <div className="flex gap-1.5 sm:mx-auto">
            {commands.map((_, index) => (
              <button
                key={index}
                onClick={() => goToCommand(index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentCommandIndex
                    ? "w-8 bg-green-400"
                    : "w-2 bg-zinc-700 hover:bg-zinc-600"
                }`}
                aria-label={`Go to command ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button (Desktop) */}
          <button
            onClick={goToNext}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
            aria-label="Next command"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Mobile: Swipe hint */}
          <div className="sm:hidden text-xs text-zinc-600 font-mono">
            Swipe to navigate
          </div>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WordDefinition {
  word: string;
  definition: string;
}

const definitions: WordDefinition[] = [
  {
    word: "complete",
    definition:
      "Full ecosystem with agent, backend (Cloud & Self-Hosted), web and mobile clients - everything you need out of the box.",
  },
  {
    word: "open-source",
    definition:
      "MIT licensed - free to use, modify, and self-host. Community contributions welcome",
  },
  {
    word: "script-driven",
    definition:
      "Execute custom BASH scripts to monitor any service, metric, or condition you need.",
  },
  {
    word: "real-time",
    definition:
      "WebSocket-powered instant updates with sub-second latency and live log streaming",
  },
];

interface TooltipProps {
  definition: string;
  isVisible: boolean;
  triggerRef: React.RefObject<HTMLElement | null>;
}

function Tooltip({ definition, isVisible, triggerRef }: TooltipProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      // Center horizontally above the trigger
      let x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
      let y = triggerRect.top - tooltipRect.height - 8;

      // Keep within viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (x < 8) x = 8;
      if (x + tooltipRect.width > viewportWidth - 8) {
        x = viewportWidth - tooltipRect.width - 8;
      }

      // If too close to top, show below
      if (y < 8) {
        y = triggerRect.bottom + 8;
      }

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPosition({ x, y });
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={tooltipRef}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.15 }}
          className="fixed z-50 max-w-xs px-4 py-3 text-sm bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg shadow-xl border border-zinc-700 dark:border-zinc-200 pointer-events-none"
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          {definition}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-zinc-900 dark:bg-white rotate-45 border-r border-b border-zinc-700 dark:border-zinc-200" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface HighlightedWordProps {
  definition: WordDefinition;
}

function HighlightedWord({ definition }: HighlightedWordProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const wordRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (!isClicked) {
      setIsTooltipVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isClicked) {
      setIsTooltipVisible(false);
    }
  };

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsClicked(!isClicked);
    setIsTooltipVisible(!isClicked);
  };

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (wordRef.current && !wordRef.current.contains(e.target as Node)) {
        setIsClicked(false);
        setIsTooltipVisible(false);
      }
    };

    if (isClicked) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
    }
  }, [isClicked]);

  return (
    <>
      <span
        ref={wordRef}
        className="relative cursor-pointer font-medium text-zinc-400 dark:text-zinc-300 underline underline-offset-4 decoration-zinc-400 dark:decoration-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-200 hover:decoration-zinc-600 dark:hover:decoration-zinc-300 transition-colors select-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onTouchStart={handleClick}
      >
        {definition.word}
      </span>
      <Tooltip
        definition={definition.definition}
        isVisible={isTooltipVisible}
        triggerRef={wordRef}
      />
    </>
  );
}

interface InteractiveDescriptionProps {
  text: string;
}

export function InteractiveDescription({ text }: InteractiveDescriptionProps) {
  // Split text into parts, keeping the highlighted words
  const parts: (string | React.ReactElement)[] = [];
  let remainingText = text;

  // Find and replace each definition word
  definitions.forEach((def) => {
    const index = remainingText.indexOf(def.word);
    if (index !== -1) {
      // Add text before the word
      if (index > 0) {
        parts.push(remainingText.slice(0, index));
      }
      // Add the highlighted word component
      parts.push(<HighlightedWord key={def.word} definition={def} />);
      // Update remaining text
      remainingText = remainingText.slice(index + def.word.length);
    }
  });

  // Add any remaining text
  if (remainingText) {
    parts.push(remainingText);
  }

  return (
    <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400 leading-relaxed">
      {parts}
    </p>
  );
}

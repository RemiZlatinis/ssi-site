"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Terminal } from "lucide-react";
import { TypewriterHero } from "./TypewriterHero";
import { RotatingHeroText } from "./RotatingHeroText";
import { InteractiveDescription } from "./InteractiveDescription";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="w-full pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 bg-gradient-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium border-transparent bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
              <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              v1.0.0 Now Available
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl text-black dark:text-white"
          >
            Monitor with <br />
            <RotatingHeroText />
          </motion.h1>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <InteractiveDescription text="The Service Status Indicator (SSI) is a complete, open-source, script-driven ecosystem for monitoring everything you want in real-time." />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          >
            <Link href="/docs/core">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="https://github.com/RemiZlatinis/ssi" target="_blank">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 w-full sm:w-auto"
              >
                <Terminal className="h-4 w-4" /> View on GitHub
              </Button>
            </Link>
          </motion.div>

          {/* Typewriter Terminal */}
          <div className="w-full max-w-3xl mx-auto mt-8">
            <TypewriterHero />
          </div>
        </div>
      </div>
    </section>
  );
}

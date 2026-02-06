"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { AgentArchitectureVisual } from "./AgentArchitectureVisual";
import { AgentInstallCommand } from "./AgentInstallCommand";

export function AgentInstallSection() {
  return (
    <section className="w-full py-24 bg-white dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-lg bg-zinc-200 dark:bg-zinc-800 px-3 py-1 text-sm font-medium mb-4">
            <Terminal className="mr-2 h-4 w-4" /> Quick Install
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Install the Agent
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-[600px] mx-auto text-lg">
            Deploy the SSI Agent to your Linux servers in seconds. One
            command, zero configuration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual Architecture - Desktop: Left, Mobile: Bottom (order-2) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <AgentArchitectureVisual />
          </motion.div>

          {/* Install Command - Desktop: Right, Mobile: Top (order-1) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <AgentInstallCommand />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Terminal, FileText, Clock, ArrowRight, Server } from "lucide-react";
import Image from "next/image";

export function AgentArchitectureVisual() {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Main Container */}
      <div className="relative bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-700">
        {/* Linux Server Header */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 ml-2">Linux Server</span>
        </div>

        {/* Architecture Flow */}
        <div className="space-y-6">
          {/* Service Scripts Layer */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <div className="flex-1 bg-white dark:bg-zinc-900 rounded-lg p-3 border border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                <FileText className="h-4 w-4" />
                <span>Service Scripts</span>
              </div>
              <div className="mt-2 space-y-1">
                <div className="text-xs font-mono text-zinc-500 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-950 rounded px-2 py-1">api-health.bash</div>
                <div className="text-xs font-mono text-zinc-500 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-950 rounded px-2 py-1">system-updates.bash</div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="text-[10px] text-zinc-500">systemd</span>
            </div>
          </motion.div>

          {/* Arrow Down */}
          <div className="flex justify-center">
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowRight className="h-5 w-5 text-zinc-400 rotate-90" />
            </motion.div>
          </div>

          {/* Log Files Layer */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-4"
          >
            <div className="flex-1 bg-white dark:bg-zinc-900 rounded-lg p-3 border border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                <Terminal className="h-4 w-4" />
                <span>Log Files</span>
              </div>
              <div className="mt-2 space-y-1">
                <div className="text-xs font-mono text-zinc-500 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-950 rounded px-2 py-1">/var/log/ssi-agent/</div>
              </div>
            </div>
            <div className="w-16" />
          </motion.div>

          {/* Arrow Down */}
          <div className="flex justify-center">
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <ArrowRight className="h-5 w-5 text-zinc-400 rotate-90" />
            </motion.div>
          </div>

          {/* Agent Daemon Layer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border-2 border-green-500/30 shadow-lg">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.webp"
                  alt="SSI Agent"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <div>
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">SSI Agent Daemon</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">Watches logs • Sends updates</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Arrow to Backend */}
          <div className="flex justify-center items-center gap-2">
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-2"
            >
              <ArrowRight className="h-5 w-5 text-green-500" />
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">WebSocket</span>
            </motion.div>
          </div>

          {/* Backend Layer */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center"
          >
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">SSI Backend</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Key Features */}
        <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-700">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="text-xs">
              <div className="font-medium text-zinc-900 dark:text-zinc-100">systemd Native</div>
              <div className="text-zinc-500 dark:text-zinc-400">Timers & Services</div>
            </div>
            <div className="text-xs">
              <div className="font-medium text-zinc-900 dark:text-zinc-100">Real-time</div>
              <div className="text-zinc-500 dark:text-zinc-400">Log Watching</div>
            </div>
            <div className="text-xs">
              <div className="font-medium text-zinc-900 dark:text-zinc-100">Secure</div>
              <div className="text-zinc-500 dark:text-zinc-400">WebSocket TLS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

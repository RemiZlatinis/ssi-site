"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export function AgentASCIIDiagram() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-700 shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800 border-b border-zinc-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-zinc-400 font-mono">Architecture Diagram</span>
          </div>
        </div>

        {/* ASCII Art Container */}
        <div className="p-4 overflow-x-auto">
          <motion.pre
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs sm:text-sm font-mono leading-relaxed"
          >
            <code className="text-zinc-300">
{`                                         ┌─────────────────┐
                                         │   SSI Backend   │
                                         │   (WebSocket)   │
                                         └────────▲────────┘
                                                  │
┌─────────────────────────────────────────────────┼──────────────────────────────┐
│                   Linux System                  │                              │
│                                                 │                              │
│  ┌──────────────┐      ┌────────────────────────┴───────────────────────────┐  │
│  │     User     │      │                 SSI Agent Daemon                   │  │
│  │   (ssi CLI)  │      │  - Watches log files                               │  │
│  └──────┬───────┘      │  - Sends status via WebSocket                      │  │
│         │              │  - Handles reconnection                            │  │
│         │              └────────────────────────▲───────────────────────────┘  │
│         │                                       │ (reads)                      │
│         ▼                                       │                              │
│  ┌──────────────┐      ┌────────────────────────┴───────────────────────────┐  │
│  │   systemd    │      │                    Log Files                       │  │
│  │   timers     ├──────►          /var/log/ssi-agent/<service>.log          │  │
│  └──────────────┘      └────────────────────────▲───────────────────────────┘  │
│         │                                       │ (writes)                     │
│         ▼                                       │                              │
│  ┌──────────────┐      ┌────────────────────────┴───────────────────────────┐  │
│  │   systemd    │──────│                 Service Scripts                    │  │
│  │   services   │      │ /opt/ssi-agent/.installed-service-scripts/*.bash     │  │
│  └──────────────┘      └────────────────────────────────────────────────────┘  │
│                                                                                │
└────────────────────────────────────────────────────────────────────────────────┘`}
            </code>
          </motion.pre>
        </div>

        {/* Legend */}
        <div className="px-4 py-3 bg-zinc-800/50 border-t border-zinc-700">
          <div className="flex flex-wrap gap-4 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="text-green-400">●</span>
              <span>Daemon Process</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400">▲</span>
              <span>WebSocket</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">►</span>
              <span>Data Flow</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flow Description */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-4 text-center"
      >
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Service Scripts → systemd → Logs → Agent Daemon → Backend
        </p>
      </motion.div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Radio, Activity, Bell, Lock, ShieldCheck, FileCheck } from "lucide-react";

export function HighlightsSection() {
  return (
    <section className="w-full py-24 bg-white dark:bg-zinc-950">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center rounded-lg bg-zinc-200 dark:bg-zinc-800 px-3 py-1 text-sm font-medium">
              <Radio className="mr-2 h-4 w-4" /> Real-time
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Instant Status Updates
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">
              Forget about refreshing pages. SSI uses WebSockets to push
              status changes properly to all connected clients instantly.
            </p>
            <ul className="space-y-3">
              {[
                { icon: Activity, text: "Live Logs Streaming" },
                { icon: Bell, text: "Instant Push Notifications" },
                { icon: Lock, text: "Zero-Config Agent Registration" },
                { icon: FileCheck, text: "Ready-to-Use Scripts" },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300"
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/20">
                    <item.icon className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                  </div>
                  {item.text}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-video rounded-xl bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 shadow-2xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-center overflow-hidden group"
          >
            <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark [mask-image:linear-gradient(0deg,white,transparent)]" />
            <div className="relative text-center p-8 bg-white/90 dark:bg-zinc-900/90 backdrop-blur rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-lg group-hover:scale-105 transition-transform duration-500">
              <ShieldCheck className="h-16 w-16 mx-auto mb-4 text-blue-500" />
              <p className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
                Secure by Design
              </p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
                Principle of Least Privilege
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

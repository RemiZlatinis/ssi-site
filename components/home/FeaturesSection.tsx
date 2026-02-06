"use client";

import { motion } from "framer-motion";
import { Terminal, Server, Smartphone } from "lucide-react";

export function FeaturesSection() {
  return (
    <section id="features" className="w-full py-24 bg-white dark:bg-zinc-950">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            The Complete Ecosystem
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-[600px] mx-auto text-lg">
            Everything you need to keep track of your critical services, from
            the kernel to the cloud.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Agent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-xl hover:-translate-y-1 group"
          >
            <div className="h-14 w-14 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center mb-6 group-hover:bg-zinc-300 dark:group-hover:bg-zinc-700 transition-colors">
              <Terminal className="h-7 w-7 text-zinc-900 dark:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">SSI Agent</h3>
            <p className="text-zinc-500 dark:text-zinc-400">
              Lightweight Linux daemon. Runs BASH scripts, monitors systemd
              services, and streams updates via secure WebSocket.
            </p>
          </motion.div>

          {/* Backend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-xl hover:-translate-y-1 group"
          >
            <div className="h-14 w-14 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center mb-6 group-hover:bg-zinc-300 dark:group-hover:bg-zinc-700 transition-colors">
              <Server className="h-7 w-7 text-zinc-900 dark:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">SSI Backend</h3>
            <p className="text-zinc-500 dark:text-zinc-400">
              Powerful Django & Channels server. Handles authentication,
              real-time message routing, and data persistence.
            </p>
          </motion.div>

          {/* Client */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-xl hover:-translate-y-1 group"
          >
            <div className="h-14 w-14 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center mb-6 group-hover:bg-zinc-300 dark:group-hover:bg-zinc-700 transition-colors">
              <Smartphone className="h-7 w-7 text-zinc-900 dark:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Native Client</h3>
            <p className="text-zinc-500 dark:text-zinc-400">
              React Native mobile app. Receive push notifications, view
              real-time logs, and manage your infrastructure on the go.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

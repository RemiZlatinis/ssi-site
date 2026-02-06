"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Smartphone,
  Globe,
  Bell,
  Wifi,
  Shield,
} from "lucide-react";
import { WebClientMockup } from "./WebClientMockup";
import { MobileClientMockup } from "./MobileClientMockup";
import Link from "next/link";

export function ClientsSection() {
  return (
    <section className="w-full py-24 bg-gradient-to-b lg:bg-gradient-to-br from-indigo-900 via-black to-cyan-950 lg:to-cyan-900 text-white overflow-hidden">
      <div className="container px-4 md:px-8 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium mb-4 border border-white/20">
              <Globe className="mr-2 h-4 w-4" /> Multi-Platform
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              Access Anywhere
            </h2>
            <p className="text-white/70 max-w-[600px] mx-auto text-lg">
              Monitor your infrastructure from any device. Real-time updates
              synchronized across all your clients.
            </p>
          </motion.div>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Mobile App - Left on Desktop, First on Mobile */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <MobileClientMockup />

            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Smartphone className="h-5 w-5 text-cyan-400" />
                <h3 className="text-xl font-bold">Mobile App</h3>
              </div>

              <p className="text-white/70 text-sm max-w-sm mx-auto">
                Monitor your servers on the go with native push notifications.
                Get instant alerts when services go down.
              </p>

              <div className="flex flex-wrap justify-center gap-3 text-xs">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                  <Bell className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Push Notifications</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                  <Wifi className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Real-time Sync</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                  <Shield className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Secure</span>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href="https://play.google.com/store/apps/details?id=com.remizlatinis.ssiclientmobile"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-zinc-900 rounded-lg font-medium hover:bg-white/90 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Get on Google Play
                </Link>

                <p className="text-xs text-white/50">
                  Available on Android. iOS support coming soon.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Web App - Right on Desktop, Second on Mobile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <WebClientMockup />

            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Globe className="h-5 w-5 text-indigo-400" />
                <h3 className="text-xl font-bold">Web Dashboard</h3>
              </div>

              <p className="text-white/70 text-sm max-w-sm mx-auto">
                Access your infrastructure from any browser. Full-featured
                dashboard with real-time WebSocket updates.
              </p>

              <div className="flex flex-wrap justify-center gap-3 text-xs">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                  <Wifi className="h-3.5 w-3.5 text-indigo-400" />
                  <span>WebSocket Updates</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                  <Globe className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Any Browser</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                  <Shield className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Responsive</span>
                </div>
              </div>

              <Link
                href="https://ssi-client-native.expo.app/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg font-medium hover:bg-white/20 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Open Web App
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

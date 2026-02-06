"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, BookOpen, Heart, MessageCircle } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "/docs/core", label: "Documentation", icon: BookOpen },
  { href: "/support", label: "Support", icon: MessageCircle },
];

const communityLinks = [
  {
    href: "https://github.com/RemiZlatinis/ssi",
    label: "GitHub",
    icon: Github,
    external: true,
  },
  {
    href: "https://github.com/RemiZlatinis/ssi/discussions",
    label: "Discussions",
    icon: MessageCircle,
    external: true,
  },
];

const sponsorLinks = [
  {
    href: "https://github.com/sponsors/RemiZlatinis",
    label: "Sponsors",
    icon: Github,
  },
  {
    href: "https://ko-fi.com/remizlatinis",
    label: "Ko-fi",
    icon: Heart,
  },
  {
    href: "https://www.paypal.com/donate/?hosted_button_id=59XUVBC284S4C",
    label: "PayPal",
    icon: Heart,
    isPopup: true,
  },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-20 z-50 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
              <span className="font-bold text-lg">Menu</span>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="px-6 py-4">
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
                Navigation
              </p>
              <nav className="space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="flex items-center gap-3 px-3 py-3 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      <link.icon className="h-5 w-5 text-zinc-500" />
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Community Links */}
            <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
                Community
              </p>
              <nav className="space-y-1">
                {communityLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                  >
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                      onClick={onClose}
                      className="flex items-center gap-3 px-3 py-3 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      <link.icon className="h-5 w-5 text-zinc-500" />
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Sponsor Section */}
            <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
                Support the Project
              </p>
              <div className="grid grid-cols-3 gap-2">
                {sponsorLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 + 0.3 }}
                  >
                    {link.isPopup ? (
                      <button
                        onClick={() => {
                          window.open(
                            link.href,
                            "PayPalDonation",
                            "width=600,height=700,scrollbars=yes,resizable=yes"
                          );
                          onClose();
                        }}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-500 transition-colors cursor-pointer"
                      >
                        <link.icon className="h-4 w-4" />
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={onClose}
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-500 transition-colors cursor-pointer"
                      >
                        <link.icon className="h-4 w-4" />
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

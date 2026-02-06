"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "./ui/Button";
import { Github, Menu, Heart, ChevronDown } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";
import { MobileMenu } from "./MobileMenu";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/docs/core", label: "Documentation" },
  { href: "/support", label: "Support" },
];

const communityLinks = [
  {
    href: "https://github.com/RemiZlatinis/ssi",
    label: "GitHub Repository",
    description: "View source code and contribute",
  },
  {
    href: "https://github.com/RemiZlatinis/ssi/discussions",
    label: "Discussions",
    description: "Ask questions and share ideas",
  },
  {
    href: "https://github.com/RemiZlatinis/ssi/issues",
    label: "Issues",
    description: "Report bugs and request features",
  },
];

const sponsorLinks = [
  {
    href: "https://github.com/sponsors/RemiZlatinis",
    label: "GitHub Sponsors",
  },
  {
    href: "https://ko-fi.com/remizlatinis",
    label: "Ko-fi",
  },
  {
    href: "https://www.paypal.com/donate/?hosted_button_id=59XUVBC284S4C",
    label: "PayPal",
    isPopup: true,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSponsorOpen, setIsSponsorOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
        <div className="container px-4 md:px-8 flex h-16 items-center justify-between mx-auto">
          {/* Logo & Desktop Nav */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center space-x-3 cursor-pointer"
            >
              <Image
                src="/logo.webp"
                alt="SSI Logo"
                width={40}
                height={40}
                priority
              />
              <span
                className="font-bold text-3xl text-zinc-900 dark:text-zinc-100"
                style={{ fontFamily: "var(--font-bruno-ace)" }}
              >
                SSI
              </span>
            </Link>

            <NavigationMenu.Root className="hidden md:flex">
              <NavigationMenu.List className="flex items-center gap-1">
                {/* Regular Links */}
                {navLinks.map((link) => (
                  <NavigationMenu.Item key={link.href}>
                    <NavigationMenu.Link asChild>
                      <Link
                        href={link.href}
                        className={clsx(
                          "px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer",
                          pathname?.startsWith(link.href)
                            ? "text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800"
                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800",
                        )}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                ))}

                {/* Community Dropdown */}
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger className="group flex items-center gap-1 px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors cursor-pointer">
                    Community
                    <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="absolute top-full left-0 w-full sm:w-auto min-w-[320px] mt-2">
                    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl p-2">
                      <div className="grid gap-1">
                        {communityLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="flex flex-col gap-1 p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                          >
                            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                              {link.label}
                            </span>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                              {link.description}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              </NavigationMenu.List>
            </NavigationMenu.Root>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Sponsor Button (Desktop) */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setIsSponsorOpen(!isSponsorOpen)}
                className={clsx(
                  "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer",
                  "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800",
                )}
              >
                <Heart className="h-4 w-4 text-red-500" />
                <span>Sponsor</span>
              </button>

              {/* Sponsor Dropdown */}
              <AnimatePresence>
                {isSponsorOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40"
                      onClick={() => setIsSponsorOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden z-50"
                    >
                      <div className="p-1">
                        {sponsorLinks.map((link) =>
                          link.isPopup ? (
                            <button
                              key={link.href}
                              onClick={() => {
                                window.open(
                                  link.href,
                                  "PayPalDonation",
                                  "width=600,height=700,scrollbars=yes,resizable=yes"
                                );
                                setIsSponsorOpen(false);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
                            >
                              <Heart className="h-3.5 w-3.5 text-red-500" />
                              {link.label}
                            </button>
                          ) : (
                            <Link
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noreferrer"
                              onClick={() => setIsSponsorOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
                            >
                              <Heart className="h-3.5 w-3.5 text-red-500" />
                              {link.label}
                            </Link>
                          )
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* GitHub Icon */}
            <Link
              href="https://github.com/RemiZlatinis/ssi"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>

            {/* Get Started Button */}
            <Link href="/docs/core" className="hidden md:block">
              <Button size="sm">Get Started</Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="flex items-center justify-center w-9 h-9 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

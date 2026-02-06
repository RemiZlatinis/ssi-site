"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Heart, Coffee, Wallet } from "lucide-react";
import { clsx } from "clsx";

const footerLinks = {
  product: {
    title: "Product",
    links: [
      { label: "Overview", href: "/#features" },
      { label: "Features", href: "/#features" },
      { label: "Documentation", href: "/docs/core" },
      {
        label: "Changelog",
        href: "https://github.com/RemiZlatinis/ssi/releases",
      },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs/core" },
      { label: "API Reference", href: "/docs/backend" },
      { label: "Agent Guide", href: "/docs/agent" },
      { label: "Support", href: "/support" },
    ],
  },
  community: {
    title: "Community",
    links: [
      { label: "GitHub", href: "https://github.com/RemiZlatinis/ssi" },
      {
        label: "Discussions",
        href: "https://github.com/RemiZlatinis/ssi/discussions",
      },
      { label: "Issues", href: "https://github.com/RemiZlatinis/ssi/issues" },
      { label: "Contributing", href: "/support" },
    ],
  },
};

const fundingPlatforms = [
  {
    name: "GitHub Sponsors",
    href: "https://github.com/sponsors/RemiZlatinis",
    icon: Github,
    description: "Support the project directly",
    color: "hover:bg-zinc-800",
  },
  {
    name: "Ko-fi",
    href: "https://ko-fi.com/remizlatinis",
    icon: Coffee,
    description: "Buy me a coffee",
    color: "hover:bg-sky-500/20",
  },
  {
    name: "PayPal",
    href: "https://www.paypal.com/donate/?hosted_button_id=59XUVBC284S4C",
    icon: Wallet,
    description: "One-time donations",
    color: "hover:bg-blue-500/20",
  },
];

export function EnhancedFooter() {
  return (
    <>
      {/* Support Section */}
      <section className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black">
        <div className="container px-4 md:px-8 mx-auto py-16 border-b border-zinc-200 dark:border-zinc-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
              <Heart className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
              Support the Project
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              SSI is open-source and free to use. If you find it valuable,
              consider supporting its continued development.
            </p>
          </div>

          {/* Funding Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {fundingPlatforms.map((platform) =>
              platform.name === "PayPal" ? (
                <button
                  key={platform.name}
                  onClick={() => {
                    window.open(
                      platform.href,
                      "PayPalDonation",
                      "width=600,height=700,scrollbars=yes,resizable=yes"
                    );
                  }}
                  className={clsx(
                    "group flex flex-col items-center p-6 rounded-xl border border-zinc-200 dark:border-zinc-800",
                    "bg-white dark:bg-zinc-900 transition-all duration-300",
                    "hover:border-zinc-300 dark:hover:border-zinc-700",
                    "cursor-pointer",
                    platform.color,
                  )}
                >
                  <platform.icon className="h-8 w-8 mb-3 text-zinc-700 dark:text-zinc-300 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                    {platform.name}
                  </span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {platform.description}
                  </span>
                </button>
              ) : (
                <Link
                  key={platform.name}
                  href={platform.href}
                  target="_blank"
                  rel="noreferrer"
                  className={clsx(
                    "group flex flex-col items-center p-6 rounded-xl border border-zinc-200 dark:border-zinc-800",
                    "bg-white dark:bg-zinc-900 transition-all duration-300",
                    "hover:border-zinc-300 dark:hover:border-zinc-700",
                    "cursor-pointer",
                    platform.color,
                  )}
                >
                  <platform.icon className="h-8 w-8 mb-3 text-zinc-700 dark:text-zinc-300 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                    {platform.name}
                  </span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {platform.description}
                  </span>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section className="w-full bg-zinc-50 dark:bg-black">
        <div className="container px-4 md:px-8 mx-auto py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key}>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
              <Link
                href="/"
                className="flex items-center gap-3 mb-4 cursor-pointer"
              >
                <Image src="/logo.webp" alt="SSI Logo" width={32} height={32} />
                <span
                  className="font-bold text-xl text-zinc-900 dark:text-zinc-100 flex flex-col xl:flex-row xl:gap-x-1 leading-tight xl:leading-none"
                  style={{
                    fontFamily: "var(--font-bruno-ace)",
                    fontSize: "0.80em",
                  }}
                >
                  <span>Service</span>
                  <span>Status</span>
                  <span>Indicator</span>
                </span>
              </Link>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                Modern open-source, script-driven monitoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Bar */}
      <section className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black">
        <div className="container px-4 md:px-8 mx-auto py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Built by{" "}
              <Link
                href="https://github.com/RemiZlatinis"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-zinc-700 dark:text-zinc-300 hover:underline cursor-pointer"
              >
                Remi Zlatinis
              </Link>
              . Released under the MIT License.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="https://github.com/RemiZlatinis/ssi"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

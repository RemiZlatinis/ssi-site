"use client";

import Link from "next/link";
import {
  BookOpen,
  Github,
  MessageCircle,
  Bug,
  GitPullRequest,
  HelpCircle,
  ExternalLink,
  Heart,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const supportCards = [
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Comprehensive guides and API references for all SSI components.",
    href: "/docs/core",
    action: "Browse Docs",
  },
  {
    icon: Github,
    title: "GitHub Repository",
    description: "View the source code, report issues, and contribute to the project.",
    href: "https://github.com/RemiZlatinis/ssi",
    action: "View on GitHub",
    external: true,
  },
  {
    icon: MessageCircle,
    title: "Discussions",
    description: "Ask questions, share ideas, and connect with the community.",
    href: "https://github.com/RemiZlatinis/ssi/discussions",
    action: "Join Discussion",
    external: true,
  },
  {
    icon: Bug,
    title: "Report an Issue",
    description: "Found a bug? Help us improve by reporting it on GitHub.",
    href: "https://github.com/RemiZlatinis/ssi/issues",
    action: "Open Issue",
    external: true,
  },
];

const faqs = [
  {
    question: "How do I install the SSI Agent?",
    answer: "The SSI Agent can be installed on any Linux system using the installation script. Visit the Agent documentation for detailed setup instructions.",
  },
  {
    question: "What are the system requirements?",
    answer: "The SSI Agent requires a Linux system with Python 3.8+ and systemd. The backend requires Python 3.8+, Django 4.0+, Redis, and PostgreSQL.",
  },
  {
    question: "Is SSI free to use?",
    answer: "Yes! SSI is completely open-source and free to use under the MIT License. You can self-host all components without any licensing fees.",
  },
  {
    question: "How do I get real-time notifications?",
    answer: "Install the SSI mobile client from your app store, connect it to your backend, and enable push notifications in the settings.",
  },
  {
    question: "Can I contribute to the project?",
    answer: "Absolutely! We welcome contributions. Check out our GitHub repository for contribution guidelines and open issues.",
  },
];

export default function SupportPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 bg-zinc-50 dark:bg-black border-b border-zinc-200 dark:border-zinc-800">
        <div className="container px-4 md:px-8 mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
            How can we help?
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Get support, find answers, and connect with the SSI community.
          </p>
        </div>
      </section>

      {/* Support Cards */}
      <section className="w-full py-16 bg-white dark:bg-zinc-950">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noreferrer" : undefined}
                className="group flex flex-col p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center mb-4 group-hover:bg-zinc-300 dark:group-hover:bg-zinc-700 transition-colors">
                  <card.icon className="h-6 w-6 text-zinc-700 dark:text-zinc-300" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 flex-1">
                  {card.description}
                </p>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                  {card.action}
                  <ExternalLink className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                >
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2 flex items-start gap-2">
                    <HelpCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 pl-7">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contribute Section */}
      <section className="w-full py-16 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
              <GitPullRequest className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-bold tracking-tighter mb-4">
              Contribute to SSI
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8">
              SSI is an open-source project and we welcome contributions from the community. 
              Whether it&apos;s fixing bugs, adding features, or improving documentation, 
              your help makes SSI better for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://github.com/RemiZlatinis/ssi"
                target="_blank"
                rel="noreferrer"
              >
                <Button className="gap-2">
                  <Github className="h-4 w-4" />
                  View on GitHub
                </Button>
              </Link>
              <Link
                href="https://github.com/RemiZlatinis/ssi/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="outline" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Contributing Guide
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Support the Project */}
      <section className="w-full py-16 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-black border-t border-zinc-200 dark:border-zinc-800">
        <div className="container px-4 md:px-8 mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
            <Heart className="h-6 w-6 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold tracking-tighter mb-4">
            Support the Project
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8">
            If SSI has helped you or your team, consider supporting its continued development. 
            Your contributions help keep the project alive and growing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://github.com/sponsors/RemiZlatinis"
              target="_blank"
              rel="noreferrer"
            >
              <Button className="gap-2">
                <Github className="h-4 w-4" />
                GitHub Sponsors
              </Button>
            </Link>
            <Link
              href="https://ko-fi.com/remizlatinis"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="outline" className="gap-2">
                <Heart className="h-4 w-4" />
                Ko-fi
              </Button>
            </Link>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                window.open(
                  "https://www.paypal.com/donate/?hosted_button_id=59XUVBC284S4C",
                  "PayPalDonation",
                  "width=600,height=700,scrollbars=yes,resizable=yes"
                );
              }}
            >
              <Wallet className="h-4 w-4" />
              PayPal
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

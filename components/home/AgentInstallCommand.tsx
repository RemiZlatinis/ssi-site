"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Terminal, Download, Shield, Cpu, Info, X } from "lucide-react";

const installCommand = "wget -qO- https://service-status-indicator.com/install.sh | sudo bash";

function SudoTooltip() {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={tooltipRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ml-1 p-0.5 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Why sudo is required"
      >
        <Info className="h-3 w-3 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-80 p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-700 left-0 top-full mt-2"
          >
            <div className="flex items-start justify-between mb-2">
              <h5 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Why sudo is required
              </h5>
              <button
                onClick={() => setIsOpen(false)}
                className="p-0.5 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded transition-colors"
                aria-label="Close"
              >
                <X className="h-3.5 w-3.5 text-zinc-500" />
              </button>
            </div>
            <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
              <p>
                <strong className="text-zinc-800 dark:text-zinc-200">Installer needs sudo to:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-1">
                <li>Create system directories (/opt/ssi-agent, /etc/ssi-agent, /var/log/ssi-agent)</li>
                <li>Create the ssi-agent system user</li>
                <li>Install systemd service files</li>
                <li>Create CLI symlink in /usr/local/bin</li>
                <li>Set file permissions and ACLs</li>
              </ul>
              <p className="mt-2">
                <strong className="text-zinc-800 dark:text-zinc-200">After installation:</strong>
              </p>
              <p>
                Admin users can run the <code className="bg-zinc-100 dark:bg-zinc-700 px-1 py-0.5 rounded">ssi</code> CLI without sudo to manage services, as the installer grants the admin group write access to configuration files.
              </p>
            </div>
            {/* Arrow */}
            <div className="absolute -top-1.5 left-4 w-3 h-3 bg-white dark:bg-zinc-800 border-l border-t border-zinc-200 dark:border-zinc-700 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AgentInstallCommand() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Terminal Window */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-900 shadow-2xl"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-800 border-b border-zinc-700">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-zinc-400 font-mono ml-2">Terminal</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
            aria-label="Copy installation command"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Command */}
        <div className="p-4 overflow-x-auto scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-600">
          <div className="flex items-start gap-2 whitespace-nowrap">
            <span className="text-green-400 font-mono text-sm">$</span>
            <code className="text-zinc-100 font-mono text-sm">
              {installCommand}
            </code>
          </div>
        </div>
      </motion.div>

      {/* Prerequisites */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 space-y-3"
      >
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Shield className="h-4 w-4 text-zinc-500" />
          Prerequisites
        </h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <Cpu className="h-3.5 w-3.5" />
            <span>Python 3.12+</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <Terminal className="h-3.5 w-3.5" />
            <span>systemd</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <Shield className="h-3.5 w-3.5" />
            <span className="flex items-center">
              sudo access
              <SudoTooltip />
            </span>
          </div>
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <Download className="h-3.5 w-3.5" />
            <span>Linux only</span>
          </div>
        </div>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-4 text-sm text-zinc-600 dark:text-zinc-400"
      >
        This one-liner clones the repository and runs the installer. 
        It sets up the agent with systemd service, creates the ssi-agent user, 
        and configures everything automatically.
      </motion.p>
    </div>
  );
}

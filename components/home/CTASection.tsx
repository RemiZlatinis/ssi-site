"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="w-full py-24 bg-gradient-to-b from-indigo-950 to-black text-white">
      <div className="container px-4 md:px-8 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
            Ready to monitor everything? The sky's the limit!
          </h2>
          <p className="text-zinc-400 max-w-[600px] mx-auto text-xl mb-10">
            Get started with the SSI in minutes. Open Source and free to
            use.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/docs/agent">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-zinc-200 border-transparent w-full sm:w-auto"
              >
                Get Started Now
              </Button>
            </Link>
            <Link href="/support">
              <Button
                variant="outline"
                size="lg"
                className="border-zinc-600 text-white hover:bg-zinc-800 w-full sm:w-auto"
              >
                View Documentation
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

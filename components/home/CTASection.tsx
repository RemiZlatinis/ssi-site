import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AppLink } from "@/components/ui/AppLink";

export function CTASection() {
  return (
    <section className="w-full py-24 bg-gradient-to-b from-indigo-950 to-black text-white">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 text-center">
        <div className="animate-fade-up reveal-view">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
            Ready to monitor everything? The sky&apos;s the limit!
          </h2>
          <p className="text-zinc-400 max-w-[600px] mx-auto text-xl mb-10">
            Get started with the SSI in minutes. Open Source and free to
            use.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AppLink className="w-full sm:w-auto" />
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
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Terminal } from "lucide-react";
import { TypewriterHero } from "./TypewriterHero";
import { RotatingHeroText } from "./RotatingHeroText";
import { InteractiveDescription } from "./InteractiveDescription";
import { AppLink } from "@/components/ui/AppLink";

export function HeroSection() {
  return (
    <section className="w-full pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 bg-gradient-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Badge */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium border-transparent bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
              <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              v1.0.0 Now Available
            </div>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up [animation-delay:100ms] text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl text-black dark:text-white">
            Monitor with <br />
            <RotatingHeroText />
          </h1>

          {/* Description */}
          <div className="animate-fade-up [animation-delay:200ms]">
            <InteractiveDescription text="The Service Status Indicator (SSI) is a complete, open-source, script-driven ecosystem for monitoring everything you want in real-time." />
          </div>

          {/* CTA Buttons */}
          <div className="animate-fade-up [animation-delay:300ms] flex flex-col sm:flex-row gap-4 w-full justify-center">
            <AppLink className="w-full sm:w-auto" />
            <Link href="https://github.com/RemiZlatinis/ssi" target="_blank">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 w-full sm:w-auto"
              >
                <Terminal className="h-4 w-4" /> View on GitHub
              </Button>
            </Link>
          </div>

          {/* Typewriter Terminal */}
          <div className="w-full max-w-3xl mx-auto mt-8 animate-fade-up [animation-delay:300ms]">
            <TypewriterHero />
          </div>
        </div>
      </div>
    </section>
  );
}

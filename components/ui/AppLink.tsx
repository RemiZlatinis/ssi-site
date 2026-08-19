import Link from "next/link";
import { cn } from "@/components/ui/Button";
import { APP_URL } from "@/config/app";

interface AppLinkProps {
  size?: "sm" | "lg";
  className?: string;
}

export function AppLink({ size = "lg", className }: AppLinkProps) {
  return (
    <Link
      href={APP_URL}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group inline-flex shrink-0 whitespace-nowrap items-center justify-center rounded-full bg-white text-zinc-900 border border-zinc-300 shadow-sm dark:bg-white/10 dark:text-white dark:border-white/20 dark:backdrop-blur-sm shadow-zinc-900/5 hover:border-zinc-400 hover:shadow-md hover:scale-[1.02] dark:hover:border-white/40 dark:shadow-indigo-500/10 dark:hover:shadow-indigo-500/25 transition-all duration-300",
        size === "sm" ? "h-9 px-4 text-sm" : "h-11 px-8 text-base",
        className,
      )}
    >
      Open App
    </Link>
  );
}
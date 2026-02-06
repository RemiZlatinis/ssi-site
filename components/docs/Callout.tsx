import { clsx } from "clsx";
import {
  Info,
  AlertTriangle,
  Lightbulb,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface CalloutProps {
  type?: "note" | "warning" | "tip" | "caution" | "important";
  title?: string;
  children: React.ReactNode;
}

const calloutStyles = {
  note: {
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    icon: "text-blue-500",
    Icon: Info,
  },
  warning: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    icon: "text-amber-500",
    Icon: AlertTriangle,
  },
  tip: {
    border: "border-green-500/30",
    bg: "bg-green-500/10",
    icon: "text-green-500",
    Icon: Lightbulb,
  },
  caution: {
    border: "border-red-500/30",
    bg: "bg-red-500/10",
    icon: "text-red-500",
    Icon: AlertCircle,
  },
  important: {
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",
    icon: "text-purple-500",
    Icon: CheckCircle,
  },
};

const defaultTitles = {
  note: "Note",
  warning: "Warning",
  tip: "Tip",
  caution: "Caution",
  important: "Important",
};

export function Callout({ type = "note", title, children }: CalloutProps) {
  const styles = calloutStyles[type];
  const Icon = styles.Icon;

  return (
    <div
      className={clsx(
        "my-6 rounded-lg border-l-4 p-4",
        styles.border,
        styles.bg
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={clsx("h-5 w-5 mt-0.5 flex-shrink-0", styles.icon)} />
        <div className="flex-1">
          <p
            className={clsx(
              "font-semibold mb-2",
              styles.icon
            )}
          >
            {title || defaultTitles[type]}
          </p>
          <div className="text-zinc-700 dark:text-zinc-300 prose-p:my-0 prose-p:leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

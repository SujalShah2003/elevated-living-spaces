import { cn } from "@/lib/utils";

export default function StatusBadge({ status }: { status: "Available" | "Few Left" | "Waitlist" }) {
  const styles: Record<string, string> = {
    Available: "bg-accent/95 text-accent-foreground",
    "Few Left": "bg-amber-500/95 text-white",
    Waitlist:  "bg-charcoal/90 text-primary-foreground",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium", styles[status])}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

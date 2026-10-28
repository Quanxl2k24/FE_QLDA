import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "lime" | "forest" | "sand" | "sage";
}

export function Badge({
  className,
  variant = "lime",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    // Online Only / Action Highlight badge: #e6ff55 bg, #0e150e text, 20px radius
    lime: "bg-[#e6ff55] text-[#0e150e]",
    forest: "bg-[#00473c] text-[#f4f3e7]",
    sand: "bg-[#e8dcc6] text-[#0e150e]",
    sage: "bg-[#d8e5d6] text-[#00473c]",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-[20px] px-3 py-1 text-[12px] font-bold uppercase tracking-[0.05em]",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-[8px] border border-[#8c8c82] bg-white px-4 py-2 text-[16px] text-[#0e150e] placeholder:text-[#8c8c82] transition-colors focus:border-[#00473c] focus:outline-none focus:ring-1 focus:ring-[#00473c] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

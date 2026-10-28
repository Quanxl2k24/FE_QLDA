import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost-link" | "forest";
  size?: "sm" | "md" | "lg";
  arrow?: boolean;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      arrow = false,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bold tracking-[0.017em] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const variantStyles = {
      primary:
        "bg-[#e6ff55] text-[#0e150e] hover:bg-[#d8f244] active:scale-[0.98] shadow-sm rounded-full",
      outline:
        "border-2 border-[#00473c] text-[#00473c] bg-transparent hover:bg-[#00473c]/5 active:scale-[0.98] rounded-full",
      forest:
        "bg-[#00473c] text-[#f4f3e7] hover:bg-[#00382f] active:scale-[0.98] rounded-full",
      "ghost-link":
        "bg-transparent border-0 text-[#0e150e] hover:underline p-0 h-auto rounded-none tracking-normal font-bold",
    };

    const sizeStyles = {
      sm: variant === "ghost-link" ? "text-[14px]" : "text-[14px] px-4 py-2",
      md: variant === "ghost-link" ? "text-[16px]" : "text-[16px] px-6 py-3.5",
      lg: variant === "ghost-link" ? "text-[18px]" : "text-[18px] px-8 py-4",
    };

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
        className: cn(combinedClassName, (children as React.ReactElement<{ className?: string }>).props.className),
        ...props,
      });
    }

    return (
      <button
        ref={ref}
        className={combinedClassName}
        {...props}
      >
        <span>{children}</span>
        {(arrow || variant === "ghost-link") && (
          <span className="ml-1.5 inline-block transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

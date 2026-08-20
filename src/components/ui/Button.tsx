import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "glow-pill";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "outline", children, ...props }, ref) => {
    if (variant === "glow-pill") {
      return (
        <button
          ref={ref}
          type="button"
          className={cn(
            "group relative flex h-[50px] w-[210px] flex-col items-center justify-center",
            "cursor-pointer outline-none transition-transform active:scale-95",
            "rounded-lg bg-[rgba(255,255,255,0.05)]",
            "disabled:pointer-events-none disabled:opacity-50",
            className
          )}
          {...props}
        >
          {/* Default Glow */}
          <div
            className="
              pointer-events-none absolute inset-0 rounded-lg
              opacity-100 blur-[15px]
              transition-opacity duration-[1200ms] ease-in-out
              group-hover:opacity-0
            "
            style={{
              background:
                "radial-gradient(15% 50% at 50% 100%, rgb(0,255,0) 0%, rgba(0,255,0,0) 100%)",
            }}
          />

          {/* Hover Glow */}
          <div
            className="
              pointer-events-none absolute inset-0 rounded-lg
              opacity-0 blur-[18px]
              transition-opacity duration-[1200ms] ease-in-out
              group-hover:opacity-100
            "
            style={{
              background:
                "radial-gradient(60.6% 50% at 50% 100%, rgb(0,255,0) 0%, rgba(0,255,0,0) 100%)",
            }}
          />

          {/* Default Stroke */}
          <div
            className="
              pointer-events-none absolute inset-0 rounded-lg
              opacity-100
              transition-opacity duration-[1200ms] ease-in-out
              group-hover:opacity-0
            "
            style={{
              background:
                "radial-gradient(10.7% 50% at 50% 100%, rgb(0,255,0) 0%, rgba(0,255,0,0) 100%)",
            }}
          />

          {/* Hover Stroke */}
          <div
            className="
              pointer-events-none absolute inset-0 rounded-lg
              opacity-0
              transition-opacity duration-[1200ms] ease-in-out
              group-hover:opacity-100
            "
            style={{
              background:
                "radial-gradient(60.1% 50% at 50% 100%, rgb(0,255,0) 0%, rgba(0,255,0,0) 100%)",
            }}
          />

          {/* Black inner fill */}
          <div
            className="
              pointer-events-none absolute inset-[1px]
              z-10 rounded-[7px] bg-black
            "
          />

          {/* Content */}
          <div className="relative z-20 flex flex-col items-center justify-center">
            <p
              className="
                m-0 p-0 font-pixel text-sm sm:text-base md:text-xl font-medium
                tracking-wide text-green-neon
              "
              style={{
                WebkitFontSmoothing: "antialiased",
                textShadow: "0 1px 2px rgba(0,0,0,0.5)",
              }}
            >
              {children}
            </p>
          </div>
        </button>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium font-pixel text-sm sm:text-base md:text-lg ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "border border-b-[1px] border-t-[2px] border-l-[1px] border-r-[2px] border-[#11D6FC] bg-black px-5 py-1.5 sm:px-6 sm:py-2 md:px-8 uppercase tracking-wide":
              variant === "outline",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
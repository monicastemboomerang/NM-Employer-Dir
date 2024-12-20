import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "focus-visible:ring-0 border border-input text-primary bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        "outline-primary":
          "transition-colors  border border-primary text-primary bg-transparent shadow-sm hover:bg-primary hover:text-primary-foreground hover:border-primary",
        "outline-secondary":
          "transition-colors  border border-secondary text-secondary bg-transparent shadow-sm hover:bg-secondary hover:text-secondary-foreground hover:border-secondary",
        // "focus-visible:ring-0 border border-input border-inherit bg-transparent shadow-sm hover:bg-foreground hover:text-background",
        tertiary:
          "bg-tertiary text-tertiary-foreground shadow-sm hover:bg-tertiary-hover",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        accent: "bg-accent text-accent-foreground shadow-sm hover:bg-accent/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        "icon-sm": "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
  target?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    let Comp = asChild ? Slot : "button";
    if (props.href) {
      Comp = "a";
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

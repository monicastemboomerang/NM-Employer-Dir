import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/utils";

const textVariants = cva("max-w-prose", {
  variants: {
    variant: {
      default: "leading-7 [&:not(:first-child)]:mt-6",
      muted: "text-muted-foreground",
      bold: "font-semibold",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      lead: "text-xl text-muted-foreground",
    },
    size: {
      default: "",
      sm: "text-sm",
      lg: "text-lg",
      xl: "text-xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

export function Text({ className, size, variant, ...props }: TextProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Complexities of TS
  let Comp: any = "p"; // `h${variant}` as any;

  if (variant === "blockquote") {
    Comp = "blockquote";
  }
  if (variant === "code") {
    Comp = "code";
  }
  return (
    <Comp
      className={cn(textVariants({ size, variant, className }))}
      {...props}
    />
  );
}

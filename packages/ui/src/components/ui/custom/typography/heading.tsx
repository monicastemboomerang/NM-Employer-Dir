import { cn } from "@/utils";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import * as React from "react";

const headingVariants = cva(
  "scroll-m-20 font-light tracking-widest uppercase",
  {
    variants: {
      level: {
        1: "text-4xl   lg:text-5xl",
        2: "border-b pb-2 text-3xl   first:mt-0",
        3: "text-2xl  ",
        4: "text-xl  ",
      },
      colorVariant: {
        default: "",
        cool: "bg-cool text-transparent !bg-clip-text !bg-cover !bg-center pb-1",
      },
    },
    defaultVariants: {
      level: 1,
      colorVariant: "default",
    },
  }
);

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  // level: 1 | 2 | 3 | 4;
}

export function Heading({
  className,
  level = 1,
  colorVariant,
  ...props
}: HeadingProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Complexities of TS
  const Comp = `h${level}` as any;

  return (
    <Comp
      className={cn(headingVariants({ level, colorVariant, className }))}
      {...props}
    />
  );
}

import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { forwardRef } from "react";
import { cn } from "../../utils";

const containerVariants = cva("container mx-auto", {
  variants: {
    bg: {
      default: "",
      header: "bg-header",
      accent: "bg-accent text-accent-foreground",
    },
    image: {
      default: "",
      "light-1": "image-section section-light-1",
      "dark-1": "image-section section-dark-1",
    },
  },
  defaultVariants: {
    bg: "default",
    image: "default",
  },
});

interface BaseContainerProps
  extends VariantProps<typeof containerVariants>,
    Pick<React.HTMLAttributes<HTMLDivElement>, "className"> {
  class?: string;
}

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BaseContainerProps {
  asChild?: boolean;
}

function ScrollContainer({
  className,
  bg,
  image,

  ...props
}: BaseContainerProps) {
  const bgOffset = useMotionValue(0);
  const { scrollY } = useScroll({
    // target: containerRef,
    offset: ["start end", "end center"],
  });
  const scaleY = useSpring(scrollY, {
    // stiffness: 200,
    damping: 40,
  });
  useMotionValueEvent(scaleY, "change", (latest) => {
    bgOffset.set(latest / 5);
  });

  return (
    <motion.div
      className={cn(containerVariants({ bg, image, className }))}
      style={{
        backgroundPositionY: bgOffset,
      }}
      {...props}
    />
  );
}

ScrollContainer.displayName = "ScrollContainer";

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    { className, bg, image, class: rawClass, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";
    if (image) {
      return (
        <ScrollContainer
          bg={bg}
          className={className || rawClass}
          image={image}
          {...props}
        />
      );
    }
    return (
      <Comp
        className={cn(
          containerVariants({ bg, image, className: className || rawClass })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";

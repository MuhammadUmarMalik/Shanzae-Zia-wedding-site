/**
 * Violet Aperture design reminder: a selected photograph steps forward while surrounding
 * frames soften, echoing the focused, high-contrast portfolio interactions of the reference.
 */
import { Children, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type FocusCardsProps = {
  children: ReactNode;
  className?: string;
};

export function FocusCards({ children, className }: FocusCardsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={cn(className)} onMouseLeave={() => setHovered(null)}>
      {Children.map(children, (child, index) => (
        <div
          className={cn(
            "break-inside-avoid transition-[opacity,filter,transform] duration-400",
            hovered !== null && hovered !== index && "opacity-35 blur-[2px] saturate-50",
            hovered === index && "relative z-10 scale-[1.012]",
          )}
          onMouseEnter={() => setHovered(index)}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

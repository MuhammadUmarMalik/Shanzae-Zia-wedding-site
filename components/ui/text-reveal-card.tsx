/**
 * Darkroom Ledger design reminder: reveal only one pull quote at a time, as if a
 * line of ink is appearing on a newly developed print.
 */
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type TextRevealCardProps = {
  children: string;
  className?: string;
};

export function TextRevealCard({ children, className }: TextRevealCardProps) {
  const reduceMotion = useReducedMotion();
  const words = children.split(" ");

  return (
    <blockquote className={cn("border-l-2 border-foreground/25 pl-4", className)}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={reduceMotion ? false : { opacity: 0.25, y: 4 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.35, delay: index * 0.035, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mr-[0.28em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </blockquote>
  );
}

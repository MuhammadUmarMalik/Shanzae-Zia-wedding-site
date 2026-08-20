/**
 * Darkroom Ledger design reminder: the cursor is an optional, quiet print-room cue;
 * it never appears on touch input and it never replaces native focus indicators.
 */
import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const move = (event: MouseEvent) => {
      positionRef.current = { x: event.clientX, y: event.clientY };
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(() => {
        const cursor = cursorRef.current;
        const { x, y } = positionRef.current;
        if (cursor) cursor.style.transform = `translate3d(${x - 18}px, ${y - 18}px, 0)`;
        frameRef.current = null;
      });
    };
    const update = () => {
      setEnabled(query.matches);
      if (query.matches) window.addEventListener("mousemove", move, { passive: true });
      else window.removeEventListener("mousemove", move);
    };

    update();
    query.addEventListener("change", update);
    return () => {
      query.removeEventListener("change", update);
      window.removeEventListener("mousemove", move);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-9 w-9 rounded-full border border-foreground/80 bg-foreground mix-blend-difference transition-transform duration-75 lg:block"
    />
  );
}

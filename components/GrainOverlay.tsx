/**
 * Darkroom Ledger design reminder: a fixed, subtle grain makes the navy field feel
 * like photographic paper without affecting readability or interaction.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="grain-overlay pointer-events-none fixed inset-0 z-[60] select-none"
    />
  );
}

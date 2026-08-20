/* Violet Aperture design system: an austere editorial recovery view, using a decisive violet action and photographic black-white contrast. */
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <section className="max-w-md border-l border-primary/70 pl-7 sm:pl-10">
        <p className="mb-4 text-[0.67rem] font-bold uppercase tracking-[0.19em] text-primary">
          Lost in the archive
        </p>
        <h1 className="font-display text-6xl font-medium leading-[0.88] tracking-[-0.045em] sm:text-8xl">
          404
        </h1>
        <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground sm:text-base">
          This frame is no longer in the collection. Return to the portfolio to continue exploring the work.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center border-b border-primary pb-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
        >
          Return to the portfolio
        </Link>
      </section>
    </main>
  );
}

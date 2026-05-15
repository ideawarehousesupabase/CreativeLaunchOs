import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const nav = [
  { to: "/platform", label: "Platform" },
  { to: "/ai-front-desk", label: "AI Front Desk" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-primary via-neon to-cyan glow-violet">
            <Sparkles className="absolute inset-0 m-auto h-4 w-4 text-background" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight">
            Creative Launch <span className="text-gradient">OS</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-surface/50"
              activeProps={{ className: "px-4 py-2 text-sm text-foreground rounded-lg bg-surface/60" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/waitlist"
            className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-violet to-neon px-5 py-2.5 text-sm font-semibold text-primary-foreground glow-violet transition-transform hover:scale-105"
          >
            Join Waitlist
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden rounded-lg p-2 text-foreground hover:bg-surface"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border/50 px-6 py-4 space-y-1 animate-fade-up">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-surface/50 rounded-lg"
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/waitlist"
            onClick={() => setOpen(false)}
            className="block text-center rounded-full bg-gradient-to-r from-primary via-violet to-neon px-5 py-3 text-sm font-semibold text-primary-foreground mt-2"
          >
            Join Waitlist
          </Link>
        </div>
      )}
    </header>
  );
}

import { Link } from "@tanstack/react-router";
import { Sparkles, Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border mt-32 bg-surface/50">
      <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary via-neon to-cyan grid place-items-center shadow-md">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold text-foreground">
                Creative Launch
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              The AI-powered business platform for creators. Turn your craft into a scalable studio.
            </p>
            <div className="mt-6 flex gap-3">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="grid place-items-center h-9 w-9 rounded-lg bg-white border border-border hover:border-primary/40 hover:text-primary transition-colors shadow-sm">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold mb-4 text-foreground">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/platform" className="hover:text-foreground transition-colors">Platform</Link></li>
              <li><Link to="/ai-front-desk" className="hover:text-foreground transition-colors">AI Front Desk</Link></li>
              <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
              <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/waitlist" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Creative Launch. Built for creators.</p>
          <p className="font-mono">v0.1.0 · preview</p>
        </div>
      </div>
    </footer>
  );
}

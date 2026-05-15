import { Link } from "@tanstack/react-router";
import { Sparkles, Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 mt-32">
      <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary via-neon to-cyan grid place-items-center glow-violet">
                <Sparkles className="h-4 w-4 text-background" />
              </div>
              <span className="font-display text-lg font-bold">
                Creative Launch <span className="text-gradient">OS</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              The AI-powered business operating system for creators. Turn your craft into a scalable studio.
            </p>
            <div className="mt-6 flex gap-3">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="grid place-items-center h-9 w-9 rounded-lg glass hover:text-primary transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/platform" className="hover:text-foreground">Platform</Link></li>
              <li><Link to="/ai-front-desk" className="hover:text-foreground">AI Front Desk</Link></li>
              <li><Link to="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
              <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/waitlist" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Creative Launch OS. Built for creators.</p>
          <p className="font-mono">v0.1.0 · preview</p>
        </div>
      </div>
    </footer>
  );
}

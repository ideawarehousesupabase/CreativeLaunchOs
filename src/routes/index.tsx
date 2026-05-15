import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import {
  ArrowRight, Sparkles, Bot, LayoutDashboard, Brain, Calendar, Users, BarChart3,
  Palette, Camera, Music, Pen, Zap, Star, Check, ChevronDown
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Creative Launch — The AI-Powered Business Platform for Creators" },
      { name: "description", content: "Turn your creative talent into a scalable studio. AI front desk, smart booking, portfolio intelligence, and analytics — built for tattoo artists, photographers, illustrators, musicians, and freelancers." },
      { property: "og:title", content: "Creative Launch — The AI-Powered Business Platform for Creators" },
      { property: "og:description", content: "AI-powered business platform that runs the admin so creators can create." },
    ],
  }),
  component: Landing,
});

const creators = [
  { icon: Pen, label: "Tattoo Artists" },
  { icon: Camera, label: "Photographers" },
  { icon: Palette, label: "Illustrators" },
  { icon: Music, label: "Musicians" },
  { icon: Sparkles, label: "Choreographers" },
  { icon: Zap, label: "Freelancers" },
];

const modules = [
  { icon: Bot, title: "AI Front Desk", desc: "A 24/7 assistant that qualifies leads, answers FAQs, and books clients in your voice.", to: "/ai-front-desk" },
  { icon: LayoutDashboard, title: "Creator Dashboard", desc: "Earnings, projects, leads and bookings — one premium command center.", to: "/dashboard" },
  { icon: Brain, title: "Portfolio Intelligence", desc: "AI analyzes your work, finds your style, prices it, and matches ideal clients.", to: "/portfolio-intelligence" },
  { icon: Calendar, title: "Smart Booking", desc: "Availability, packages, deposits and confirmations on autopilot.", to: "/booking" },
  { icon: Users, title: "Team Workspace", desc: "Run your micro-studio with kanban, milestones and collaborative reviews.", to: "/team" },
  { icon: BarChart3, title: "Growth Analytics", desc: "Revenue, retention, and conversion metrics that actually move the needle.", to: "/analytics" },
] as const;

const problems = [
  { stat: "70%", label: "of creators spend more time on admin than craft" },
  { stat: "€0", label: "leads lost daily to slow inquiry replies" },
  { stat: "3x", label: "longer to scale without business systems" },
];

const faqs = [
  { q: "Who is Creative Launch for?", a: "Independent creators and micro-studios — tattoo artists, photographers, illustrators, musicians, choreographers, designers and freelance creatives who want to scale without losing their craft." },
  { q: "Do I need any technical skills?", a: "No. Everything is designed to feel like Linear or Framer — fast, beautiful, intuitive. The AI handles the heavy lifting." },
  { q: "Is this a real product I can use today?", a: "We're building in public. Join the waitlist to get early access and shape the roadmap with us." },
  { q: "What's pricing going to look like?", a: "Three tiers: Starter, Pro and Studio. Honest, creator-friendly pricing — see the Pricing page." },
];

function Landing() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="absolute inset-0 bg-mesh pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-border shadow-sm px-4 py-1.5 text-xs font-medium text-muted-foreground animate-fade-up">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Now in private alpha — join the waitlist
          </div>

          <h1 className="mt-8 font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight animate-fade-up text-foreground">
            Run your creative <br className="hidden md:block" />
            business like a <span className="text-gradient">studio</span>.
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground animate-fade-up">
            Creative Launch is your AI-powered creative business co-pilot that handles bookings,
            leads, projects and analytics — so creators spend their time creating, not chasing.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up">
            <Link
              to="/waitlist"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-violet to-neon px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
              Join the waitlist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/platform"
              className="inline-flex items-center gap-2 rounded-full bg-white border border-border shadow-sm px-7 py-3.5 text-sm font-semibold text-foreground hover:border-primary/40 hover:shadow-md transition-all"
            >
              Explore the platform
            </Link>
          </div>

          {/* Floating dashboard preview */}
          <div className="relative mt-20 animate-fade-up">
            <div className="absolute -inset-x-20 -inset-y-10 bg-gradient-glow blur-3xl opacity-40 pointer-events-none" />
            <div className="relative mx-auto max-w-5xl rounded-2xl bg-white border border-border shadow-xl overflow-hidden">
              <div className="flex items-center gap-2 border-b border-border px-4 py-3 bg-surface/50">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-400/70" />
                  <span className="h-3 w-3 rounded-full bg-amber-400/70" />
                  <span className="h-3 w-3 rounded-full bg-green-400/70" />
                </div>
                <div className="ml-4 flex-1 text-xs font-mono text-muted-foreground">app.creativelaunch.co/dashboard</div>
              </div>
              <div className="grid grid-cols-12 gap-4 p-6 text-left">
                <div className="col-span-12 md:col-span-3 space-y-3">
                  {["Overview", "Leads", "Bookings", "Projects", "Analytics"].map((l, i) => (
                    <div key={l} className={`px-3 py-2 rounded-lg text-sm ${i === 0 ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground"}`}>{l}</div>
                  ))}
                </div>
                <div className="col-span-12 md:col-span-9 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { l: "Revenue", v: "€24.8k", c: "+18%" },
                      { l: "Bookings", v: "37", c: "+12%" },
                      { l: "Leads", v: "142", c: "+24%" },
                    ].map((s) => (
                      <div key={s.l} className="rounded-xl bg-surface border border-border p-4">
                        <div className="text-xs text-muted-foreground">{s.l}</div>
                        <div className="mt-1 font-display text-xl font-bold text-foreground">{s.v}</div>
                        <div className="text-xs text-primary font-medium">{s.c}</div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl bg-surface border border-border p-4 h-40 relative overflow-hidden">
                    <div className="text-xs text-muted-foreground mb-2">Revenue this month</div>
                    <svg viewBox="0 0 400 100" className="w-full h-24">
                      <defs>
                        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="oklch(0.55 0.28 285)" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="oklch(0.55 0.28 285)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,80 C50,60 100,70 150,40 C200,10 250,30 300,20 C350,10 380,5 400,15 L400,100 L0,100 Z" fill="url(#g1)" />
                      <path d="M0,80 C50,60 100,70 150,40 C200,10 250,30 300,20 C350,10 380,5 400,15" stroke="oklch(0.55 0.28 285)" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CREATORS */}
      <section className="relative mx-auto max-w-7xl px-6 py-20">
        <p className="text-center text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Built for every kind of creator
        </p>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {creators.map((c) => (
            <div key={c.label} className="group rounded-2xl bg-white border border-border p-6 text-center hover:border-primary/40 hover:shadow-md transition-all hover:-translate-y-1">
              <c.icon className="h-6 w-6 mx-auto text-primary group-hover:text-violet transition-colors" />
              <div className="mt-3 text-sm font-medium text-foreground">{c.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-primary">The problem</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-foreground">
            Creating is the easy part. <span className="text-muted-foreground">Running the business breaks creators.</span>
          </h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {problems.map((p) => (
            <div key={p.label} className="rounded-2xl bg-white border border-border p-8 shadow-sm">
              <div className="font-display text-5xl font-bold text-gradient">{p.stat}</div>
              <p className="mt-3 text-muted-foreground">{p.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MODULES / PRODUCT */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-primary">The product</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-foreground">One platform. Every creative workflow.</h2>
          <p className="mt-4 text-muted-foreground">
            Modular, AI-native and beautifully designed. Use what you need, ignore the rest.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m) => (
            <Link
              key={m.title}
              to={m.to}
              className="group relative rounded-2xl bg-white border border-border p-7 hover:border-primary/40 hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="inline-grid place-items-center h-11 w-11 rounded-xl bg-gradient-to-br from-primary/10 to-neon/10 border border-primary/15">
                  <m.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-foreground">{m.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                <div className="mt-5 inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOUNDER PREVIEW */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-3xl bg-gradient-to-br from-white via-surface to-white border border-border shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative aspect-square md:aspect-auto overflow-hidden">
              <img
                src="/founder.png"
                alt="Founder of Creative Launch"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <span className="text-xs font-mono uppercase tracking-widest text-primary">Meet the founder</span>
              <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Built for creators, by someone who understands the chaos.
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Creative Launch exists because talented creators should spend time creating — not managing admin, chasing clients, or juggling scattered tools.
              </p>
              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-2"><span className="text-primary">→</span> A platform born from the real pain of running a creative business</div>
                <div className="flex gap-2"><span className="text-primary">→</span> AI as your quiet assistant, never your replacement</div>
                <div className="flex gap-2"><span className="text-primary">→</span> Helping solo creators scale into studios</div>
              </div>
              <Link
                to="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
              >
                Read the full story <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Lina K.", role: "Tattoo artist · Berlin", quote: "It feels like having a manager, agent and assistant — all running quietly in the background." },
            { name: "Marco D.", role: "Photographer · Milan", quote: "I booked 14 sessions in my first month using the AI front desk. I haven't replied to a DM since." },
            { name: "Studio Rua", role: "Micro-agency · Lisbon", quote: "Finally a tool that doesn't feel like Salesforce. It actually understands creative work." },
          ].map((t) => (
            <div key={t.name} className="rounded-2xl bg-white border border-border p-7 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground">"{t.quote}"</p>
              <div className="mt-5 text-xs text-muted-foreground">
                <div className="font-medium text-foreground">{t.name}</div>
                {t.role}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative mx-auto max-w-3xl px-6 py-24">
        <div className="text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-primary">FAQ</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-foreground">Questions, answered.</h2>
        </div>
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => <FaqItem key={i} {...f} />)}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 via-violet/5 to-neon/5 border border-primary/15 p-12 md:p-20 text-center shadow-lg">
          <div className="absolute inset-0 bg-mesh opacity-60 pointer-events-none" />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground">
              Your craft deserves <span className="text-gradient">infrastructure</span>.
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-muted-foreground">
              Be among the first creators to run their studio on Creative Launch.
            </p>
            <Link
              to="/waitlist"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-violet to-neon px-8 py-4 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Join the waitlist <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl bg-white border border-border shadow-sm overflow-hidden">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="font-medium text-foreground">{q}</span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-6 pb-5 text-sm text-muted-foreground animate-fade-up">{a}</div>}
    </div>
  );
}

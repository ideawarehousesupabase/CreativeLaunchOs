import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero } from "@/components/site/PageHero";
import { Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Creative Launch OS" },
      { name: "description", content: "Honest, creator-friendly pricing. Starter, Pro and Studio plans for solo creators and micro-agencies." },
    ],
  }),
  component: Pricing,
});

const plans = [
  { name: "Starter", price: "€0", tag: "For exploring", features: ["AI front desk (limited)", "Basic dashboard", "1 calendar", "Up to 20 leads / mo"], cta: "Join waitlist", featured: false },
  { name: "Pro", price: "€29", tag: "For serious solo creators", features: ["Unlimited AI conversations", "Portfolio intelligence", "Smart booking + deposits", "Unlimited projects", "Growth analytics"], cta: "Get early access", featured: true },
  { name: "Studio", price: "€79", tag: "For micro-studios & teams", features: ["Everything in Pro", "Team workspace", "Shared kanban + reviews", "Custom branding", "Priority support"], cta: "Talk to us", featured: false },
];

function Pricing() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Pricing"
        title={<>Creator-friendly. <span className="text-gradient">No nonsense.</span></>}
        subtitle="Pricing that scales with your studio. Start free, upgrade when it pays for itself."
      />

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((p) => (
            <div key={p.name} className={`relative rounded-3xl p-8 ${p.featured ? "bg-gradient-to-br from-primary/30 via-violet/20 to-neon/10 border border-primary/40 glow-violet" : "glass"}`}>
              {p.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-cyan px-3 py-1 text-[10px] font-mono uppercase tracking-widest">Most loved</div>}
              <div className="text-xs font-mono uppercase tracking-widest text-cyan">{p.name}</div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold">{p.price}</span>
                <span className="text-sm text-muted-foreground">/ mo</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.tag}</p>

              <ul className="mt-8 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-cyan shrink-0 mt-0.5" />{f}</li>
                ))}
              </ul>

              <Link to="/waitlist" className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${p.featured ? "bg-gradient-to-r from-primary via-violet to-neon" : "glass hover:bg-surface"}`}>
                {p.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}

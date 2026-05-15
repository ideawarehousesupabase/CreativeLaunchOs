import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero } from "@/components/site/PageHero";
import { TrendingUp, Repeat, Users, Target } from "lucide-react";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Growth Analytics — Creative Launch OS" },
      { name: "description", content: "Revenue, retention and conversion analytics built for creative businesses." },
    ],
  }),
  component: Analytics,
});

const kpis = [
  { icon: TrendingUp, label: "MRR growth", value: "+24%" },
  { icon: Repeat, label: "Repeat clients", value: "61%" },
  { icon: Users, label: "Lead-to-book", value: "31%" },
  { icon: Target, label: "Avg deal size", value: "€840" },
];

const bars = [40, 65, 50, 80, 72, 95, 60, 88, 70, 92, 80, 110];

function Analytics() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Growth Analytics"
        title={<>The numbers that <span className="text-gradient">move the needle</span>.</>}
        subtitle="No vanity metrics. Just the insights that help your studio compound."
      />
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-3xl glass shadow-elevated p-8 space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((k) => (
              <div key={k.label} className="rounded-2xl bg-surface/60 border border-border/50 p-5">
                <k.icon className="h-4 w-4 text-cyan" />
                <div className="mt-3 text-xs text-muted-foreground">{k.label}</div>
                <div className="mt-1 font-display text-3xl font-bold text-gradient">{k.value}</div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl bg-surface/60 border border-border/50 p-6">
            <div className="text-sm font-medium mb-4">Bookings · last 12 months</div>
            <div className="flex items-end gap-2 h-48">
              {bars.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-md bg-gradient-to-t from-primary/40 to-cyan/80" style={{ height: `${h}%` }} />
                  <span className="text-[10px] text-muted-foreground font-mono">{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-surface/60 border border-border/50 p-6">
              <div className="text-sm font-medium mb-3">Top revenue streams</div>
              {[
                { l: "Editorial sessions", v: 42 },
                { l: "Brand campaigns", v: 28 },
                { l: "Personal commissions", v: 18 },
                { l: "Workshops", v: 12 },
              ].map((s) => (
                <div key={s.l} className="mb-3 last:mb-0">
                  <div className="flex justify-between text-xs"><span>{s.l}</span><span className="text-muted-foreground">{s.v}%</span></div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-background overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-cyan" style={{ width: `${s.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-surface/60 border border-border/50 p-6">
              <div className="text-sm font-medium mb-3">Client satisfaction</div>
              <div className="font-display text-6xl font-bold text-gradient">4.92<span className="text-2xl text-muted-foreground">/5</span></div>
              <p className="mt-2 text-sm text-muted-foreground">Across 184 reviews this quarter — driven by faster reply times and clearer briefs.</p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

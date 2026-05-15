import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero } from "@/components/site/PageHero";
import { TrendingUp, Calendar, Users, DollarSign, CheckCircle2, Clock } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Creator Dashboard — Creative Launch OS" },
      { name: "description", content: "An interactive preview of the creator dashboard: revenue, bookings, leads, projects and growth at a glance." },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { icon: DollarSign, label: "Earnings (MTD)", value: "€24,820", delta: "+18.2%" },
  { icon: Calendar, label: "Bookings", value: "37", delta: "+12 this week" },
  { icon: Users, label: "Active leads", value: "142", delta: "+24 today" },
  { icon: TrendingUp, label: "Conversion", value: "31%", delta: "+4 pts" },
];

const projects = [
  { name: "Sleeve · Lina K.", stage: "In progress", due: "Fri", progress: 65 },
  { name: "Editorial shoot · Vogue ES", stage: "Review", due: "Mon", progress: 90 },
  { name: "Album cover · Nova", stage: "Concept", due: "Next week", progress: 25 },
];

function Dashboard() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Creator Dashboard"
        title={<>Your studio, <span className="text-gradient">at a glance</span>.</>}
        subtitle="Every number that matters — revenue, leads, bookings, projects — rendered in a beautifully calm interface."
      />

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-3xl glass shadow-elevated p-6 md:p-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-surface/60 border border-border/50 p-5">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                  <s.icon className="h-4 w-4 text-cyan" />
                </div>
                <div className="mt-2 font-display text-3xl font-bold">{s.value}</div>
                <div className="text-xs text-cyan mt-1">{s.delta}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 rounded-2xl bg-surface/60 border border-border/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm font-medium">Revenue · last 6 months</div>
                  <div className="text-xs text-muted-foreground">Includes deposits and final payments</div>
                </div>
                <div className="font-display text-2xl font-bold text-gradient">€132k</div>
              </div>
              <svg viewBox="0 0 600 180" className="w-full h-48">
                <defs>
                  <linearGradient id="dg" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.65 0.28 295)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="oklch(0.65 0.28 295)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,140 C80,120 130,100 200,80 C280,55 340,90 420,60 C490,35 540,45 600,25 L600,180 L0,180 Z" fill="url(#dg)" />
                <path d="M0,140 C80,120 130,100 200,80 C280,55 340,90 420,60 C490,35 540,45 600,25" stroke="oklch(0.7 0.25 255)" strokeWidth="2.5" fill="none" />
                {[0,1,2,3,4,5].map((i) => (
                  <text key={i} x={i*120 + 10} y={175} className="text-[10px]" fill="oklch(0.7 0.03 270)">
                    {["Jun","Jul","Aug","Sep","Oct","Nov"][i]}
                  </text>
                ))}
              </svg>
            </div>

            <div className="rounded-2xl bg-surface/60 border border-border/50 p-6">
              <div className="text-sm font-medium mb-4">Active projects</div>
              <div className="space-y-4">
                {projects.map((p) => (
                  <div key={p.name}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">{p.name}</span>
                      <span className="text-muted-foreground inline-flex items-center gap-1"><Clock className="h-3 w-3" />{p.due}</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-background overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-primary to-cyan" style={{ width: `${p.progress}%` }} />
                    </div>
                    <div className="mt-1 text-[10px] text-muted-foreground flex justify-between">
                      <span>{p.stage}</span><span>{p.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-surface/60 border border-border/50 p-6">
            <div className="text-sm font-medium mb-3">Today</div>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm">
              {[
                "Send invoice to Marco D.",
                "Confirm Friday 10:30 with Lina K.",
                "Review draft for Nova album cover",
                "Reply to 4 new inquiries (AI handled)",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2 rounded-xl bg-background/50 px-4 py-3">
                  <CheckCircle2 className="h-4 w-4 text-cyan shrink-0" />{t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

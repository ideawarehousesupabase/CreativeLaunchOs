import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero } from "@/components/site/PageHero";
import { Bot, LayoutDashboard, Brain, Calendar, Users, BarChart3, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      { title: "Platform — Creative Launch" },
      { name: "description", content: "Explore the full Creative Launch ecosystem: AI front desk, dashboard, portfolio intelligence, booking, projects and analytics." },
    ],
  }),
  component: Platform,
});

const modules = [
  { icon: Bot, title: "AI Front Desk", desc: "Conversational assistant that qualifies leads and books clients in your tone of voice.", to: "/ai-front-desk" },
  { icon: LayoutDashboard, title: "Creator Dashboard", desc: "Premium command center for revenue, projects and clients.", to: "/dashboard" },
  { icon: Brain, title: "Portfolio Intelligence", desc: "AI style graphing, pricing and ideal-client matching.", to: "/portfolio-intelligence" },
  { icon: Calendar, title: "Smart Booking", desc: "Availability, packages, deposits and confirmations on autopilot.", to: "/booking" },
  { icon: Users, title: "Team Workspace", desc: "Run your micro-studio with shared kanban and project workflows.", to: "/team" },
  { icon: BarChart3, title: "Growth Analytics", desc: "Revenue, retention and conversion intelligence.", to: "/analytics" },
] as const;

function Platform() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="The platform"
        title={<>One ecosystem. <span className="text-gradient">Every workflow.</span></>}
        subtitle="Six interconnected modules that make running a creative business feel as good as making the work."
      />

      <section className="relative mx-auto max-w-7xl px-6 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m) => (
            <Link key={m.title} to={m.to} className="group rounded-2xl bg-white border border-border p-7 hover:border-primary/40 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="inline-grid place-items-center h-11 w-11 rounded-xl bg-gradient-to-br from-primary/10 to-neon/10 border border-primary/15">
                <m.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-foreground">{m.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{m.desc}</p>
              <div className="mt-5 inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                Open demo <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero } from "@/components/site/PageHero";
import { Sparkles, Heart, Rocket, Users, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Creative Launch OS" },
      { name: "description", content: "We're building the operating system creators deserve. Our mission, vision and roadmap." },
    ],
  }),
  component: About,
});

const values = [
  { icon: Heart, title: "Creators first", desc: "Every decision starts with one question: does this give creators back time to make things?" },
  { icon: Sparkles, title: "AI as quiet co-pilot", desc: "We use AI to remove friction, not to replace the human spark behind the work." },
  { icon: Rocket, title: "Built to scale studios", desc: "From solo to micro-agency — the same OS grows with you." },
  { icon: Users, title: "In public, with creators", desc: "Our roadmap is shaped by the people who use it." },
];

const roadmap = [
  { q: "Q1", title: "Private alpha", desc: "AI front desk, dashboard and waitlist live with first 50 creators." },
  { q: "Q2", title: "Portfolio intelligence", desc: "Style graphing and ideal-client matching launch." },
  { q: "Q3", title: "Team workspace", desc: "Micro-studio collaboration, shared kanban and reviews." },
  { q: "Q4", title: "Public launch", desc: "Pricing tiers open. Industry-specific templates ship." },
];

function About() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Our mission"
        title={<>Infrastructure for the <span className="text-gradient">creative economy</span>.</>}
        subtitle="Creative Launch OS exists because the most talented people in the world shouldn't have to be operations managers to make a living."
      />

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-5">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl glass p-7">
              <div className="inline-grid place-items-center h-10 w-10 rounded-xl bg-gradient-to-br from-primary/30 to-cyan/20 border border-border/50">
                <v.icon className="h-5 w-5 text-cyan" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan">Roadmap</span>
          <h2 className="mt-3 font-display text-4xl font-bold">Where we're going.</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          {roadmap.map((r) => (
            <div key={r.q} className="rounded-2xl glass p-6">
              <div className="font-mono text-xs text-cyan">{r.q}</div>
              <div className="mt-2 font-display text-lg font-semibold">{r.title}</div>
              <p className="mt-2 text-xs text-muted-foreground">{r.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/waitlist" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-violet to-neon px-7 py-3.5 text-sm font-semibold glow-violet hover:scale-105 transition">
            Join the journey <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}

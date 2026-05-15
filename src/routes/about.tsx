import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero } from "@/components/site/PageHero";
import { Sparkles, Heart, Rocket, Users, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Creative Launch" },
      { name: "description", content: "We're building the platform creators deserve. Our mission, vision and roadmap." },
    ],
  }),
  component: About,
});

const values = [
  { icon: Heart, title: "Creators first", desc: "Every decision starts with one question: does this give creators back time to make things?" },
  { icon: Sparkles, title: "AI as quiet co-pilot", desc: "We use AI to remove friction, not to replace the human spark behind the work." },
  { icon: Rocket, title: "Built to scale studios", desc: "From solo to micro-agency — the same platform grows with you." },
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
        subtitle="Creative Launch exists because the most talented people in the world shouldn't have to be operations managers to make a living."
      />

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-5">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl bg-white border border-border p-7 shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-grid place-items-center h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-neon/10 border border-primary/15">
                <v.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-foreground">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="rounded-3xl bg-gradient-to-br from-white via-surface to-white border border-border shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-5 gap-0">
            <div className="md:col-span-2 relative overflow-hidden">
              <img
                src="/founder.png"
                alt="Founder of Creative Launch"
                className="w-full h-full object-cover object-center min-h-[400px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-white/10" />
            </div>
            <div className="md:col-span-3 flex flex-col justify-center p-8 md:p-12">
              <span className="text-xs font-mono uppercase tracking-widest text-primary">Meet the founder</span>
              <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Built for creators, by someone who understands the chaos.
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Creative Launch exists because talented creators should spend time creating — not managing admin, chasing clients, or juggling scattered tools.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                This platform was born from watching incredible artists struggle — not because their work wasn't extraordinary, but because running a creative business requires a completely different skill set. We're here to bridge that gap.
              </p>
              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-2"><span className="text-primary font-bold">→</span> A mission to empower every independent creator</div>
                <div className="flex gap-2"><span className="text-primary font-bold">→</span> AI as your quiet assistant, never your replacement</div>
                <div className="flex gap-2"><span className="text-primary font-bold">→</span> Helping solo creators scale into thriving studios</div>
                <div className="flex gap-2"><span className="text-primary font-bold">→</span> Building in public, shaped by real creators</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-primary">Roadmap</span>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground">Where we're going.</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          {roadmap.map((r) => (
            <div key={r.q} className="rounded-2xl bg-white border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="font-mono text-xs text-primary font-semibold">{r.q}</div>
              <div className="mt-2 font-display text-lg font-semibold text-foreground">{r.title}</div>
              <p className="mt-2 text-xs text-muted-foreground">{r.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/waitlist" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-violet to-neon px-7 py-3.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            Join the journey <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}

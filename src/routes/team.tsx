import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero } from "@/components/site/PageHero";
import { Users, MessageSquare, FileCheck } from "lucide-react";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team Workspace — Creative Launch OS" },
      { name: "description", content: "Run your micro-studio with shared kanban, milestones, reviews and team productivity dashboards." },
    ],
  }),
  component: Team,
});

const cols = [
  { name: "Backlog", tasks: ["Brand discovery — Nova","Mood board v2","Storyboard ep.4"] },
  { name: "In progress", tasks: ["Cover concepts","Color grade — Aurora","Edit selects"] },
  { name: "Review", tasks: ["Social cuts — Marco","Final masters"] },
  { name: "Done", tasks: ["Logo refresh","Press kit"] },
];

const team = [
  { name: "Sara", role: "Lead designer", load: 80 },
  { name: "Theo", role: "Photographer", load: 65 },
  { name: "Kai", role: "Editor", load: 45 },
  { name: "Mia", role: "Producer", load: 70 },
];

function Team() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Team Workspace"
        title={<>Built for <span className="text-gradient">micro-studios</span>.</>}
        subtitle="Shared kanban, project milestones and client reviews — the collaboration tool creators actually want to use."
      />

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-3xl glass shadow-elevated p-6 overflow-x-auto">
          <div className="grid grid-cols-4 gap-4 min-w-[800px]">
            {cols.map((c) => (
              <div key={c.name} className="rounded-2xl bg-surface/40 border border-border/50 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium">{c.name}</div>
                  <span className="text-xs text-muted-foreground font-mono">{c.tasks.length}</span>
                </div>
                <div className="space-y-2">
                  {c.tasks.map((t) => (
                    <div key={t} className="rounded-xl bg-background/60 p-3 text-sm border border-border/40 hover:border-primary/40 transition cursor-grab">
                      {t}
                      <div className="mt-2 flex gap-1.5">
                        <span className="h-5 w-5 rounded-full bg-gradient-to-br from-primary to-cyan text-[10px] grid place-items-center font-bold">{t.charAt(0)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl glass p-6">
          <Users className="h-5 w-5 text-cyan" />
          <div className="mt-4 text-sm font-medium mb-3">Team capacity</div>
          <div className="space-y-3">
            {team.map((m) => (
              <div key={m.name}>
                <div className="flex justify-between text-xs"><span className="font-medium">{m.name} · <span className="text-muted-foreground">{m.role}</span></span><span className="text-muted-foreground">{m.load}%</span></div>
                <div className="mt-1.5 h-1.5 rounded-full bg-background overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-cyan" style={{width:`${m.load}%`}} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl glass p-6">
          <MessageSquare className="h-5 w-5 text-cyan" />
          <div className="mt-4 text-sm font-medium mb-3">Recent reviews</div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>"Love the second cover — let's go." — <span className="text-foreground">Nova</span></li>
            <li>"Can we warm the grade slightly?" — <span className="text-foreground">Aurora</span></li>
            <li>"Approved ✨" — <span className="text-foreground">Marco</span></li>
          </ul>
        </div>

        <div className="rounded-2xl glass p-6">
          <FileCheck className="h-5 w-5 text-cyan" />
          <div className="mt-4 text-sm font-medium mb-3">Milestones this week</div>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between"><span>Album cover delivery</span><span className="text-cyan">Fri</span></li>
            <li className="flex justify-between"><span>Editorial first cut</span><span className="text-cyan">Wed</span></li>
            <li className="flex justify-between"><span>Brand presentation</span><span className="text-cyan">Mon</span></li>
          </ul>
        </div>
      </section>
    </PageLayout>
  );
}

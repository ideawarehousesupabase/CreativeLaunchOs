import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero } from "@/components/site/PageHero";
import { useState } from "react";
import { Upload, Sparkles, Brain, DollarSign, Target, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/portfolio-intelligence")({
  head: () => ({
    meta: [
      { title: "Portfolio Intelligence — Creative Launch OS" },
      { name: "description", content: "AI style graphing: upload your portfolio, get pricing, ideal-client matches and a business readiness score." },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);

  const run = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setAnalyzed(true); }, 1800);
  };

  return (
    <PageLayout>
      <PageHero
        eyebrow="Portfolio Intelligence"
        title={<>Your style, <span className="text-gradient">decoded</span>.</>}
        subtitle="Upload your work. Our AI maps your visual signature, suggests pricing, and finds the clients who'll love it."
      />

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rounded-3xl glass shadow-elevated p-8 md:p-10">
          {!analyzed ? (
            <div className="text-center">
              <div className="mx-auto rounded-2xl border-2 border-dashed border-border p-12 hover:border-primary/60 transition cursor-pointer" onClick={run}>
                <Upload className="mx-auto h-10 w-10 text-cyan" />
                <p className="mt-4 font-medium">Drop a portfolio folder</p>
                <p className="mt-1 text-sm text-muted-foreground">JPG, PNG, PDF · up to 100 files</p>
              </div>
              <button onClick={run} disabled={loading} className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-violet to-neon px-6 py-3 text-sm font-semibold glow-violet disabled:opacity-50">
                <Sparkles className="h-4 w-4" /> {loading ? "Analyzing your style…" : "Run sample analysis"}
              </button>
              {loading && (
                <div className="mt-8 max-w-md mx-auto space-y-2">
                  {["Detecting visual signature","Mapping color palette","Comparing to 12,000 portfolios","Generating insights"].map((s,i)=>(
                    <div key={s} className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" style={{animationDelay:`${i*0.2}s`}} /> {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6 animate-fade-up">
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: Brain, label: "Style cluster", value: "Editorial / Cinematic" },
                  { icon: DollarSign, label: "Suggested pricing", value: "€2.4k – 4.8k" },
                  { icon: Target, label: "Readiness score", value: "82/100" },
                ].map(s => (
                  <div key={s.label} className="rounded-2xl bg-surface/60 border border-border/50 p-5">
                    <s.icon className="h-4 w-4 text-cyan" />
                    <div className="mt-3 text-xs text-muted-foreground">{s.label}</div>
                    <div className="mt-1 font-display text-lg font-bold">{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-surface/60 border border-border/50 p-6">
                  <div className="text-sm font-medium mb-3 flex items-center gap-2"><Sparkles className="h-4 w-4 text-cyan" />Creative strengths</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {["Strong narrative composition","Consistent warm-cool palette","Distinctive subject framing","High emotional resonance"].map(s=>(
                      <li key={s} className="flex gap-2"><span className="text-cyan">→</span>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl bg-surface/60 border border-border/50 p-6">
                  <div className="text-sm font-medium mb-3 flex items-center gap-2"><TrendingUp className="h-4 w-4 text-cyan" />Ideal client</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {["Indie fashion brands","Editorial magazines (mid-tier)","Lifestyle product launches","Music artist visual campaigns"].map(s=>(
                      <li key={s} className="flex gap-2"><span className="text-cyan">→</span>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {Array.from({length:6}).map((_,i)=>(
                  <div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-primary/30 via-violet/20 to-cyan/20 border border-border/50 animate-pulse-slow" style={{animationDelay:`${i*0.2}s`}} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}

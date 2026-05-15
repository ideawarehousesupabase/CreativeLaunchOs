import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero } from "@/components/site/PageHero";
import { useState } from "react";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/waitlist")({
  head: () => ({
    meta: [
      { title: "Join the Waitlist — Creative Launch" },
      { name: "description", content: "Get early access to Creative Launch. Help shape the future of the creative business platform." },
    ],
  }),
  component: Waitlist,
});

function Waitlist() {
  const [done, setDone] = useState(false);

  return (
    <PageLayout>
      <PageHero
        eyebrow="Waitlist"
        title={<>Be among the <span className="text-gradient">first creators</span>.</>}
        subtitle="We're onboarding a small group of creators each month. Tell us about your craft."
      />

      <section className="mx-auto max-w-2xl px-6 pb-24">
        <div className="rounded-3xl bg-white border border-border shadow-xl p-8 md:p-10">
          {done ? (
            <div className="text-center py-10">
              <div className="inline-grid place-items-center h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-neon shadow-lg mb-6">
                <CheckCircle2 className="h-7 w-7 text-white" />
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground">You're on the list ✨</h2>
              <p className="mt-3 text-muted-foreground">We'll be in touch with early access details soon.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setDone(true); }}
              className="space-y-5"
            >
              <Field label="Name">
                <input required type="text" className={inputCls} placeholder="Your full name" />
              </Field>
              <Field label="Email">
                <input required type="email" className={inputCls} placeholder="you@studio.com" />
              </Field>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Creator type">
                  <select className={inputCls} defaultValue="">
                    <option value="" disabled>Select…</option>
                    {["Tattoo artist","Photographer","Illustrator","Designer","Musician","Choreographer","Video editor","Freelancer","Studio / Agency"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="Business stage">
                  <select className={inputCls} defaultValue="">
                    <option value="" disabled>Select…</option>
                    {["Just starting","Side hustle","Full-time solo","Small team","Established studio"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="What's the biggest bottleneck in your business?">
                <textarea rows={4} className={inputCls} placeholder="Optional — helps us build the right product for you." />
              </Field>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary via-violet to-neon px-6 py-3.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all"
              >
                <Sparkles className="h-4 w-4" /> Request early access
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-xs text-center text-muted-foreground">We'll never share your details.</p>
            </form>
          )}
        </div>
      </section>
    </PageLayout>
  );
}

const inputCls = "w-full rounded-xl bg-surface border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

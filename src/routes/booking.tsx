import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero } from "@/components/site/PageHero";
import { useState } from "react";
import { Calendar, Clock, CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Booking Experience — Creative Launch" },
      { name: "description", content: "Calendar, packages and confirmations — see how clients book your time in three taps." },
    ],
  }),
  component: Booking,
});

const days = ["Mon 12","Tue 13","Wed 14","Thu 15","Fri 16","Sat 17"];
const slots = ["09:00","10:30","13:00","14:30","16:00"];
const packages = [
  { name: "Mini session", duration: "45 min", price: "€180" },
  { name: "Signature session", duration: "90 min", price: "€340" },
  { name: "Full day", duration: "8 hours", price: "€1,400" },
];

function Booking() {
  const [day, setDay] = useState(days[2]);
  const [slot, setSlot] = useState<string | null>(null);
  const [pkg, setPkg] = useState(packages[1].name);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <PageLayout>
      <PageHero
        eyebrow="Smart Booking"
        title={<>Bookings on <span className="text-gradient">autopilot</span>.</>}
        subtitle="Your availability, your packages, your deposit rules. Clients self-serve, you stay in flow."
      />

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rounded-3xl bg-white border border-border shadow-xl p-8">
          {!confirmed ? (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium mb-4 text-foreground"><Calendar className="h-4 w-4 text-primary" />Pick a day</div>
                <div className="grid grid-cols-3 gap-2">
                  {days.map((d) => (
                    <button key={d} onClick={() => setDay(d)} className={`rounded-xl border px-3 py-3 text-sm transition ${day===d?"border-primary bg-primary/10 text-primary font-medium":"border-border hover:border-primary/40 text-foreground"}`}>{d}</button>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm font-medium mt-8 mb-4 text-foreground"><Clock className="h-4 w-4 text-primary" />Available times — {day}</div>
                <div className="grid grid-cols-3 gap-2">
                  {slots.map((s) => (
                    <button key={s} onClick={() => setSlot(s)} className={`rounded-xl border px-3 py-3 text-sm transition ${slot===s?"border-primary bg-primary/10 text-primary font-medium":"border-border hover:border-primary/40 text-foreground"}`}>{s}</button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-4 text-foreground">Choose a package</div>
                <div className="space-y-2">
                  {packages.map((p) => (
                    <button key={p.name} onClick={() => setPkg(p.name)} className={`w-full text-left rounded-2xl border p-4 transition ${pkg===p.name?"border-primary bg-primary/5":"border-border hover:border-primary/40"}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm text-foreground">{p.name}</div>
                          <div className="text-xs text-muted-foreground">{p.duration}</div>
                        </div>
                        <div className="font-display text-lg font-bold text-gradient">{p.price}</div>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  disabled={!slot}
                  onClick={() => setConfirmed(true)}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary via-violet to-neon px-6 py-3 text-sm font-semibold text-white disabled:opacity-40 hover:scale-[1.01] transition shadow-lg"
                >
                  Confirm booking <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 animate-fade-up">
              <div className="inline-grid place-items-center h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-neon shadow-lg">
                <CheckCircle2 className="h-8 w-8 text-white" />
              </div>
              <h2 className="mt-6 font-display text-3xl font-bold text-foreground">Booked.</h2>
              <p className="mt-2 text-muted-foreground">{pkg} · {day} at {slot}. A confirmation has been sent.</p>
              <button onClick={() => { setConfirmed(false); setSlot(null); }} className="mt-6 text-sm text-primary hover:text-foreground transition-colors">Try another booking</button>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}

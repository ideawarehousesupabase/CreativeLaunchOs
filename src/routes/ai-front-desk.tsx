import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero } from "@/components/site/PageHero";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";

export const Route = createFileRoute("/ai-front-desk")({
  head: () => ({
    meta: [
      { title: "AI Front Desk Demo — Creative Launch" },
      { name: "description", content: "Try a live simulation of the AI assistant that qualifies leads, suggests packages, and books clients automatically." },
    ],
  }),
  component: FrontDesk,
});

type Msg = {
  from: "ai" | "user";
  text: string;
  options?: string[];
  onSelect?: (opt: string) => void;
  showRestart?: boolean;
};

type Creator =
  | "Tattoo Artists"
  | "Photographers"
  | "Illustrators"
  | "Musicians"
  | "Choreographers"
  | "Freelancers";

const CREATORS: Creator[] = [
  "Tattoo Artists",
  "Photographers",
  "Illustrators",
  "Musicians",
  "Choreographers",
  "Freelancers",
];

const FOLLOWUP: Record<Creator, { intro: string; questions: { q: string; a: string }[] }> = {
  "Tattoo Artists": {
    intro: "Awesome — tattoo artists love our booking + deposit flow. What would you like to explore?",
    questions: [
      { q: "How do I take deposits?", a: "Clients pay a deposit through a Stripe-powered link sent automatically after booking. Funds land in your account, and the slot is locked in your calendar." },
      { q: "Can I show my flash designs?", a: "Yes — your portfolio gallery supports flash sheets, custom pieces and reference images, all tagged by style so the AI can recommend them to inquiries." },
      { q: "What about aftercare follow-ups?", a: "We auto-send aftercare instructions 24h after the session and a healing check-in at day 14, plus a re-booking nudge at day 60." },
    ],
  },
  Photographers: {
    intro: "Nice — photographers usually start with packages and galleries. What do you want to see?",
    questions: [
      { q: "How do clients pick a package?", a: "Your AI front desk asks shoot type, location and budget, then suggests one of your packages with sample galleries and a booking link." },
      { q: "Do you handle client galleries?", a: "Yes — delivery galleries with download limits, favouriting and print-store upsells are built in." },
      { q: "Can I sell prints?", a: "Absolutely. Connect a print lab, set your margins, and the storefront handles checkout and fulfilment." },
    ],
  },
  Illustrators: {
    intro: "Sweet — illustrators get commission intake + licensing tools. Pick a topic:",
    questions: [
      { q: "How do commissions work?", a: "A smart intake form qualifies the brief (style, usage, deadline) and auto-generates a quote you can approve in one tap." },
      { q: "Can I license my work?", a: "Yes — set licensing tiers (personal, commercial, exclusive) and the platform issues the contract and invoice automatically." },
      { q: "What about revisions?", a: "Each project has a built-in revision tracker with limits per package, so scope creep stays in check." },
    ],
  },
  Musicians: {
    intro: "Great — musicians use us for bookings, releases and fan CRM. What's interesting?",
    questions: [
      { q: "Can I book gigs?", a: "Promoters submit offers through your booking page; the AI negotiates dates, fees and tech rider basics before passing the deal to you." },
      { q: "How do releases work?", a: "Plan singles and EPs in a release calendar, push pre-saves, and notify your fan CRM on launch day." },
      { q: "Fan CRM?", a: "Every email, ticket and merch buyer becomes a contact you can segment and message — without leaving the platform." },
    ],
  },
  Choreographers: {
    intro: "Love it — choreographers run classes, residencies and commissions here. Pick one:",
    questions: [
      { q: "How do classes get scheduled?", a: "Set recurring classes, capacity and pricing — students book and pay through a public schedule page synced to your calendar." },
      { q: "Can I sell choreography?", a: "Yes — upload reference videos, sell licensed routines with usage terms, and deliver them via secure links." },
      { q: "Studio bookings?", a: "Manage residency requests with a structured intake, contracts and milestone payments." },
    ],
  },
  Freelancers: {
    intro: "Perfect — freelancers love the proposals + invoicing workflow. What do you want to see?",
    questions: [
      { q: "How do proposals work?", a: "Describe the project once and the AI drafts a branded proposal with scope, timeline and pricing tiers ready to send." },
      { q: "Invoicing?", a: "Issue invoices in any currency, accept card and bank transfer, and automate reminders for late payers." },
      { q: "Time tracking?", a: "Built-in timers per project feed directly into invoices, so billable hours never get lost." },
    ],
  },
};

function FrontDesk() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [creator, setCreator] = useState<Creator | null>(null);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  // Initial greeting
  useEffect(() => {
    setMessages([
      {
        from: "ai",
        text: "Hi, I'm the AI front desk for Creative Launch. To tailor this demo, what kind of creator are you?",
        options: CREATORS,
        onSelect: (opt) => handleCreatorPick(opt as Creator),
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const aiReply = (text: string, options?: string[], onSelect?: (opt: string) => void) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => {
        // Detect repetition: count consecutive prior AI messages with the same text
        let repeats = 0;
        for (let i = m.length - 1; i >= 0; i--) {
          if (m[i].from !== "ai") continue;
          if (m[i].text === text) repeats++;
          else break;
        }
        const showRestart = repeats >= 1; // we're about to add the 2nd identical reply
        return [...m, { from: "ai", text, options, onSelect, showRestart }];
      });
    }, 800);
  };

  const handleRestart = () => {
    setCreator(null);
    setInput("");
    setMessages([
      {
        from: "ai",
        text: "Fresh start! What kind of creator are you?",
        options: CREATORS,
        onSelect: (opt) => handleCreatorPick(opt as Creator),
      },
    ]);
  };

  const handleCreatorPick = (c: Creator) => {
    setCreator(c);
    setMessages((m) => [
      ...m.map((msg) => ({ ...msg, options: undefined, onSelect: undefined })),
      { from: "user", text: c },
    ]);
    const f = FOLLOWUP[c];
    aiReply(
      f.intro,
      f.questions.map((q) => q.q),
      (opt) => handleQuestionPick(c, opt),
    );
  };

  const handleQuestionPick = (c: Creator, q: string) => {
    const f = FOLLOWUP[c];
    const found = f.questions.find((x) => x.q === q);
    setMessages((m) => [
      ...m.map((msg) => ({ ...msg, options: undefined, onSelect: undefined })),
      { from: "user", text: q },
    ]);
    aiReply(
      found?.a ?? "Couldn't understand your message",
      f.questions.map((x) => x.q),
      (opt) => handleQuestionPick(c, opt),
    );
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [
      ...m.map((msg) => ({ ...msg, options: undefined, onSelect: undefined })),
      { from: "user", text },
    ]);
    setInput("");
    // Mock fallback response
    aiReply(
      "Couldn't understand your message",
      creator ? FOLLOWUP[creator].questions.map((x) => x.q) : CREATORS,
      creator
        ? (opt) => handleQuestionPick(creator, opt)
        : (opt) => handleCreatorPick(opt as Creator),
    );
  };

  return (
    <PageLayout>
      <PageHero
        eyebrow="AI Front Desk"
        title={<>Your creative business, <span className="text-gradient">always answering</span>.</>}
        subtitle="A conversational AI that captures inquiries, recommends services, suggests pricing and books clients — in your voice."
      />

      <section className="mx-auto max-w-3xl px-6 pb-24">
        <div className="rounded-3xl bg-white border border-border overflow-hidden shadow-xl">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-surface/50">
            <div className="h-9 w-9 grid place-items-center rounded-xl bg-gradient-to-br from-primary to-neon shadow-md">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="font-medium text-sm text-foreground">Creative Launch · AI Assistant</div>
              <div className="text-xs text-primary flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" /> Online
              </div>
            </div>
            <button
              onClick={handleRestart}
              className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors"
            >
              ↻ Restart
            </button>
            <Sparkles className="h-4 w-4 text-primary" />
          </div>

          <div ref={scrollRef} className="h-[460px] overflow-y-auto px-5 py-6 space-y-3 bg-surface/30">
            {messages.map((m, i) => (
              <div key={i} className="space-y-2">
                <div className={`flex gap-2 ${m.from === "user" ? "justify-end" : ""}`}>
                  {m.from === "ai" && (
                    <div className="h-7 w-7 grid place-items-center rounded-lg bg-white border border-border shrink-0 shadow-sm">
                      <Bot className="h-3.5 w-3.5 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.from === "user"
                        ? "bg-gradient-to-br from-primary to-violet text-white"
                        : "bg-white border border-border shadow-sm text-foreground"
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.from === "user" && (
                    <div className="h-7 w-7 grid place-items-center rounded-lg bg-white border border-border shrink-0 shadow-sm">
                      <User className="h-3.5 w-3.5 text-foreground" />
                    </div>
                  )}
                </div>
                {m.options && m.onSelect && (
                  <div className="flex flex-wrap gap-2 pl-9">
                    {m.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => m.onSelect!(opt)}
                        className="rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/15 px-3 py-1.5 text-xs font-medium text-primary transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="flex gap-2">
                <div className="h-7 w-7 grid place-items-center rounded-lg bg-white border border-border shadow-sm">
                  <Bot className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="rounded-2xl px-4 py-3 bg-white border border-border shadow-sm flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="border-t border-border p-4 flex gap-2 bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 rounded-full bg-surface border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary/60 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="rounded-full bg-gradient-to-r from-primary via-violet to-neon px-5 py-3 text-sm font-semibold text-white disabled:opacity-40 hover:scale-[1.01] transition-transform inline-flex items-center justify-center gap-2 shadow-md"
            >
              Send <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>
    </PageLayout>
  );
}

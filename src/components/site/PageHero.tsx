import { Layout } from "@/components/site/Layout";

export function PageHero({ eyebrow, title, subtitle, children }: {
  eyebrow: string; title: React.ReactNode; subtitle: string; children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
        <span className="inline-block text-xs font-mono uppercase tracking-widest text-primary font-semibold">{eyebrow}</span>
        <h1 className="mt-5 font-display text-5xl md:text-6xl font-bold tracking-tight text-foreground">{title}</h1>
        <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}

export function PageLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}

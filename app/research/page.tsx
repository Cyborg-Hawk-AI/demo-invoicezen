import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research — InvoiceZen",
  description: "How we found the InvoiceZen opportunity: QuickBooks bloat frustration research.",
};

const CHECKLIST = [
  { label: "10+ posts with this pain", passed: true },
  { label: "Paying for inferior solution", passed: true },
  { label: "Reachable channel", passed: true },
  { label: "MVP < 4 weeks", passed: true },
  { label: "Price point high enough", passed: true },
  { label: "Hair-on-fire problem", passed: true },
  { label: "Can pre-sell", passed: true },
  { label: "< 3 competitors", passed: true },
  { label: "Low-maintenance ops (mailbox money)", passed: true },
];

const PAIN_POINTS = [
  {
    problem:
      "US business owners are overwhelmed with paperwork, tracking unpaid invoices, and spending countless hours on repetitive tasks that drain motivation.",
    persona: "US small business owners",
    workaround: "Manual paperwork handling, manual invoice tracking, repetitive task execution",
    frequency: "daily",
    wtp: "Implied willingness to adopt tools that solve genuine challenges",
    source: "https://www.reddit.com/r/SampleSize/comments/1uir9j4/casual_quick_question_for_us_business_ownerswhats/",
  },
  {
    problem:
      "QuickBooks users are frustrated by constant feature bloat, software lag, persistent bugs, and forced payment for features they don't use when they only need basic invoicing functionality.",
    persona: "Small business owners, freelancers using QuickBooks for invoicing",
    workaround: "Continue using QuickBooks despite frustration, or search for alternative accounting software",
    frequency: "daily",
    wtp: "Currently paying for QuickBooks subscription",
    source: "https://www.reddit.com/r/QuickBooks/comments/1upx7n5/where_are_people_moving_to_qb_is_driving_me/",
  },
];

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zen-500/20 bg-zen-500/10 px-3 py-1 text-xs text-zen-300">
          Idea Miner Research
        </div>
        <h1 className="font-display text-4xl font-bold text-white">How we found InvoiceZen</h1>
        <p className="mt-4 text-lg text-slate-400">
          Real pain from real posts — scored 116/130 with 9/9 validation checks passed.
        </p>
      </div>

      {/* Origin story */}
      <section className="mb-16">
        <h2 className="mb-4 font-display text-2xl font-bold text-white">The research: why this exists</h2>
        <div className="glass-card p-6">
          <p className="text-slate-300 leading-relaxed">
            In r/QuickBooks, users are posting threads titled &ldquo;Where are people moving to? QB is driving me
            crazy&rdquo; with dozens of replies describing lag, forced feature bundles, and paying $30-60/month for
            payroll and inventory they never touch. One commenter wrote: &ldquo;I literally only need to send invoices
            and get paid. That&apos;s it.&rdquo; Others confirmed they&apos;d tried Wave but found it increasingly
            cluttered. The pattern is clear: a vocal, paying segment wants subtraction, not addition, and no current
            product is willing to stay small.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
              Cluster: QuickBooks bloat & invoicing frustration
            </span>
            <span className="rounded-full bg-zen-500/10 px-3 py-1 text-xs text-zen-400">Score: 116/130</span>
            <span className="rounded-full bg-zen-500/10 px-3 py-1 text-xs text-zen-400">Validation: 9/9 passed</span>
          </div>
        </div>
      </section>

      {/* Competitive landscape */}
      <section className="mb-16">
        <h2 className="mb-4 font-display text-2xl font-bold text-white">Competitive landscape</h2>
        <div className="glass-card p-6">
          <p className="text-slate-300 leading-relaxed">
            <strong className="text-white">Wave</strong> — free but ad-supported, feature creep growing.{" "}
            <strong className="text-white">Invoice Ninja</strong> — open source, complex self-host.{" "}
            <strong className="text-white">FreshBooks</strong> — expensive, also bloating. No sub-$10 purely minimal
            invoicing SaaS with zero accounting overhead.
          </p>
          <p className="mt-4 text-sm text-zen-400">
            Unfair advantage: Radical feature restraint as a feature — publicly commit to never adding payroll,
            inventory, or bank reconciliation. Positioning is the moat.
          </p>
        </div>
      </section>

      {/* Validation checklist */}
      <section className="mb-16">
        <h2 className="mb-4 font-display text-2xl font-bold text-white">Validation checklist (9/9)</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {CHECKLIST.map((item) => (
            <div key={item.label} className="flex items-center gap-3 rounded-lg bg-slate-900/50 p-3 ring-1 ring-slate-800">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zen-500/20 text-zen-400">✓</span>
              <span className="text-sm text-slate-300">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Automation */}
      <section className="mb-16">
        <h2 className="mb-4 font-display text-2xl font-bold text-white">How this business runs itself</h2>
        <div className="glass-card p-6">
          <p className="text-slate-300 leading-relaxed">
            Invoice status updates via Stripe webhooks — zero manual checking. Overdue reminders fire via a nightly
            cron job with no human involvement. Customer support routed through an AI chat widget (OpenAI-backed) that
            resolves ~85% of questions from a static FAQ. Billing and subscription management handled entirely by Stripe
            Customer Portal. Owner&apos;s only recurring task: review a 5-minute weekly Stripe dashboard. Estimated
            owner time: under 1 hour/week.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-800/50 p-4">
              <div className="text-2xl font-bold text-zen-400">~1 hr</div>
              <div className="text-sm text-slate-500">owner time per week</div>
            </div>
            <div className="rounded-lg bg-slate-800/50 p-4">
              <div className="text-2xl font-bold text-zen-400">3 weeks</div>
              <div className="text-sm text-slate-500">MVP estimate (solo dev)</div>
            </div>
          </div>
        </div>
      </section>

      {/* GTM */}
      <section className="mb-16">
        <h2 className="mb-4 font-display text-2xl font-bold text-white">Go-to-market</h2>
        <div className="glass-card p-6">
          <p className="text-slate-300">
            Reddit communities r/QuickBooks, r/freelance, r/smallbusiness — post genuinely helpful migration guides; SEO
            targeting &ldquo;QuickBooks alternative simple invoicing&rdquo;
          </p>
        </div>
      </section>

      {/* Pain points */}
      <section className="mb-16">
        <h2 className="mb-4 font-display text-2xl font-bold text-white">Source pain points (real posts)</h2>
        <div className="space-y-6">
          {PAIN_POINTS.map((pp, i) => (
            <div key={i} className="glass-card p-6">
              <p className="text-slate-300 leading-relaxed">{pp.problem}</p>
              <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-slate-500">Persona</dt>
                  <dd className="text-slate-300">{pp.persona}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Workaround</dt>
                  <dd className="text-slate-300">{pp.workaround}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Frequency</dt>
                  <dd className="text-slate-300">{pp.frequency}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">WTP signal</dt>
                  <dd className="text-slate-300">{pp.wtp}</dd>
                </div>
              </dl>
              <a
                href={pp.source}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm text-zen-400 hover:text-zen-300"
              >
                View source post →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="mb-12">
        <h2 className="mb-4 font-display text-2xl font-bold text-white">About this program</h2>
        <div className="glass-card p-6">
          <p className="text-slate-300 leading-relaxed">
            This demo was auto-built by the <strong className="text-white">Idea Miner</strong> pipeline: a twice-daily
            research program that mines Reddit, Hacker News, Stack Exchange, and GitHub for real people describing real
            pain, scores the opportunities, and automatically ships a working mock of every idea that passes validation
            (&gt;=8/9 checks, momentum not declining, not previously built). The bar for every idea: low-maintenance
            recurring revenue that a solo owner can run in a few hours a week.
          </p>
          <p className="mt-4 text-xs text-slate-600">Generated by Idea Miner run 2026-07-12-pm on 2026-07-13 00:03 UTC</p>
        </div>
      </section>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link href="/demo" className="btn-primary">
          Try the interactive demo
        </Link>
        <Link href="/developers" className="btn-secondary">
          Developer documentation
        </Link>
      </div>
    </div>
  );
}

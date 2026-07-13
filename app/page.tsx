import Link from "next/link";

const FEATURES = [
  {
    title: "One-screen invoicing",
    description:
      "Create and send a professional invoice in under 60 seconds. Email it or share a payment link — no wizard, no clutter.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    ),
  },
  {
    title: "Auto payment reminders",
    description:
      "Friendly nudges on day 3, 7, and 14 past due. Set it once — InvoiceZen handles the follow-ups while you do billable work.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    title: "Stripe & PayPal built in",
    description:
      "Clients pay directly from the invoice link. No chasing checks, no manual status updates — webhooks mark it paid automatically.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    ),
  },
  {
    title: "Dashboard: paid, unpaid, overdue",
    description:
      "Three numbers that matter. No balance sheets, no chart of accounts, no features you'll never touch.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    ),
  },
  {
    title: "Expense tracking",
    description:
      "Log business expenses alongside invoices. One CSV export at tax time — your accountant will thank you.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    ),
  },
  {
    title: "CSV export",
    description:
      "Export invoices and expenses for your accountant in one click. Clean data, no QuickBooks migration headaches.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    ),
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zen-900/30 via-slate-950 to-slate-950" />
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-zen-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-zen-600/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zen-500/20 bg-zen-500/10 px-4 py-1.5 text-sm text-zen-300">
              <span className="h-2 w-2 rounded-full bg-zen-400 animate-pulse" />
              Built for freelancers fleeing QuickBooks bloat
            </div>

            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Send invoices.
              <br />
              <span className="bg-gradient-to-r from-zen-300 to-zen-500 bg-clip-text text-transparent">
                Get paid. Nothing else.
              </span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-400 sm:text-xl">
              InvoiceZen is invoicing software that refuses to grow up into accounting software.
              One screen to create, automatic reminders, embedded payments — at{" "}
              <span className="text-white font-medium">$9/month</span> with zero per-invoice fees.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/demo" className="btn-primary text-base px-8 py-3">
                Try the interactive demo
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/research" className="btn-secondary text-base px-8 py-3">
                Why we built this
              </Link>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              No signup required · Fully interactive mock · Deploys on Vercel in seconds
            </p>
          </div>

          {/* Stats bar */}
          <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: "$9", label: "per month flat" },
              { value: "60s", label: "to send an invoice" },
              { value: "3", label: "auto reminders" },
              { value: "<1hr", label: "owner time / week" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-4 text-center">
                <div className="font-display text-2xl font-bold text-zen-400">{stat.value}</div>
                <div className="mt-1 text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-800 bg-slate-900/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Everything you need. Nothing you don&apos;t.
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              We publicly commit to never adding payroll, inventory, or bank reconciliation.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="glass-card group p-6 transition hover:border-zen-500/30 hover:bg-slate-900/80"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-zen-500/10 text-zen-400 ring-1 ring-zen-500/20 transition group-hover:bg-zen-500/20">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Simple pricing. No surprises.
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Flat subscription. No per-invoice fees. Cancel anytime via Stripe Customer Portal.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
            <div className="glass-card p-8">
              <h3 className="text-lg font-semibold text-white">Monthly</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold text-white">$9</span>
                <span className="text-slate-500">/month</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckIcon /> Unlimited invoices
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Auto reminders (day 3, 7, 14)
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Stripe & PayPal payments
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> CSV export
                </li>
              </ul>
              <Link href="/demo" className="btn-secondary mt-8 w-full">
                Start with demo
              </Link>
            </div>

            <div className="glass-card relative border-zen-500/40 p-8 ring-1 ring-zen-500/20">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-zen-500 px-3 py-1 text-xs font-semibold text-slate-950">
                Save 27%
              </div>
              <h3 className="text-lg font-semibold text-white">Annual</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold text-white">$79</span>
                <span className="text-slate-500">/year</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckIcon /> Everything in Monthly
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Priority email support
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Annual revenue digest
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> ~$6.58/month effective
                </li>
              </ul>
              <Link href="/demo" className="btn-primary mt-8 w-full">
                Start with demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800 bg-gradient-to-b from-slate-900/50 to-slate-950 py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            &ldquo;I literally only need to send invoices and get paid. That&apos;s it.&rdquo;
          </h2>
          <p className="mt-4 text-slate-400">
            — r/QuickBooks user, 40+ replies agreeing
          </p>
          <Link href="/demo" className="btn-primary mt-10 text-base px-10 py-3">
            See InvoiceZen in action
          </Link>
        </div>
      </section>
    </>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-zen-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

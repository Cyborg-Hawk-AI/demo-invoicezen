import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Developer Docs — InvoiceZen",
  description: "Feature documentation for the InvoiceZen demo: what's mocked vs production.",
};

const FEATURES = [
  {
    name: "Dashboard (Paid / Unpaid / Overdue)",
    demoPath: "/demo → Dashboard tab",
    tryIt: "Click status cards to filter invoices. Click activity feed items to jump to an invoice. Use the status dropdown on the recent invoices table.",
    mocked: "Hardcoded invoice list and 6-month revenue chart. Stats recalculate client-side when invoices change.",
    production:
      "Supabase aggregates invoice status. Stripe webhooks update paid counts in real-time. Revenue chart from payment_intent.succeeded events.",
  },
  {
    name: "One-Screen Invoice Creation",
    demoPath: "/demo → Create Invoice tab",
    tryIt: "Select a client, edit line items, pick payment terms, preview the invoice, then Send via Email or Copy Payment Link. Save Draft also works.",
    mocked: "Client dropdown from MOCK_CLIENTS. Invoice appended to local state. Toast confirms send — no email actually sent.",
    production:
      "POST /api/invoices creates record in Supabase, generates Stripe Payment Link, sends email via Resend with embedded pay button. PDF attachment optional.",
  },
  {
    name: "Invoice List & Detail Panel",
    demoPath: "/demo → Invoices tab",
    tryIt: "Search, filter by status, sort by date/amount/client. Click a row for detail panel. Mark Paid, view payment link, or check reminders.",
    mocked: "All CRUD is in-memory React state. Mark Paid simulates webhook without API call.",
    production:
      "Supabase with RLS. Invoice detail includes Stripe Payment Link URL, reminder history, and email open tracking.",
  },
  {
    name: "Automated Payment Reminders (Day 3, 7, 14)",
    demoPath: "/demo → Reminders tab",
    tryIt: "Click Day 3/7/14 buttons to simulate cron-sent reminders. View timeline bars for overdue invoices.",
    mocked: "Manual button triggers update reminder state and activity feed. Cron schedule shown as reference.",
    production:
      "Vercel Cron at 0 9 * * * queries overdue invoices, checks reminder_schedule table, sends templated emails via Resend. Idempotent — won't double-send.",
  },
  {
    name: "Stripe & PayPal Payment Collection",
    demoPath: "/demo → Payment Portal tab",
    tryIt: "Select an unpaid invoice, toggle Stripe/PayPal, click Pay. Watch processing animation and success state. Copy Payment Link works.",
    mocked: "1.5s fake processing delay. onPay updates invoice to paid locally. No real payment.",
    production:
      "Public /pay/[id] route with Stripe Checkout Session or PayPal Smart Buttons. checkout.session.completed webhook marks invoice paid and sends receipt email.",
  },
  {
    name: "Expense Tracking",
    demoPath: "/demo → Expenses tab",
    tryIt: "Filter by category, toggle receipt status, add new expense via modal. Totals update live.",
    mocked: "Expenses in React state. Receipt toggle is boolean flip — no file upload.",
    production:
      "expenses table in Supabase. Receipt upload via S3 presigned URL. Categories configurable per user.",
  },
  {
    name: "CSV Export for Accountant",
    demoPath: "/demo → CSV Export tab",
    tryIt: "Pick date range (Q2/Q3/All), select invoices/expenses/both, preview CSV, click Download.",
    mocked: "Client-side Blob download with invoicesToCSV/expensesToCSV helpers. No server.",
    production:
      "GET /api/export?range=q2&type=both generates CSV server-side. Optional scheduled quarterly email to accountant address.",
  },
  {
    name: "AI Support Chat Widget",
    demoPath: "/demo → floating chat button (bottom-right)",
    tryIt: "Open chat, ask about reminders/pricing/exports, or click quick-reply chips.",
    mocked: "Keyword matching against 6 FAQ entries. Simulated typing delay. No OpenAI API.",
    production:
      "OpenAI GPT-4o-mini with system prompt + 20-FAQ doc. ~85% resolution rate. Escalates to email for edge cases.",
  },
];

const ARCHITECTURE = [
  { layer: "Frontend", tech: "Next.js 14 App Router, Tailwind CSS, client-side state for demo" },
  { layer: "Database", tech: "Supabase (Postgres) — invoices, clients, expenses, reminder_schedule, activity_log" },
  { layer: "Payments", tech: "Stripe Checkout + PayPal Smart Buttons; webhooks at /api/webhooks/stripe" },
  { layer: "Email", tech: "Resend — invoice delivery, reminders, receipts" },
  { layer: "Cron", tech: "Vercel Cron — nightly reminder job at 09:00 UTC" },
  { layer: "Auth", tech: "Supabase Auth (magic link) — not in demo" },
  { layer: "Billing", tech: "Stripe Customer Portal — $9/mo or $79/yr subscription" },
  { layer: "Support", tech: "OpenAI chat widget with static FAQ fallback" },
];

export default function DevelopersPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zen-500/20 bg-zen-500/10 px-3 py-1 text-xs text-zen-300">
          Developer Documentation
        </div>
        <h1 className="font-display text-4xl font-bold text-white">InvoiceZen Feature Map</h1>
        <p className="mt-4 text-lg text-slate-400">
          Every feature in the interactive demo, what&apos;s mocked, and how it would work in production.
        </p>
        <Link href="/demo" className="btn-primary mt-6 inline-flex">
          Open Interactive Demo →
        </Link>
      </div>

      {/* Architecture */}
      <section className="mb-16">
        <h2 className="mb-6 font-display text-2xl font-bold text-white">Intended Architecture</h2>
        <div className="glass-card divide-y divide-slate-800">
          {ARCHITECTURE.map((item) => (
            <div key={item.layer} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-medium text-zen-400">{item.layer}</span>
              <span className="text-sm text-slate-400">{item.tech}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="space-y-8">
        <h2 className="font-display text-2xl font-bold text-white">Feature Documentation</h2>
        {FEATURES.map((feature, i) => (
          <div key={feature.name} className="glass-card p-6">
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zen-500/10 text-sm font-bold text-zen-400">
                {i + 1}
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{feature.name}</h3>
                <p className="mt-1 text-sm text-zen-400">{feature.demoPath}</p>

                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div>
                    <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">Try it</h4>
                    <p className="text-sm text-slate-400">{feature.tryIt}</p>
                  </div>
                  <div>
                    <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-amber-500/80">Mocked</h4>
                    <p className="text-sm text-slate-400">{feature.mocked}</p>
                  </div>
                  <div>
                    <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-zen-500/80">Production</h4>
                    <p className="text-sm text-slate-400">{feature.production}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Data flow */}
      <section className="mt-16">
        <h2 className="mb-6 font-display text-2xl font-bold text-white">Key Data Flows</h2>
        <div className="space-y-4">
          <div className="glass-card p-5">
            <h3 className="font-semibold text-white">Invoice → Payment → Dashboard</h3>
            <p className="mt-2 text-sm text-slate-400">
              User creates invoice → Stripe Payment Link generated → client pays →{" "}
              <code className="text-zen-400">checkout.session.completed</code> webhook → invoice status = paid →
              dashboard updates → receipt email sent. Zero manual steps.
            </p>
          </div>
          <div className="glass-card p-5">
            <h3 className="font-semibold text-white">Overdue → Reminder → Activity</h3>
            <p className="mt-2 text-sm text-slate-400">
              Cron runs nightly → queries invoices where due_date &lt; today AND status != paid → checks
              reminder_schedule for next day (3/7/14) → sends email → logs to activity_log → updates
              reminders_sent array. Idempotent per day threshold.
            </p>
          </div>
          <div className="glass-card p-5">
            <h3 className="font-semibold text-white">Subscription Billing</h3>
            <p className="mt-2 text-sm text-slate-400">
              Signup → Stripe Checkout for $9/mo or $79/yr → Customer Portal for self-service cancel/upgrade →
              weekly revenue digest email. Owner reviews Stripe dashboard ~5 min/week.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-12 text-center">
        <Link href="/research" className="text-sm text-slate-500 hover:text-zen-400">
          Read the research behind InvoiceZen →
        </Link>
      </div>
    </div>
  );
}

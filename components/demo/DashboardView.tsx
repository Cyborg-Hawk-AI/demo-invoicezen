"use client";

import DevNote from "@/components/DevNote";
import type { Invoice, InvoiceStatus, ActivityItem } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/mockData";

interface Stats {
  paidCount: number;
  paidTotal: number;
  unpaidCount: number;
  unpaidTotal: number;
  overdueCount: number;
  overdueTotal: number;
}

interface Props {
  stats: Stats;
  invoices: Invoice[];
  activities: ActivityItem[];
  revenue: { month: string; paid: number; outstanding: number }[];
  statusFilter: InvoiceStatus | "all";
  setStatusFilter: (f: InvoiceStatus | "all") => void;
  onNavigate: (tab: "invoices" | "create" | "reminders" | "payment", id?: string) => void;
}

export default function DashboardView({
  stats,
  invoices,
  activities,
  revenue,
  statusFilter,
  setStatusFilter,
  onNavigate,
}: Props) {
  const maxRevenue = Math.max(...revenue.map((r) => r.paid + r.outstanding));

  const filteredInvoices =
    statusFilter === "all" ? invoices : invoices.filter((i) => i.status === statusFilter);

  const activityIcons: Record<ActivityItem["type"], string> = {
    payment: "💰",
    reminder: "⏰",
    invoice: "📄",
    export: "📥",
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-slate-400">Paid, unpaid, overdue — nothing else.</p>
        </div>
        <div className="flex items-center gap-2">
          <DevNote note="Production: Dashboard aggregates invoice status from Supabase, updated in real-time via Stripe webhooks when payments complete. No manual refresh needed." />
          <button type="button" onClick={() => onNavigate("create")} className="btn-primary text-sm">
            + New Invoice
          </button>
        </div>
      </div>

      {/* Status cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { key: "paid" as const, label: "Paid", count: stats.paidCount, total: stats.paidTotal, color: "zen" },
          { key: "unpaid" as const, label: "Unpaid", count: stats.unpaidCount, total: stats.unpaidTotal, color: "blue" },
          { key: "overdue" as const, label: "Overdue", count: stats.overdueCount, total: stats.overdueTotal, color: "red" },
        ].map((card) => (
          <button
            key={card.key}
            type="button"
            onClick={() => {
              setStatusFilter(card.key);
              onNavigate("invoices");
            }}
            className={`glass-card p-5 text-left transition hover:ring-1 ${
              card.color === "zen"
                ? "hover:ring-zen-500/30"
                : card.color === "blue"
                  ? "hover:ring-blue-500/30"
                  : "hover:ring-red-500/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-400">{card.label}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  card.color === "zen"
                    ? "bg-zen-500/10 text-zen-400"
                    : card.color === "blue"
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-red-500/10 text-red-400"
                }`}
              >
                {card.count}
              </span>
            </div>
            <div className="mt-2 font-display text-2xl font-bold text-white">{formatCurrency(card.total)}</div>
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue chart */}
        <div className="glass-card p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-white">Revenue (6 months)</h2>
            <DevNote note="Production: Chart pulls from aggregated payment data. Stripe webhook events update paid amounts; outstanding calculated from open invoices." />
          </div>
          <div className="flex h-48 items-end gap-2">
            {revenue.map((month) => (
              <div key={month.month} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex w-full flex-col justify-end" style={{ height: "160px" }}>
                  <div
                    className="w-full rounded-t bg-zen-500/80 transition-all"
                    style={{ height: `${(month.paid / maxRevenue) * 100}%` }}
                    title={`Paid: ${formatCurrency(month.paid)}`}
                  />
                  <div
                    className="w-full bg-slate-700/60"
                    style={{ height: `${(month.outstanding / maxRevenue) * 100}%` }}
                    title={`Outstanding: ${formatCurrency(month.outstanding)}`}
                  />
                </div>
                <span className="text-xs text-slate-500">{month.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-zen-500/80" /> Paid
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-slate-700" /> Outstanding
            </span>
          </div>
        </div>

        {/* Activity feed */}
        <div className="glass-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="font-semibold text-white">Recent Activity</h2>
            <DevNote note="Production: Activity feed populated from webhook events, cron job runs, and user actions. Stored in activity_log table." position="left" />
          </div>
          <div className="max-h-64 space-y-3 overflow-y-auto">
            {activities.slice(0, 8).map((act) => (
              <button
                key={act.id}
                type="button"
                onClick={() => act.invoiceId && onNavigate("invoices", act.invoiceId)}
                className="flex w-full gap-3 rounded-lg p-2 text-left transition hover:bg-slate-800/50"
              >
                <span className="text-lg">{activityIcons[act.type]}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs text-slate-300">{act.message}</p>
                  <p className="text-[10px] text-slate-600">
                    {new Date(act.timestamp).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick invoice table */}
      <div className="glass-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <h2 className="font-semibold text-white">Recent Invoices</h2>
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as InvoiceStatus | "all")}
              className="input-field !w-auto !py-1.5 text-xs"
            >
              <option value="all">All statuses</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="overdue">Overdue</option>
              <option value="draft">Draft</option>
            </select>
            <DevNote note="Production: Filter queries Supabase with indexed status column. Pagination for large datasets." position="left" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3">Invoice</th>
                <th className="px-5 py-3">Client</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Due</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.slice(0, 6).map((inv) => (
                <tr
                  key={inv.id}
                  onClick={() => onNavigate("invoices", inv.id)}
                  className="cursor-pointer border-b border-slate-800/50 transition hover:bg-slate-800/30"
                >
                  <td className="px-5 py-3 font-medium text-zen-400">{inv.number}</td>
                  <td className="px-5 py-3 text-slate-300">{inv.client}</td>
                  <td className="px-5 py-3 text-white">{formatCurrency(inv.amount)}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={inv.status} />
                  </td>
                  <td className="px-5 py-3 text-slate-400">{formatDate(inv.dueDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: InvoiceStatus }) {
  const styles: Record<InvoiceStatus, string> = {
    paid: "bg-zen-500/10 text-zen-400",
    unpaid: "bg-blue-500/10 text-blue-400",
    overdue: "bg-red-500/10 text-red-400",
    draft: "bg-slate-500/10 text-slate-400",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${styles[status]}`}>
      {status}
    </span>
  );
}

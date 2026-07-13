"use client";

import { useState } from "react";
import DevNote from "@/components/DevNote";
import type { Invoice, InvoiceStatus } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/mockData";

interface Props {
  invoices: Invoice[];
  statusFilter: InvoiceStatus | "all";
  setStatusFilter: (f: InvoiceStatus | "all") => void;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onMarkPaid: (id: string, method: "stripe" | "paypal") => void;
  onNavigate: (tab: "payment" | "reminders", id?: string) => void;
}

export default function InvoicesView({
  invoices,
  statusFilter,
  setStatusFilter,
  selectedId,
  onSelect,
  onMarkPaid,
  onNavigate,
}: Props) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "amount" | "client">("date");
  const [showDetail, setShowDetail] = useState(true);

  const filtered = invoices
    .filter((inv) => statusFilter === "all" || inv.status === statusFilter)
    .filter(
      (inv) =>
        inv.client.toLowerCase().includes(search.toLowerCase()) ||
        inv.number.toLowerCase().includes(search.toLowerCase()) ||
        inv.company.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "amount") return b.amount - a.amount;
      if (sortBy === "client") return a.client.localeCompare(b.client);
      return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
    });

  const selected = invoices.find((i) => i.id === selectedId);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Invoices</h1>
          <p className="text-sm text-slate-400">{filtered.length} invoices</p>
        </div>
        <DevNote note="Production: Full CRUD via Supabase. RLS ensures users only see their invoices. Stripe Payment Link URL stored per invoice." />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search invoices..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field max-w-xs"
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as InvoiceStatus | "all")} className="input-field !w-auto">
          <option value="all">All statuses</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="overdue">Overdue</option>
          <option value="draft">Draft</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} className="input-field !w-auto">
          <option value="date">Sort by date</option>
          <option value="amount">Sort by amount</option>
          <option value="client">Sort by client</option>
        </select>
        <button
          type="button"
          onClick={() => setShowDetail(!showDetail)}
          className="btn-secondary !py-2 text-xs"
        >
          {showDetail ? "Hide detail" : "Show detail"}
        </button>
      </div>

      <div className={`grid gap-6 ${showDetail && selected ? "lg:grid-cols-5" : ""}`}>
        <div className={`glass-card overflow-hidden ${showDetail && selected ? "lg:col-span-3" : ""}`}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Number</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="hidden px-4 py-3 sm:table-cell">Due</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => (
                <tr
                  key={inv.id}
                  onClick={() => onSelect(inv.id)}
                  className={`cursor-pointer border-b border-slate-800/50 transition hover:bg-slate-800/30 ${
                    selectedId === inv.id ? "bg-zen-500/5" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-zen-400">{inv.number}</td>
                  <td className="px-4 py-3 text-slate-300">{inv.client}</td>
                  <td className="px-4 py-3 text-white">{formatCurrency(inv.amount)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={inv.status} />
                  </td>
                  <td className="hidden px-4 py-3 text-slate-400 sm:table-cell">{formatDate(inv.dueDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showDetail && selected && (
          <div className="glass-card p-5 lg:col-span-2 animate-slide-up">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-white">{selected.number}</h3>
                <p className="text-sm text-slate-400">{selected.company}</p>
              </div>
              <StatusBadge status={selected.status} />
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Client</span>
                <span className="text-slate-300">{selected.client}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email</span>
                <span className="text-slate-300">{selected.clientEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount</span>
                <span className="font-semibold text-white">{formatCurrency(selected.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Issued</span>
                <span className="text-slate-300">{formatDate(selected.issueDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Due</span>
                <span className="text-slate-300">{formatDate(selected.dueDate)}</span>
              </div>
              {selected.paidDate && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Paid</span>
                  <span className="text-zen-400">{formatDate(selected.paidDate)} via {selected.paymentMethod}</span>
                </div>
              )}
            </div>

            <div className="mt-4 border-t border-slate-800 pt-4">
              <h4 className="mb-2 text-xs font-semibold uppercase text-slate-500">Line Items</h4>
              {selected.lineItems.map((li) => (
                <div key={li.id} className="flex justify-between py-1 text-sm">
                  <span className="text-slate-400">{li.description}</span>
                  <span className="text-slate-300">{formatCurrency(li.quantity * li.rate)}</span>
                </div>
              ))}
            </div>

            {selected.remindersSent.length > 0 && (
              <div className="mt-4 rounded-lg bg-amber-500/5 p-3 text-xs text-amber-300">
                Reminders sent: Day {selected.remindersSent.join(", ")}
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              {selected.status !== "paid" && selected.status !== "draft" && (
                <>
                  <button type="button" onClick={() => onNavigate("payment", selected.id)} className="btn-primary !py-2 text-xs">
                    View Payment Link
                  </button>
                  <button type="button" onClick={() => onNavigate("reminders", selected.id)} className="btn-secondary !py-2 text-xs">
                    Reminders
                  </button>
                  <button type="button" onClick={() => onMarkPaid(selected.id, "stripe")} className="btn-secondary !py-2 text-xs">
                    Mark Paid (Stripe)
                  </button>
                </>
              )}
            </div>
          </div>
        )}
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

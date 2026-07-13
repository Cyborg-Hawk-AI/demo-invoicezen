"use client";

import { useState } from "react";
import DevNote from "@/components/DevNote";
import { showToast } from "@/components/Toast";
import type { Expense } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/mockData";

interface Props {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

const CATEGORIES = ["Software", "Office", "Travel", "Meals", "Hosting", "Marketing", "Supplies"];

export default function ExpensesView({ expenses, setExpenses }: Props) {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newExpense, setNewExpense] = useState({ vendor: "", category: "Software", amount: 0 });

  const filtered =
    categoryFilter === "all" ? expenses : expenses.filter((e) => e.category === categoryFilter);

  const total = filtered.reduce((s, e) => s + e.amount, 0);

  const handleAdd = () => {
    if (!newExpense.vendor || newExpense.amount <= 0) return;
    setExpenses((prev) => [
      {
        id: `exp-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        vendor: newExpense.vendor,
        category: newExpense.category,
        amount: newExpense.amount,
        receipt: false,
      },
      ...prev,
    ]);
    showToast(`Expense added: ${newExpense.vendor}`, "success");
    setShowAddModal(false);
    setNewExpense({ vendor: "", category: "Software", amount: 0 });
  };

  const toggleReceipt = (id: string) => {
    setExpenses((prev) => prev.map((e) => (e.id === id ? { ...e, receipt: !e.receipt } : e)));
    showToast("Receipt status updated", "info");
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Expenses</h1>
          <p className="text-sm text-slate-400">Basic expense tracking for tax time</p>
        </div>
        <div className="flex items-center gap-2">
          <DevNote note="Production: Expenses stored in Supabase. Receipt uploads to S3 via presigned URLs. Included in CSV export for accountant." />
          <button type="button" onClick={() => setShowAddModal(true)} className="btn-primary text-sm">
            + Add Expense
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass-card p-4">
          <div className="text-sm text-slate-500">Total ({categoryFilter === "all" ? "all" : categoryFilter})</div>
          <div className="font-display text-2xl font-bold text-white">{formatCurrency(total)}</div>
        </div>
        <div className="glass-card p-4">
          <div className="text-sm text-slate-500">This month</div>
          <div className="font-display text-2xl font-bold text-zen-400">
            {formatCurrency(expenses.filter((e) => e.date.startsWith("2026-07")).reduce((s, e) => s + e.amount, 0))}
          </div>
        </div>
        <div className="glass-card p-4">
          <div className="text-sm text-slate-500">With receipts</div>
          <div className="font-display text-2xl font-bold text-white">
            {expenses.filter((e) => e.receipt).length} / {expenses.length}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategoryFilter("all")}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
            categoryFilter === "all" ? "bg-zen-500/10 text-zen-400" : "bg-slate-800 text-slate-400"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategoryFilter(cat)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
              categoryFilter === cat ? "bg-zen-500/10 text-zen-400" : "bg-slate-800 text-slate-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wider text-slate-500">
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Vendor</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((exp) => (
              <tr key={exp.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                <td className="px-5 py-3 text-slate-400">{formatDate(exp.date)}</td>
                <td className="px-5 py-3 text-white">{exp.vendor}</td>
                <td className="px-5 py-3">
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400">{exp.category}</span>
                </td>
                <td className="px-5 py-3 text-slate-300">{formatCurrency(exp.amount)}</td>
                <td className="px-5 py-3">
                  <button
                    type="button"
                    onClick={() => toggleReceipt(exp.id)}
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      exp.receipt ? "bg-zen-500/10 text-zen-400" : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    {exp.receipt ? "✓ Attached" : "Missing"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md p-6 animate-slide-up">
            <h3 className="text-lg font-semibold text-white">Add Expense</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-sm text-slate-400">Vendor</label>
                <input
                  type="text"
                  value={newExpense.vendor}
                  onChange={(e) => setNewExpense({ ...newExpense, vendor: e.target.value })}
                  className="input-field"
                  placeholder="e.g. Adobe"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-slate-400">Category</label>
                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  className="input-field"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm text-slate-400">Amount</label>
                <input
                  type="number"
                  value={newExpense.amount || ""}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
                  className="input-field"
                  min={0}
                  step={0.01}
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={handleAdd} className="btn-primary flex-1">
                Add Expense
              </button>
              <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

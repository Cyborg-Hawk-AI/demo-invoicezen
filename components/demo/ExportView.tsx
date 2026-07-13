"use client";

import { useState } from "react";
import DevNote from "@/components/DevNote";
import { showToast } from "@/components/Toast";
import type { Invoice, Expense } from "@/lib/types";
import { invoicesToCSV, expensesToCSV } from "@/lib/mockData";

interface Props {
  invoices: Invoice[];
  expenses: Expense[];
  onExport: (type: "invoices" | "expenses") => void;
}

export default function ExportView({ invoices, expenses, onExport }: Props) {
  const [dateRange, setDateRange] = useState<"q2" | "q3" | "all">("q2");
  const [exportType, setExportType] = useState<"invoices" | "expenses" | "both">("both");
  const [lastExport, setLastExport] = useState<string | null>(null);

  const filterByRange = (date: string) => {
    if (dateRange === "all") return true;
    if (dateRange === "q2") return date >= "2026-04-01" && date <= "2026-06-30";
    return date >= "2026-07-01";
  };

  const filteredInvoices = invoices.filter((i) => filterByRange(i.issueDate));
  const filteredExpenses = expenses.filter((e) => filterByRange(e.date));

  const handleExport = () => {
    let content = "";
    let filename = "";

    if (exportType === "invoices" || exportType === "both") {
      content += invoicesToCSV(filteredInvoices);
      filename = "invoicezen-invoices";
      onExport("invoices");
    }
    if (exportType === "both") content += "\n\n";
    if (exportType === "expenses" || exportType === "both") {
      if (exportType === "both") {
        content += "--- EXPENSES ---\n";
      }
      content += expensesToCSV(filteredExpenses);
      filename = exportType === "both" ? "invoicezen-export" : "invoicezen-expenses";
      onExport("expenses");
    }

    const blob = new Blob([content], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}-${dateRange}-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    setLastExport(new Date().toLocaleString());
    showToast(`CSV exported: ${filteredInvoices.length} invoices, ${filteredExpenses.length} expenses`, "success");
  };

  const previewInvoices = invoicesToCSV(filteredInvoices).split("\n").slice(0, 5);
  const previewExpenses = expensesToCSV(filteredExpenses).split("\n").slice(0, 5);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">CSV Export</h1>
          <p className="text-sm text-slate-400">One-click handoff for your accountant</p>
        </div>
        <DevNote note="Production: Server generates CSV from Supabase query with date filters. Optional scheduled quarterly email to accountant. No QuickBooks migration needed." />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card space-y-5 p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Date range</label>
            <div className="flex gap-2">
              {(["q2", "q3", "all"] as const).map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setDateRange(range)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium ${
                    dateRange === range ? "bg-zen-500/10 text-zen-400 ring-1 ring-zen-500/30" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {range === "q2" ? "Q2 2026" : range === "q3" ? "Q3 2026" : "All time"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Export type</label>
            <div className="flex gap-2">
              {(["invoices", "expenses", "both"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setExportType(type)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium capitalize ${
                    exportType === type ? "bg-zen-500/10 text-zen-400 ring-1 ring-zen-500/30" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-slate-800/50 p-4 text-sm">
            <div className="flex justify-between text-slate-400">
              <span>Invoices in range</span>
              <span className="text-white">{filteredInvoices.length}</span>
            </div>
            <div className="mt-2 flex justify-between text-slate-400">
              <span>Expenses in range</span>
              <span className="text-white">{filteredExpenses.length}</span>
            </div>
          </div>

          <button type="button" onClick={handleExport} className="btn-primary w-full">
            Download CSV
          </button>

          {lastExport && (
            <p className="text-center text-xs text-slate-500">Last export: {lastExport}</p>
          )}
        </div>

        <div className="glass-card p-6">
          <h2 className="mb-3 font-semibold text-white">Preview</h2>
          <div className="space-y-4">
            {(exportType === "invoices" || exportType === "both") && (
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase text-slate-500">Invoices</h3>
                <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3 text-[10px] leading-relaxed text-slate-400">
                  {previewInvoices.join("\n")}
                  {filteredInvoices.length > 4 && "\n..."}
                </pre>
              </div>
            )}
            {(exportType === "expenses" || exportType === "both") && (
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase text-slate-500">Expenses</h3>
                <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3 text-[10px] leading-relaxed text-slate-400">
                  {previewExpenses.join("\n")}
                  {filteredExpenses.length > 4 && "\n..."}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

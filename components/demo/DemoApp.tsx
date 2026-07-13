"use client";

import { useState, useMemo } from "react";
import type { Invoice, InvoiceStatus, ActivityItem, Expense, ReminderSchedule } from "@/lib/types";
import {
  INITIAL_INVOICES,
  INITIAL_EXPENSES,
  INITIAL_ACTIVITIES,
  INITIAL_REMINDERS,
  MONTHLY_REVENUE,
  formatCurrency,
} from "@/lib/mockData";
import ToastContainer, { showToast } from "@/components/Toast";
import DashboardView from "./DashboardView";
import CreateInvoiceView from "./CreateInvoiceView";
import InvoicesView from "./InvoicesView";
import RemindersView from "./RemindersView";
import PaymentPortalView from "./PaymentPortalView";
import ExpensesView from "./ExpensesView";
import ExportView from "./ExportView";
import SupportChat from "./SupportChat";

type Tab = "dashboard" | "create" | "invoices" | "reminders" | "payment" | "expenses" | "export";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "create", label: "Create Invoice", icon: "✏️" },
  { id: "invoices", label: "Invoices", icon: "📄" },
  { id: "reminders", label: "Reminders", icon: "⏰" },
  { id: "payment", label: "Payment Portal", icon: "💳" },
  { id: "expenses", label: "Expenses", icon: "🧾" },
  { id: "export", label: "CSV Export", icon: "📥" },
];

export default function DemoApp() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [reminders, setReminders] = useState<ReminderSchedule[]>(INITIAL_REMINDERS);
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | "all">("all");
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>("inv-002");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const stats = useMemo(() => {
    const paid = invoices.filter((i) => i.status === "paid");
    const unpaid = invoices.filter((i) => i.status === "unpaid");
    const overdue = invoices.filter((i) => i.status === "overdue");
    return {
      paidCount: paid.length,
      paidTotal: paid.reduce((s, i) => s + i.amount, 0),
      unpaidCount: unpaid.length,
      unpaidTotal: unpaid.reduce((s, i) => s + i.amount, 0),
      overdueCount: overdue.length,
      overdueTotal: overdue.reduce((s, i) => s + i.amount, 0),
    };
  }, [invoices]);

  const addActivity = (activity: Omit<ActivityItem, "id">) => {
    setActivities((prev) => [{ ...activity, id: `act-${Date.now()}` }, ...prev]);
  };

  const handleInvoiceCreated = (invoice: Invoice, sendMethod: "email" | "link") => {
    setInvoices((prev) => [invoice, ...prev]);
    addActivity({
      type: "invoice",
      message: `Invoice ${invoice.number} ${sendMethod === "email" ? "sent to" : "link shared with"} ${invoice.client}`,
      timestamp: new Date().toISOString(),
      invoiceId: invoice.id,
    });
    if (invoice.status === "unpaid") {
      setReminders((prev) => [
        ...prev,
        {
          invoiceId: invoice.id,
          invoiceNumber: invoice.number,
          client: invoice.client,
          amount: invoice.amount,
          daysPastDue: 0,
          nextReminderDay: 3,
          sentDays: [],
          status: "scheduled",
        },
      ]);
    }
    showToast(
      sendMethod === "email"
        ? `Invoice ${invoice.number} sent to ${invoice.clientEmail}`
        : `Payment link copied for ${invoice.number}`,
      "success"
    );
    setActiveTab("invoices");
  };

  const handleMarkPaid = (invoiceId: string, method: "stripe" | "paypal") => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId
          ? { ...inv, status: "paid" as const, paidDate: new Date().toISOString().split("T")[0], paymentMethod: method }
          : inv
      )
    );
    const inv = invoices.find((i) => i.id === invoiceId);
    if (inv) {
      addActivity({
        type: "payment",
        message: `Payment received from ${inv.client} — ${formatCurrency(inv.amount)} via ${method === "stripe" ? "Stripe" : "PayPal"}`,
        timestamp: new Date().toISOString(),
        invoiceId,
      });
      setReminders((prev) => prev.filter((r) => r.invoiceId !== invoiceId));
      showToast(`Payment of ${formatCurrency(inv.amount)} recorded`, "success");
    }
  };

  const handleSendReminder = (invoiceId: string, day: number) => {
    const inv = invoices.find((i) => i.id === invoiceId);
    if (!inv) return;
    setInvoices((prev) =>
      prev.map((i) => (i.id === invoiceId ? { ...i, remindersSent: [...i.remindersSent, day] } : i))
    );
    setReminders((prev) =>
      prev.map((r) => {
        if (r.invoiceId !== invoiceId) return r;
        const sentDays = [...r.sentDays, day];
        const nextDay = ([3, 7, 14] as const).find((d) => !sentDays.includes(d)) ?? null;
        return { ...r, sentDays, nextReminderDay: nextDay, status: nextDay ? "scheduled" : "sent" };
      })
    );
    addActivity({
      type: "reminder",
      message: `Day ${day} reminder sent to ${inv.client} for ${inv.number}`,
      timestamp: new Date().toISOString(),
      invoiceId,
    });
    showToast(`Day ${day} reminder sent to ${inv.client}`, "info");
  };

  const navigateTo = (tab: Tab, invoiceId?: string) => {
    setActiveTab(tab);
    if (invoiceId) setSelectedInvoiceId(invoiceId);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950">
      <ToastContainer />

      {/* Demo banner */}
      <div className="border-b border-amber-500/20 bg-amber-500/5 px-4 py-2 text-center text-sm text-amber-300">
        Interactive demo — all data is mocked. Every button works.{" "}
        <a href="/developers" className="underline hover:text-amber-200">
          See developer docs →
        </a>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`sticky top-[4.5rem] hidden h-[calc(100vh-4.5rem)] flex-col border-r border-slate-800 bg-slate-900/50 transition-all lg:flex ${
            sidebarCollapsed ? "w-16" : "w-56"
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-800 p-3">
            {!sidebarCollapsed && <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Workspace</span>}
            <button
              type="button"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="rounded p-1 text-slate-500 hover:bg-slate-800 hover:text-white"
              aria-label="Toggle sidebar"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 space-y-1 p-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? "bg-zen-500/10 text-zen-400"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                }`}
              >
                <span>{tab.icon}</span>
                {!sidebarCollapsed && tab.label}
              </button>
            ))}
          </nav>
          {!sidebarCollapsed && (
            <div className="border-t border-slate-800 p-3">
              <div className="rounded-lg bg-slate-800/50 p-3">
                <div className="text-xs text-slate-500">Alex Rivera</div>
                <div className="text-sm font-medium text-white">Rivera Design Co.</div>
                <div className="mt-1 text-xs text-zen-400">Pro Plan · $9/mo</div>
              </div>
            </div>
          )}
        </aside>

        {/* Mobile tabs */}
        <div className="fixed bottom-0 left-0 right-0 z-40 flex overflow-x-auto border-t border-slate-800 bg-slate-900/95 backdrop-blur lg:hidden">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex shrink-0 flex-col items-center gap-0.5 px-3 py-2 text-[10px] ${
                activeTab === tab.id ? "text-zen-400" : "text-slate-500"
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              {tab.label.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto pb-20 lg:pb-0">
          <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
            {activeTab === "dashboard" && (
              <DashboardView
                stats={stats}
                invoices={invoices}
                activities={activities}
                revenue={MONTHLY_REVENUE}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                onNavigate={navigateTo}
              />
            )}
            {activeTab === "create" && <CreateInvoiceView onCreated={handleInvoiceCreated} />}
            {activeTab === "invoices" && (
              <InvoicesView
                invoices={invoices}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                selectedId={selectedInvoiceId}
                onSelect={setSelectedInvoiceId}
                onMarkPaid={handleMarkPaid}
                onNavigate={navigateTo}
              />
            )}
            {activeTab === "reminders" && (
              <RemindersView reminders={reminders} invoices={invoices} onSendReminder={handleSendReminder} />
            )}
            {activeTab === "payment" && (
              <PaymentPortalView
                invoices={invoices}
                selectedId={selectedInvoiceId}
                onSelect={setSelectedInvoiceId}
                onPay={handleMarkPaid}
              />
            )}
            {activeTab === "expenses" && <ExpensesView expenses={expenses} setExpenses={setExpenses} />}
            {activeTab === "export" && (
              <ExportView
                invoices={invoices}
                expenses={expenses}
                onExport={(type) => {
                  addActivity({
                    type: "export",
                    message: `${type === "invoices" ? "Invoice" : "Expense"} CSV exported for accountant handoff`,
                    timestamp: new Date().toISOString(),
                  });
                }}
              />
            )}
          </div>
        </main>
      </div>

      <SupportChat />
    </div>
  );
}

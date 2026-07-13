"use client";

import DevNote from "@/components/DevNote";
import type { Invoice, ReminderSchedule } from "@/lib/types";
import { formatCurrency } from "@/lib/mockData";

interface Props {
  reminders: ReminderSchedule[];
  invoices: Invoice[];
  onSendReminder: (invoiceId: string, day: number) => void;
}

const REMINDER_DAYS = [3, 7, 14] as const;

export default function RemindersView({ reminders, invoices, onSendReminder }: Props) {
  const overdueInvoices = invoices.filter((i) => i.status === "overdue" || i.status === "unpaid");

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Payment Reminders</h1>
          <p className="text-sm text-slate-400">Automated on day 3, 7, and 14 past due</p>
        </div>
        <DevNote note="Production: Vercel Cron runs nightly at 9am UTC. Queries overdue invoices, checks reminder_schedule table, sends via Resend. No human trigger needed." />
      </div>

      {/* Schedule explanation */}
      <div className="glass-card p-5">
        <h2 className="mb-3 font-semibold text-white">Reminder Schedule</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {REMINDER_DAYS.map((day) => (
            <div key={day} className="rounded-lg bg-slate-800/50 p-4 text-center">
              <div className="font-display text-2xl font-bold text-zen-400">Day {day}</div>
              <p className="mt-1 text-xs text-slate-500">
                {day === 3 ? "Friendly nudge" : day === 7 ? "Second notice" : "Final reminder"}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-500">
          Cron job: <code className="rounded bg-slate-800 px-1.5 py-0.5 text-zen-400">0 9 * * *</code> — runs every night, zero manual ops
        </p>
      </div>

      {/* Active reminders */}
      <div className="glass-card overflow-hidden">
        <div className="border-b border-slate-800 px-5 py-4">
          <h2 className="font-semibold text-white">Active Reminder Queue</h2>
        </div>
        <div className="divide-y divide-slate-800/50">
          {reminders.map((rem) => (
              <div key={rem.invoiceId} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{rem.invoiceNumber}</span>
                    <span className="text-sm text-slate-400">— {rem.client}</span>
                  </div>
                  <div className="mt-1 text-sm text-slate-500">
                    {formatCurrency(rem.amount)} · {rem.daysPastDue > 0 ? `${rem.daysPastDue} days overdue` : "Not yet due"}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {REMINDER_DAYS.map((day) => (
                      <button
                        key={day}
                        type="button"
                        disabled={rem.sentDays.includes(day)}
                        onClick={() => onSendReminder(rem.invoiceId, day)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                          rem.sentDays.includes(day)
                            ? "bg-zen-500/10 text-zen-400 cursor-default"
                            : rem.nextReminderDay === day
                              ? "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/30 hover:bg-amber-500/20"
                              : "bg-slate-800 text-slate-500 hover:bg-slate-700 hover:text-white"
                        }`}
                      >
                        Day {day}
                        {rem.sentDays.includes(day) && " ✓"}
                      </button>
                    ))}
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      rem.status === "paid"
                        ? "bg-zen-500/10 text-zen-400"
                        : rem.status === "sent"
                          ? "bg-slate-500/10 text-slate-400"
                          : "bg-blue-500/10 text-blue-400"
                    }`}
                  >
                    {rem.status}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Timeline for overdue */}
      <div className="glass-card p-5">
        <h2 className="mb-4 font-semibold text-white">Overdue Invoice Timeline</h2>
        <div className="space-y-4">
          {overdueInvoices
            .filter((i) => i.status === "overdue")
            .map((inv) => (
              <div key={inv.id} className="flex items-center gap-4">
                <div className="w-32 shrink-0 text-sm font-medium text-zen-400">{inv.number}</div>
                <div className="flex flex-1 items-center gap-2">
                  {REMINDER_DAYS.map((day) => (
                    <div
                      key={day}
                      className={`h-2 flex-1 rounded-full ${
                        inv.remindersSent.includes(day) ? "bg-zen-500" : "bg-slate-800"
                      }`}
                      title={`Day ${day} ${inv.remindersSent.includes(day) ? "sent" : "pending"}`}
                    />
                  ))}
                </div>
                <div className="w-20 text-right text-xs text-slate-500">{inv.daysOverdue}d late</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

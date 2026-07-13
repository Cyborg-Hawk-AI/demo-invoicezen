"use client";

import { useState } from "react";
import DevNote from "@/components/DevNote";
import type { Invoice, LineItem } from "@/lib/types";
import { MOCK_CLIENTS, generateInvoiceNumber, formatCurrency } from "@/lib/mockData";

interface Props {
  onCreated: (invoice: Invoice, method: "email" | "link") => void;
}

export default function CreateInvoiceView({ onCreated }: Props) {
  const [clientIdx, setClientIdx] = useState(0);
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: "new-1", description: "Design consultation", quantity: 1, rate: 500 },
    { id: "new-2", description: "UI mockups (3 screens)", quantity: 1, rate: 1200 },
  ]);
  const [dueDays, setDueDays] = useState(14);
  const [notes, setNotes] = useState("Payment due within 14 days. Thank you for your business!");
  const [showPreview, setShowPreview] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);

  const client = MOCK_CLIENTS[clientIdx];
  const subtotal = lineItems.reduce((s, li) => s + li.quantity * li.rate, 0);
  const issueDate = new Date().toISOString().split("T")[0];
  const dueDate = new Date(Date.now() + dueDays * 86400000).toISOString().split("T")[0];

  const addLineItem = () => {
    setLineItems((prev) => [
      ...prev,
      { id: `new-${Date.now()}`, description: "", quantity: 1, rate: 0 },
    ]);
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setLineItems((prev) => prev.map((li) => (li.id === id ? { ...li, [field]: value } : li)));
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) setLineItems((prev) => prev.filter((li) => li.id !== id));
  };

  const buildInvoice = (): Invoice => ({
    id: `inv-${Date.now()}`,
    number: generateInvoiceNumber(),
    client: client.name,
    clientEmail: client.email,
    company: client.company,
    amount: subtotal,
    status: "unpaid",
    issueDate,
    dueDate,
    remindersSent: [],
    lineItems,
  });

  const handleSend = (method: "email" | "link") => {
    onCreated(buildInvoice(), method);
    setShowSendModal(false);
    setLineItems([
      { id: "new-1", description: "Design consultation", quantity: 1, rate: 500 },
    ]);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Create Invoice</h1>
          <p className="text-sm text-slate-400">One screen. Send in under 60 seconds.</p>
        </div>
        <div className="flex items-center gap-2">
          <DevNote note="Production: Single-page form posts to /api/invoices. Generates Stripe Payment Link on save. Sends via Resend/SendGrid email with embedded pay button." />
          <button type="button" onClick={() => setShowPreview(!showPreview)} className="btn-secondary text-sm">
            {showPreview ? "Hide Preview" : "Preview"}
          </button>
        </div>
      </div>

      <div className={`grid gap-6 ${showPreview ? "lg:grid-cols-2" : ""}`}>
        <div className="glass-card space-y-5 p-6">
          {/* Client */}
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-300">
              Client
              <DevNote note="Production: Autocomplete from clients table. New clients saved on first invoice." position="right" />
            </label>
            <select
              value={clientIdx}
              onChange={(e) => setClientIdx(Number(e.target.value))}
              className="input-field"
            >
              {MOCK_CLIENTS.map((c, i) => (
                <option key={c.email} value={i}>
                  {c.name} — {c.company}
                </option>
              ))}
            </select>
          </div>

          {/* Line items */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300">Line Items</label>
              <button type="button" onClick={addLineItem} className="text-xs text-zen-400 hover:text-zen-300">
                + Add item
              </button>
            </div>
            <div className="space-y-2">
              {lineItems.map((li) => (
                <div key={li.id} className="flex gap-2">
                  <input
                    type="text"
                    value={li.description}
                    onChange={(e) => updateLineItem(li.id, "description", e.target.value)}
                    placeholder="Description"
                    className="input-field flex-1"
                  />
                  <input
                    type="number"
                    value={li.quantity}
                    onChange={(e) => updateLineItem(li.id, "quantity", Number(e.target.value))}
                    className="input-field w-16"
                    min={1}
                  />
                  <input
                    type="number"
                    value={li.rate}
                    onChange={(e) => updateLineItem(li.id, "rate", Number(e.target.value))}
                    className="input-field w-24"
                    min={0}
                    step={0.01}
                  />
                  <button
                    type="button"
                    onClick={() => removeLineItem(li.id)}
                    className="rounded p-2 text-slate-500 hover:bg-red-500/10 hover:text-red-400"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-2 text-right text-sm text-slate-400">
              Subtotal: <span className="font-semibold text-white">{formatCurrency(subtotal)}</span>
            </div>
          </div>

          {/* Due date */}
          <div>
            <label className="mb-1.5 text-sm font-medium text-slate-300">Payment terms</label>
            <div className="flex gap-2">
              {[7, 14, 30].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setDueDays(days)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    dueDays === days
                      ? "bg-zen-500/10 text-zen-400 ring-1 ring-zen-500/30"
                      : "bg-slate-800/50 text-slate-400 hover:text-white"
                  }`}
                >
                  Net {days}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-1.5 text-sm font-medium text-slate-300">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="input-field resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setShowSendModal(true)} className="btn-primary flex-1">
              Send Invoice
            </button>
            <button
              type="button"
              onClick={() => {
                const inv = buildInvoice();
                inv.status = "draft";
                onCreated(inv, "link");
              }}
              className="btn-secondary"
            >
              Save Draft
            </button>
          </div>
        </div>

        {showPreview && (
          <div className="glass-card p-6 animate-slide-up">
            <h3 className="mb-4 font-semibold text-white">Invoice Preview</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="font-display text-lg font-bold text-zen-400">Rivera Design Co.</div>
                  <div className="text-slate-500">alex@riveradesign.co</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-500">Invoice</div>
                  <div className="font-mono text-white">{generateInvoiceNumber()}</div>
                </div>
              </div>
              <div>
                <div className="text-slate-500">Bill to</div>
                <div className="font-medium text-white">{client.name}</div>
                <div className="text-slate-400">{client.company}</div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-slate-500">
                    <th className="pb-2">Item</th>
                    <th className="pb-2 text-right">Qty</th>
                    <th className="pb-2 text-right">Rate</th>
                    <th className="pb-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((li) => (
                    <tr key={li.id} className="border-t border-slate-800/50">
                      <td className="py-2 text-slate-300">{li.description || "—"}</td>
                      <td className="py-2 text-right text-slate-400">{li.quantity}</td>
                      <td className="py-2 text-right text-slate-400">{formatCurrency(li.rate)}</td>
                      <td className="py-2 text-right text-white">{formatCurrency(li.quantity * li.rate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="border-t border-slate-800 pt-4 text-right">
                <span className="text-slate-400">Total: </span>
                <span className="font-display text-xl font-bold text-white">{formatCurrency(subtotal)}</span>
              </div>
              <p className="text-xs text-slate-500">{notes}</p>
            </div>
          </div>
        )}
      </div>

      {/* Send modal */}
      {showSendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md p-6 animate-slide-up">
            <h3 className="text-lg font-semibold text-white">Send Invoice</h3>
            <p className="mt-2 text-sm text-slate-400">
              Send {formatCurrency(subtotal)} invoice to {client.email}
            </p>
            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={() => handleSend("email")}
                className="btn-primary w-full"
              >
                📧 Send via Email
              </button>
              <button
                type="button"
                onClick={() => handleSend("link")}
                className="btn-secondary w-full"
              >
                🔗 Copy Payment Link
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowSendModal(false)}
              className="mt-4 w-full text-center text-sm text-slate-500 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

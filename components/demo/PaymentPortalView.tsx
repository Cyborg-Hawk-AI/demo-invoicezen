"use client";

import { useState } from "react";
import DevNote from "@/components/DevNote";
import { showToast } from "@/components/Toast";
import type { Invoice } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/mockData";

interface Props {
  invoices: Invoice[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onPay: (id: string, method: "stripe" | "paypal") => void;
}

export default function PaymentPortalView({ invoices, selectedId, onSelect, onPay }: Props) {
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal">("stripe");
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);

  const payableInvoices = invoices.filter((i) => i.status === "unpaid" || i.status === "overdue");
  const selected = invoices.find((i) => i.id === selectedId) ?? payableInvoices[0];

  const handlePay = () => {
    if (!selected) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaid(true);
      onPay(selected.id, paymentMethod);
      setTimeout(() => setPaid(false), 3000);
    }, 1500);
  };

  const copyLink = () => {
    if (!selected) return;
    navigator.clipboard?.writeText(`https://pay.invoicezen.app/i/${selected.number}`);
    showToast("Payment link copied to clipboard", "info");
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Client Payment Portal</h1>
          <p className="text-sm text-slate-400">What your client sees when they open the invoice link</p>
        </div>
        <DevNote note="Production: Public route /pay/[invoiceId] renders Stripe Checkout or PayPal Smart Buttons. Webhook updates invoice status to 'paid' on success — zero manual checking." />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Invoice selector (admin side) */}
        <div className="glass-card p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">Select Invoice</h2>
          <div className="space-y-2">
            {payableInvoices.map((inv) => (
              <button
                key={inv.id}
                type="button"
                onClick={() => {
                  onSelect(inv.id);
                  setPaid(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg p-3 text-left transition ${
                  selected?.id === inv.id ? "bg-zen-500/10 ring-1 ring-zen-500/30" : "hover:bg-slate-800/50"
                }`}
              >
                <div>
                  <div className="font-medium text-white">{inv.number}</div>
                  <div className="text-xs text-slate-500">{inv.client}</div>
                </div>
                <div className="font-semibold text-zen-400">{formatCurrency(inv.amount)}</div>
              </button>
            ))}
          </div>
          <button type="button" onClick={copyLink} className="btn-secondary mt-4 w-full text-sm">
            Copy Payment Link
          </button>
        </div>

        {/* Client-facing payment UI */}
        {selected && (
          <div className="glass-card overflow-hidden animate-slide-up">
            <div className="border-b border-slate-800 bg-slate-800/30 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="font-display text-lg font-bold text-zen-400">InvoiceZen</div>
                <span className="text-xs text-slate-500">Secure payment</span>
              </div>
            </div>

            <div className="p-6">
              {paid ? (
                <div className="py-12 text-center animate-fade-in">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zen-500/20 text-3xl">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold text-white">Payment Successful!</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    {formatCurrency(selected.amount)} paid to Rivera Design Co.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-sm text-slate-500">Invoice from Rivera Design Co.</p>
                    <h3 className="mt-1 text-2xl font-bold text-white">{formatCurrency(selected.amount)}</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {selected.number} · Due {formatDate(selected.dueDate)}
                    </p>
                  </div>

                  <div className="mb-4 space-y-2 rounded-lg bg-slate-800/30 p-4 text-sm">
                    {selected.lineItems.map((li) => (
                      <div key={li.id} className="flex justify-between text-slate-400">
                        <span>{li.description}</span>
                        <span>{formatCurrency(li.quantity * li.rate)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-slate-300">Payment method</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("stripe")}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-lg border py-3 text-sm font-medium transition ${
                          paymentMethod === "stripe"
                            ? "border-zen-500/50 bg-zen-500/10 text-zen-400"
                            : "border-slate-700 text-slate-400 hover:border-slate-600"
                        }`}
                      >
                        <span className="font-bold">stripe</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("paypal")}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-lg border py-3 text-sm font-medium transition ${
                          paymentMethod === "paypal"
                            ? "border-zen-500/50 bg-zen-500/10 text-zen-400"
                            : "border-slate-700 text-slate-400 hover:border-slate-600"
                        }`}
                      >
                        <span className="font-bold text-blue-400">Pay</span>
                        <span className="font-bold text-blue-300">Pal</span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePay}
                    disabled={processing}
                    className="btn-primary w-full py-3 text-base disabled:opacity-50"
                  >
                    {processing ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                        Processing...
                      </span>
                    ) : (
                      `Pay ${formatCurrency(selected.amount)}`
                    )}
                  </button>

                  <p className="mt-4 text-center text-xs text-slate-600">
                    Payments secured by {paymentMethod === "stripe" ? "Stripe" : "PayPal"}. Invoice status updates automatically via webhook.
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

const FAQ = [
  {
    q: "How do I send an invoice?",
    a: "Go to Create Invoice, fill in your client and line items, then click Send. You can email it directly or copy a payment link.",
  },
  {
    q: "When do payment reminders go out?",
    a: "Automatically on day 3, 7, and 14 after the due date. No setup required — InvoiceZen handles it via a nightly cron job.",
  },
  {
    q: "What payment methods are supported?",
    a: "Stripe and PayPal are built into every invoice link. Clients pay directly — you get notified via webhook when it's paid.",
  },
  {
    q: "Can I export data for my accountant?",
    a: "Yes! Go to CSV Export, pick your date range, and download. Clean data, no QuickBooks migration needed.",
  },
  {
    q: "How much does InvoiceZen cost?",
    a: "$9/month or $79/year flat. No per-invoice fees. Manage your subscription via Stripe Customer Portal.",
  },
  {
    q: "Will you add payroll or inventory?",
    a: "No — and that's our promise. InvoiceZen will never add payroll, inventory, or bank reconciliation. Subtraction, not addition.",
  },
];

export default function SupportChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hi! I'm InvoiceZen support. Ask me anything about invoicing, payments, or reminders." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const findAnswer = (question: string): string => {
    const lower = question.toLowerCase();
    const match = FAQ.find(
      (f) =>
        lower.includes(f.q.toLowerCase().split(" ")[0]) ||
        f.q.toLowerCase().split(" ").some((w) => w.length > 4 && lower.includes(w))
    );
    if (match) return match.a;
    if (lower.includes("price") || lower.includes("cost")) return FAQ[4].a;
    if (lower.includes("remind")) return FAQ[1].a;
    if (lower.includes("export") || lower.includes("csv") || lower.includes("accountant")) return FAQ[3].a;
    if (lower.includes("pay") || lower.includes("stripe") || lower.includes("paypal")) return FAQ[2].a;
    return "I can help with invoicing, reminders, payments, and exports. Try asking about one of those topics, or check our FAQ at /developers.";
  };

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: findAnswer(userMsg) }]);
      setTyping(false);
    }, 800);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-zen-500 text-slate-950 shadow-lg shadow-zen-500/30 transition hover:bg-zen-400 lg:bottom-6"
        aria-label="Support chat"
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {open && (
        <div className="fixed bottom-36 right-4 z-50 flex h-96 w-80 flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl animate-slide-up lg:bottom-24">
          <div className="border-b border-slate-800 bg-slate-800/50 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-zen-400" />
              <span className="text-sm font-semibold text-white">InvoiceZen Support</span>
            </div>
            <p className="text-[10px] text-slate-500">AI-powered · ~85% resolution rate</p>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-xs ${
                    msg.role === "user" ? "bg-zen-500/20 text-zen-100" : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="rounded-lg bg-slate-800 px-3 py-2 text-xs text-slate-500">Typing...</div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-800 p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask a question..."
                className="input-field flex-1 !py-1.5 text-xs"
              />
              <button type="button" onClick={send} className="btn-primary !px-3 !py-1.5 text-xs">
                Send
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {["How do reminders work?", "Pricing?", "Export CSV"].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => {
                    setInput(q);
                  }}
                  className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400 hover:text-white"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

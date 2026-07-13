import type { ActivityItem, Expense, Invoice, ReminderSchedule } from "./types";

export const MOCK_CLIENTS = [
  { name: "Sarah Chen", email: "sarah@northwindstudio.com", company: "Northwind Studio" },
  { name: "Marcus Webb", email: "marcus@pixelcraft.io", company: "PixelCraft Agency" },
  { name: "Elena Rodriguez", email: "elena@brightpath.co", company: "BrightPath Consulting" },
  { name: "James Okafor", email: "james@terraforge.dev", company: "TerraForge Labs" },
  { name: "Priya Sharma", email: "priya@luminary.health", company: "Luminary Health" },
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: "inv-001",
    number: "INV-2026-042",
    client: "Sarah Chen",
    clientEmail: "sarah@northwindstudio.com",
    company: "Northwind Studio",
    amount: 2850,
    status: "paid",
    issueDate: "2026-06-15",
    dueDate: "2026-06-29",
    paidDate: "2026-06-22",
    paymentMethod: "stripe",
    remindersSent: [],
    lineItems: [
      { id: "li-1", description: "Brand identity refresh", quantity: 1, rate: 2200 },
      { id: "li-2", description: "Social media templates (12)", quantity: 1, rate: 650 },
    ],
  },
  {
    id: "inv-002",
    number: "INV-2026-043",
    client: "Marcus Webb",
    clientEmail: "marcus@pixelcraft.io",
    company: "PixelCraft Agency",
    amount: 4200,
    status: "unpaid",
    issueDate: "2026-06-28",
    dueDate: "2026-07-12",
    remindersSent: [],
    lineItems: [
      { id: "li-3", description: "Website redesign — Phase 2", quantity: 1, rate: 3500 },
      { id: "li-4", description: "CMS training session", quantity: 2, rate: 350 },
    ],
  },
  {
    id: "inv-003",
    number: "INV-2026-038",
    client: "Elena Rodriguez",
    clientEmail: "elena@brightpath.co",
    company: "BrightPath Consulting",
    amount: 1875,
    status: "overdue",
    issueDate: "2026-05-20",
    dueDate: "2026-06-03",
    daysOverdue: 40,
    remindersSent: [3, 7, 14],
    lineItems: [
      { id: "li-5", description: "Q2 strategy workshop", quantity: 3, rate: 450 },
      { id: "li-6", description: "Deliverables review", quantity: 1, rate: 525 },
    ],
  },
  {
    id: "inv-004",
    number: "INV-2026-044",
    client: "James Okafor",
    clientEmail: "james@terraforge.dev",
    company: "TerraForge Labs",
    amount: 5600,
    status: "paid",
    issueDate: "2026-06-10",
    dueDate: "2026-06-24",
    paidDate: "2026-06-18",
    paymentMethod: "paypal",
    remindersSent: [],
    lineItems: [
      { id: "li-7", description: "API integration sprint", quantity: 40, rate: 125 },
      { id: "li-8", description: "Documentation package", quantity: 1, rate: 600 },
    ],
  },
  {
    id: "inv-005",
    number: "INV-2026-045",
    client: "Priya Sharma",
    clientEmail: "priya@luminary.health",
    company: "Luminary Health",
    amount: 3200,
    status: "unpaid",
    issueDate: "2026-07-01",
    dueDate: "2026-07-15",
    remindersSent: [],
    lineItems: [
      { id: "li-9", description: "Patient portal UX audit", quantity: 1, rate: 2400 },
      { id: "li-10", description: "Accessibility remediation", quantity: 16, rate: 50 },
    ],
  },
  {
    id: "inv-006",
    number: "INV-2026-039",
    client: "Sarah Chen",
    clientEmail: "sarah@northwindstudio.com",
    company: "Northwind Studio",
    amount: 950,
    status: "overdue",
    issueDate: "2026-06-01",
    dueDate: "2026-06-15",
    daysOverdue: 28,
    remindersSent: [3, 7],
    lineItems: [
      { id: "li-11", description: "Logo variations export", quantity: 1, rate: 450 },
      { id: "li-12", description: "Print-ready asset pack", quantity: 1, rate: 500 },
    ],
  },
  {
    id: "inv-007",
    number: "INV-2026-046",
    client: "Marcus Webb",
    clientEmail: "marcus@pixelcraft.io",
    company: "PixelCraft Agency",
    amount: 1650,
    status: "paid",
    issueDate: "2026-05-05",
    dueDate: "2026-05-19",
    paidDate: "2026-05-14",
    paymentMethod: "stripe",
    remindersSent: [],
    lineItems: [
      { id: "li-13", description: "Email template design", quantity: 5, rate: 275 },
      { id: "li-14", description: "Responsive testing", quantity: 2, rate: 137.5 },
    ],
  },
  {
    id: "inv-008",
    number: "INV-2026-047",
    client: "Elena Rodriguez",
    clientEmail: "elena@brightpath.co",
    company: "BrightPath Consulting",
    amount: 2100,
    status: "draft",
    issueDate: "2026-07-10",
    dueDate: "2026-07-24",
    remindersSent: [],
    lineItems: [
      { id: "li-15", description: "Market research synthesis", quantity: 1, rate: 1800 },
      { id: "li-16", description: "Executive summary deck", quantity: 1, rate: 300 },
    ],
  },
];

export const INITIAL_EXPENSES: Expense[] = [
  { id: "exp-001", date: "2026-07-08", vendor: "Adobe Creative Cloud", category: "Software", amount: 54.99, receipt: true },
  { id: "exp-002", date: "2026-07-05", vendor: "WeWork", category: "Office", amount: 350, receipt: true },
  { id: "exp-003", date: "2026-07-02", vendor: "Delta Airlines", category: "Travel", amount: 428.5, receipt: true },
  { id: "exp-004", date: "2026-06-28", vendor: "Figma", category: "Software", amount: 15, receipt: true },
  { id: "exp-005", date: "2026-06-25", vendor: "Sweetgreen", category: "Meals", amount: 18.75, receipt: false },
  { id: "exp-006", date: "2026-06-20", vendor: "Amazon Web Services", category: "Hosting", amount: 47.32, receipt: true },
  { id: "exp-007", date: "2026-06-15", vendor: "LinkedIn Premium", category: "Marketing", amount: 39.99, receipt: true },
  { id: "exp-008", date: "2026-06-10", vendor: "Staples", category: "Supplies", amount: 67.43, receipt: true },
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  { id: "act-001", type: "payment", message: "Payment received from James Okafor — $5,600 via PayPal", timestamp: "2026-06-18T14:32:00Z", invoiceId: "inv-004" },
  { id: "act-002", type: "reminder", message: "Day 14 reminder sent to Elena Rodriguez for INV-2026-038", timestamp: "2026-06-17T09:00:00Z", invoiceId: "inv-003" },
  { id: "act-003", type: "invoice", message: "Invoice INV-2026-045 sent to Priya Sharma via email", timestamp: "2026-07-01T11:15:00Z", invoiceId: "inv-005" },
  { id: "act-004", type: "payment", message: "Payment received from Sarah Chen — $2,850 via Stripe", timestamp: "2026-06-22T09:45:00Z", invoiceId: "inv-001" },
  { id: "act-005", type: "reminder", message: "Day 7 reminder sent to Sarah Chen for INV-2026-039", timestamp: "2026-06-22T09:00:00Z", invoiceId: "inv-006" },
  { id: "act-006", type: "export", message: "Q2 invoice CSV exported for accountant handoff", timestamp: "2026-07-01T16:20:00Z" },
  { id: "act-007", type: "reminder", message: "Day 3 reminder sent to Elena Rodriguez for INV-2026-038", timestamp: "2026-06-06T09:00:00Z", invoiceId: "inv-003" },
  { id: "act-008", type: "invoice", message: "Invoice INV-2026-043 sent to Marcus Webb with payment link", timestamp: "2026-06-28T10:30:00Z", invoiceId: "inv-002" },
];

export const INITIAL_REMINDERS: ReminderSchedule[] = [
  {
    invoiceId: "inv-003",
    invoiceNumber: "INV-2026-038",
    client: "Elena Rodriguez",
    amount: 1875,
    daysPastDue: 40,
    nextReminderDay: null,
    sentDays: [3, 7, 14],
    status: "sent",
  },
  {
    invoiceId: "inv-006",
    invoiceNumber: "INV-2026-039",
    client: "Sarah Chen",
    amount: 950,
    daysPastDue: 28,
    nextReminderDay: 14,
    sentDays: [3, 7],
    status: "scheduled",
  },
  {
    invoiceId: "inv-002",
    invoiceNumber: "INV-2026-043",
    client: "Marcus Webb",
    amount: 4200,
    daysPastDue: 1,
    nextReminderDay: 3,
    sentDays: [],
    status: "scheduled",
  },
];

export const MONTHLY_REVENUE = [
  { month: "Feb", paid: 4200, outstanding: 1800 },
  { month: "Mar", paid: 6800, outstanding: 2400 },
  { month: "Apr", paid: 5100, outstanding: 3100 },
  { month: "May", paid: 8900, outstanding: 1650 },
  { month: "Jun", paid: 12450, outstanding: 4200 },
  { month: "Jul", paid: 3200, outstanding: 7400 },
];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function generateInvoiceNumber(): string {
  const num = 48 + Math.floor(Math.random() * 100);
  return `INV-2026-${String(num).padStart(3, "0")}`;
}

export function invoicesToCSV(invoices: Invoice[]): string {
  const headers = ["Invoice Number", "Client", "Company", "Amount", "Status", "Issue Date", "Due Date", "Paid Date"];
  const rows = invoices.map((inv) => [
    inv.number,
    inv.client,
    inv.company,
    inv.amount.toFixed(2),
    inv.status,
    inv.issueDate,
    inv.dueDate,
    inv.paidDate || "",
  ]);
  return [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
}

export function expensesToCSV(expenses: Expense[]): string {
  const headers = ["Date", "Vendor", "Category", "Amount", "Receipt"];
  const rows = expenses.map((exp) => [
    exp.date,
    exp.vendor,
    exp.category,
    exp.amount.toFixed(2),
    exp.receipt ? "Yes" : "No",
  ]);
  return [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
}

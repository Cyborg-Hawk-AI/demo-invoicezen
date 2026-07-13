export type InvoiceStatus = "paid" | "unpaid" | "overdue" | "draft";

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface Invoice {
  id: string;
  number: string;
  client: string;
  clientEmail: string;
  company: string;
  amount: number;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  daysOverdue?: number;
  remindersSent: number[];
  paymentMethod?: "stripe" | "paypal";
  paidDate?: string;
  lineItems: LineItem[];
}

export interface Expense {
  id: string;
  date: string;
  vendor: string;
  category: string;
  amount: number;
  receipt: boolean;
}

export interface ActivityItem {
  id: string;
  type: "payment" | "reminder" | "invoice" | "export";
  message: string;
  timestamp: string;
  invoiceId?: string;
}

export interface ReminderSchedule {
  invoiceId: string;
  invoiceNumber: string;
  client: string;
  amount: number;
  daysPastDue: number;
  nextReminderDay: 3 | 7 | 14 | null;
  sentDays: number[];
  status: "scheduled" | "sent" | "paid";
}

import type { Metadata } from "next";
import DemoApp from "@/components/demo/DemoApp";

export const metadata: Metadata = {
  title: "Demo — InvoiceZen",
  description: "Interactive mock of InvoiceZen invoicing for freelancers.",
};

export default function DemoPage() {
  return <DemoApp />;
}

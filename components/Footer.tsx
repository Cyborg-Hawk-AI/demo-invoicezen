import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-zen-400 to-zen-600">
                <svg className="h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="font-display text-lg font-bold text-white">InvoiceZen</span>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Dead-simple invoicing for freelancers fleeing QuickBooks bloat.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Product</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/demo" className="text-sm text-slate-400 transition hover:text-zen-400">
                  Interactive Demo
                </Link>
              </li>
              <li>
                <Link href="/developers" className="text-sm text-slate-400 transition hover:text-zen-400">
                  Developer Docs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Research</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/research" className="text-sm text-slate-400 transition hover:text-zen-400">
                  How we found this idea
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row">
          <p className="text-xs text-slate-600">
            Demo built by Idea Miner · Mock data only · No real payments processed
          </p>
          <p className="text-xs text-slate-600">© 2026 InvoiceZen</p>
        </div>
      </div>
    </footer>
  );
}

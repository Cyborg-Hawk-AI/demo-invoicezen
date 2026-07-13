"use client";

import { useState, useRef, useEffect } from "react";

interface DevNoteProps {
  note: string;
  position?: "top" | "bottom" | "left" | "right";
}

export default function DevNote({ note, position = "top" }: DevNoteProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div ref={ref} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/30 transition hover:bg-amber-500/30"
        aria-label="Developer note"
        title="DEV NOTE"
      >
        <span className="text-[10px] font-bold">i</span>
      </button>
      {open && (
        <div
          className={`absolute z-50 w-64 rounded-lg border border-amber-500/30 bg-slate-900 p-3 shadow-xl animate-fade-in ${positionClasses[position]}`}
        >
          <div className="mb-1 flex items-center gap-1.5">
            <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-400">
              DEV NOTE
            </span>
          </div>
          <p className="text-xs leading-relaxed text-slate-300">{note}</p>
        </div>
      )}
    </div>
  );
}

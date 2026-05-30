export default function LocationSection() {
  return (
    <section className="w-full relative overflow-hidden" style={{ height: 320 }}>

      {/* Map pin */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
        <div className="w-10 h-10 bg-[var(--clr-text)] rounded-full flex items-center justify-center shadow-lg">
          <div className="w-3 h-3 bg-white rounded-full" />
        </div>
        <div className="w-2.5 h-2.5 bg-[var(--clr-text)] rotate-45 -mt-1.5" />
      </div>

      {/* Location card */}
      <div className="absolute bottom-6 inset-x-0">
        <div className="max-w-[1275px] mx-auto px-6">
          <div className="inline-flex bg-white rounded-xl px-5 py-4 items-center gap-6 shadow-sm">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Location</p>
              <p className="text-lg font-bold text-[var(--clr-text)]">Sunset Boulevard, 17</p>
            </div>
            <button className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:border-gray-400 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}

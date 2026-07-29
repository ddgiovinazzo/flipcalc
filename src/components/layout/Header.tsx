export function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-10">
      <div className="max-w-md mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* A simple SVG icon to give it an app feel */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <h1 className="text-xl font-bold tracking-wide">FlipCalc</h1>
        </div>
      </div>
    </header>
  );
}

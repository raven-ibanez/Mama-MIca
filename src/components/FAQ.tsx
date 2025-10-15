
import { useFaqs } from '../hooks/useFaqs';

export default function FAQ(): JSX.Element {
  const { faqs, loading, error } = useFaqs();
  return (
    <main className="min-h-screen bg-gradient-purple-light overflow-x-hidden">
      {/* Brand bar */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-purple-200">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 lg:px-8 h-14 sm:h-16 flex items-center justify-between w-full">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-2 ring-purple-300 bg-gradient-purple flex-shrink-0">
              <img src="/logo.jpg" alt="Mama Mica GLW" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
            </div>
            <div className="min-w-0">
              <div className="text-lg sm:text-xl font-bold text-gradient-purple break-words">Mama Mica GLW</div>
              <div className="text-xs text-purple-600 font-medium">Peptide FAQ</div>
            </div>
          </div>
          <a 
            href="/admin" 
            className="bg-purple-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl hover:bg-purple-700 transition-colors text-xs sm:text-sm font-medium flex-shrink-0"
          >
            Admin
          </a>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12 lg:py-16 w-full">
        <header className="text-center mb-8 sm:mb-12 w-full">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient-purple mb-3 sm:mb-4 break-words">Frequently Asked Questions</h1>
          <p className="text-purple-600 text-base sm:text-lg">Everything you need to know about our peptide services and ordering process.</p>
        </header>

        {loading ? (
          <div className="text-center py-8">
            <div className="text-purple-600 text-sm sm:text-base">Loading FAQs...</div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="text-red-600 text-sm sm:text-base">Error loading FAQs: {error}</div>
          </div>
        ) : (
          <section className="space-y-3 sm:space-y-4 w-full">
            {faqs.map((item, idx) => (
              <details key={item.id || idx} className="group rounded-xl sm:rounded-2xl border-2 border-purple-200 bg-white p-3 sm:p-4 lg:p-5 shadow-purple w-full">
                <summary className="flex cursor-pointer list-none items-start sm:items-center justify-between gap-2 sm:gap-3 w-full">
                  <span className="text-base sm:text-lg lg:text-xl font-semibold text-neutral-900 group-open:text-purple-700 leading-tight flex-1 min-w-0 break-words">
                    {item.question}
                  </span>
                  <span className="shrink-0 rounded-full bg-purple-100 px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold text-purple-700 group-open:bg-purple-600 group-open:text-white">
                    {idx + 1}
                  </span>
                </summary>
                <div className="mt-3 text-neutral-700 leading-relaxed whitespace-pre-line text-sm sm:text-base break-words">
                  {item.answer}
                </div>
              </details>
            ))}
          </section>
        )}

        <footer className="mt-8 sm:mt-12 lg:mt-14 text-center text-xs sm:text-sm text-neutral-500">
          © {new Date().getFullYear()} Mama Mica GLW • Last updated {new Date().toLocaleDateString()}
        </footer>
      </div>
    </main>
  );
}



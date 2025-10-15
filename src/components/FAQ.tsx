
import { useFaqs } from '../hooks/useFaqs';

export default function FAQ(): JSX.Element {
  const { faqs, loading, error } = useFaqs();
  return (
    <main className="min-h-screen bg-gradient-purple-light">
      {/* Brand bar */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-purple-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-300 bg-gradient-purple">
              <img src="/logo.jpg" alt="Mama Mica GLW" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
            </div>
            <div>
              <div className="text-xl font-bold text-gradient-purple">Mama Mica GLW</div>
              <div className="text-xs text-purple-600 font-medium">Peptide FAQ</div>
            </div>
          </div>
          <a 
            href="/admin" 
            className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition-colors text-sm font-medium"
          >
            Admin
          </a>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient-purple mb-4">Frequently Asked Questions</h1>
          <p className="text-purple-600 text-lg">Everything you need to know about our peptide services and ordering process.</p>
        </header>

        {loading ? (
          <div className="text-center py-8">
            <div className="text-purple-600">Loading FAQs...</div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="text-red-600">Error loading FAQs: {error}</div>
          </div>
        ) : (
          <section className="space-y-4">
            {faqs.map((item, idx) => (
              <details key={item.id || idx} className="group rounded-2xl border-2 border-purple-200 bg-white p-5 shadow-purple">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                  <span className="text-xl font-semibold text-neutral-900 group-open:text-purple-700">
                    {item.question}
                  </span>
                  <span className="shrink-0 rounded-full bg-purple-100 px-3 py-1 text-sm font-bold text-purple-700 group-open:bg-purple-600 group-open:text-white">
                    {idx + 1}
                  </span>
                </summary>
                <div className="mt-3 text-neutral-700 leading-relaxed whitespace-pre-line">
                  {item.answer}
                </div>
              </details>
            ))}
          </section>
        )}

        <footer className="mt-14 text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} Mama Mica GLW • Last updated {new Date().toLocaleDateString()}
        </footer>
      </div>
    </main>
  );
}



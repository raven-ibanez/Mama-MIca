import React, { useMemo, useState } from 'react';
import { useFaqs } from '../hooks/useFaqs';

type Message = { role: 'user' | 'bot'; text: string; title?: string };

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

export default function ChatBot(): JSX.Element {
  const { faqs } = useFaqs();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Hi! Ask me anything about shipping, COA, payment, or peptides.' },
  ]);

  const index = useMemo(() => {
    return faqs.map((f, i) => ({ i, q: normalize(f.question), a: normalize(f.answer), full: normalize(`${f.question} ${f.answer}`), raw: f }));
  }, [faqs]);

  const keywordBoost: Record<string, number> = {
    shipping: 3, fee: 2, cost: 1, delivery: 2, weeks: 1,
    safe: 4, safety: 4, peptides: 1,
    coa: 4, certificate: 3, analysis: 2,
    bacteriostatic: 4, water: 2, bac: 3,
    syringe: 3, needle: 2, brand: 1,
    track: 3, tracking: 3, order: 1,
    shelf: 3, life: 2, storage: 2,
    group: 3, individual: 3, buy: 1,
    customs: 3, confiscated: 3, reship: 3,
    minimum: 3, min: 2,
    vendor: 2, partner: 2,
    payment: 2, bank: 2, unionbank: 2, gotyme: 2, seabank: 2, bpi: 2,
    sterile: 3,
    box: 2, vials: 2,
  };

  function search(query: string): { title?: string; text: string } {
    const n = normalize(query);
    if (!n) return { text: 'Please type a question.' };
    // Small scoring function with keyword boosts and overlap across question+answer
    const terms = new Set(n.split(' '));
    let best = { score: 0, item: undefined as undefined | typeof index[number] };
    for (const item of index) {
      const words = item.full.split(' ');
      let score = 0;
      for (const w of words) {
        if (terms.has(w)) score += 1;
        if (w in keywordBoost && terms.has(w)) score += keywordBoost[w];
      }
      // soft match: if user includes a keyword, add boost when item question contains it
      for (const t of terms) {
        if (keywordBoost[t] && item.q.includes(t)) score += keywordBoost[t];
      }
      if (score > best.score) best = { score, item };
    }
    if (!best.item || best.score === 0) {
      return { text: 'I could not find an exact answer. Try keywords like: shipping, COA, payment, syringe, shelf life, tracking, group buy.' };
    }
    return { title: best.item.raw.question, text: best.item.raw.answer };
  }

  function onSend(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const q = input.trim();
    if (!q) return;
    const a = search(q);
    setMessages((m) => [...m, { role: 'user', text: q }, { role: 'bot', text: a.text, title: a.title }]);
    setInput('');
  }

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-gradient-purple text-white px-4 py-3 sm:px-5 sm:py-4 rounded-full shadow-purple-lg hover:scale-110 transition text-sm sm:text-base"
          aria-label="Open chat"
        >
          Chat
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[90vw] max-w-sm bg-white rounded-2xl border-2 border-purple-200 shadow-purple-lg overflow-hidden">
          <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-gradient-purple text-white">
            <div className="font-bold text-sm sm:text-base">Mama Mica GLW — FAQ Bot</div>
            <button onClick={() => setOpen(false)} className="text-white/90 hover:text-white text-lg">✕</button>
          </div>
          <div className="max-h-60 sm:max-h-80 overflow-y-auto px-3 sm:px-4 py-2 sm:py-3 space-y-2 sm:space-y-3">
            {messages.map((m, idx) => (
              <div key={idx} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                {m.title && (
                  <div className="text-xs font-semibold text-purple-700 mb-1">{m.title}</div>
                )}
                <div className={
                  m.role === 'user'
                    ? 'inline-block bg-purple-600 text-white px-3 py-2 rounded-xl max-w-[85%]'
                    : 'inline-block bg-purple-50 text-purple-900 px-3 py-2 rounded-xl border border-purple-200 max-w-[85%]'
                }>
                  <div className="whitespace-pre-line text-sm sm:text-base">{m.text}</div>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={onSend} className="flex items-center gap-2 p-2 sm:p-3 border-t border-purple-200">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 rounded-xl border-2 border-purple-200 px-2 sm:px-3 py-1.5 sm:py-2 focus:outline-none focus:border-purple-400 text-sm sm:text-base"
            />
            <button type="submit" className="bg-purple-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl hover:bg-purple-700 text-sm sm:text-base">Send</button>
          </form>
        </div>
      )}
    </>
  );
}



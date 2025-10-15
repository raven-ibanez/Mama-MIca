import React, { useState, useEffect } from 'react';
import { FaqItem } from '../hooks/useFaqs';
import { defaultFaqs as localFaqs } from '../data/defaultFaqs';

const AdminFAQ: React.FC = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQuestion, setEditQuestion] = useState('');
  const [editAnswer, setEditAnswer] = useState('');

  // Check if Supabase is configured
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

  async function getSupabase() {
    if (!isSupabaseConfigured) return null;
    const { createClient } = await import('@supabase/supabase-js');
    const url = String(supabaseUrl).trim();
    const key = String(supabaseAnonKey).trim();
    if (!/^https?:\/\//i.test(url)) {
      throw new Error("Failed to construct 'URL': Invalid URL");
    }
    return createClient(url, key);
  }

  const load = async () => {
    setLoading(true);
    try {
      // Check if Supabase is available
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('Supabase not configured, using local FAQs only');
        setFaqs(localFaqs.map((faq, index) => ({
          id: `local-${index}`,
          question: faq.question,
          answer: faq.answer,
          sort_order: index,
          is_active: true,
          created_at: new Date().toISOString(),
        })));
        return;
      }

      // Dynamically import supabase
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setFaqs(data || []);
    } catch (err: any) {
      console.error('Error loading FAQs:', err.message);
      setError(null); // Don't show error, just use fallback
      // Fallback to local data
      setFaqs(localFaqs.map((faq, index) => ({
        id: `local-${index}`,
        question: faq.question,
        answer: faq.answer,
        sort_order: index,
        is_active: true,
        created_at: new Date().toISOString(),
      })));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  async function seedFromLocal() {
    if (faqs.length > 0) {
      setError('FAQs already exist. Clear them first if you want to re-import.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      // Check if Supabase is available
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey) {
        setError('Supabase not configured. Cannot import to database.');
        setSaving(false);
        return;
      }

      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const rows = localFaqs.map((f, i) => ({ 
        question: f.question, 
        answer: f.answer, 
        sort_order: i + 1, 
        is_active: true 
      }));
      console.log('Importing FAQs:', rows.length);
      const { error } = await supabase.from('faqs').insert(rows);
      if (error) {
        console.error('Import error:', error);
        setError(`Import failed: ${error.message}`);
      } else {
        console.log('Import successful');
        setError(null);
      }
    } catch (err) {
      console.error('Import exception:', err);
      setError(`Import failed: ${err}`);
    }
    setSaving(false);
    load();
  }

  async function createFaq() {
    if (!newQuestion.trim() || !newAnswer.trim()) return;
    if (!isSupabaseConfigured) {
      setError('Supabase not configured. Please set up your .env file.');
      return;
    }
    setSaving(true);
    try {
      const supabase = await getSupabase();
      if (!supabase) throw new Error('Supabase not available');
      const maxOrder = faqs.reduce((m, f) => Math.max(m, f.sort_order), 0);
      const { error } = await supabase
        .from('faqs')
        .insert({
          question: newQuestion.trim(),
          answer: newAnswer.trim(),
          sort_order: maxOrder + 1,
          is_active: true,
        });
      if (error) throw error;
      setNewQuestion('');
      setNewAnswer('');
      await load();
    } catch (e: any) {
      setError(e.message || 'Failed to create FAQ');
    } finally {
      setSaving(false);
    }
  }

  async function updateFaq(id: string) {
    if (!isSupabaseConfigured) {
      setError('Supabase not configured. Please set up your .env file.');
      return;
    }
    if (!editQuestion.trim() || !editAnswer.trim()) return;
    setSaving(true);
    try {
      const supabase = await getSupabase();
      if (!supabase) throw new Error('Supabase not available');
      const { error } = await supabase
        .from('faqs')
        .update({ question: editQuestion.trim(), answer: editAnswer.trim() })
        .eq('id', id);
      if (error) throw error;
      setEditingId(null);
      await load();
    } catch (e: any) {
      setError(e.message || 'Failed to update FAQ');
    } finally {
      setSaving(false);
    }
  }

  async function removeFaq(id: string) {
    if (!confirm('Delete this FAQ?')) return;
    if (!isSupabaseConfigured) {
      setError('Supabase not configured. Please set up your .env file.');
      return;
    }
    setSaving(true);
    try {
      const supabase = await getSupabase();
      if (!supabase) throw new Error('Supabase not available');
      const { error } = await supabase.from('faqs').delete().eq('id', id);
      if (error) throw error;
      await load();
    } catch (e: any) {
      setError(e.message || 'Failed to delete FAQ');
    } finally {
      setSaving(false);
    }
  }

  async function clearAllFaqs() {
    if (!confirm('Delete ALL FAQs? This cannot be undone.')) return;
    if (!isSupabaseConfigured) {
      setError('Supabase not configured. Please set up your .env file.');
      return;
    }
    setSaving(true);
    try {
      const supabase = await getSupabase();
      if (!supabase) throw new Error('Supabase not available');
      const { error } = await supabase.from('faqs').delete().neq('id', '');
      if (error) throw error;
      await load();
    } catch (e: any) {
      setError(e.message || 'Failed to clear FAQs');
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(id: string, isActive: boolean) {
    if (!isSupabaseConfigured) {
      setError('Supabase not configured. Please set up your .env file.');
      return;
    }
    setSaving(true);
    try {
      const supabase = await getSupabase();
      if (!supabase) throw new Error('Supabase not available');
      const { error } = await supabase
        .from('faqs')
        .update({ is_active: !isActive })
        .eq('id', id);
      if (error) throw error;
      await load();
    } catch (e: any) {
      setError(e.message || 'Failed to toggle');
    } finally {
      setSaving(false);
    }
  }

  function move(idx: number, dir: -1 | 1) {
    const a = faqs[idx];
    const b = faqs[idx + dir];
    if (!a || !b) return;

    const newFaqs = [...faqs];
    [newFaqs[idx], newFaqs[idx + dir]] = [newFaqs[idx + dir], newFaqs[idx]];
    setFaqs(newFaqs);

    // Update sort_order in database
    (async () => {
      if (!isSupabaseConfigured) return;
      const supabase = await getSupabase();
      if (!supabase) return;
      await supabase.from('faqs').update({ sort_order: a.sort_order }).eq('id', b.id);
      await supabase.from('faqs').update({ sort_order: b.sort_order }).eq('id', a.id);
    })();
  }

  function startEdit(faq: FaqItem) {
    setEditingId(faq.id);
    setEditQuestion(faq.question);
    setEditAnswer(faq.answer);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditQuestion('');
    setEditAnswer('');
  }

  return (
    <div className="min-h-screen bg-gradient-purple-light py-4 sm:py-8 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 w-full">
        <div className="bg-white rounded-2xl shadow-purple-lg p-4 sm:p-6 lg:p-8 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4 w-full">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient-purple break-words">FAQ Admin Dashboard</h1>
              <p className="text-purple-600 mt-1 sm:mt-2 text-sm sm:text-base">Manage your frequently asked questions</p>
            </div>
            <a 
              href="/" 
              className="bg-purple-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl hover:bg-purple-700 transition-colors text-sm sm:text-base text-center flex-shrink-0"
            >
              ← Back to FAQ
            </a>
          </div>

          {!isSupabaseConfigured && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-6">
              <strong>Supabase not configured.</strong> Admin functions are disabled. To enable full admin functionality, please set up your Supabase environment variables in a .env file.
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Add New FAQ */}
          <section className="rounded-2xl border-2 border-purple-200 bg-purple-50 p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-purple-800">Add New FAQ</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2">Question</label>
                <input
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  disabled={!isSupabaseConfigured}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  placeholder="Enter the question..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2">Answer</label>
                <textarea
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  rows={3}
                  disabled={!isSupabaseConfigured}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base resize-none"
                  placeholder="Enter the answer..."
                />
              </div>
              <button
                onClick={createFaq}
                disabled={!isSupabaseConfigured || saving || !newQuestion.trim() || !newAnswer.trim()}
                className="w-full sm:w-auto bg-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {saving ? 'Adding...' : 'Add FAQ'}
              </button>
            </div>
          </section>

          {/* All FAQs */}
          <section className="rounded-2xl border-2 border-purple-200 bg-white p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">All FAQs</h2>
            {loading ? (
              <div className="text-center py-8 text-sm sm:text-base">Loading...</div>
            ) : faqs.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                <div className="mb-4 text-sm sm:text-base">No FAQs yet.</div>
                <button
                  onClick={seedFromLocal}
                  disabled={saving}
                  className="w-full sm:w-auto bg-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-purple-700 disabled:opacity-50 text-sm sm:text-base"
                >
                  {saving ? 'Importing...' : 'Import Default FAQs'}
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={seedFromLocal}
                    disabled={saving}
                    className="flex-1 sm:flex-none bg-purple-600 text-white px-3 sm:px-4 py-2 rounded-xl hover:bg-purple-700 disabled:opacity-50 text-sm sm:text-base"
                  >
                    {saving ? 'Importing...' : 'Re-import FAQs'}
                  </button>
                  <button
                    onClick={clearAllFaqs}
                    disabled={saving}
                    className="flex-1 sm:flex-none bg-red-600 text-white px-3 sm:px-4 py-2 rounded-xl hover:bg-red-700 disabled:opacity-50 text-sm sm:text-base"
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-3 sm:space-y-4 w-full">
                  {faqs.map((faq, idx) => (
                    <div key={faq.id} className="border border-purple-200 rounded-xl p-3 sm:p-4 bg-purple-50 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 w-full">
                        <div className="flex-1 min-w-0 w-full">
                          {editingId === faq.id ? (
                            <div className="space-y-3">
                              <input
                                type="text"
                                value={editQuestion}
                                onChange={(e) => setEditQuestion(e.target.value)}
                                className="w-full px-3 py-2 border border-purple-300 rounded-lg text-sm sm:text-base"
                              />
                              <textarea
                                value={editAnswer}
                                onChange={(e) => setEditAnswer(e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-purple-300 rounded-lg text-sm sm:text-base resize-none"
                              />
                              <div className="flex flex-col sm:flex-row gap-2">
                                <button
                                  onClick={() => updateFaq(faq.id)}
                                  className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 text-sm sm:text-base"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={cancelEdit}
                                  className="flex-1 bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600 text-sm sm:text-base"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <h3 className="font-semibold text-purple-800 mb-2 text-sm sm:text-base leading-tight">{faq.question}</h3>
                              <p className="text-gray-700 whitespace-pre-line text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                              <div className="flex flex-wrap items-center gap-2 mt-2">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  faq.is_active 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {faq.is_active ? 'Active' : 'Inactive'}
                                </span>
                                <span className="text-xs text-gray-500">Order: {faq.sort_order}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        {editingId !== faq.id && (
                          <div className="flex flex-col sm:flex-col gap-2 sm:gap-2 flex-shrink-0">
                            <div className="flex gap-2 sm:flex-col">
                              <button
                                onClick={() => startEdit(faq)}
                                className="flex-1 sm:w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-xs sm:text-sm whitespace-nowrap"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => toggleActive(faq.id, faq.is_active)}
                                className={`flex-1 sm:w-full px-3 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${
                                  faq.is_active
                                    ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                                }`}
                              >
                                {faq.is_active ? 'Deactivate' : 'Activate'}
                              </button>
                            </div>
                            <div className="flex gap-2 sm:flex-col">
                              <button
                                onClick={() => removeFaq(faq.id)}
                                className="flex-1 sm:w-full bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 text-xs sm:text-sm whitespace-nowrap"
                              >
                                Delete
                              </button>
                              <div className="flex gap-1 sm:flex-col">
                                <button
                                  onClick={() => move(idx, -1)}
                                  disabled={idx === 0}
                                  className="bg-gray-600 text-white px-2 py-1 rounded text-xs hover:bg-gray-700 disabled:opacity-50"
                                >
                                  ↑
                                </button>
                                <button
                                  onClick={() => move(idx, 1)}
                                  disabled={idx === faqs.length - 1}
                                  className="bg-gray-600 text-white px-2 py-1 rounded text-xs hover:bg-gray-700 disabled:opacity-50"
                                >
                                  ↓
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminFAQ;

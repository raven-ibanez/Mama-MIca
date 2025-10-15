import { useState, useEffect } from 'react';
import { defaultFaqs } from '../data/defaultFaqs';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export const useFaqs = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        // Check if Supabase is available
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseAnonKey) {
          console.warn('Supabase environment variables not set, using local FAQs');
          // Use local data immediately
          setFaqs(defaultFaqs.map((faq, index) => ({
            id: `local-${index}`,
            question: faq.question,
            answer: faq.answer,
            sort_order: index,
            is_active: true,
            created_at: new Date().toISOString(),
          })));
          setLoading(false);
          return;
        }

        // Dynamically import supabase to avoid errors
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        const { data, error } = await supabase
          .from('faqs')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          setFaqs(data);
        } else {
          // Fallback to local data if no data from Supabase
          console.warn('No FAQs found in Supabase, using default local FAQs.');
          setFaqs(defaultFaqs.map((faq, index) => ({
            id: `local-${index}`,
            question: faq.question,
            answer: faq.answer,
            sort_order: index,
            is_active: true,
            created_at: new Date().toISOString(),
          })));
        }
      } catch (err: any) {
        console.error('Error fetching FAQs from Supabase:', err.message);
        setError(null); // Don't show error, just use fallback
        // Always fallback to local data on error
        setFaqs(defaultFaqs.map((faq, index) => ({
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

    fetchFaqs();
  }, []);

  return { faqs, loading, error };
};

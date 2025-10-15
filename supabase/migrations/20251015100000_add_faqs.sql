-- faqs table for website and chatbot
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create index if not exists faqs_active_idx on public.faqs(is_active, sort_order);

-- Row Level Security with simple read access
alter table public.faqs enable row level security;

do $$ begin
  create policy "faqs_read" on public.faqs
    for select
    using (is_active = true);
exception when duplicate_object then null; end $$;

-- trigger to keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end; $$ language plpgsql;

drop trigger if exists faqs_set_updated_at on public.faqs;
create trigger faqs_set_updated_at
before update on public.faqs
for each row execute function public.set_updated_at();


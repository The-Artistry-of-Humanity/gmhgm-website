create table public.coaching_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  location text not null,
  reason text not null,
  package_interest text not null,
  weekly_time text not null,
  notes text
);

alter table public.coaching_enquiries enable row level security;

create policy "Anyone can submit a coaching enquiry"
  on public.coaching_enquiries
  for insert
  to anon, authenticated
  with check (true);

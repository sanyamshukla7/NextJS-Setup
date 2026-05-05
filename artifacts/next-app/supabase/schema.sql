-- CampusX — items table
-- Paste this entire file into: Supabase Dashboard → SQL Editor → New Query → Run

create table if not exists public.items (
  id           uuid        default gen_random_uuid() primary key,
  created_at   timestamptz default now()             not null,
  user_id      uuid        references auth.users(id) on delete cascade not null,
  seller_email text                                  not null,
  title        text                                  not null,
  description  text,
  price        numeric(10, 2)                        not null,
  listing_type text        not null check (listing_type in ('sale', 'rent')),
  category     text        not null,
  condition    text        check (condition in ('New', 'Like New', 'Good', 'Fair')),
  status       text        default 'active'          check (status in ('active', 'sold', 'archived'))
);

-- Row-level security
alter table public.items enable row level security;

-- Public read — all visitors can browse listings
create policy "Anyone can view active items"
  on public.items for select
  using (status = 'active');

-- Authenticated IITP students can insert their own listings
create policy "Authenticated users can create listings"
  on public.items for insert
  with check (auth.uid() = user_id);

-- Owners can update their own listings
create policy "Owners can update their listings"
  on public.items for update
  using (auth.uid() = user_id);

-- Owners can delete their own listings
create policy "Owners can delete their listings"
  on public.items for delete
  using (auth.uid() = user_id);

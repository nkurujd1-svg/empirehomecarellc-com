ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS brochure_url text,
  ADD COLUMN IF NOT EXISTS brochure_label text DEFAULT 'Download Brochure',
  ADD COLUMN IF NOT EXISTS brochure_visible boolean DEFAULT true;
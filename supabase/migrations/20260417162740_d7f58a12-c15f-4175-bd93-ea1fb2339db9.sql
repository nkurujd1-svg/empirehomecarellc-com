
-- ============ STORAGE BUCKET ============
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Public can read, write, update, delete (open admin model)
CREATE POLICY "Public read site-assets"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'site-assets');

CREATE POLICY "Public upload site-assets"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'site-assets');

CREATE POLICY "Public update site-assets"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'site-assets');

CREATE POLICY "Public delete site-assets"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'site-assets');

-- ============ SITE SETTINGS (single row) ============
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL DEFAULT 'Empire Home Care LLC',
  tagline text DEFAULT 'Care You Can Trust, Comfort You Deserve',
  logo_url text,
  phone text,
  phone_href text,
  email text,
  address text,
  address_map_url text,
  opening_hours text,
  footer_about text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT TO public USING (true);
CREATE POLICY "Public manage site_settings" ON public.site_settings FOR ALL TO public USING (true) WITH CHECK (true);
CREATE TRIGGER trg_site_settings_updated BEFORE UPDATE ON public.site_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.site_settings (business_name, tagline, phone, phone_href, email, address, address_map_url, opening_hours, footer_about)
VALUES (
  'Empire Home Care LLC',
  'Care You Can Trust, Comfort You Deserve',
  '(605) 321-8915',
  'tel:+16053218915',
  'info@empirehomecarellc.com',
  '707 W 11th St, Sioux Falls, SD 57104',
  'https://maps.google.com/?q=707+W+11th+St+Sioux+Falls+SD+57104',
  'Monday – Friday: 8:00 AM – 5:00 PM',
  'Providing compassionate, professional home health care services that empower individuals to live with dignity and independence.'
);

-- ============ SOCIAL LINKS ============
CREATE TABLE public.social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  url text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read social_links" ON public.social_links FOR SELECT TO public USING (true);
CREATE POLICY "Public manage social_links" ON public.social_links FOR ALL TO public USING (true) WITH CHECK (true);
CREATE TRIGGER trg_social_links_updated BEFORE UPDATE ON public.social_links
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.social_links (platform, url, sort_order) VALUES
('facebook', 'https://facebook.com/', 1),
('instagram', 'https://instagram.com/', 2),
('linkedin', 'https://linkedin.com/', 3),
('tiktok', 'https://tiktok.com/', 4),
('twitter', 'https://x.com/', 5);

-- ============ HERO SLIDES ============
CREATE TABLE public.hero_slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  badge_text text,
  title text NOT NULL,
  title_accent text,
  description text,
  image_url text,
  primary_cta_label text,
  primary_cta_url text,
  secondary_cta_label text,
  secondary_cta_url text,
  sort_order int NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read hero_slides" ON public.hero_slides FOR SELECT TO public USING (true);
CREATE POLICY "Public manage hero_slides" ON public.hero_slides FOR ALL TO public USING (true) WITH CHECK (true);
CREATE TRIGGER trg_hero_slides_updated BEFORE UPDATE ON public.hero_slides
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.hero_slides (badge_text, title, title_accent, description, primary_cta_label, primary_cta_url, secondary_cta_label, secondary_cta_url, sort_order) VALUES
('Trusted Home Health Care', 'Compassionate Care,', 'Right at Home',
 'Empire Home Care LLC provides personalized, professional home health services that empower your loved ones to live with dignity, comfort, and independence.',
 'Get Started', '/contact', 'Our Services', '/services', 1),
('Available 24/7', 'Help When You Need It,', 'Day or Night',
 'Our licensed and insured caregivers are available around the clock to support your family with personalized care plans tailored to every need.',
 'Request a Consultation', '/contact', 'Meet Our Team', '/about', 2),
('Locally Owned in Sioux Falls', 'Proudly Serving', 'South Dakota Families',
 'From personal assistance to companionship, Empire Home Care brings warmth, reliability and dignity into the homes we serve every day.',
 'Talk to Us', '/contact', 'Explore Services', '/services', 3);

-- ============ SERVICES ============
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text NOT NULL DEFAULT 'HandHeart',
  title text NOT NULL,
  short_description text,
  full_description text,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  image_url text,
  sort_order int NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  is_featured boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read services" ON public.services FOR SELECT TO public USING (true);
CREATE POLICY "Public manage services" ON public.services FOR ALL TO public USING (true) WITH CHECK (true);
CREATE TRIGGER trg_services_updated BEFORE UPDATE ON public.services
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.services (icon, title, short_description, full_description, items, sort_order) VALUES
('HandHeart', 'Personal Assistance',
 'Compassionate, hands-on support with bathing, dressing, grooming, mobility, and medication reminders — preserving dignity in every detail.',
 'As an experienced provider of personal care programs, we provide support to individuals in the comfort of their homes. Some of the services included in personal assistance are:',
 '["Bathing or showering","Dressing and grooming","Hair, skin, and nail care","Oral hygiene","Shaving","Toileting/incontinence care","Walking and exercise assistance","Medication reminders","Feeding"]'::jsonb,
 1),
('Home', 'Homemaking Care',
 'Light housekeeping, meal preparation, laundry and errands — keeping your loved one''s home safe, clean and comfortable, 24/7.',
 'We offer household services in order to keep your home a clean and safe place. Our services are available 24 hours a day, seven days a week. Homemaking services are a great option for when you first begin using assistance in the comfort of your home. It includes:',
 '["Meal planning and preparation","Light housekeeping","Vacuuming and dusting","Sweeping and mopping","Changing bed sheets","Laundry","Dishwashing","Cleaning bathroom and kitchen","Emptying trash","Assistance sorting and reading the mail"]'::jsonb,
 2),
('Users', 'Companion Care',
 'Friendly conversation, walks, games, appointment escorts and meaningful connection that brightens every day.',
 'Companion care is a special service that we offer. It includes the following activities:',
 '["Accompaniment on errands or to doctor appointments","Assistance with grocery shopping","Walking to get fresh air and exercise","Writing letters","Playing games","Reading aloud","Friendly conversation"]'::jsonb,
 3);

-- ============ ABOUT CONTENT (single row) ============
CREATE TABLE public.about_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  preview_heading text,
  preview_heading_accent text,
  preview_paragraph_1 text,
  preview_paragraph_2 text,
  preview_image_url text,
  preview_highlights jsonb NOT NULL DEFAULT '[]'::jsonb,
  preview_badge_value text,
  preview_badge_label text,

  about_heading text,
  about_heading_accent text,
  about_paragraph_1 text,
  about_paragraph_2 text,
  about_paragraph_3 text,
  about_values jsonb NOT NULL DEFAULT '[]'::jsonb,

  mission text,
  vision text,
  core_values jsonb NOT NULL DEFAULT '[]'::jsonb,

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read about_content" ON public.about_content FOR SELECT TO public USING (true);
CREATE POLICY "Public manage about_content" ON public.about_content FOR ALL TO public USING (true) WITH CHECK (true);
CREATE TRIGGER trg_about_content_updated BEFORE UPDATE ON public.about_content
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.about_content (
  preview_heading, preview_heading_accent, preview_paragraph_1, preview_paragraph_2,
  preview_highlights, preview_badge_value, preview_badge_label,
  about_heading, about_heading_accent,
  about_paragraph_1, about_paragraph_2, about_paragraph_3,
  about_values,
  mission, vision, core_values
) VALUES (
  'Caring for Your Family', 'Like Our Own',
  'At Empire Home Care LLC, we believe everyone deserves high-quality, compassionate care in the comfort of their own home. Our dedicated professionals are committed to enhancing the quality of life for seniors and individuals with special needs.',
  'Founded on empathy, integrity, and excellence, we go beyond the basics to create meaningful connections with every client we serve.',
  '["Personalized care plans","Licensed & insured caregivers","Available 24/7","Culturally sensitive care"]'::jsonb,
  '10+', 'Years caring for families',

  'Caring for Your Family', 'Like Our Own',
  'At Empire Home Care LLC, we believe that everyone deserves high-quality, compassionate care in the comfort of their own home. Our team of dedicated professionals is committed to enhancing the quality of life for seniors and individuals with special needs.',
  'At Empire Home Care, we are dedicated to providing compassionate, high-quality care that allows individuals to remain safe, comfortable, and independent in the place they call home. We understand that every client has unique needs, which is why we offer personalized care plans tailored to support each individual''s lifestyle, health, and well-being.',
  'Founded on the principles of empathy, integrity, and excellence, we go beyond the basics to create meaningful connections with every client we serve.',
  '["Personalized care plans for every client","Licensed & insured caregivers","Available 24 hours a day, 7 days a week","Culturally sensitive and respectful care","Regular communication with families","Ongoing caregiver training & supervision"]'::jsonb,

  'Empire Home Care is committed to delivering compassionate, reliable, and personalized in-home care services that enhance the quality of life for our clients. We promote independence, dignity, and comfort while providing families with peace of mind through trusted, professional support.',
  'Our vision is to become a leading provider of home care services, known for excellence, compassion, and integrity; empowering individuals to live safely and independently in the comfort of their own homes.',
  '[
    {"icon":"Heart","title":"Compassion","desc":"We care with empathy, kindness, and respect."},
    {"icon":"Shield","title":"Integrity","desc":"We uphold honesty and strong ethical standards in everything we do."},
    {"icon":"Award","title":"Excellence","desc":"We are committed to high-quality care and continuous improvement."},
    {"icon":"Users","title":"Respect","desc":"We honor the dignity, preferences, and individuality of every client."},
    {"icon":"CheckCircle2","title":"Reliability","desc":"We provide dependable and consistent care families can trust."}
  ]'::jsonb
);

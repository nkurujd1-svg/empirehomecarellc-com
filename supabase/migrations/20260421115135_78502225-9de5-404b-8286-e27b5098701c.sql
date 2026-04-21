ALTER TABLE public.site_content
  ADD CONSTRAINT site_content_section_key_unique UNIQUE (section, key);
-- Lock down all public-manage policies; require admin role for writes.
-- Keep public SELECT where it currently is public.

-- about_content
DROP POLICY IF EXISTS "Public manage about_content" ON public.about_content;
CREATE POLICY "Admins manage about_content" ON public.about_content
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- hero_slides
DROP POLICY IF EXISTS "Public manage hero_slides" ON public.hero_slides;
CREATE POLICY "Admins manage hero_slides" ON public.hero_slides
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- services
DROP POLICY IF EXISTS "Public manage services" ON public.services;
CREATE POLICY "Admins manage services" ON public.services
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- site_content
DROP POLICY IF EXISTS "Public can manage site content" ON public.site_content;
CREATE POLICY "Admins manage site_content" ON public.site_content
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- site_settings
DROP POLICY IF EXISTS "Public manage site_settings" ON public.site_settings;
CREATE POLICY "Admins manage site_settings" ON public.site_settings
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- social_links
DROP POLICY IF EXISTS "Public manage social_links" ON public.social_links;
CREATE POLICY "Admins manage social_links" ON public.social_links
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- testimonials
DROP POLICY IF EXISTS "Public can manage testimonials" ON public.testimonials;
CREATE POLICY "Admins manage testimonials" ON public.testimonials
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- contact_submissions: public can INSERT (already allowed); restrict view/update/delete to admin
DROP POLICY IF EXISTS "Public can view contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Public can update contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Public can delete contact submissions" ON public.contact_submissions;
CREATE POLICY "Admins view contact_submissions" ON public.contact_submissions
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update contact_submissions" ON public.contact_submissions
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete contact_submissions" ON public.contact_submissions
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- user_roles: tighten read; only admins (or self) can read
DROP POLICY IF EXISTS "Public can read user roles" ON public.user_roles;
CREATE POLICY "Users read own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

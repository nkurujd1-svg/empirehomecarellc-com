
-- contact_submissions: allow public full access
DROP POLICY IF EXISTS "Admins can delete contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can update contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can view contact submissions" ON public.contact_submissions;

CREATE POLICY "Public can view contact submissions"
ON public.contact_submissions FOR SELECT
TO public
USING (true);

CREATE POLICY "Public can update contact submissions"
ON public.contact_submissions FOR UPDATE
TO public
USING (true);

CREATE POLICY "Public can delete contact submissions"
ON public.contact_submissions FOR DELETE
TO public
USING (true);

-- testimonials: allow public full access
DROP POLICY IF EXISTS "Admins can do everything with testimonials" ON public.testimonials;

CREATE POLICY "Public can manage testimonials"
ON public.testimonials FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- site_content: allow public full access
DROP POLICY IF EXISTS "Admins can manage site content" ON public.site_content;

CREATE POLICY "Public can manage site content"
ON public.site_content FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- user_roles: allow public select
DROP POLICY IF EXISTS "Admins can read user roles" ON public.user_roles;

CREATE POLICY "Public can read user roles"
ON public.user_roles FOR SELECT
TO public
USING (true);

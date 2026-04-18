
-- Create private resumes bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- Anyone can upload a resume
CREATE POLICY "Anyone can upload a resume"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'resumes');

-- Only admins can read resumes
CREATE POLICY "Admins can read resumes"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'resumes' AND public.has_role(auth.uid(), 'admin'));

-- Only admins can delete resumes
CREATE POLICY "Admins can delete resumes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'resumes' AND public.has_role(auth.uid(), 'admin'));

-- Add resume_url to submissions
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS resume_url text;

CREATE TABLE public.careers_content (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hero_heading text,
  hero_subheading text,
  perks jsonb NOT NULL DEFAULT '[]'::jsonb,
  form_heading text,
  form_description text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.careers_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read careers_content"
ON public.careers_content
FOR SELECT
USING (true);

CREATE POLICY "Admins manage careers_content"
ON public.careers_content
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_careers_content_updated_at
BEFORE UPDATE ON public.careers_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.careers_content (hero_heading, hero_subheading, perks, form_heading, form_description)
VALUES (
  'Join Our Caring Team',
  'Build a rewarding career with Empire Home Care LLC — where compassion meets opportunity.',
  '[
    {"icon": "Heart", "title": "Meaningful Work", "text": "Make a real difference in clients'' lives every day."},
    {"icon": "Users", "title": "Supportive Team", "text": "Join a caring, professional, and welcoming team."},
    {"icon": "Briefcase", "title": "Competitive Pay", "text": "Fair wages, flexible schedules, and growth opportunities."}
  ]'::jsonb,
  'Apply Now',
  'Send us your details, attach your resume, and tell us a bit about yourself.'
);
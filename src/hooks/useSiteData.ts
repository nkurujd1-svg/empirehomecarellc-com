import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type SiteSettings = Tables<"site_settings">;
export type SocialLink = Tables<"social_links">;
export type HeroSlide = Tables<"hero_slides">;
export type ServiceRow = Tables<"services">;
export type AboutContent = Tables<"about_content">;
export type CareersContent = Tables<"careers_content">;

export function useSiteSettings() {
  const [data, setData] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from("site_settings").select("*").maybeSingle().then(({ data }) => {
      setData(data);
      setLoading(false);
    });
  }, []);
  return { data, loading };
}

export function useSocialLinks() {
  const [data, setData] = useState<SocialLink[]>([]);
  useEffect(() => {
    supabase
      .from("social_links")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order")
      .then(({ data }) => setData(data ?? []));
  }, []);
  return data;
}

export function useHeroSlides() {
  const [data, setData] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase
      .from("hero_slides")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order")
      .then(({ data }) => {
        setData(data ?? []);
        setLoading(false);
      });
  }, []);
  return { data, loading };
}

export function useServices(opts?: { featuredOnly?: boolean }) {
  const [data, setData] = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let q = supabase.from("services").select("*").eq("is_visible", true).order("sort_order");
    if (opts?.featuredOnly) q = q.eq("is_featured", true);
    q.then(({ data }) => {
      setData(data ?? []);
      setLoading(false);
    });
  }, [opts?.featuredOnly]);
  return { data, loading };
}

export function useAboutContent() {
  const [data, setData] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from("about_content").select("*").maybeSingle().then(({ data }) => {
      setData(data);
      setLoading(false);
    });
  }, []);
  return { data, loading };
}

export function useCareersContent() {
  const [data, setData] = useState<CareersContent | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from("careers_content").select("*").maybeSingle().then(({ data }) => {
      setData(data);
      setLoading(false);
    });
  }, []);
  return { data, loading };
}

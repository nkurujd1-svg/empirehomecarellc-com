import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type SiteContentMap = Record<string, string>;

/**
 * Fetches all key/value entries from the site_content table for a given section
 * and returns a map of key -> value. Use the optional `defaults` map to provide
 * fallbacks when a key has not yet been set in the database.
 */
export function useSiteContent(section: string, defaults: SiteContentMap = {}) {
  const [data, setData] = useState<SiteContentMap>(defaults);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("site_content")
      .select("key,value")
      .eq("section", section)
      .then(({ data }) => {
        if (cancelled) return;
        const map: SiteContentMap = { ...defaults };
        (data ?? []).forEach((row) => {
          if (row.value != null && row.value !== "") map[row.key] = row.value;
        });
        setData(map);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  return { data, loading };
}

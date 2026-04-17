import { supabase } from "@/integrations/supabase/client";

/**
 * Upload a file to the site-assets bucket with a unique name.
 * Returns the public URL of the uploaded file, or null on error.
 */
export async function uploadSiteAsset(
  file: File,
  folder: "logo" | "hero" | "services" | "about" | "misc" = "misc",
): Promise<string | null> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from("site-assets")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Upload error:", error);
    return null;
  }

  const { data } = supabase.storage.from("site-assets").getPublicUrl(fileName);
  return data.publicUrl;
}

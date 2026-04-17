import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { toast } from "@/hooks/use-toast";
import {
  Plus,
  Trash2,
  Save,
  Loader2,
  Images,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface HeroSlide {
  id: string;
  badge_text: string | null;
  title: string;
  title_accent: string | null;
  description: string | null;
  image_url: string | null;
  primary_cta_label: string | null;
  primary_cta_url: string | null;
  secondary_cta_label: string | null;
  secondary_cta_url: string | null;
  sort_order: number;
  is_visible: boolean;
}

const AdminHeroSlides = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  const fetchSlides = async () => {
    const { data } = await supabase.from("hero_slides").select("*").order("sort_order");
    setSlides((data as HeroSlide[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const addSlide = async () => {
    const next = slides.length > 0 ? Math.max(...slides.map((s) => s.sort_order)) + 1 : 1;
    const { data, error } = await supabase
      .from("hero_slides")
      .insert({
        title: "New slide",
        title_accent: "",
        description: "",
        sort_order: next,
        primary_cta_label: "Get Started",
        primary_cta_url: "/contact",
      })
      .select()
      .single();
    if (error || !data) {
      toast({ title: "Could not add", variant: "destructive" });
      return;
    }
    setSlides((prev) => [...prev, data as HeroSlide]);
  };

  const updateLocal = (id: string, patch: Partial<HeroSlide>) => {
    setSlides((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const saveSlide = async (slide: HeroSlide) => {
    setSavingId(slide.id);
    const { error } = await supabase
      .from("hero_slides")
      .update({
        badge_text: slide.badge_text,
        title: slide.title,
        title_accent: slide.title_accent,
        description: slide.description,
        image_url: slide.image_url,
        primary_cta_label: slide.primary_cta_label,
        primary_cta_url: slide.primary_cta_url,
        secondary_cta_label: slide.secondary_cta_label,
        secondary_cta_url: slide.secondary_cta_url,
        sort_order: slide.sort_order,
        is_visible: slide.is_visible,
      })
      .eq("id", slide.id);
    setSavingId(null);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Slide saved" });
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this slide?")) return;
    await supabase.from("hero_slides").delete().eq("id", id);
    setSlides((prev) => prev.filter((s) => s.id !== id));
    toast({ title: "Removed" });
  };

  const move = async (id: string, dir: -1 | 1) => {
    const idx = slides.findIndex((s) => s.id === id);
    const swap = idx + dir;
    if (swap < 0 || swap >= slides.length) return;
    const next = [...slides];
    [next[idx], next[swap]] = [next[swap], next[idx]];
    const reordered = next.map((s, i) => ({ ...s, sort_order: i + 1 }));
    setSlides(reordered);
    await Promise.all(
      reordered.map((s) =>
        supabase.from("hero_slides").update({ sort_order: s.sort_order }).eq("id", s.id),
      ),
    );
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[300px]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Images className="h-3.5 w-3.5" />
            <span>Homepage hero</span>
          </div>
          <h1 className="text-3xl font-heading font-bold">Hero Slides</h1>
          <p className="text-muted-foreground mt-1">
            Carousel that rotates on the homepage. Add, reorder, hide or remove slides.
          </p>
        </div>
        <Button onClick={addSlide}>
          <Plus className="h-4 w-4 mr-2" />
          Add slide
        </Button>
      </div>

      {slides.length === 0 && (
        <Card>
          <CardContent className="p-10 text-center text-muted-foreground">
            No slides yet. Add one to get started.
          </CardContent>
        </Card>
      )}

      <div className="space-y-5">
        {slides.map((slide, idx) => (
          <Card key={slide.id}>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <CardTitle className="text-lg flex items-center gap-3">
                <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                  {idx + 1}
                </span>
                {slide.title || "Untitled slide"}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Label className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Switch
                    checked={slide.is_visible}
                    onCheckedChange={(v) => updateLocal(slide.id, { is_visible: v })}
                  />
                  Visible
                </Label>
                <Button variant="ghost" size="icon" onClick={() => move(slide.id, -1)} disabled={idx === 0}>
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => move(slide.id, 1)}
                  disabled={idx === slides.length - 1}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => remove(slide.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="grid lg:grid-cols-[280px_1fr] gap-6">
              <ImageUploadField
                value={slide.image_url}
                onChange={(url) => updateLocal(slide.id, { image_url: url })}
                folder="hero"
                aspectRatio="video"
              />
              <div className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Badge text</Label>
                    <Input
                      value={slide.badge_text || ""}
                      onChange={(e) => updateLocal(slide.id, { badge_text: e.target.value })}
                      placeholder="Trusted Home Health Care"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={slide.title}
                      onChange={(e) => updateLocal(slide.id, { title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Title accent (italic)</Label>
                    <Input
                      value={slide.title_accent || ""}
                      onChange={(e) => updateLocal(slide.id, { title_accent: e.target.value })}
                      placeholder="Right at Home"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    rows={3}
                    value={slide.description || ""}
                    onChange={(e) => updateLocal(slide.id, { description: e.target.value })}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Primary button label</Label>
                    <Input
                      value={slide.primary_cta_label || ""}
                      onChange={(e) => updateLocal(slide.id, { primary_cta_label: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Primary button URL</Label>
                    <Input
                      value={slide.primary_cta_url || ""}
                      onChange={(e) => updateLocal(slide.id, { primary_cta_url: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Secondary button label</Label>
                    <Input
                      value={slide.secondary_cta_label || ""}
                      onChange={(e) => updateLocal(slide.id, { secondary_cta_label: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Secondary button URL</Label>
                    <Input
                      value={slide.secondary_cta_url || ""}
                      onChange={(e) => updateLocal(slide.id, { secondary_cta_url: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button onClick={() => saveSlide(slide)} disabled={savingId === slide.id}>
                    {savingId === slide.id ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save slide
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminHeroSlides;

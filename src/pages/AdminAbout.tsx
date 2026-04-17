import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ICON_NAMES, getIcon } from "@/lib/iconMap";
import { toast } from "@/hooks/use-toast";
import { Save, Loader2, Info, Plus, Trash2 } from "lucide-react";

interface CoreValue {
  icon: string;
  title: string;
  desc: string;
}

interface AboutContent {
  id: string;
  preview_heading: string | null;
  preview_heading_accent: string | null;
  preview_paragraph_1: string | null;
  preview_paragraph_2: string | null;
  preview_image_url: string | null;
  preview_highlights: string[];
  preview_badge_value: string | null;
  preview_badge_label: string | null;
  about_heading: string | null;
  about_heading_accent: string | null;
  about_paragraph_1: string | null;
  about_paragraph_2: string | null;
  about_paragraph_3: string | null;
  about_values: string[];
  mission: string | null;
  vision: string | null;
  core_values: CoreValue[];
}

const AdminAbout = () => {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("about_content").select("*").limit(1).maybeSingle();
      if (data) {
        const d = data as Record<string, unknown>;
        setContent({
          ...(d as unknown as AboutContent),
          preview_highlights: Array.isArray(d.preview_highlights) ? (d.preview_highlights as string[]) : [],
          about_values: Array.isArray(d.about_values) ? (d.about_values as string[]) : [],
          core_values: Array.isArray(d.core_values) ? (d.core_values as CoreValue[]) : [],
        });
      }
      setLoading(false);
    })();
  }, []);

  const update = (patch: Partial<AboutContent>) => {
    setContent((prev) => (prev ? { ...prev, ...patch } : prev));
  };

  const save = async () => {
    if (!content) return;
    setSaving(true);
    const { error } = await supabase
      .from("about_content")
      .update({
        preview_heading: content.preview_heading,
        preview_heading_accent: content.preview_heading_accent,
        preview_paragraph_1: content.preview_paragraph_1,
        preview_paragraph_2: content.preview_paragraph_2,
        preview_image_url: content.preview_image_url,
        preview_highlights: content.preview_highlights,
        preview_badge_value: content.preview_badge_value,
        preview_badge_label: content.preview_badge_label,
        about_heading: content.about_heading,
        about_heading_accent: content.about_heading_accent,
        about_paragraph_1: content.about_paragraph_1,
        about_paragraph_2: content.about_paragraph_2,
        about_paragraph_3: content.about_paragraph_3,
        about_values: content.about_values,
        mission: content.mission,
        vision: content.vision,
        core_values: content.core_values,
      })
      .eq("id", content.id);
    setSaving(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved", description: "About content is live." });
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[300px]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!content) return <div className="p-6 text-muted-foreground">No about row found.</div>;

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Info className="h-3.5 w-3.5" />
            <span>About content</span>
          </div>
          <h1 className="text-3xl font-heading font-bold">About Page</h1>
          <p className="text-muted-foreground mt-1">
            Edit the homepage About preview, the About page itself, mission, vision and core values.
          </p>
        </div>
        <Button onClick={save} disabled={saving} size="lg">
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Save changes
        </Button>
      </div>

      {/* HOMEPAGE PREVIEW */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Homepage About preview</CardTitle>
          <CardDescription>The smaller "About Empire Home Care" block on the home page.</CardDescription>
        </CardHeader>
        <CardContent className="grid lg:grid-cols-[280px_1fr] gap-6">
          <ImageUploadField
            value={content.preview_image_url}
            onChange={(url) => update({ preview_image_url: url })}
            folder="about"
            aspectRatio="portrait"
          />
          <div className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Heading</Label>
                <Input value={content.preview_heading || ""} onChange={(e) => update({ preview_heading: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Heading accent (italic)</Label>
                <Input value={content.preview_heading_accent || ""} onChange={(e) => update({ preview_heading_accent: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Paragraph 1</Label>
              <Textarea rows={3} value={content.preview_paragraph_1 || ""} onChange={(e) => update({ preview_paragraph_1: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Paragraph 2</Label>
              <Textarea rows={2} value={content.preview_paragraph_2 || ""} onChange={(e) => update({ preview_paragraph_2: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Highlights (one per line)</Label>
              <Textarea
                rows={4}
                value={content.preview_highlights.join("\n")}
                onChange={(e) =>
                  update({ preview_highlights: e.target.value.split("\n").map((x) => x.trim()).filter(Boolean) })
                }
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Floating badge value</Label>
                <Input value={content.preview_badge_value || ""} onChange={(e) => update({ preview_badge_value: e.target.value })} placeholder="10+" />
              </div>
              <div className="space-y-2">
                <Label>Floating badge label</Label>
                <Input value={content.preview_badge_label || ""} onChange={(e) => update({ preview_badge_label: e.target.value })} placeholder="Years caring for families" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ABOUT PAGE BODY */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">About page body</CardTitle>
          <CardDescription>Main heading, intro paragraphs and "what we deliver" bullets.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Heading</Label>
              <Input value={content.about_heading || ""} onChange={(e) => update({ about_heading: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Heading accent</Label>
              <Input value={content.about_heading_accent || ""} onChange={(e) => update({ about_heading_accent: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Paragraph 1</Label>
            <Textarea rows={3} value={content.about_paragraph_1 || ""} onChange={(e) => update({ about_paragraph_1: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Paragraph 2</Label>
            <Textarea rows={3} value={content.about_paragraph_2 || ""} onChange={(e) => update({ about_paragraph_2: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Paragraph 3</Label>
            <Textarea rows={3} value={content.about_paragraph_3 || ""} onChange={(e) => update({ about_paragraph_3: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Highlights (one per line)</Label>
            <Textarea
              rows={6}
              value={content.about_values.join("\n")}
              onChange={(e) =>
                update({ about_values: e.target.value.split("\n").map((x) => x.trim()).filter(Boolean) })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* MISSION & VISION */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Mission & Vision</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Mission</Label>
            <Textarea rows={6} value={content.mission || ""} onChange={(e) => update({ mission: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Vision</Label>
            <Textarea rows={6} value={content.vision || ""} onChange={(e) => update({ vision: e.target.value })} />
          </div>
        </CardContent>
      </Card>

      {/* CORE VALUES */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Core values</CardTitle>
            <CardDescription>Shown as cards on the about page.</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              update({ core_values: [...content.core_values, { icon: "Heart", title: "New value", desc: "" }] })
            }
          >
            <Plus className="h-4 w-4 mr-2" />
            Add value
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {content.core_values.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">No core values yet.</p>
          )}
          {content.core_values.map((v, i) => {
            const Icon = getIcon(v.icon);
            return (
              <div key={i} className="grid sm:grid-cols-[40px_140px_1fr_2fr_auto] gap-3 items-start p-3 rounded-lg border bg-card">
                <div className="h-10 w-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <Select
                  value={v.icon}
                  onValueChange={(val) =>
                    update({
                      core_values: content.core_values.map((cv, idx) => (idx === i ? { ...cv, icon: val } : cv)),
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ICON_NAMES.map((n) => (
                      <SelectItem key={n} value={n}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  value={v.title}
                  onChange={(e) =>
                    update({
                      core_values: content.core_values.map((cv, idx) =>
                        idx === i ? { ...cv, title: e.target.value } : cv,
                      ),
                    })
                  }
                  placeholder="Title"
                />
                <Input
                  value={v.desc}
                  onChange={(e) =>
                    update({
                      core_values: content.core_values.map((cv, idx) =>
                        idx === i ? { ...cv, desc: e.target.value } : cv,
                      ),
                    })
                  }
                  placeholder="Description"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    update({ core_values: content.core_values.filter((_, idx) => idx !== i) })
                  }
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAbout;

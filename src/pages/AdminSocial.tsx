import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, Save, Loader2, Share2, GripVertical } from "lucide-react";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  sort_order: number;
  is_visible: boolean;
}

const PLATFORMS = ["facebook", "instagram", "linkedin", "tiktok", "twitter", "youtube"];

const AdminSocial = () => {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchLinks = async () => {
    const { data } = await supabase.from("social_links").select("*").order("sort_order");
    setLinks((data as SocialLink[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const addLink = async () => {
    const nextOrder = links.length > 0 ? Math.max(...links.map((l) => l.sort_order)) + 1 : 1;
    const { data, error } = await supabase
      .from("social_links")
      .insert({ platform: "facebook", url: "https://", sort_order: nextOrder })
      .select()
      .single();
    if (error || !data) {
      toast({ title: "Could not add", variant: "destructive" });
      return;
    }
    setLinks((prev) => [...prev, data as SocialLink]);
  };

  const updateLocal = (id: string, patch: Partial<SocialLink>) => {
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  };

  const remove = async (id: string) => {
    await supabase.from("social_links").delete().eq("id", id);
    setLinks((prev) => prev.filter((l) => l.id !== id));
    toast({ title: "Removed" });
  };

  const move = (id: string, dir: -1 | 1) => {
    const idx = links.findIndex((l) => l.id === id);
    const swap = idx + dir;
    if (swap < 0 || swap >= links.length) return;
    const next = [...links];
    [next[idx], next[swap]] = [next[swap], next[idx]];
    setLinks(next.map((l, i) => ({ ...l, sort_order: i + 1 })));
  };

  const saveAll = async () => {
    setSaving(true);
    const updates = links.map((l, i) =>
      supabase
        .from("social_links")
        .update({
          platform: l.platform,
          url: l.url,
          sort_order: i + 1,
          is_visible: l.is_visible,
        })
        .eq("id", l.id),
    );
    const results = await Promise.all(updates);
    setSaving(false);
    if (results.some((r) => r.error)) {
      toast({ title: "Some links failed to save", variant: "destructive" });
    } else {
      toast({ title: "Saved", description: "Your social links are live." });
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[300px]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-[1100px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Share2 className="h-3.5 w-3.5" />
            <span>Social media</span>
          </div>
          <h1 className="text-3xl font-heading font-bold">Social Links</h1>
          <p className="text-muted-foreground mt-1">Shown in the site footer. Reorder, hide or remove anytime.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addLink}>
            <Plus className="h-4 w-4 mr-2" />
            Add link
          </Button>
          <Button onClick={saveAll} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save all
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-4 space-y-3">
          {links.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No social links yet. Add one to get started.
            </p>
          )}
          {links.map((link, idx) => (
            <div key={link.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card">
              <div className="flex flex-col">
                <button
                  onClick={() => move(link.id, -1)}
                  disabled={idx === 0}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                  title="Move up"
                >
                  <GripVertical className="h-4 w-4 rotate-180" />
                </button>
                <button
                  onClick={() => move(link.id, 1)}
                  disabled={idx === links.length - 1}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                  title="Move down"
                >
                  <GripVertical className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 grid sm:grid-cols-[160px_1fr_auto] gap-3 items-center">
                <Select value={link.platform} onValueChange={(v) => updateLocal(link.id, { platform: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.map((p) => (
                      <SelectItem key={p} value={p} className="capitalize">
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  value={link.url}
                  onChange={(e) => updateLocal(link.id, { url: e.target.value })}
                  placeholder="https://..."
                />
                <div className="flex items-center gap-3">
                  <Label className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Switch
                      checked={link.is_visible}
                      onCheckedChange={(v) => updateLocal(link.id, { is_visible: v })}
                    />
                    Visible
                  </Label>
                  <Button variant="ghost" size="icon" onClick={() => remove(link.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSocial;

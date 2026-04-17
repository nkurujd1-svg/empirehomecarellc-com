import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Plus,
  Trash2,
  Save,
  Loader2,
  ChevronUp,
  ChevronDown,
  Briefcase,
  X,
} from "lucide-react";

interface ServiceRow {
  id: string;
  icon: string;
  title: string;
  short_description: string | null;
  full_description: string | null;
  items: string[];
  image_url: string | null;
  sort_order: number;
  is_visible: boolean;
  is_featured: boolean;
}

const AdminServices = () => {
  const [items, setItems] = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  const fetchItems = async () => {
    const { data } = await supabase.from("services").select("*").order("sort_order");
    if (data) {
      setItems(
        (data as Array<ServiceRow & { items: unknown }>).map((d) => ({
          ...d,
          items: Array.isArray(d.items) ? (d.items as string[]) : [],
        })),
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addService = async () => {
    const next = items.length > 0 ? Math.max(...items.map((s) => s.sort_order)) + 1 : 1;
    const { data, error } = await supabase
      .from("services")
      .insert({ title: "New service", icon: "Heart", sort_order: next, items: [] })
      .select()
      .single();
    if (error || !data) {
      toast({ title: "Could not add", variant: "destructive" });
      return;
    }
    setItems((prev) => [...prev, { ...(data as ServiceRow), items: [] }]);
  };

  const updateLocal = (id: string, patch: Partial<ServiceRow>) => {
    setItems((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const save = async (s: ServiceRow) => {
    setSavingId(s.id);
    const { error } = await supabase
      .from("services")
      .update({
        icon: s.icon,
        title: s.title,
        short_description: s.short_description,
        full_description: s.full_description,
        items: s.items,
        image_url: s.image_url,
        sort_order: s.sort_order,
        is_visible: s.is_visible,
        is_featured: s.is_featured,
      })
      .eq("id", s.id);
    setSavingId(null);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Service saved" });
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    await supabase.from("services").delete().eq("id", id);
    setItems((prev) => prev.filter((s) => s.id !== id));
    toast({ title: "Removed" });
  };

  const move = async (id: string, dir: -1 | 1) => {
    const idx = items.findIndex((s) => s.id === id);
    const swap = idx + dir;
    if (swap < 0 || swap >= items.length) return;
    const next = [...items];
    [next[idx], next[swap]] = [next[swap], next[idx]];
    const reordered = next.map((s, i) => ({ ...s, sort_order: i + 1 }));
    setItems(reordered);
    await Promise.all(
      reordered.map((s) =>
        supabase.from("services").update({ sort_order: s.sort_order }).eq("id", s.id),
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
            <Briefcase className="h-3.5 w-3.5" />
            <span>Services</span>
          </div>
          <h1 className="text-3xl font-heading font-bold">Manage Services</h1>
          <p className="text-muted-foreground mt-1">
            Shown on the homepage and the services page. Set "Featured" to show on the homepage.
          </p>
        </div>
        <Button onClick={addService}>
          <Plus className="h-4 w-4 mr-2" />
          Add service
        </Button>
      </div>

      <div className="space-y-5">
        {items.map((s, idx) => {
          const Icon = getIcon(s.icon);
          return (
            <Card key={s.id}>
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <CardTitle className="text-lg flex items-center gap-3">
                  <span className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-secondary/10 text-secondary">
                    <Icon className="h-5 w-5" />
                  </span>
                  {s.title || "Untitled service"}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Label className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Switch
                      checked={s.is_featured}
                      onCheckedChange={(v) => updateLocal(s.id, { is_featured: v })}
                    />
                    Featured
                  </Label>
                  <Label className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Switch
                      checked={s.is_visible}
                      onCheckedChange={(v) => updateLocal(s.id, { is_visible: v })}
                    />
                    Visible
                  </Label>
                  <Button variant="ghost" size="icon" onClick={() => move(s.id, -1)} disabled={idx === 0}>
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => move(s.id, 1)}
                    disabled={idx === items.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => remove(s.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid lg:grid-cols-[280px_1fr] gap-6">
                <ImageUploadField
                  value={s.image_url}
                  onChange={(url) => updateLocal(s.id, { image_url: url })}
                  folder="services"
                  aspectRatio="video"
                />
                <div className="space-y-3">
                  <div className="grid sm:grid-cols-[1fr_180px] gap-3">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={s.title}
                        onChange={(e) => updateLocal(s.id, { title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Icon</Label>
                      <Select value={s.icon} onValueChange={(v) => updateLocal(s.id, { icon: v })}>
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
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Short description (homepage card)</Label>
                    <Textarea
                      rows={2}
                      value={s.short_description || ""}
                      onChange={(e) => updateLocal(s.id, { short_description: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Full description (services page)</Label>
                    <Textarea
                      rows={3}
                      value={s.full_description || ""}
                      onChange={(e) => updateLocal(s.id, { full_description: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Service items (one per line)</Label>
                    <Textarea
                      rows={5}
                      value={s.items.join("\n")}
                      onChange={(e) =>
                        updateLocal(s.id, {
                          items: e.target.value.split("\n").map((x) => x.trim()).filter(Boolean),
                        })
                      }
                      placeholder="Bathing or showering&#10;Dressing and grooming"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button onClick={() => save(s)} disabled={savingId === s.id}>
                      {savingId === s.id ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      Save service
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdminServices;

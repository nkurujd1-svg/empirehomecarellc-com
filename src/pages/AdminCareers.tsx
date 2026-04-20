import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Trash2, Save, ArrowUp, ArrowDown } from "lucide-react";
import { ICON_NAMES, getIcon } from "@/lib/iconMap";

type Perk = { icon: string; title: string; text: string };

type CareersForm = {
  hero_heading: string;
  hero_subheading: string;
  perks: Perk[];
  form_heading: string;
  form_description: string;
};

const empty: CareersForm = {
  hero_heading: "",
  hero_subheading: "",
  perks: [],
  form_heading: "",
  form_description: "",
};

const AdminCareers = () => {
  const [id, setId] = useState<string | null>(null);
  const [form, setForm] = useState<CareersForm>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("careers_content").select("*").maybeSingle().then(({ data }) => {
      if (data) {
        setId(data.id);
        setForm({
          hero_heading: data.hero_heading ?? "",
          hero_subheading: data.hero_subheading ?? "",
          perks: (data.perks as unknown as Perk[]) ?? [],
          form_heading: data.form_heading ?? "",
          form_description: data.form_description ?? "",
        });
      }
      setLoading(false);
    });
  }, []);

  const updatePerk = (i: number, patch: Partial<Perk>) => {
    setForm((f) => ({ ...f, perks: f.perks.map((p, idx) => (idx === i ? { ...p, ...patch } : p)) }));
  };

  const addPerk = () =>
    setForm((f) => ({ ...f, perks: [...f.perks, { icon: "Heart", title: "", text: "" }] }));

  const removePerk = (i: number) =>
    setForm((f) => ({ ...f, perks: f.perks.filter((_, idx) => idx !== i) }));

  const movePerk = (i: number, dir: -1 | 1) => {
    setForm((f) => {
      const next = [...f.perks];
      const j = i + dir;
      if (j < 0 || j >= next.length) return f;
      [next[i], next[j]] = [next[j], next[i]];
      return { ...f, perks: next };
    });
  };

  const save = async () => {
    setSaving(true);
    const payload = {
      hero_heading: form.hero_heading,
      hero_subheading: form.hero_subheading,
      perks: form.perks as unknown as never,
      form_heading: form.form_heading,
      form_description: form.form_description,
    };
    const { error } = id
      ? await supabase.from("careers_content").update(payload).eq("id", id)
      : await supabase.from("careers_content").insert(payload);
    setSaving(false);
    if (error) toast.error("Could not save: " + error.message);
    else toast.success("Careers page updated");
  };

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Careers Page</h1>
          <p className="text-sm text-muted-foreground">Edit hero, perks, and application form text.</p>
        </div>
        <Button onClick={save} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save changes"}
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle>Hero</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Heading</Label>
            <Input
              value={form.hero_heading}
              onChange={(e) => setForm({ ...form, hero_heading: e.target.value })}
            />
          </div>
          <div>
            <Label>Subheading</Label>
            <Textarea
              rows={2}
              value={form.hero_subheading}
              onChange={(e) => setForm({ ...form, hero_subheading: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Perks</CardTitle>
          <Button size="sm" variant="outline" onClick={addPerk}>
            <Plus className="h-4 w-4 mr-1" /> Add perk
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {form.perks.length === 0 && (
            <p className="text-sm text-muted-foreground">No perks yet. Click "Add perk".</p>
          )}
          {form.perks.map((p, i) => {
            const Icon = getIcon(p.icon);
            return (
              <div key={i} className="rounded-lg border border-border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-secondary" />
                    <span className="text-sm text-muted-foreground">Perk #{i + 1}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button size="icon" variant="ghost" onClick={() => movePerk(i, -1)} disabled={i === 0}>
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => movePerk(i, 1)} disabled={i === form.perks.length - 1}>
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => removePerk(i)} className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  <div>
                    <Label>Icon</Label>
                    <Select value={p.icon} onValueChange={(v) => updatePerk(i, { icon: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {ICON_NAMES.map((n) => (<SelectItem key={n} value={n}>{n}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label>Title</Label>
                    <Input value={p.title} onChange={(e) => updatePerk(i, { title: e.target.value })} />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea rows={2} value={p.text} onChange={(e) => updatePerk(i, { text: e.target.value })} />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Application Form</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Heading</Label>
            <Input
              value={form.form_heading}
              onChange={(e) => setForm({ ...form, form_heading: e.target.value })}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              rows={2}
              value={form.form_description}
              onChange={(e) => setForm({ ...form, form_description: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={save} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </div>
  );
};

export default AdminCareers;

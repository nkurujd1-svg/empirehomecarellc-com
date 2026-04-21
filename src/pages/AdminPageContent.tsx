import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Loader2, Save, FileText } from "lucide-react";

type Field = {
  key: string;
  label: string;
  description?: string;
  type?: "input" | "textarea";
};

type SectionConfig = {
  id: string;
  title: string;
  description: string;
  fields: Field[];
};

const SECTIONS: SectionConfig[] = [
  {
    id: "contact",
    title: "Contact page",
    description: "Headings, intro text and the submit button label.",
    fields: [
      { key: "eyebrow", label: "Eyebrow label" },
      { key: "heading", label: "Heading" },
      { key: "heading_accent", label: "Heading accent (highlighted word)" },
      { key: "intro", label: "Intro paragraph", type: "textarea" },
      { key: "submit_label", label: "Submit button label" },
    ],
  },
  {
    id: "services",
    title: "Services page hero",
    description: "Hero text shown at the top of the Services page.",
    fields: [
      { key: "eyebrow", label: "Eyebrow label" },
      { key: "hero_heading", label: "Hero heading" },
      { key: "hero_subheading", label: "Hero subheading", type: "textarea" },
    ],
  },
  {
    id: "about",
    title: "About page hero",
    description: "Banner heading and tagline at the top of the About page.",
    fields: [
      { key: "hero_heading", label: "Hero heading" },
      { key: "hero_subheading", label: "Hero subheading", type: "textarea" },
    ],
  },
  {
    id: "footer",
    title: "Footer",
    description: "Column headings and the copyright/tagline lines.",
    fields: [
      { key: "quick_links_heading", label: "Quick Links column heading" },
      { key: "services_heading", label: "Services column heading" },
      { key: "copyright_suffix", label: "Copyright suffix (after the year + business name)" },
      { key: "tagline", label: "Footer tagline" },
    ],
  },
];

type Row = { section: string; key: string; value: string };

const AdminPageContent = () => {
  const [rows, setRows] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("site_content").select("section,key,value");
      const map: Record<string, string> = {};
      (data as Row[] | null)?.forEach((r) => {
        map[`${r.section}.${r.key}`] = r.value ?? "";
      });
      setRows(map);
      setLoading(false);
    })();
  }, []);

  const get = (section: string, key: string) => rows[`${section}.${key}`] ?? "";
  const set = (section: string, key: string, value: string) =>
    setRows((prev) => ({ ...prev, [`${section}.${key}`]: value }));

  const save = async () => {
    setSaving(true);
    const payload: Row[] = [];
    for (const section of SECTIONS) {
      for (const field of section.fields) {
        payload.push({
          section: section.id,
          key: field.key,
          value: get(section.id, field.key) ?? "",
        });
      }
    }
    const { error } = await supabase
      .from("site_content")
      .upsert(payload, { onConflict: "section,key" });
    setSaving(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved", description: "Page content updated." });
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
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <FileText className="h-3.5 w-3.5" />
            <span>Page content</span>
          </div>
          <h1 className="text-3xl font-heading font-bold">Edit page text</h1>
          <p className="text-muted-foreground mt-1">
            Update headings, intros and labels across the site.
          </p>
        </div>
        <Button onClick={save} disabled={saving} size="lg">
          {saving ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save changes
        </Button>
      </div>

      <Tabs defaultValue={SECTIONS[0].id} className="w-full">
        <TabsList className="flex flex-wrap h-auto">
          {SECTIONS.map((s) => (
            <TabsTrigger key={s.id} value={s.id}>
              {s.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {SECTIONS.map((section) => (
          <TabsContent key={section.id} value={section.id} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {section.fields.map((field) => (
                  <div className="space-y-2" key={field.key}>
                    <Label>{field.label}</Label>
                    {field.type === "textarea" ? (
                      <Textarea
                        rows={3}
                        value={get(section.id, field.key)}
                        onChange={(e) => set(section.id, field.key, e.target.value)}
                      />
                    ) : (
                      <Input
                        value={get(section.id, field.key)}
                        onChange={(e) => set(section.id, field.key, e.target.value)}
                      />
                    )}
                    {field.description && (
                      <p className="text-xs text-muted-foreground">{field.description}</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AdminPageContent;

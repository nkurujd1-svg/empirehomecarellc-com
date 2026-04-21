import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { Switch } from "@/components/ui/switch";
import { uploadSiteAsset } from "@/lib/uploadSiteAsset";
import { toast } from "@/hooks/use-toast";
import { Save, Loader2, Building2, FileText, Upload, ExternalLink } from "lucide-react";
import { useRef, useState as useStateReact } from "react";

interface SiteSettings {
  id: string;
  business_name: string;
  tagline: string | null;
  logo_url: string | null;
  phone: string | null;
  phone_href: string | null;
  email: string | null;
  address: string | null;
  address_map_url: string | null;
  opening_hours: string | null;
  footer_about: string | null;
  brochure_url: string | null;
  brochure_label: string | null;
  brochure_visible: boolean | null;
}

const AdminBranding = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();
      if (data) setSettings(data as SiteSettings);
      setLoading(false);
    })();
  }, []);

  const update = (patch: Partial<SiteSettings>) => {
    setSettings((prev) => (prev ? { ...prev, ...patch } : prev));
  };

  const save = async () => {
    if (!settings) return;
    setSaving(true);
    const { error } = await supabase
      .from("site_settings")
      .update({
        business_name: settings.business_name,
        tagline: settings.tagline,
        logo_url: settings.logo_url,
        phone: settings.phone,
        phone_href: settings.phone_href,
        email: settings.email,
        address: settings.address,
        address_map_url: settings.address_map_url,
        opening_hours: settings.opening_hours,
        footer_about: settings.footer_about,
      })
      .eq("id", settings.id);
    setSaving(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved", description: "Your changes are live." });
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[300px]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!settings) {
    return <div className="p-6 text-muted-foreground">No settings row found.</div>;
  }

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Building2 className="h-3.5 w-3.5" />
            <span>Branding & Contact</span>
          </div>
          <h1 className="text-3xl font-heading font-bold">Business Identity</h1>
          <p className="text-muted-foreground mt-1">Logo, business name and contact details shown across the site.</p>
        </div>
        <Button onClick={save} disabled={saving} size="lg">
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Save changes
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Logo</CardTitle>
            <CardDescription>Used in navbar and footer. PNG with transparent background works best.</CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUploadField
              value={settings.logo_url}
              onChange={(url) => update({ logo_url: url })}
              folder="logo"
              label="Logo"
              aspectRatio="square"
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Business name</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Business name</Label>
              <Input value={settings.business_name} onChange={(e) => update({ business_name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Tagline</Label>
              <Input value={settings.tagline || ""} onChange={(e) => update({ tagline: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Footer about</Label>
              <Textarea
                rows={3}
                value={settings.footer_about || ""}
                onChange={(e) => update({ footer_about: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contact details</CardTitle>
          <CardDescription>Shown in the contact page, footer, and the dashboard meta.</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Phone (display)</Label>
            <Input
              value={settings.phone || ""}
              onChange={(e) => update({ phone: e.target.value })}
              placeholder="(605) 321-8915"
            />
          </div>
          <div className="space-y-2">
            <Label>Phone link (tel:)</Label>
            <Input
              value={settings.phone_href || ""}
              onChange={(e) => update({ phone_href: e.target.value })}
              placeholder="tel:+16053218915"
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={settings.email || ""}
              onChange={(e) => update({ email: e.target.value })}
              placeholder="info@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label>Opening hours</Label>
            <Input
              value={settings.opening_hours || ""}
              onChange={(e) => update({ opening_hours: e.target.value })}
              placeholder="Mon – Fri: 8 AM – 5 PM"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Address</Label>
            <Input
              value={settings.address || ""}
              onChange={(e) => update({ address: e.target.value })}
              placeholder="707 W 11th St, Sioux Falls, SD"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Address map URL (Google Maps)</Label>
            <Input
              value={settings.address_map_url || ""}
              onChange={(e) => update({ address_map_url: e.target.value })}
              placeholder="https://maps.google.com/?q=..."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBranding;

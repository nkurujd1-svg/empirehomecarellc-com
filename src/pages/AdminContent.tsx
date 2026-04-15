import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Save } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type ContentItem = { id: string; section: string; key: string; value: string };

const AdminContent = () => {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ContentItem | null>(null);
  const [form, setForm] = useState({ section: "", key: "", value: "" });

  const fetchItems = async () => {
    const { data } = await supabase.from("site_content").select("*").order("section");
    if (data) setItems(data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSave = async () => {
    if (editing) {
      const { error } = await supabase.from("site_content").update({ value: form.value }).eq("id", editing.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Updated!" });
    } else {
      const { error } = await supabase.from("site_content").insert(form);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Added!" });
    }
    setDialogOpen(false);
    setEditing(null);
    setForm({ section: "", key: "", value: "" });
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("site_content").delete().eq("id", id);
    toast({ title: "Deleted" });
    fetchItems();
  };

  const openEdit = (item: ContentItem) => {
    setEditing(item);
    setForm({ section: item.section, key: item.key, value: item.value });
    setDialogOpen(true);
  };

  const openNew = () => {
    setEditing(null);
    setForm({ section: "", key: "", value: "" });
    setDialogOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold">Site Content</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew}><Plus className="h-4 w-4 mr-2" />Add Content</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit" : "Add"} Content</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div><Label>Section</Label><Input value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} placeholder="e.g. hero, about, services" disabled={!!editing} /></div>
              <div><Label>Key</Label><Input value={form.key} onChange={(e) => setForm({ ...form, key: e.target.value })} placeholder="e.g. title, description" disabled={!!editing} /></div>
              <div><Label>Value</Label><textarea className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" rows={4} value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} /></div>
              <Button onClick={handleSave} className="w-full"><Save className="h-4 w-4 mr-2" />Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Section</TableHead>
                <TableHead>Key</TableHead>
                <TableHead className="hidden md:table-cell">Value</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.section}</TableCell>
                  <TableCell>{item.key}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-xs truncate">{item.value}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && (
                <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No content items yet. Add your first one!</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminContent;

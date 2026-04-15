import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Trash2, Mail, MailOpen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Submission = {
  id: string;
  full_name: string;
  phone: string | null;
  email: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

const AdminSubmissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selected, setSelected] = useState<Submission | null>(null);

  const fetch = async () => {
    const { data } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
    if (data) setSubmissions(data);
  };

  useEffect(() => { fetch(); }, []);

  const markRead = async (s: Submission) => {
    await supabase.from("contact_submissions").update({ is_read: true }).eq("id", s.id);
    setSelected({ ...s, is_read: true });
    fetch();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("contact_submissions").delete().eq("id", id);
    toast({ title: "Deleted" });
    setSelected(null);
    fetch();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-heading font-bold mb-6">Contact Submissions</h1>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((s) => (
                <TableRow key={s.id} className={!s.is_read ? "bg-secondary/5" : ""}>
                  <TableCell>
                    {s.is_read ? <MailOpen className="h-4 w-4 text-muted-foreground" /> : <Mail className="h-4 w-4 text-secondary" />}
                  </TableCell>
                  <TableCell className="font-medium cursor-pointer" onClick={() => { setSelected(s); if (!s.is_read) markRead(s); }}>
                    {s.full_name}
                  </TableCell>
                  <TableCell>{s.email || "—"}</TableCell>
                  <TableCell className="hidden md:table-cell">{s.phone || "—"}</TableCell>
                  <TableCell className="hidden md:table-cell">{new Date(s.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {submissions.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No submissions yet</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message from {selected?.full_name}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3">
              <p className="text-sm"><strong>Email:</strong> {selected.email || "N/A"}</p>
              <p className="text-sm"><strong>Phone:</strong> {selected.phone || "N/A"}</p>
              <p className="text-sm"><strong>Date:</strong> {new Date(selected.created_at).toLocaleString()}</p>
              <div className="bg-muted rounded-lg p-4 text-sm">{selected.message}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSubmissions;

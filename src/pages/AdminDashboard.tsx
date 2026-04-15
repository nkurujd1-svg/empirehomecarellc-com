import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Star, FileText, Eye } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ testimonials: 0, submissions: 0, unread: 0, contentItems: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [t, s, u, c] = await Promise.all([
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("is_read", false),
        supabase.from("site_content").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        testimonials: t.count || 0,
        submissions: s.count || 0,
        unread: u.count || 0,
        contentItems: c.count || 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { title: "Testimonials", value: stats.testimonials, icon: Star, color: "text-yellow-500" },
    { title: "Contact Submissions", value: stats.submissions, icon: MessageSquare, color: "text-blue-500" },
    { title: "Unread Messages", value: stats.unread, icon: Eye, color: "text-red-500" },
    { title: "Content Items", value: stats.contentItems, icon: FileText, color: "text-green-500" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-heading font-bold mb-6">Admin Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

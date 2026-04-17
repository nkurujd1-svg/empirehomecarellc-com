import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Star,
  FileText,
  Eye,
  ArrowUpRight,
  Plus,
  Mail,
  Clock,
  Sparkles,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Submission {
  id: string;
  full_name: string;
  email: string | null;
  message: string;
  created_at: string;
  is_read: boolean;
}

interface Testimonial {
  id: string;
  name: string;
  relation: string;
  text: string;
  rating: number;
  is_visible: boolean;
  created_at: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    testimonials: 0,
    visibleTestimonials: 0,
    submissions: 0,
    unread: 0,
    contentItems: 0,
    last7daysSubs: 0,
  });
  const [recentSubs, setRecentSubs] = useState<Submission[]>([]);
  const [recentTestis, setRecentTestis] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

      const [t, tv, s, u, c, recent7, subs, testis] = await Promise.all([
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }).eq("is_visible", true),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("is_read", false),
        supabase.from("site_content").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }).gte("created_at", sevenDaysAgo),
        supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }).limit(5),
        supabase.from("testimonials").select("*").order("created_at", { ascending: false }).limit(4),
      ]);

      setStats({
        testimonials: t.count || 0,
        visibleTestimonials: tv.count || 0,
        submissions: s.count || 0,
        unread: u.count || 0,
        contentItems: c.count || 0,
        last7daysSubs: recent7.count || 0,
      });
      setRecentSubs((subs.data as Submission[]) || []);
      setRecentTestis((testis.data as Testimonial[]) || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const cards = [
    {
      title: "Unread Messages",
      value: stats.unread,
      total: `of ${stats.submissions} total`,
      icon: Mail,
      gradient: "from-rose-500/15 to-rose-500/5",
      iconBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
      href: "/admin/submissions",
    },
    {
      title: "Submissions (7d)",
      value: stats.last7daysSubs,
      total: "this week",
      icon: MessageSquare,
      gradient: "from-blue-500/15 to-blue-500/5",
      iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      href: "/admin/submissions",
    },
    {
      title: "Testimonials Live",
      value: stats.visibleTestimonials,
      total: `of ${stats.testimonials} total`,
      icon: Star,
      gradient: "from-amber-500/15 to-amber-500/5",
      iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      href: "/admin/testimonials",
    },
    {
      title: "Content Blocks",
      value: stats.contentItems,
      total: "editable items",
      icon: FileText,
      gradient: "from-emerald-500/15 to-emerald-500/5",
      iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      href: "/admin/content",
    },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Welcome back</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold tracking-tight">
            Dashboard overview
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage testimonials, messages and site content from one place.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/admin/submissions">
              <Eye className="mr-2 h-4 w-4" />
              View inbox
            </Link>
          </Button>
          <Button asChild>
            <Link to="/admin/testimonials">
              <Plus className="mr-2 h-4 w-4" />
              Add testimonial
            </Link>
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link key={card.title} to={card.href} className="group">
            <Card className={`relative overflow-hidden border-border/60 bg-gradient-to-br ${card.gradient} transition-all hover:shadow-lg hover:-translate-y-0.5`}>
              <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
                <div className="space-y-1">
                  <CardDescription className="text-xs uppercase tracking-wider font-medium">
                    {card.title}
                  </CardDescription>
                </div>
                <div className={`p-2 rounded-lg ${card.iconBg}`}>
                  <card.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <p className="text-3xl font-bold font-heading">
                    {loading ? "—" : card.value}
                  </p>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{card.total}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent submissions */}
        <Card className="lg:col-span-2 border-border/60">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-heading">Recent messages</CardTitle>
              <CardDescription>Latest contact form submissions</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/submissions">
                View all
                <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-1">
            {loading ? (
              <p className="text-sm text-muted-foreground py-8 text-center">Loading...</p>
            ) : recentSubs.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="h-10 w-10 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No messages yet</p>
              </div>
            ) : (
              recentSubs.map((sub) => (
                <Link
                  key={sub.id}
                  to="/admin/submissions"
                  className="flex items-start gap-3 p-3 -mx-1 rounded-lg hover:bg-muted/60 transition-colors"
                >
                  <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${sub.is_read ? "bg-muted-foreground/30" : "bg-secondary"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-sm truncate">{sub.full_name}</p>
                      <span className="text-xs text-muted-foreground flex items-center gap-1 flex-shrink-0">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(sub.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-0.5">{sub.message}</p>
                  </div>
                </Link>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent testimonials */}
        <Card className="border-border/60">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-heading">Latest reviews</CardTitle>
              <CardDescription>Recent testimonials</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/testimonials">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? (
              <p className="text-sm text-muted-foreground py-8 text-center">Loading...</p>
            ) : recentTestis.length === 0 ? (
              <div className="text-center py-12">
                <Star className="h-10 w-10 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No testimonials yet</p>
              </div>
            ) : (
              recentTestis.map((t) => (
                <div key={t.id} className="p-3 rounded-lg bg-muted/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{t.name}</p>
                    <Badge variant={t.is_visible ? "secondary" : "outline"} className="text-[10px] h-5">
                      {t.is_visible ? "Live" : "Hidden"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < t.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{t.text}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

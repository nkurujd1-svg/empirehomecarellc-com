import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Mail, Sparkles, CheckCircle2 } from "lucide-react";
import logo from "@/assets/empire-home-care-logo.png";

const AdminLogin = () => {
  const ADMIN_EMAIL = "info@empirehomecarellc.com";
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  // If a magic-link callback already produced a session, verify role and route in.
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin");
      if (roles && roles.length > 0) {
        navigate("/admin");
      } else {
        await supabase.auth.signOut();
        toast({
          title: "Access denied",
          description: "This email is not registered as an admin.",
          variant: "destructive",
        });
      }
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") checkSession();
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin/login`,
        shouldCreateUser: false, // only existing admin users can sign in
      },
    });

    setLoading(false);

    if (error) {
      toast({
        title: "Could not send link",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setSent(true);
    toast({
      title: "Check your inbox",
      description: "We sent you a secure sign-in link.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-warm via-background to-muted relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <Card className="w-full max-w-md relative shadow-2xl border-border/50 backdrop-blur">
        <CardHeader className="text-center space-y-4 pb-2">
          <img src={logo} alt="Empire Home Care" className="h-16 w-auto mx-auto" />
          <div>
            <CardTitle className="flex items-center justify-center gap-2 text-2xl font-heading">
              <Sparkles className="h-5 w-5 text-secondary" />
              Admin Access
            </CardTitle>
            <CardDescription className="mt-2">
              {sent
                ? "We've sent a secure sign-in link to your email."
                : "Enter your admin email to receive a one-click sign-in link."}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {sent ? (
            <div className="text-center space-y-4 py-4">
              <div className="mx-auto w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center">
                <CheckCircle2 className="h-7 w-7 text-secondary" />
              </div>
              <div className="space-y-1">
                <p className="font-medium">Link sent to {email}</p>
                <p className="text-sm text-muted-foreground">
                  Click the link in your inbox to sign in. It expires in 1 hour.
                </p>
              </div>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setSent(false);
                  setEmail("");
                }}
              >
                Use a different email
              </Button>
            </div>
          ) : (
            <form onSubmit={handleMagicLink} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Admin email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@empirehomecarellc.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending link..." : "Send sign-in link"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                No password needed. We'll email you a secure link.
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;

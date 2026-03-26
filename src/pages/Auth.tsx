import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { z } from "zod";
import { NebulaScene, HUDNav, HUDPanel, HUDButton } from "@/components/hud";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, Sparkles } from "lucide-react";

const authSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { toast } = useToast();
  
  const selectedTier = searchParams.get("tier");

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate input
    const result = authSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "email") fieldErrors.email = err.message;
        if (err.path[0] === "password") fieldErrors.password = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast({
              title: "Login Failed",
              description: "Invalid email or password. Please try again.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Error",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully logged in.",
          });
          navigate("/dashboard");
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.includes("User already registered")) {
            toast({
              title: "Account Exists",
              description: "This email is already registered. Please log in instead.",
              variant: "destructive",
            });
            setIsLogin(true);
          } else {
            toast({
              title: "Error",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Account Created!",
            description: "Welcome to PlayIQ. Let's get started!",
          });
          navigate("/dashboard");
        }
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <NebulaScene>
      <div className="min-h-screen flex flex-col">
        <header className="pt-6 px-4">
          <HUDNav />
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <HUDPanel className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {isLogin ? "Welcome Back" : "Start Learning AI"}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {isLogin 
                    ? "Sign in to access your dashboard" 
                    : selectedTier 
                      ? `You selected the ${selectedTier === "power_suite" ? "AI Power Suite" : "Single Tool Mastery"} plan`
                      : "Create your account to get started"
                  }
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-background/50 border-primary/30 focus:border-primary"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-background/50 border-primary/30 focus:border-primary"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                <HUDButton
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting 
                    ? "Please wait..." 
                    : isLogin 
                      ? "Sign In" 
                      : "Create Account"
                  }
                </HUDButton>
              </form>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-primary hover:underline"
                >
                  {isLogin 
                    ? "Don't have an account? Sign up" 
                    : "Already have an account? Sign in"
                  }
                </button>
              </div>
            </HUDPanel>
          </div>
        </main>
      </div>
    </NebulaScene>
  );
};

export default Auth;

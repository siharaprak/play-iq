import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DevOverlay } from "@/components/dev/DevOverlay";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminRoute } from "@/components/admin/AdminRoute";
import { RouteAnalyticsTracker } from "@/components/analytics/RouteAnalyticsTracker";

// Pages
import Home from "./pages/Home";
import Scan from "./pages/Scan";
import Characters from "./pages/Characters";
import Practice from "./pages/Practice";
import Showcase from "./pages/Showcase";
import Settings from "./pages/Settings";
import Shop from "./pages/Shop";
import Course from "./pages/Course";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Redeem from "./pages/Redeem";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Dashboard sub-pages
import Courses from "./pages/dashboard/Courses";
import ARScanner from "./pages/dashboard/ARScanner";
import Arcade from "./pages/dashboard/Arcade";
import Assessments from "./pages/dashboard/Assessments";
import Resources from "./pages/dashboard/Resources";
import Community from "./pages/dashboard/Community";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import BlogManager from "./pages/admin/BlogManager";
import FAQManager from "./pages/admin/FAQManager";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {import.meta.env.DEV && <DevOverlay />}
      <BrowserRouter>
        <AuthProvider>
          <RouteAnalyticsTracker />
          <Routes>
            {/* Redirect root to home */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* AR Worlds routes (require blocks entitlement) */}
            <Route path="/home" element={<Home />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/settings" element={<Settings />} />

            {/* Shop routes */}
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:slug" element={<Shop />} />

            {/* Course sales page (public) */}
            <Route path="/course" element={<Course />} />

            {/* Auth page (public) */}
            <Route path="/auth" element={<Auth />} />

            {/* Dashboard routes (protected) */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }>
              <Route path="courses" element={<Courses />} />
              <Route path="ar" element={<ARScanner />} />
              <Route path="arcade" element={<Arcade />} />
              <Route path="assessments" element={<Assessments />} />
              <Route path="resources" element={<Resources />} />
              <Route path="community" element={<Community />} />
            </Route>

            {/* Admin routes (admin role required) */}
            <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            <Route path="/admin/blog" element={
              <AdminRoute>
                <BlogManager />
              </AdminRoute>
            } />
            <Route path="/admin/faq" element={
              <AdminRoute>
                <FAQManager />
              </AdminRoute>
            } />
            <Route path="/admin/settings" element={
              <AdminRoute>
                <AdminSettings />
              </AdminRoute>
            } />

            {/* Blocks redeem */}
            <Route path="/redeem" element={<Redeem />} />

            {/* Profile */}
            <Route path="/profile" element={<Profile />} />

            {/* Product */}
            <Route path="/product" element={<Product />} />

            {/* Blog, FAQ, Contact */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />

            {/* Placeholder routes */}
            <Route path="/worlds" element={<Home />} />
            <Route path="/challenges" element={<Practice />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

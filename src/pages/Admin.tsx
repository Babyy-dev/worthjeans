import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/api";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminProducts } from "@/components/admin/AdminProducts";
import { AdminCategories } from "@/components/admin/AdminCategories";
import { AdminAnalytics } from "@/components/admin/AdminAnalytics";
import { AdminUsers } from "@/components/admin/AdminUsers";
import { Loader2 } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const res = await api.get('/auth/me');
      if (res.user?.role !== 'admin') {
        navigate("/");
        return;
      }
      setIsAdmin(true);
    } catch (error) {
      navigate("/auth");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex w-full bg-background">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 md:p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="hidden">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <AdminDashboard />
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <AdminProducts />
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <AdminCategories />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <AdminAnalytics />
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <AdminUsers />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin;

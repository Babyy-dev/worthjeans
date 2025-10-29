import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, FolderOpen, TrendingUp, DollarSign } from "lucide-react";
import { api } from "@/lib/api";

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    featuredProducts: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const products = await api.get('/products');

    setStats({
      totalProducts: (products || []).length,
      activeProducts: (products || []).filter((p: any) => p.is_active).length,
      featuredProducts: (products || []).filter((p: any) => p.is_featured).length,
    });
  };

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      description: "All products in store",
    },
    {
      title: "Active Products",
      value: stats.activeProducts,
      icon: TrendingUp,
      description: "Currently visible",
    },
    {
      title: "Featured",
      value: stats.featuredProducts,
      icon: DollarSign,
      description: "Featured products",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground mt-2">Welcome back! Here's an overview of your store.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

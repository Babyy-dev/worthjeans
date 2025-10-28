import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, UserPlus, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { api } from "@/lib/api";

interface UserActivity {
  id: string;
  activity_type: string;
  metadata: any;
  created_at: string;
}

interface Stats {
  totalUsers: number;
  newUsersToday: number;
  totalLogins: number;
  recentActivity: UserActivity[];
}

export const AdminAnalytics = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    newUsersToday: 0,
    totalLogins: 0,
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await api.get('/admin/analytics');
      setStats({
        totalUsers: data.totalUsers || 0,
        newUsersToday: data.newUsersToday || 0,
        totalLogins: data.totalLogins || 0,
        recentActivity: data.recentActivity || [],
      });
    } catch (error) {
      console.error("Error loading analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      description: "Total registered users",
    },
    {
      title: "New Users Today",
      value: stats.newUsersToday,
      icon: UserPlus,
      description: "Users registered today",
    },
    {
      title: "Total Logins",
      value: stats.totalLogins,
      icon: TrendingUp,
      description: "All-time login count",
    },
    {
      title: "Recent Activity",
      value: stats.recentActivity.length,
      icon: Activity,
      description: "Latest user activities",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          Monitor user activity and platform statistics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent User Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentActivity.length === 0 ? (
              <p className="text-sm text-muted-foreground">No recent activity</p>
            ) : (
              stats.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium capitalize">
                      {activity.activity_type.replace("_", " ")}
                    </p>
                    {activity.metadata?.email && (
                      <p className="text-xs text-muted-foreground">
                        {activity.metadata.email}
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(activity.created_at), "MMM dd, yyyy HH:mm")}
                  </p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

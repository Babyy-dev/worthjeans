import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, UserPlus, TrendingUp } from "lucide-react";
import { format } from "date-fns";

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
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Get total users
      const { count: totalUsers } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      // Get new users today
      const { count: newUsersToday } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .gte("created_at", today.toISOString());

      // Get total logins
      const { count: totalLogins } = await supabase
        .from("user_activity")
        .select("*", { count: "exact", head: true })
        .eq("activity_type", "user_login");

      // Get recent activity
      const { data: recentActivity } = await supabase
        .from("user_activity")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      setStats({
        totalUsers: totalUsers || 0,
        newUsersToday: newUsersToday || 0,
        totalLogins: totalLogins || 0,
        recentActivity: recentActivity || [],
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

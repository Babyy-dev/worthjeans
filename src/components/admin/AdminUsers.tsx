import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Shield, User, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface UserProfile {
  id: string;
  email: string;
  created_at: string;
  last_login: string;
  role?: string;
}

export const AdminUsers = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const list = await api.get('/admin/users');
      setUsers(list || []);
    } catch (error) {
      console.error("Error loading users:", error);
      toast({ title: "Error", description: "Failed to load users", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const toggleAdminRole = async (userId: string, currentRole: string) => {
    try {
      const nextRole = currentRole === 'admin' ? 'user' : 'admin';
      await api.post(`/admin/users/${userId}/role`, { role: nextRole });
      toast({
        title: nextRole === 'admin' ? "Admin role granted" : "Admin role removed",
        description: nextRole === 'admin' ? "User has been granted admin privileges" : "User role has been changed to regular user",
      });
      loadUsers();
    } catch (error) {
      console.error("Error toggling admin role:", error);
      toast({ title: "Error", description: "Failed to update user role", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <p className="text-muted-foreground">
          Manage user accounts and permissions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between border-b pb-4 last:border-0"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {user.role === "admin" ? (
                      <Shield className="h-4 w-4 text-primary" />
                    ) : (
                      <User className="h-4 w-4 text-muted-foreground" />
                    )}
                    <p className="text-sm font-medium">{user.email}</p>
                    <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                      {user.role}
                    </Badge>
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>Joined: {format(new Date(user.created_at), "MMM dd, yyyy")}</span>
                    <span>Last login: {format(new Date(user.last_login), "MMM dd, yyyy")}</span>
                  </div>
                </div>
                <Button
                  variant={user.role === "admin" ? "destructive" : "default"}
                  size="sm"
                  onClick={() => toggleAdminRole(user.id, user.role || "user")}
                >
                  {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

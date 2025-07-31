import { useState } from "react"
import { Plus, Users, Target, Clock, TrendingUp, AlertTriangle, Activity, Settings, LogOut, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Link } from "react-router-dom"

const workspaces = [
  {
    id: 1,
    name: "TechCorp Development",
    role: "Admin",
    projects: 3,
    members: 12,
    currentSprint: "Sprint 15",
    urgentTasks: 5,
    status: "active"
  },
  {
    id: 2,
    name: "ClientProject",
    role: "Member", 
    assignedTasks: 5,
    dueTasks: 2,
    reviewTasks: 1,
    status: "active"
  },
  {
    id: 3,
    name: "StartupXYZ",
    role: "Member",
    assignedTasks: 2,
    overdueTasks: 1,
    sprintEnds: "2 days",
    status: "active"
  }
]

const urgentItems = [
  {
    title: "Password Reset Bug",
    workspace: "StartupXYZ",
    status: "overdue",
    priority: "high"
  },
  {
    title: "API Integration",
    workspace: "ClientProject", 
    status: "due-today",
    priority: "high"
  },
  {
    title: "Login UI Review",
    workspace: "TechCorp",
    status: "review",
    priority: "medium"
  }
]

const recentActivity = [
  {
    action: "Completed",
    item: "Database Migration",
    time: "2 hours ago"
  },
  {
    action: "Started", 
    item: "Social Login API",
    time: "4 hours ago"
  },
  {
    action: "Joined",
    item: "new sprint in ClientProject", 
    time: "1 day ago"
  }
]

export default function UserDashboard() {
  const [userName] = useState("John")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "overdue": return "destructive"
      case "due-today": return "warning"
      case "review": return "default"
      default: return "secondary"
    }
  }

  const getRoleIcon = (role: string) => {
    return role === "Admin" ? "👑" : "👤"
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-foreground">👋 Welcome back, {userName}!</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Workspaces Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
              🏢 YOUR WORKSPACES ({workspaces.length})
            </h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Workspace
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workspaces.map((workspace) => (
              <Card key={workspace.id} className="hover:shadow-elegant transition-shadow duration-300 cursor-pointer bg-gradient-card">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {workspace.name} {getRoleIcon(workspace.role)}
                      </CardTitle>
                      <Badge variant="outline" className="mt-2">
                        {workspace.role}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {workspace.role === "Admin" ? (
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span>📊 Active Projects</span>
                        <span className="font-medium">{workspace.projects}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>👥 Team Members</span>
                        <span className="font-medium">{workspace.members}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>🎯 Current Sprint</span>
                        <span className="font-medium">{workspace.currentSprint}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>⚡ Tasks need attention</span>
                        <Badge variant="warning" className="text-xs">
                          {workspace.urgentTasks}
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span>📋 Tasks Assigned</span>
                        <span className="font-medium">{workspace.assignedTasks}</span>
                      </div>
                      {workspace.dueTasks && (
                        <div className="flex items-center justify-between">
                          <span>⏰ Due Today</span>
                          <Badge variant="warning" className="text-xs">
                            {workspace.dueTasks}
                          </Badge>
                        </div>
                      )}
                      {workspace.reviewTasks && (
                        <div className="flex items-center justify-between">
                          <span>🔄 In Review</span>
                          <span className="font-medium">{workspace.reviewTasks}</span>
                        </div>
                      )}
                      {workspace.overdueTasks && (
                        <div className="flex items-center justify-between">
                          <span>⚠️ Overdue</span>
                          <Badge variant="destructive" className="text-xs">
                            {workspace.overdueTasks}
                          </Badge>
                        </div>
                      )}
                      {workspace.sprintEnds && (
                        <div className="flex items-center justify-between">
                          <span>🎯 Sprint ends in</span>
                          <span className="font-medium">{workspace.sprintEnds}</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <Link to={`/workspace/${workspace.id}`}>
                    <Button className="w-full" variant="premium">
                      Enter Workspace 🚀
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats and Activity */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Quick Stats */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                📊 YOUR QUICK STATS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Tasks Assigned</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span>Completed This Week</span>
                  <span className="font-semibold text-success">8</span>
                </div>
                <div className="flex justify-between">
                  <span>Overdue Tasks</span>
                  <Badge variant="destructive" className="text-xs">1</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Workspaces</span>
                  <span className="font-semibold">3 (1 Admin, 2 Member)</span>
                </div>
                <div className="flex justify-between">
                  <span>Completion Rate</span>
                  <span className="font-semibold text-success">87%</span>
                </div>
                <div className="flex justify-between">
                  <span>Most Active</span>
                  <span className="font-semibold">TechCorp Development</span>
                </div>
              </div>
              <Progress value={87} className="h-2" />
            </CardContent>
          </Card>

          {/* Urgent Items */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                🔥 URGENT ITEMS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {urgentItems.map((item, index) => (
                <div key={index} className="flex items-start justify-between p-3 rounded-lg bg-background/50">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.workspace}</p>
                  </div>
                  <Badge variant={getStatusColor(item.status)} className="text-xs">
                    {item.status.replace('-', ' ')}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                📈 RECENT ACTIVITY
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                  <Activity className="h-4 w-4 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.action}</span> "{activity.item}"
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                My Overall Stats
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                All Notifications
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Performance Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
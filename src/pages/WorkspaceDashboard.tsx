import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { 
  ArrowLeft, 
  Settings, 
  Bell, 
  Users, 
  Target, 
  TrendingUp, 
  Plus,
  ChevronDown,
  Calendar,
  Activity,
  BarChart3
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const workspaceData = {
  1: {
    name: "TechCorp Development",
    role: "Admin",
    projects: [
      {
        id: 1,
        name: "Mobile App v2.0",
        priority: "High",
        progress: 80,
        sprint: "Sprint 15",
        tasksRemaining: 8,
        team: ["John(Lead)", "Sarah", "Mike", "Lisa"],
        epics: [
          { name: "Auth", progress: 90 },
          { name: "Pay", progress: 60 }
        ]
      },
      {
        id: 2,
        name: "Website Redesign", 
        priority: "Medium",
        progress: 40,
        sprint: "Sprint 3",
        tasksRemaining: 15,
        team: ["Alex", "Tom", "Nina"],
        epics: [
          { name: "UI", progress: 50 },
          { name: "UX", progress: 30 }
        ]
      },
      {
        id: 3,
        name: "API Gateway",
        priority: "Low", 
        progress: 20,
        phase: "Planning Phase",
        tasksRemaining: 25,
        team: ["Chris", "Dave", "Emma", "Faye"],
        epics: [
          { name: "Core", progress: 10 },
          { name: "Docs", progress: 5 }
        ]
      }
    ],
    stats: {
      activeProjects: 3,
      teamMembers: 12,
      currentSprint: "Sprint 15",
      sprintProgress: 75,
      velocity: 42
    },
    activity: [
      { user: "Sarah", action: "completed", task: "Login API Validation", time: "1 hour ago" },
      { user: "Mike", action: "moved", task: "Social Login Integration", time: "2 hours ago" },
      { user: "Team", action: "created", task: "Push Notifications epic", time: "4 hours ago" },
      { user: "Team", action: "completed", task: "Sprint 14 retrospective", time: "1 day ago" }
    ]
  }
}

const availableWorkspaces = [
  { id: 1, name: "TechCorp Development" },
  { id: 2, name: "ClientProject" },
  { id: 3, name: "StartupXYZ" }
]

export default function WorkspaceDashboard() {
  const { workspaceId } = useParams()
  const workspace = workspaceData[parseInt(workspaceId || "1")]
  
  if (!workspace) {
    return <div>Workspace not found</div>
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "destructive"
      case "Medium": return "warning"
      case "Low": return "secondary"
      default: return "default"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/user-dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-foreground">🏢 {workspace.name}</h1>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {availableWorkspaces.map((ws) => (
                      <DropdownMenuItem key={ws.id} asChild>
                        <Link to={`/workspace/${ws.id}`}>{ws.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
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
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-card/50 border-b border-border">
        <div className="container mx-auto px-6 py-3">
          <div className="flex space-x-6">
            <Link to={`/workspace/${workspaceId}`} className="px-3 py-2 text-sm font-medium text-primary border-b-2 border-primary">
              📊 Dashboard
            </Link>
            <Link to={`/workspace/${workspaceId}/projects`} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              🎯 Projects
            </Link>
            <Link to={`/workspace/${workspaceId}/epics`} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              📚 Epics
            </Link>
            <Link to={`/workspace/${workspaceId}/backlog`} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              📋 Backlog
            </Link>
            <Link to={`/workspace/${workspaceId}/sprints`} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              🏃‍♂️ Sprints
            </Link>
            <Link to={`/workspace/${workspaceId}/kanban`} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              📋 Kanban
            </Link>
            <Link to={`/workspace/${workspaceId}/team`} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              👥 Team
            </Link>
            <Link to={`/workspace/${workspaceId}/reports`} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              📊 Reports
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Workspace Overview */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              📊 WORKSPACE OVERVIEW
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold text-foreground">{workspace.stats.activeProjects}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Team Members</p>
                <p className="text-2xl font-bold text-foreground">{workspace.stats.teamMembers}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Current Sprint</p>
                <p className="text-lg font-semibold text-foreground">{workspace.stats.currentSprint}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Sprint Progress</p>
                <div className="flex items-center gap-2">
                  <Progress value={workspace.stats.sprintProgress} className="h-2 flex-1" />
                  <span className="text-sm font-medium">{workspace.stats.sprintProgress}%</span>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground">Team Velocity</p>
                <p className="text-lg font-semibold text-foreground">{workspace.stats.velocity} pts/sprint</p>
              </div>
              <div>
                <p className="text-muted-foreground">Active Epics</p>
                <p className="text-2xl font-bold text-foreground">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Projects */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">🎯 ACTIVE PROJECTS</h2>
            <div className="flex gap-2">
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Invite Members
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New Project
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workspace.projects.map((project) => (
              <Card key={project.id} className="hover:shadow-elegant transition-shadow duration-300 cursor-pointer bg-gradient-card">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        📱 {project.name}
                      </CardTitle>
                      <Badge variant={getPriorityColor(project.priority)} className="mt-2">
                        {project.priority} Priority
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>{project.sprint || project.phase}</span>
                      <span>{project.tasksRemaining} tasks remaining</span>
                    </div>
                    <div>
                      <span className="font-medium">Team: </span>
                      {project.team.join(", ")}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Epic Progress:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.epics.map((epic, index) => (
                        <div key={index} className="flex items-center gap-1 text-xs">
                          <span>{epic.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {epic.progress}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/workspace/${workspaceId}/project/${project.id}`} className="flex-1">
                      <Button variant="outline" className="w-full" size="sm">
                        View Project
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm">
                      Manage
                    </Button>
                    <Button variant="ghost" size="sm">
                      Reports
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Activity & Attention Items */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                🔄 RECENT WORKSPACE ACTIVITY
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {workspace.activity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                  <Activity className="h-4 w-4 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span> {activity.action} "{activity.task}"
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                ⚡ NEEDS ATTENTION
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-destructive"></div>
                  <span className="font-medium text-sm">3 tasks overdue in Mobile App project</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-warning"></div>
                  <span className="font-medium text-sm">2 epics need story breakdown in API Gateway</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span className="font-medium text-sm">Sprint 15 capacity at 95% - consider moving items</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Workspace Analytics
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Sprint Calendar
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Team Performance
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
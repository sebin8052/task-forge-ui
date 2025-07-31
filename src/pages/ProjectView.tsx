import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Target, 
  TrendingUp, 
  Plus,
  Settings,
  BarChart3,
  Activity
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const projectData = {
  1: {
    name: "Mobile App v2.0",
    status: "Active",
    priority: "High",
    progress: 80,
    startDate: "Jan 15, 2024",
    targetDate: "Feb 28, 2024",
    teamSize: 5,
    currentSprint: "Sprint 15",
    sprintDaysLeft: 5,
    health: "Good",
    epics: [
      {
        id: 1,
        name: "USER AUTHENTICATION",
        progress: 90,
        totalStories: 8,
        completedStories: 7,
        storyPoints: { completed: 34, total: 38 },
        status: "Nearly Complete"
      },
      {
        id: 2,
        name: "PAYMENT SYSTEM", 
        progress: 60,
        totalStories: 6,
        completedStories: 3,
        storyPoints: { completed: 21, total: 35 },
        status: "In Progress"
      },
      {
        id: 3,
        name: "PUSH NOTIFICATIONS",
        progress: 0,
        totalStories: 0,
        completedStories: 0,
        storyPoints: { completed: 0, total: 0 },
        status: "Needs Planning"
      }
    ],
    activity: [
      { action: "created", item: "Push Notifications epic", time: "4 hours ago" },
      { action: "completed", item: "Google Pay Integration story", time: "6 hours ago" },
      { action: "added", item: "3 new tasks to Social Login story", time: "8 hours ago" },
      { action: "moved", item: "User Authentication epic to testing", time: "1 day ago" }
    ],
    metrics: {
      velocity: 28,
      bugRate: 2,
      codeCoverage: 94,
      teamSatisfaction: 4.2
    }
  }
}

export default function ProjectView() {
  const { workspaceId, projectId } = useParams()
  const project = projectData[parseInt(projectId || "1")]
  
  if (!project) {
    return <div>Project not found</div>
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Nearly Complete": return "success"
      case "In Progress": return "warning"
      case "Needs Planning": return "destructive"
      default: return "default"
    }
  }

  const getHealthColor = (health: string) => {
    switch (health) {
      case "Good": return "success"
      case "Warning": return "warning"
      case "Critical": return "destructive"
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
              <Link to={`/workspace/${workspaceId}`}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">📱 {project.name} Project</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Link to="/user-dashboard" className="hover:text-foreground">🏠 User Dashboard</Link>
                  <span>&gt;</span>
                  <Link to={`/workspace/${workspaceId}`} className="hover:text-foreground">🏢 TechCorp Development</Link>
                  <span>&gt;</span>
                  <span>{project.name}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Project Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-card/50 border-b border-border">
        <div className="container mx-auto px-6 py-3">
          <div className="flex space-x-6">
            <Link to={`/workspace/${workspaceId}/project/${projectId}`} className="px-3 py-2 text-sm font-medium text-primary border-b-2 border-primary">
              📊 Overview
            </Link>
            <Link to={`/workspace/${workspaceId}/project/${projectId}/epics`} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              📚 Epics
            </Link>
            <Link to={`/workspace/${workspaceId}/project/${projectId}/backlog`} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              📋 Backlog
            </Link>
            <Link to={`/workspace/${workspaceId}/project/${projectId}/sprint`} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              🏃‍♂️ Active Sprint
            </Link>
            <Link to={`/workspace/${workspaceId}/project/${projectId}/kanban`} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              📋 Kanban
            </Link>
            <Link to={`/workspace/${workspaceId}/project/${projectId}/team`} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              👥 Team
            </Link>
            <Link to={`/workspace/${workspaceId}/project/${projectId}/reports`} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              📊 Reports
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Project Overview */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              📊 PROJECT OVERVIEW
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Project Status</p>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-success"></div>
                  <span className="font-semibold">{project.status}</span>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground">Priority</p>
                <Badge variant="destructive" className="text-xs">{project.priority}</Badge>
              </div>
              <div>
                <p className="text-muted-foreground">Progress</p>
                <div className="flex items-center gap-2">
                  <Progress value={project.progress} className="h-2 flex-1" />
                  <span className="text-sm font-medium">{project.progress}%</span>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground">Start Date</p>
                <p className="font-semibold">{project.startDate}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Target Release</p>
                <p className="font-semibold">{project.targetDate}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Team Size</p>
                <p className="font-semibold">{project.teamSize} members</p>
              </div>
              <div>
                <p className="text-muted-foreground">Overall Health</p>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-success"></div>
                  <span className="font-semibold">{project.health}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-background/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Current Sprint: {project.currentSprint}</p>
                  <p className="text-sm text-muted-foreground">{project.sprintDaysLeft} days remaining</p>
                </div>
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Sprint Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Epics Progress */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">🎯 EPICS PROGRESS</h2>
            <div className="flex gap-2">
              <Button variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                Epic Analytics
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New Epic
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {project.epics.map((epic) => (
              <Card key={epic.id} className="hover:shadow-elegant transition-shadow duration-300 cursor-pointer bg-gradient-card">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{epic.name} (Epic {epic.id})</CardTitle>
                      <Badge variant={getStatusColor(epic.status)} className="mt-2">
                        {epic.status}
                      </Badge>
                    </div>
                    <Link to={`/workspace/${workspaceId}/project/${projectId}/epic/${epic.id}`}>
                      <Button variant="outline" size="sm">
                        View Epic Details
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{epic.progress}%</span>
                    </div>
                    <Progress value={epic.progress} className="h-3" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Stories</p>
                      <p className="font-semibold">{epic.completedStories}/{epic.totalStories} complete</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Story Points</p>
                      <p className="font-semibold">{epic.storyPoints.completed}/{epic.storyPoints.total} complete</p>
                    </div>
                  </div>

                  {epic.status === "Needs Planning" && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Create Stories
                      </Button>
                      <Button variant="ghost" size="sm">
                        View Epic
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Activity & Metrics */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                🔄 RECENT PROJECT ACTIVITY
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {project.activity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                  <Activity className="h-4 w-4 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="capitalize">{activity.action}</span> "{activity.item}"
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
                📈 PROJECT METRICS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Velocity</p>
                  <p className="text-lg font-semibold">{project.metrics.velocity} story points/sprint</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Bug Rate</p>
                  <p className="text-lg font-semibold text-success">{project.metrics.bugRate}% (excellent)</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Code Coverage</p>
                  <p className="text-lg font-semibold text-success">{project.metrics.codeCoverage}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Team Satisfaction</p>
                  <p className="text-lg font-semibold">{project.metrics.teamSatisfaction}/5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
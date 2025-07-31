import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { 
  ArrowLeft, 
  MoreHorizontal, 
  Plus, 
  AlertTriangle,
  Clock,
  User,
  Calendar,
  BarChart3,
  Settings,
  Target,
  CheckCircle
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

const kanbanData = {
  sprint: {
    name: "Sprint 16: Payment & Notifications",
    day: 5,
    totalDays: 14,
    progress: 32,
    storyPoints: { completed: 12, total: 39 },
    tasks: { completed: 8, total: 19 },
    daysRemaining: 9,
    velocity: "On track",
    blockers: 1
  },
  columns: [
    {
      id: "todo",
      title: "TO DO",
      count: 4,
      tasks: [
        {
          id: 1,
          title: "Apple Pay Button Design",
          assignee: "Sarah",
          avatar: "S",
          timeEstimate: "2 days",
          priority: "high",
          storyPoints: 3,
          story: "Apple Pay Integration"
        },
        {
          id: 2,
          title: "Refund UI Form",
          assignee: "Lisa", 
          avatar: "L",
          timeEstimate: "3 days",
          priority: "high",
          storyPoints: 5,
          story: "Payment Refunds"
        },
        {
          id: 3,
          title: "Refund Validation",
          assignee: "Mike",
          avatar: "M", 
          timeEstimate: "1 day",
          priority: "medium",
          storyPoints: 2,
          story: "Payment Refunds"
        },
        {
          id: 4,
          title: "Settings API Design",
          assignee: "John",
          avatar: "J",
          timeEstimate: "2 days", 
          priority: "low",
          storyPoints: 3,
          story: "Notification Settings"
        }
      ]
    },
    {
      id: "inprogress",
      title: "IN PROGRESS", 
      count: 5,
      tasks: [
        {
          id: 5,
          title: "Refund API Logic",
          assignee: "Mike",
          avatar: "M",
          timeEstimate: "1 day",
          priority: "high",
          storyPoints: 8,
          story: "Payment Refunds",
          progress: 75
        },
        {
          id: 6,
          title: "Payment Notification Logic",
          assignee: "Lisa",
          avatar: "L", 
          timeEstimate: "2 days",
          priority: "medium",
          storyPoints: 5,
          story: "Payment Notifications",
          progress: 40
        },
        {
          id: 7,
          title: "Apple Pay Testing",
          assignee: "Sarah",
          avatar: "S",
          timeEstimate: "Blocked",
          priority: "high", 
          storyPoints: 3,
          story: "Apple Pay Integration",
          blocked: true,
          blockerReason: "API docs needed"
        },
        {
          id: 8,
          title: "Push Message Queue",
          assignee: "Alex",
          avatar: "A",
          timeEstimate: "3 days",
          priority: "medium",
          storyPoints: 5,
          story: "Push Notifications",
          progress: 60
        }
      ]
    },
    {
      id: "review",
      title: "REVIEW",
      count: 2,
      tasks: [
        {
          id: 9,
          title: "Push Notification Testing",
          assignee: "Alex",
          avatar: "A",
          timeEstimate: "Review",
          priority: "medium",
          storyPoints: 3,
          story: "Push Notifications"
        },
        {
          id: 10,
          title: "Notification Settings UI Review",
          assignee: "John", 
          avatar: "J",
          timeEstimate: "Review",
          priority: "low",
          storyPoints: 2,
          story: "Notification Settings"
        }
      ]
    },
    {
      id: "done",
      title: "DONE",
      count: 8,
      tasks: [
        {
          id: 11,
          title: "Apple Pay SDK Setup",
          assignee: "Sarah",
          avatar: "S",
          timeSpent: "6h",
          priority: "high",
          storyPoints: 2,
          story: "Apple Pay Integration"
        },
        {
          id: 12,
          title: "Push Service Setup", 
          assignee: "Alex",
          avatar: "A",
          timeSpent: "4h",
          storyPoints: 2,
          story: "Push Notifications"
        },
        {
          id: 13,
          title: "Payment Notification Database",
          assignee: "Lisa",
          avatar: "L",
          timeSpent: "3h",
          storyPoints: 1,
          story: "Payment Notifications"
        },
        {
          id: 14,
          title: "Database Schema Updates",
          assignee: "Mike", 
          avatar: "M",
          timeSpent: "2h",
          storyPoints: 1,
          story: "Database Setup"
        }
      ]
    }
  ]
}

export default function KanbanBoard() {
  const { workspaceId, projectId } = useParams()
  const { sprint, columns } = kanbanData

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive"
      case "medium": return "warning"
      case "low": return "secondary"
      default: return "default"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return "🔥"
      case "medium": return "🟡"
      case "low": return "🔵"
      default: return "⚪"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to={`/workspace/${workspaceId}/project/${projectId}`}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">📋 {sprint.name}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>📅 Day {sprint.day} of {sprint.totalDays}</span>
                  <span>🎯 Progress: {sprint.progress}%</span>
                  <span>📊 {sprint.storyPoints.completed}/{sprint.storyPoints.total} story points</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                Sprint Report
              </Button>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Sprint Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Sprint Overview */}
      <div className="bg-card/50 border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Story Points</p>
              <p className="font-semibold">{sprint.storyPoints.completed}/{sprint.storyPoints.total} complete ({Math.round((sprint.storyPoints.completed / sprint.storyPoints.total) * 100)}%)</p>
            </div>
            <div>
              <p className="text-muted-foreground">Tasks</p>
              <p className="font-semibold">{sprint.tasks.completed}/{sprint.tasks.total} complete ({Math.round((sprint.tasks.completed / sprint.tasks.total) * 100)}%)</p>
            </div>
            <div>
              <p className="text-muted-foreground">Days Remaining</p>
              <p className="font-semibold">{sprint.daysRemaining} days</p>
            </div>
            <div>
              <p className="text-muted-foreground">Team Velocity</p>
              <Badge variant="success" className="text-xs">{sprint.velocity}</Badge>
            </div>
            <div>
              <p className="text-muted-foreground">Blockers</p>
              {sprint.blockers > 0 ? (
                <Badge variant="warning" className="text-xs">{sprint.blockers} blocked</Badge>
              ) : (
                <Badge variant="success" className="text-xs">None</Badge>
              )}
            </div>
            <div>
              <p className="text-muted-foreground">Sprint Progress</p>
              <Progress value={sprint.progress} className="h-2 mt-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="bg-card/30 border-b border-border">
        <div className="container mx-auto px-6 py-3">
          <div className="flex space-x-6">
            <Link to={`/workspace/${workspaceId}/project/${projectId}/kanban`} className="px-3 py-2 text-sm font-medium text-primary border-b-2 border-primary">
              📋 Kanban
            </Link>
            <Link to={`/workspace/${workspaceId}/project/${projectId}/burndown`} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              📊 Burndown
            </Link>
            <Link to={`/workspace/${workspaceId}/project/${projectId}/team-view`} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              👥 Team View
            </Link>
            <Link to={`/workspace/${workspaceId}/project/${projectId}/sprint-report`} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              📈 Sprint Report
            </Link>
          </div>
        </div>
      </nav>

      {/* Kanban Board */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {columns.map((column) => (
            <div key={column.id} className="space-y-4">
              {/* Column Header */}
              <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">{column.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {column.count}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon-sm">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              {/* Task Cards */}
              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <Card key={task.id} className="hover:shadow-elegant transition-shadow duration-300 cursor-pointer bg-gradient-card">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Task Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm leading-tight">{task.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{task.story}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon-sm">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Task</DropdownMenuItem>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Move to Column</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Task Meta */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1">
                            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                              {task.avatar}
                            </div>
                            <span className="text-muted-foreground">{task.assignee}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {getPriorityIcon(task.priority)}
                            <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                              {task.storyPoints}pts
                            </Badge>
                          </div>
                        </div>

                        {/* Task Status */}
                        <div className="space-y-2">
                          {task.blocked && (
                            <div className="flex items-center gap-2 p-2 bg-destructive/10 rounded border border-destructive/20">
                              <AlertTriangle className="h-3 w-3 text-destructive" />
                              <span className="text-xs text-destructive font-medium">{task.blockerReason}</span>
                            </div>
                          )}
                          
                          {task.progress && (
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-medium">{task.progress}%</span>
                              </div>
                              <Progress value={task.progress} className="h-1" />
                            </div>
                          )}

                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {column.id === "done" ? (
                              <>
                                <CheckCircle className="h-3 w-3 text-success" />
                                <span>{task.timeSpent}</span>
                              </>
                            ) : task.blocked ? (
                              <>
                                <AlertTriangle className="h-3 w-3 text-destructive" />
                                <span>Blocked</span>
                              </>
                            ) : (
                              <>
                                <Clock className="h-3 w-3" />
                                <span>{task.timeEstimate}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Daily Standup Summary */}
        <Card className="mt-8 bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              🔥 DAILY STANDUP SUMMARY (Today's Updates)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="font-medium text-sm">COMPLETED</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">Sarah finished Apple Pay SDK integration</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-warning" />
                  <span className="font-medium text-sm">IN PROGRESS</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">Mike working on refund logic (60% done)</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <span className="font-medium text-sm">BLOCKED</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">Apple Pay testing blocked (waiting for sandbox access)</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">TODAY'S FOCUS</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">Lisa starts payment notifications, Alex continues push service</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-time Metrics */}
        <Card className="mt-6 bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              📈 REAL-TIME METRICS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Sprint Burndown</p>
                <p className="font-semibold text-warning">Slightly behind (2 story points)</p>
              </div>
              <div>
                <p className="text-muted-foreground">Team Utilization</p>
                <p className="font-semibold text-success">87% (healthy)</p>
              </div>
              <div>
                <p className="text-muted-foreground">Average Task Size</p>
                <p className="font-semibold text-success">2.1 story points (good)</p>
              </div>
              <div>
                <p className="text-muted-foreground">Cycle Time</p>
                <p className="font-semibold text-success">2.3 days average (improving)</p>
              </div>
              <div>
                <p className="text-muted-foreground">Blocker Rate</p>
                <p className="font-semibold text-success">5% (acceptable)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
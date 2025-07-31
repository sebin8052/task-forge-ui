import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { 
  ArrowLeft, 
  Plus, 
  Calendar, 
  Users, 
  Target, 
  TrendingUp,
  Settings,
  BarChart3,
  CheckCircle,
  Clock,
  Circle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const epicData = {
  2: {
    name: "PAYMENT SYSTEM EPIC",
    description: "Complete payment processing system with multiple payment methods",
    priority: "High",
    storyPoints: { completed: 21, total: 35 },
    progress: 60,
    team: ["Sarah (Lead)", "Mike", "Lisa"],
    targetSprint: "Complete by Sprint 16",
    status: "In Progress",
    stories: [
      {
        id: 1,
        title: "As user, I want to add credit card",
        storyPoints: 5,
        status: "completed",
        sprint: "Sprint 13",
        tasks: { completed: 4, total: 4 }
      },
      {
        id: 2,
        title: "As user, I want to save payment methods",
        storyPoints: 3,
        status: "completed", 
        sprint: "Sprint 14",
        tasks: { completed: 3, total: 3 }
      },
      {
        id: 3,
        title: "As user, I want to view billing history",
        storyPoints: 8,
        status: "completed",
        sprint: "Sprint 14", 
        tasks: { completed: 5, total: 5 }
      },
      {
        id: 4,
        title: "As user, I want Google Pay option",
        storyPoints: 8,
        status: "in-progress",
        sprint: "Sprint 15",
        assignee: "Mike",
        tasks: { completed: 2, total: 4 }
      },
      {
        id: 5,
        title: "As user, I want Apple Pay option", 
        storyPoints: 8,
        status: "ready",
        sprint: "Not in sprint",
        tasks: { completed: 0, total: 0, needsBreakdown: true }
      },
      {
        id: 6,
        title: "As admin, I want to refund payments",
        storyPoints: 13,
        status: "ready",
        sprint: "Not in sprint", 
        tasks: { completed: 0, total: 0, needsBreakdown: true }
      }
    ],
    progressChart: [
      { sprint: 11, progress: 0 },
      { sprint: 12, progress: 10 },
      { sprint: 13, progress: 25 },
      { sprint: 14, progress: 45 },
      { sprint: 15, progress: 60 },
      { sprint: 16, progress: 100, planned: true }
    ]
  }
}

export default function EpicDetails() {
  const { workspaceId, projectId, epicId } = useParams()
  const epic = epicData[parseInt(epicId || "2")]
  
  if (!epic) {
    return <div>Epic not found</div>
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-success" />
      case "in-progress": return <Clock className="h-4 w-4 text-warning" />
      case "ready": return <Circle className="h-4 w-4 text-muted-foreground" />
      default: return <Circle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "success"
      case "in-progress": return "warning"
      case "ready": return "default"
      default: return "secondary"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "COMPLETED"
      case "in-progress": return "IN PROGRESS"
      case "ready": return "READY"
      default: return "BACKLOG"
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
                <h1 className="text-2xl font-bold text-foreground">💳 {epic.name}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Link to="/user-dashboard" className="hover:text-foreground">🏠</Link>
                  <span>&gt;</span>
                  <Link to={`/workspace/${workspaceId}`} className="hover:text-foreground">🏢 TechCorp</Link>
                  <span>&gt;</span>
                  <Link to={`/workspace/${workspaceId}/project/${projectId}`} className="hover:text-foreground">📱 Mobile App</Link>
                  <span>&gt;</span>
                  <Link to={`/workspace/${workspaceId}/project/${projectId}/epic/${epicId}`} className="hover:text-foreground">💳 Payment Epic</Link>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                Epic Reports
              </Button>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Epic Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">📊 Epic Overview</TabsTrigger>
            <TabsTrigger value="stories">📚 Stories</TabsTrigger>
            <TabsTrigger value="tasks">📋 Tasks</TabsTrigger>
            <TabsTrigger value="progress">📊 Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Epic Details */}
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  📊 EPIC DETAILS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Epic Name</p>
                    <p className="font-semibold">{epic.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Priority</p>
                    <Badge variant="destructive">{epic.priority}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant="warning">{epic.status}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <div className="flex items-center gap-2">
                      <Progress value={epic.progress} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{epic.progress}%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-background/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="mt-1">{epic.description}</p>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Story Points</p>
                    <p className="font-semibold">{epic.storyPoints.completed}/{epic.storyPoints.total} total</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Assigned Team</p>
                    <p className="font-semibold">{epic.team.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Target Sprint</p>
                    <p className="font-semibold">{epic.targetSprint}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stories" className="space-y-6">
            {/* Stories List */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">📚 STORIES IN THIS EPIC ({epic.stories.length} total)</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Story
              </Button>
            </div>

            <div className="space-y-4">
              {epic.stories.map((story) => (
                <Card key={story.id} className="hover:shadow-elegant transition-shadow duration-300 cursor-pointer bg-gradient-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        {getStatusIcon(story.status)}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant={getStatusColor(story.status)} className="text-xs">
                              {getStatusText(story.status)}
                            </Badge>
                            <h3 className="font-semibold text-lg">"{story.title}"</h3>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                            <div>
                              <span>Story Points: </span>
                              <span className="font-medium">{story.storyPoints}</span>
                            </div>
                            <div>
                              <span>Sprint: </span>
                              <span className="font-medium">{story.sprint}</span>
                            </div>
                            {story.assignee && (
                              <div>
                                <span>Assigned: </span>
                                <span className="font-medium">{story.assignee}</span>
                              </div>
                            )}
                            <div>
                              <span>Tasks: </span>
                              <span className="font-medium">
                                {story.tasks.needsBreakdown 
                                  ? "Need task breakdown" 
                                  : `${story.tasks.completed}/${story.tasks.total} complete`
                                }
                              </span>
                            </div>
                          </div>
                          
                          {story.status === "completed" && (
                            <div className="mt-2">
                              <Badge variant="success" className="text-xs">
                                Completed: {story.sprint}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {story.tasks.needsBreakdown ? (
                          <>
                            <Button variant="outline" size="sm">Create Tasks</Button>
                            <Button variant="outline" size="sm">Add to Sprint</Button>
                          </>
                        ) : (
                          <>
                            <Link to={`/workspace/${workspaceId}/project/${projectId}/story/${story.id}`}>
                              <Button variant="outline" size="sm">View Story Details</Button>
                            </Link>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle>📋 All Tasks Across Stories</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Task breakdown view across all stories in this epic would be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            {/* Epic Progress Chart */}
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  📈 EPIC PROGRESS CHART
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-6 gap-4 text-center text-sm">
                    {epic.progressChart.map((point) => (
                      <div key={point.sprint} className="space-y-2">
                        <div className="font-medium">Sprint {point.sprint}</div>
                        <div className="relative h-24 bg-background/50 rounded-lg flex items-end justify-center p-2">
                          <div 
                            className={`w-full rounded transition-all duration-300 ${
                              point.planned ? 'bg-primary/50 border-2 border-dashed border-primary' : 'bg-primary'
                            }`}
                            style={{ height: `${point.progress}%` }}
                          ></div>
                        </div>
                        <div className={`font-semibold ${point.planned ? 'text-muted-foreground' : 'text-foreground'}`}>
                          {point.progress}%
                        </div>
                        {point.planned && (
                          <Badge variant="outline" className="text-xs">
                            Planned
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    Sprint Progress: 11 → 12 → 13 → 14 → 15 → 16 (planned)
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
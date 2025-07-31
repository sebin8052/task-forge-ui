import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { 
  ArrowLeft, 
  Plus, 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle,
  Circle,
  MessageSquare,
  Paperclip,
  Settings,
  Play
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

const storyData = {
  4: {
    title: "As a user, I want to add Google Pay as payment option",
    epic: "Payment System Integration",
    storyPoints: 8,
    priority: "High",
    status: "In Progress",
    assignee: "Mike Chen",
    created: "Dec 1, 2024",
    due: "Dec 14, 2024",
    sprint: "Sprint 15",
    description: `Implement Google Pay integration to allow users to make payments using their Google Pay account. This should include:
- Google Pay button in checkout flow
- Integration with Google Pay API
- Payment validation and processing
- Error handling for failed payments
- Testing with sandbox environment`,
    acceptanceCriteria: [
      { text: "Google Pay button appears in checkout", completed: true },
      { text: "User can authenticate with Google Pay", completed: true },
      { text: "Payment processing works correctly", completed: false, inProgress: true },
      { text: "Error messages display properly", completed: false },
      { text: "All edge cases handled", completed: false }
    ],
    tasks: [
      {
        id: 1,
        title: "Integrate Google Pay SDK",
        assignee: "Mike",
        status: "done",
        completed: "Dec 3",
        timeSpent: 6,
        storyPoints: 2
      },
      {
        id: 2,
        title: "Design Google Pay button UI",
        assignee: "Sarah", 
        status: "done",
        completed: "Dec 4",
        timeSpent: 4,
        storyPoints: 1
      },
      {
        id: 3,
        title: "Implement payment processing logic",
        assignee: "Mike",
        status: "in-progress",
        started: "Dec 5",
        estimatedTime: 8,
        storyPoints: 3,
        progress: 60
      },
      {
        id: 4,
        title: "Add error handling and validation",
        assignee: "Mike",
        status: "todo",
        estimatedTime: 4,
        storyPoints: 2,
        dependsOn: "Payment processing"
      }
    ],
    comments: [
      {
        user: "Mike",
        message: "Google Pay SDK integrated successfully",
        time: "2 days ago",
        avatar: "M"
      },
      {
        user: "Sarah", 
        message: "UI design matches the mockups",
        time: "1 day ago",
        avatar: "S"
      },
      {
        user: "John",
        message: "Great progress! Let me know if you need testing help",
        time: "6 hours ago", 
        avatar: "J"
      }
    ],
    progress: {
      completed: 2.4,
      total: 4,
      timeSpent: 10,
      timeEstimated: 22
    }
  }
}

export default function StoryDetails() {
  const { workspaceId, projectId, storyId } = useParams()
  const [newComment, setNewComment] = useState("")
  const story = storyData[parseInt(storyId || "4")]
  
  if (!story) {
    return <div>Story not found</div>
  }

  const getTaskIcon = (status: string) => {
    switch (status) {
      case "done": return <CheckCircle className="h-4 w-4 text-success" />
      case "in-progress": return <Clock className="h-4 w-4 text-warning" />
      case "todo": return <Circle className="h-4 w-4 text-muted-foreground" />
      default: return <Circle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "done": return "success"
      case "in-progress": return "warning" 
      case "todo": return "secondary"
      default: return "secondary"
    }
  }

  const getTaskStatusText = (status: string) => {
    switch (status) {
      case "done": return "DONE"
      case "in-progress": return "IN PROGRESS"
      case "todo": return "TO DO"
      default: return "UNKNOWN"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to={`/workspace/${workspaceId}/project/${projectId}/epic/2`}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">💳 Story: "{story.title}"</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Link to="/user-dashboard" className="hover:text-foreground">🏠</Link>
                  <span>&gt;</span>
                  <Link to={`/workspace/${workspaceId}`} className="hover:text-foreground">🏢 TechCorp</Link>
                  <span>&gt;</span>
                  <Link to={`/workspace/${workspaceId}/project/${projectId}`} className="hover:text-foreground">📱 Mobile App</Link>
                  <span>&gt;</span>
                  <Link to={`/workspace/${workspaceId}/project/${projectId}/epic/2`} className="hover:text-foreground">💳 Payment Epic</Link>
                  <span>&gt;</span>
                  <span>Google Pay Story</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">📊 Story Overview</TabsTrigger>
            <TabsTrigger value="tasks">✅ Tasks</TabsTrigger>
            <TabsTrigger value="comments">💬 Comments</TabsTrigger>
            <TabsTrigger value="attachments">📎 Attachments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Story Details */}
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  📊 STORY DETAILS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Epic</p>
                    <p className="font-semibold">{story.epic}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Story Points</p>
                    <p className="font-semibold">{story.storyPoints}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Priority</p>
                    <Badge variant="destructive">{story.priority}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant="warning">{story.status}</Badge>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Assigned To</p>
                    <p className="font-semibold">{story.assignee}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="font-semibold">{story.created}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Due</p>
                    <p className="font-semibold">{story.due}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sprint</p>
                    <p className="font-semibold">{story.sprint}</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-background/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Description</p>
                  <pre className="mt-1 whitespace-pre-wrap text-sm">{story.description}</pre>
                </div>
              </CardContent>
            </Card>

            {/* Acceptance Criteria */}
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  ✅ ACCEPTANCE CRITERIA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {story.acceptanceCriteria.map((criteria, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                    {criteria.completed ? (
                      <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                    ) : criteria.inProgress ? (
                      <Clock className="h-4 w-4 text-warning mt-0.5" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className={`text-sm ${criteria.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {criteria.text}
                      </p>
                      {criteria.inProgress && (
                        <Badge variant="warning" className="text-xs mt-1">
                          In Progress
                        </Badge>
                      )}
                      {criteria.completed && (
                        <Badge variant="success" className="text-xs mt-1">
                          Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            {/* Task Progress */}
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  📊 TASK PROGRESS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="text-muted-foreground">Progress</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Progress value={62} className="h-2 flex-1" />
                      <span className="font-medium">62%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {story.progress.completed}/{story.progress.total} tasks complete
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Time Spent</p>
                    <p className="text-lg font-semibold mt-2">
                      {story.progress.timeSpent} hours / {story.progress.timeEstimated} hours estimated
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tasks List */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">📋 TASKS BREAKDOWN ({story.tasks.length} tasks)</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Task
              </Button>
            </div>

            <div className="space-y-4">
              {story.tasks.map((task) => (
                <Card key={task.id} className="hover:shadow-elegant transition-shadow duration-300 cursor-pointer bg-gradient-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        {getTaskIcon(task.status)}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant={getTaskStatusColor(task.status)} className="text-xs">
                              {getTaskStatusText(task.status)}
                            </Badge>
                            <h3 className="font-semibold text-lg">"{task.title}"</h3>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                            <div>
                              <span>Assigned: </span>
                              <span className="font-medium">{task.assignee}</span>
                            </div>
                            <div>
                              <span>Story Points: </span>
                              <span className="font-medium">{task.storyPoints}</span>
                            </div>
                            {task.status === "done" && (
                              <>
                                <div>
                                  <span>Completed: </span>
                                  <span className="font-medium">{task.completed}</span>
                                </div>
                                <div>
                                  <span>Time Spent: </span>
                                  <span className="font-medium">{task.timeSpent}h</span>
                                </div>
                              </>
                            )}
                            {task.status === "in-progress" && (
                              <>
                                <div>
                                  <span>Started: </span>
                                  <span className="font-medium">{task.started}</span>
                                </div>
                                <div>
                                  <span>Progress: </span>
                                  <span className="font-medium">{task.progress}% complete</span>
                                </div>
                              </>
                            )}
                            {task.status === "todo" && (
                              <>
                                <div>
                                  <span>Est. Time: </span>
                                  <span className="font-medium">{task.estimatedTime}h</span>
                                </div>
                                {task.dependsOn && (
                                  <div>
                                    <span>Depends on: </span>
                                    <span className="font-medium">{task.dependsOn}</span>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                          
                          {task.status === "in-progress" && (
                            <div className="mt-3">
                              <Progress value={task.progress} className="h-2" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {task.status === "todo" ? (
                          <Button variant="outline" size="sm">
                            <Play className="mr-2 h-4 w-4" />
                            Start Task
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm">
                            View Task Details
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="comments" className="space-y-6">
            {/* Comments Section */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">💬 RECENT COMMENTS ({story.comments.length})</h2>
            </div>

            <div className="space-y-4">
              {story.comments.map((comment, index) => (
                <Card key={index} className="bg-gradient-card">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                        {comment.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{comment.user}</span>
                          <span className="text-sm text-muted-foreground">{comment.time}</span>
                        </div>
                        <p className="text-sm mt-1">{comment.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add Comment */}
            <Card className="bg-gradient-card">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                  />
                  <div className="flex justify-between">
                    <Button variant="outline">
                      <Paperclip className="mr-2 h-4 w-4" />
                      Attach File
                    </Button>
                    <Button>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Add Comment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attachments" className="space-y-6">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle>📎 Attachments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No attachments yet. Click "Attach File" in the comments section to add files.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
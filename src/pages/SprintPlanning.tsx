import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { 
  ArrowLeft, 
  Plus, 
  Calendar, 
  Users, 
  Target, 
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Play,
  Save
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const sprintData = {
  16: {
    name: "Sprint 16 - Payment & Notifications",
    duration: "2 weeks (Dec 15 - Dec 28, 2024)",
    goal: "Complete payment methods & basic notifications",
    teamCapacity: 40,
    currentSelection: 39,
    selectedStories: [
      {
        id: 1,
        title: "As user, I want Apple Pay option",
        epic: "Payment",
        storyPoints: 8,
        assignee: "Sarah",
        tasks: 4,
        estimatedHours: 24,
        status: "selected"
      },
      {
        id: 2,
        title: "As admin, refund failed payments",
        epic: "Payment", 
        storyPoints: 13,
        assignee: "Mike",
        tasks: 5,
        estimatedHours: 40,
        status: "selected"
      },
      {
        id: 3,
        title: "As user, receive payment notifications",
        epic: "Notifications",
        storyPoints: 5,
        assignee: "Lisa",
        tasks: 3,
        estimatedHours: 16,
        status: "selected"
      },
      {
        id: 4,
        title: "As user, get push notifications",
        epic: "Notifications",
        storyPoints: 8,
        assignee: "Alex",
        tasks: 4,
        estimatedHours: 28,
        status: "selected"
      },
      {
        id: 5,
        title: "As user, customize notification settings",
        epic: "Notifications",
        storyPoints: 5,
        assignee: "John",
        tasks: 3,
        estimatedHours: 20,
        status: "selected"
      }
    ],
    backlogStories: [
      {
        id: 6,
        title: "As user, I want social media login",
        epic: "Authentication",
        storyPoints: 8,
        status: "ready"
      },
      {
        id: 7,
        title: "As admin, view user analytics",
        epic: "Analytics",
        storyPoints: 13,
        status: "ready"
      },
      {
        id: 8,
        title: "As user, export data",
        epic: "Data Management", 
        storyPoints: 5,
        status: "ready"
      }
    ],
    teamMembers: [
      {
        name: "John Smith",
        role: "Product Owner/Dev",
        capacity: 8,
        assigned: 5,
        available: 3,
        load: 62,
        stories: ["Notification settings"]
      },
      {
        name: "Sarah Johnson",
        role: "Frontend Lead",
        capacity: 8,
        assigned: 8,
        available: 0,
        load: 100,
        stories: ["Apple Pay integration"]
      },
      {
        name: "Mike Chen",
        role: "Backend Developer",
        capacity: 8,
        assigned: 13,
        available: -5,
        load: 162,
        stories: ["Payment refunds"],
        overloaded: true
      },
      {
        name: "Lisa Wang",
        role: "Full Stack Developer",
        capacity: 8,
        assigned: 5,
        available: 3,
        load: 62,
        stories: ["Payment notifications"]
      },
      {
        name: "Alex Brown",
        role: "Mobile Developer",
        capacity: 8,
        assigned: 8,
        available: 0,
        load: 100,
        stories: ["Push notifications"]
      }
    ],
    definitionOfDone: [
      "Code reviewed and approved",
      "Unit tests written (90% coverage)",
      "Integration tests passing",
      "User acceptance criteria met",
      "Documentation updated",
      "QA testing completed"
    ]
  }
}

export default function SprintPlanning() {
  const { workspaceId, projectId } = useParams()
  const [activeTab, setActiveTab] = useState("setup")
  const sprint = sprintData[16]

  const getLoadColor = (load: number) => {
    if (load > 120) return "destructive"
    if (load > 90) return "warning"
    return "success"
  }

  const getLoadIcon = (load: number) => {
    if (load > 120) return <AlertTriangle className="h-4 w-4" />
    if (load > 90) return <AlertTriangle className="h-4 w-4" />
    return <CheckCircle className="h-4 w-4" />
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
                <h1 className="text-2xl font-bold text-foreground">🏃‍♂️ SPRINT 16 PLANNING</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Link to="/user-dashboard" className="hover:text-foreground">🏠</Link>
                  <span>&gt;</span>
                  <Link to={`/workspace/${workspaceId}`} className="hover:text-foreground">🏢 TechCorp</Link>
                  <span>&gt;</span>
                  <Link to={`/workspace/${workspaceId}/project/${projectId}`} className="hover:text-foreground">📱 Mobile App</Link>
                  <span>&gt;</span>
                  <span>Sprint Planning</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button variant="premium">
                <Play className="mr-2 h-4 w-4" />
                Start Sprint
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="setup">📊 Sprint Setup</TabsTrigger>
            <TabsTrigger value="stories">📋 Story Selection</TabsTrigger>
            <TabsTrigger value="assignment">👥 Task Assignment</TabsTrigger>
            <TabsTrigger value="capacity">📊 Capacity Planning</TabsTrigger>
            <TabsTrigger value="review">🚀 Start Sprint</TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-6">
            {/* Sprint Details */}
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  📊 SPRINT DETAILS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Sprint Name</p>
                    <p className="font-semibold text-lg">{sprint.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-semibold">{sprint.duration}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm text-muted-foreground">Sprint Goal</p>
                  <p className="mt-2 p-4 bg-background/50 rounded-lg font-medium">
                    "{sprint.goal}"
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Team Capacity</p>
                    <p className="font-semibold text-2xl">{sprint.teamCapacity} story points</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Selection</p>
                    <p className="font-semibold text-2xl">{sprint.currentSelection} story points</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Capacity Used</p>
                    <div className="flex items-center gap-2">
                      <Progress value={(sprint.currentSelection / sprint.teamCapacity) * 100} className="h-2 flex-1" />
                      <span className="font-semibold">{Math.round((sprint.currentSelection / sprint.teamCapacity) * 100)}%</span>
                    </div>
                    <Badge variant="success" className="text-xs mt-1">Good fit</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stories" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Selected Stories */}
              <Card className="bg-gradient-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    ✅ SELECTED FOR SPRINT 16 ({sprint.selectedStories.length} stories)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sprint.selectedStories.map((story) => (
                    <div key={story.id} className="p-4 bg-background/50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold">{story.title}</h4>
                          <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-muted-foreground">
                            <div>Epic: {story.epic}</div>
                            <div>Points: {story.storyPoints}</div>
                            <div>Assignee: {story.assignee}</div>
                            <div>Tasks: {story.tasks} created</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Remove</Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span>Total Story Points:</span>
                      <span className="font-semibold">{sprint.currentSelection}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Estimated Hours:</span>
                      <span className="font-semibold">128h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Available Stories */}
              <Card className="bg-gradient-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    📋 PRODUCT BACKLOG (Available Stories)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sprint.backlogStories.map((story) => (
                    <div key={story.id} className="p-4 bg-background/30 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold">{story.title}</h4>
                          <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-muted-foreground">
                            <div>Epic: {story.epic}</div>
                            <div>Points: {story.storyPoints}</div>
                            <div>Status: {story.status}</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Add to Sprint</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="assignment" className="space-y-6">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">👥 Task Assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Task assignment and story allocation details would be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="capacity" className="space-y-6">
            {/* Team Capacity Analysis */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">👥 TEAM CAPACITY ANALYSIS</h2>
              <Button variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                Balance Team Load
              </Button>
            </div>

            <div className="grid gap-4">
              {sprint.teamMembers.map((member, index) => (
                <Card key={index} className={`bg-gradient-card ${member.overloaded ? 'border-destructive' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{member.name}</h3>
                          <Badge variant="outline" className="text-xs">{member.role}</Badge>
                          {getLoadIcon(member.load)}
                        </div>
                        
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Capacity</p>
                            <p className="font-semibold">{member.capacity} points</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Assigned</p>
                            <p className="font-semibold">{member.assigned} points</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Available</p>
                            <p className={`font-semibold ${member.available < 0 ? 'text-destructive' : 'text-success'}`}>
                              {member.available} points
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Load</p>
                            <Badge variant={getLoadColor(member.load)} className="text-xs">
                              {member.load}%
                            </Badge>
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-sm text-muted-foreground">Stories: {member.stories.join(", ")}</p>
                        </div>
                      </div>
                      
                      {member.overloaded && (
                        <Button variant="outline" size="sm">
                          Reassign Some Tasks
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="review" className="space-y-6">
            {/* Sprint Goal */}
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  🎯 SPRINT GOAL
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium p-4 bg-background/50 rounded-lg">
                  "{sprint.goal}"
                </p>
              </CardContent>
            </Card>

            {/* Definition of Done */}
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  ✅ DEFINITION OF DONE CHECKLIST
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {sprint.definitionOfDone.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Sprint Summary */}
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  📊 SPRINT SUMMARY
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <p className="text-2xl font-bold text-foreground">{sprint.selectedStories.length}</p>
                    <p className="text-sm text-muted-foreground">Stories</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{sprint.currentSelection}</p>
                    <p className="text-sm text-muted-foreground">Story Points</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">19</p>
                    <p className="text-sm text-muted-foreground">Tasks</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">128h</p>
                    <p className="text-sm text-muted-foreground">Est. Hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="lg">
                Save as Draft
              </Button>
              <Button variant="premium" size="lg">
                <Play className="mr-2 h-5 w-5" />
                Start Sprint 16
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
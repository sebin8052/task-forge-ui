import { useState } from "react"
import { Plus, Search, Calendar, Play, Pause, Square, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

const sprints = [
  {
    id: 1,
    name: "Sprint 24.1 - Authentication MVP",
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-01-29",
    goal: "Complete user authentication system with login, registration, and password reset",
    totalStories: 8,
    completedStories: 5,
    totalStoryPoints: 34,
    completedStoryPoints: 21,
    stories: [
      { id: 1, title: "User Login API", status: "done", points: 5 },
      { id: 2, title: "Registration Form", status: "done", points: 3 },
      { id: 3, title: "Password Reset", status: "in-progress", points: 8 },
      { id: 4, title: "Email Verification", status: "todo", points: 5 }
    ]
  },
  {
    id: 2,
    name: "Sprint 24.2 - Dashboard Core",
    status: "planning",
    startDate: "2024-01-30",
    endDate: "2024-02-13",
    goal: "Build the main dashboard with project overview and basic analytics",
    totalStories: 6,
    completedStories: 0,
    totalStoryPoints: 28,
    completedStoryPoints: 0,
    stories: [
      { id: 5, title: "Dashboard Layout", status: "todo", points: 5 },
      { id: 6, title: "Project Cards", status: "todo", points: 8 },
      { id: 7, title: "Activity Feed", status: "todo", points: 8 },
      { id: 8, title: "Quick Stats", status: "todo", points: 3 }
    ]
  },
  {
    id: 3,
    name: "Sprint 23.12 - Project Setup",
    status: "completed",
    startDate: "2023-12-04",
    endDate: "2023-12-18",
    goal: "Initial project setup and infrastructure components",
    totalStories: 10,
    completedStories: 10,
    totalStoryPoints: 45,
    completedStoryPoints: 45,
    stories: [
      { id: 9, title: "Database Schema", status: "done", points: 13 },
      { id: 10, title: "API Framework", status: "done", points: 8 },
      { id: 11, title: "Frontend Setup", status: "done", points: 5 },
      { id: 12, title: "CI/CD Pipeline", status: "done", points: 8 }
    ]
  }
]

export default function Sprints() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("active")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "success"
      case "planning": return "warning"
      case "completed": return "default"
      default: return "secondary"
    }
  }

  const getStoryStatusColor = (status: string) => {
    switch (status) {
      case "done": return "success"
      case "in-progress": return "warning"
      case "todo": return "secondary"
      default: return "secondary"
    }
  }

  const filteredSprints = sprints.filter(sprint => {
    const matchesSearch = sprint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sprint.goal.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = selectedTab === "all" || sprint.status === selectedTab
    return matchesSearch && matchesTab
  })

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sprints</h2>
          <p className="text-muted-foreground">
            Manage your sprint cycles and track development progress
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Sprint
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sprints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active ({sprints.filter(s => s.status === 'active').length})</TabsTrigger>
          <TabsTrigger value="planning">Planning ({sprints.filter(s => s.status === 'planning').length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({sprints.filter(s => s.status === 'completed').length})</TabsTrigger>
          <TabsTrigger value="all">All Sprints ({sprints.length})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredSprints.map((sprint) => (
              <Card key={sprint.id} className="hover:shadow-soft transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{sprint.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getStatusColor(sprint.status)}>
                          {sprint.status}
                        </Badge>
                        {sprint.status === "active" && (
                          <span className="text-sm text-muted-foreground">
                            {getDaysRemaining(sprint.endDate)} days left
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {sprint.status === "active" && (
                        <Button variant="ghost" size="icon-sm">
                          <Pause className="h-4 w-4" />
                        </Button>
                      )}
                      {sprint.status === "planning" && (
                        <Button variant="ghost" size="icon-sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Sprint</DropdownMenuItem>
                          <DropdownMenuItem>View Board</DropdownMenuItem>
                          <DropdownMenuItem>Sprint Report</DropdownMenuItem>
                          {sprint.status === "active" && (
                            <DropdownMenuItem>Complete Sprint</DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive">
                            Delete Sprint
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Goal:</strong> {sprint.goal}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Story Progress</span>
                      <span className="font-medium">
                        {sprint.completedStories}/{sprint.totalStories} stories
                      </span>
                    </div>
                    <Progress 
                      value={(sprint.completedStories / sprint.totalStories) * 100} 
                      className="h-2" 
                    />
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Story Points</span>
                      <span className="font-medium">
                        {sprint.completedStoryPoints}/{sprint.totalStoryPoints} points
                      </span>
                    </div>
                    <Progress 
                      value={(sprint.completedStoryPoints / sprint.totalStoryPoints) * 100} 
                      className="h-2" 
                    />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Recent Stories</h4>
                    <div className="space-y-1">
                      {sprint.stories.slice(0, 3).map((story) => (
                        <div key={story.id} className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-2">
                            <Badge variant={getStoryStatusColor(story.status)} className="text-xs">
                              {story.status}
                            </Badge>
                            <span className="truncate">{story.title}</span>
                          </div>
                          <span className="text-muted-foreground">{story.points}pt</span>
                        </div>
                      ))}
                      {sprint.stories.length > 3 && (
                        <p className="text-xs text-muted-foreground">
                          +{sprint.stories.length - 3} more stories
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredSprints.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No sprints found matching your search.</p>
        </div>
      )}
    </div>
  )
}
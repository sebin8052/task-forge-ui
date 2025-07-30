import { useState } from "react"
import { Plus, Search, MoreHorizontal, Calendar, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

const epics = [
  {
    id: 1,
    title: "User Authentication & Authorization",
    description: "Complete user management system with secure authentication, role-based access control, and user profiles",
    status: "in-progress",
    priority: "high",
    progress: 65,
    storiesTotal: 12,
    storiesCompleted: 8,
    startDate: "2024-01-15",
    targetDate: "2024-03-15",
    owner: "John Doe",
    labels: ["Security", "Backend"]
  },
  {
    id: 2,
    title: "Dashboard & Analytics",
    description: "Interactive dashboard with real-time analytics, reporting capabilities, and data visualization",
    status: "planning",
    priority: "medium",
    progress: 25,
    storiesTotal: 8,
    storiesCompleted: 2,
    startDate: "2024-02-01",
    targetDate: "2024-04-01",
    owner: "Jane Smith",
    labels: ["Frontend", "Analytics"]
  },
  {
    id: 3,
    title: "Mobile Experience",
    description: "Responsive design and mobile optimization for all core features",
    status: "not-started",
    priority: "medium",
    progress: 0,
    storiesTotal: 6,
    storiesCompleted: 0,
    startDate: "2024-03-01",
    targetDate: "2024-05-01",
    owner: "Mike Johnson",
    labels: ["Frontend", "Mobile"]
  },
  {
    id: 4,
    title: "API & Integration Platform",
    description: "RESTful API development and third-party service integrations",
    status: "completed",
    priority: "high",
    progress: 100,
    storiesTotal: 15,
    storiesCompleted: 15,
    startDate: "2023-11-01",
    targetDate: "2024-01-31",
    owner: "Sarah Wilson",
    labels: ["Backend", "API"]
  },
  {
    id: 5,
    title: "File Management System",
    description: "Comprehensive file upload, storage, and management capabilities",
    status: "in-progress",
    priority: "low",
    progress: 40,
    storiesTotal: 10,
    storiesCompleted: 4,
    startDate: "2024-01-20",
    targetDate: "2024-04-20",
    owner: "Alex Brown",
    labels: ["Backend", "Storage"]
  }
]

export default function Epics() {
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "success"
      case "in-progress": return "default"
      case "planning": return "warning"
      case "not-started": return "secondary"
      default: return "default"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive"
      case "medium": return "warning"
      case "low": return "secondary"
      default: return "secondary"
    }
  }

  const filteredEpics = epics.filter(epic =>
    epic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    epic.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Epics</h2>
          <p className="text-muted-foreground">
            Track large bodies of work and their progress
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Epic
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search epics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredEpics.map((epic) => (
          <Card key={epic.id} className="hover:shadow-soft transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg line-clamp-2">{epic.title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getStatusColor(epic.status)}>
                      {epic.status.replace('-', ' ')}
                    </Badge>
                    <Badge variant={getPriorityColor(epic.priority)}>
                      {epic.priority}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Epic</DropdownMenuItem>
                    <DropdownMenuItem>View Stories</DropdownMenuItem>
                    <DropdownMenuItem>Add Story</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Delete Epic
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {epic.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{epic.progress}%</span>
                </div>
                <Progress value={epic.progress} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{epic.storiesCompleted}/{epic.storiesTotal} stories</span>
                  <span>{epic.storiesTotal - epic.storiesCompleted} remaining</span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Target: {new Date(epic.targetDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Target className="h-3 w-3" />
                  <span>Owner: {epic.owner}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {epic.labels.map((label) => (
                  <Badge key={label} variant="outline" className="text-xs">
                    {label}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEpics.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No epics found matching your search.</p>
        </div>
      )}
    </div>
  )
}
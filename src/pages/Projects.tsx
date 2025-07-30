import { useState } from "react"
import { Plus, Search, Filter, Grid3X3, List, MoreVertical, Users, Calendar, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const projects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Complete overhaul of company website with modern design and improved UX",
    status: "In Progress",
    priority: "High",
    progress: 75,
    dueDate: "Dec 15, 2024",
    team: [
      { name: "Alice Johnson", avatar: "AJ" },
      { name: "Bob Smith", avatar: "BS" },
      { name: "Carol Davis", avatar: "CD" },
    ],
    tasks: { completed: 15, total: 20 },
    budget: "$45,000",
    category: "Design"
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Cross-platform mobile application for iOS and Android",
    status: "In Progress",
    priority: "High",
    progress: 45,
    dueDate: "Jan 30, 2025",
    team: [
      { name: "David Wilson", avatar: "DW" },
      { name: "Eva Martinez", avatar: "EM" },
      { name: "Frank Taylor", avatar: "FT" },
      { name: "Grace Lee", avatar: "GL" },
    ],
    tasks: { completed: 9, total: 20 },
    budget: "$75,000",
    category: "Development"
  },
  {
    id: 3,
    name: "Marketing Campaign",
    description: "Q1 2025 digital marketing campaign across multiple channels",
    status: "Review",
    priority: "Medium",
    progress: 90,
    dueDate: "Dec 1, 2024",
    team: [
      { name: "Henry Brown", avatar: "HB" },
      { name: "Iris Chen", avatar: "IC" },
    ],
    tasks: { completed: 18, total: 20 },
    budget: "$25,000",
    category: "Marketing"
  },
  {
    id: 4,
    name: "Data Analytics Platform",
    description: "Internal dashboard for business intelligence and reporting",
    status: "Planning",
    priority: "Low",
    progress: 15,
    dueDate: "Mar 15, 2025",
    team: [
      { name: "Jack Robinson", avatar: "JR" },
      { name: "Kelly White", avatar: "KW" },
    ],
    tasks: { completed: 3, total: 25 },
    budget: "$60,000",
    category: "Analytics"
  },
  {
    id: 5,
    name: "Customer Support Portal",
    description: "Self-service portal for customer inquiries and support tickets",
    status: "Completed",
    priority: "Medium",
    progress: 100,
    dueDate: "Nov 30, 2024",
    team: [
      { name: "Lisa Anderson", avatar: "LA" },
      { name: "Mike Johnson", avatar: "MJ" },
    ],
    tasks: { completed: 12, total: 12 },
    budget: "$30,000",
    category: "Support"
  },
  {
    id: 6,
    name: "Security Audit",
    description: "Comprehensive security assessment and vulnerability testing",
    status: "In Progress",
    priority: "High",
    progress: 60,
    dueDate: "Dec 20, 2024",
    team: [
      { name: "Nina Patel", avatar: "NP" },
      { name: "Oscar Kim", avatar: "OK" },
    ],
    tasks: { completed: 8, total: 15 },
    budget: "$20,000",
    category: "Security"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed": return "success"
    case "In Progress": return "default"
    case "Review": return "warning"
    case "Planning": return "secondary"
    default: return "secondary"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High": return "destructive"
    case "Medium": return "warning"
    case "Low": return "secondary"
    default: return "secondary"
  }
}

export default function Projects() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8 p-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground">
            Manage and track all your active projects
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <div className="flex border border-border rounded-lg">
            <Button 
              variant={viewMode === "grid" ? "default" : "ghost"} 
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "list" ? "default" : "ghost"} 
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="premium">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs defaultValue="all" className="w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="planning">Planning</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Projects Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-card transition-all duration-300 hover:scale-105 cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {project.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(project.status)} size="sm">
                        {project.status}
                      </Badge>
                      <Badge variant={getPriorityColor(project.priority)} size="sm">
                        {project.priority}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Project</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Archive</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{project.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>{project.budget}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {project.tasks.completed}/{project.tasks.total} tasks
                    </span>
                  </div>
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member, index) => (
                      <Avatar key={index} className="h-6 w-6 border border-background">
                        <AvatarFallback className="text-xs bg-gradient-primary text-primary-foreground">
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.team.length > 3 && (
                      <Avatar className="h-6 w-6 border border-background">
                        <AvatarFallback className="text-xs bg-muted">
                          +{project.team.length - 3}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="space-y-0">
              {filteredProjects.map((project, index) => (
                <div key={project.id} className={`p-6 flex items-center justify-between hover:bg-accent/50 transition-colors cursor-pointer ${index !== filteredProjects.length - 1 ? 'border-b border-border' : ''}`}>
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground">{project.name}</h3>
                        <Badge variant={getStatusColor(project.status)} size="sm">
                          {project.status}
                        </Badge>
                        <Badge variant={getPriorityColor(project.priority)} size="sm">
                          {project.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Due {project.dueDate}</span>
                        <span>{project.tasks.completed}/{project.tasks.total} tasks</span>
                        <span>{project.budget}</span>
                      </div>
                    </div>
                    <div className="w-32">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member, index) => (
                        <Avatar key={index} className="h-8 w-8 border border-background">
                          <AvatarFallback className="text-xs bg-gradient-primary text-primary-foreground">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.team.length > 3 && (
                        <Avatar className="h-8 w-8 border border-background">
                          <AvatarFallback className="text-xs bg-muted">
                            +{project.team.length - 3}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Project</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Archive</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
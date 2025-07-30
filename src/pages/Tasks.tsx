import { useState } from "react"
import { Plus, Search, Filter, Calendar, User, Flag, MoreVertical, CheckCircle, Circle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tasks = [
  {
    id: 1,
    title: "Design homepage mockups",
    description: "Create wireframes and high-fidelity mockups for the new homepage",
    status: "In Progress",
    priority: "High",
    project: "Website Redesign",
    assignee: { name: "Alice Johnson", avatar: "AJ" },
    dueDate: "Dec 5, 2024",
    completed: false,
    subtasks: 3,
    completedSubtasks: 1
  },
  {
    id: 2,
    title: "Set up CI/CD pipeline",
    description: "Configure automated testing and deployment workflow",
    status: "Todo",
    priority: "Medium",
    project: "Mobile App",
    assignee: { name: "Bob Smith", avatar: "BS" },
    dueDate: "Dec 8, 2024",
    completed: false,
    subtasks: 5,
    completedSubtasks: 0
  },
  {
    id: 3,
    title: "Write API documentation",
    description: "Document all REST API endpoints with examples",
    status: "Done",
    priority: "Low",
    project: "Mobile App",
    assignee: { name: "Carol Davis", avatar: "CD" },
    dueDate: "Nov 30, 2024",
    completed: true,
    subtasks: 4,
    completedSubtasks: 4
  },
  {
    id: 4,
    title: "User testing sessions",
    description: "Conduct usability testing with target users",
    status: "In Review",
    priority: "High",
    project: "Website Redesign",
    assignee: { name: "David Wilson", avatar: "DW" },
    dueDate: "Dec 10, 2024",
    completed: false,
    subtasks: 2,
    completedSubtasks: 2
  },
  {
    id: 5,
    title: "Database optimization",
    description: "Improve query performance and add indexes",
    status: "In Progress",
    priority: "Medium",
    project: "Analytics Platform",
    assignee: { name: "Eva Martinez", avatar: "EM" },
    dueDate: "Dec 15, 2024",
    completed: false,
    subtasks: 6,
    completedSubtasks: 3
  },
  {
    id: 6,
    title: "Security audit report",
    description: "Review and document security vulnerabilities",
    status: "Todo",
    priority: "High",
    project: "Security Audit",
    assignee: { name: "Frank Taylor", avatar: "FT" },
    dueDate: "Dec 12, 2024",
    completed: false,
    subtasks: 8,
    completedSubtasks: 0
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Done": return "success"
    case "In Progress": return "default"
    case "In Review": return "warning"
    case "Todo": return "secondary"
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

export default function Tasks() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.project.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const todoTasks = filteredTasks.filter(task => task.status === "Todo")
  const inProgressTasks = filteredTasks.filter(task => task.status === "In Progress")
  const reviewTasks = filteredTasks.filter(task => task.status === "In Review")
  const doneTasks = filteredTasks.filter(task => task.status === "Done")

  const TaskCard = ({ task }: { task: typeof tasks[0] }) => (
    <Card className="mb-4 hover:shadow-card transition-all duration-300 cursor-pointer group">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox 
            checked={task.completed}
            className="mt-1"
          />
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground group-hover:text-primary'} transition-colors`}>
                  {task.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {task.description}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon-sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit Task</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={getStatusColor(task.status)} size="sm">
                {task.status}
              </Badge>
              <Badge variant={getPriorityColor(task.priority)} size="sm">
                {task.priority}
              </Badge>
              <div className="text-xs text-muted-foreground">
                {task.project}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{task.dueDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  <span>{task.completedSubtasks}/{task.subtasks} subtasks</span>
                </div>
              </div>
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs bg-gradient-primary text-primary-foreground">
                  {task.assignee.avatar}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-8 p-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
          <p className="text-muted-foreground">
            Manage and track all project tasks
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="premium">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Task Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Circle className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Todo</p>
                <p className="text-2xl font-bold">{todoTasks.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Circle className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">In Progress</p>
                <p className="text-2xl font-bold">{inProgressTasks.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Circle className="h-4 w-4 text-warning" />
              <div>
                <p className="text-sm font-medium">Review</p>
                <p className="text-2xl font-bold">{reviewTasks.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <div>
                <p className="text-sm font-medium">Done</p>
                <p className="text-2xl font-bold">{doneTasks.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Todo Column */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Circle className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Todo</h3>
            <Badge variant="secondary" size="sm">{todoTasks.length}</Badge>
          </div>
          <div className="space-y-4">
            {todoTasks.map(task => <TaskCard key={task.id} task={task} />)}
          </div>
        </div>

        {/* In Progress Column */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Circle className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-foreground">In Progress</h3>
            <Badge variant="default" size="sm">{inProgressTasks.length}</Badge>
          </div>
          <div className="space-y-4">
            {inProgressTasks.map(task => <TaskCard key={task.id} task={task} />)}
          </div>
        </div>

        {/* Review Column */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Circle className="h-4 w-4 text-warning" />
            <h3 className="font-semibold text-foreground">Review</h3>
            <Badge variant="warning" size="sm">{reviewTasks.length}</Badge>
          </div>
          <div className="space-y-4">
            {reviewTasks.map(task => <TaskCard key={task.id} task={task} />)}
          </div>
        </div>

        {/* Done Column */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-4 w-4 text-success" />
            <h3 className="font-semibold text-foreground">Done</h3>
            <Badge variant="success" size="sm">{doneTasks.length}</Badge>
          </div>
          <div className="space-y-4">
            {doneTasks.map(task => <TaskCard key={task.id} task={task} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
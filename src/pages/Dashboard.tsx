import { Calendar, TrendingUp, Users, Clock, Plus, MoreVertical } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import dashboardHero from "@/assets/dashboard-hero.jpg"

const stats = [
  {
    title: "Active Projects",
    value: "12",
    change: "+2 from last month",
    icon: Calendar,
    trend: "up"
  },
  {
    title: "Tasks Completed",
    value: "247",
    change: "+18% from last week",
    icon: TrendingUp,
    trend: "up"
  },
  {
    title: "Team Members",
    value: "24",
    change: "+3 new members",
    icon: Users,
    trend: "up"
  },
  {
    title: "Hours Tracked",
    value: "1,429",
    change: "+5% from last month",
    icon: Clock,
    trend: "up"
  }
]

const recentProjects = [
  {
    name: "Website Redesign",
    progress: 75,
    dueDate: "Dec 15, 2024",
    status: "On Track",
    team: 5,
    tasks: { completed: 15, total: 20 }
  },
  {
    name: "Mobile App Development",
    progress: 45,
    dueDate: "Jan 30, 2025",
    status: "In Progress",
    team: 8,
    tasks: { completed: 9, total: 20 }
  },
  {
    name: "Marketing Campaign",
    progress: 90,
    dueDate: "Dec 1, 2024",
    status: "Almost Done",
    team: 3,
    tasks: { completed: 18, total: 20 }
  }
]

const upcomingTasks = [
  {
    title: "Review design mockups",
    project: "Website Redesign",
    priority: "High",
    dueTime: "2:00 PM"
  },
  {
    title: "Update project documentation",
    project: "Mobile App",
    priority: "Medium",
    dueTime: "4:30 PM"
  },
  {
    title: "Team standup meeting",
    project: "Marketing Campaign",
    priority: "Low",
    dueTime: "9:00 AM Tomorrow"
  }
]

export default function Dashboard() {
  return (
    <div className="space-y-8 p-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-hero border border-border">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
        <img 
          src={dashboardHero}
          alt="Dashboard Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative p-8">
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, John! 👋
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Here's what's happening with your projects today.
            </p>
            <div className="flex gap-3">
              <Button variant="premium" size="lg">
                <Plus className="mr-2 h-4 w-4" />
                Create New Project
              </Button>
              <Button variant="outline" size="lg">
                View All Projects
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-card transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <Card className="hover:shadow-card transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Projects</CardTitle>
                  <CardDescription>
                    Track progress on your active projects
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {recentProjects.map((project, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-foreground">{project.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Due {project.dueDate}</span>
                        <span>{project.team} team members</span>
                        <span>{project.tasks.completed}/{project.tasks.total} tasks</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={project.status === "On Track" ? "default" : 
                                project.status === "Almost Done" ? "success" : "secondary"}
                        className="text-xs"
                      >
                        {project.status}
                      </Badge>
                      <Button variant="ghost" size="icon-sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Tasks */}
        <div>
          <Card className="hover:shadow-card transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Today's Tasks</CardTitle>
              <CardDescription>
                Your upcoming tasks and deadlines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium text-sm text-foreground">{task.title}</h4>
                    <p className="text-xs text-muted-foreground">{task.project}</p>
                    <div className="flex items-center gap-2">
                      <Badge 
                        size="sm"
                        variant={task.priority === "High" ? "destructive" : 
                                task.priority === "Medium" ? "warning" : "secondary"}
                      >
                        {task.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{task.dueTime}</span>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                View All Tasks
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
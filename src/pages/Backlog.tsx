import { useState } from "react"
import { Plus, Search, Filter, MoreHorizontal, ArrowUp, ArrowDown, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const backlogItems = [
  {
    id: 1,
    title: "User Authentication System",
    description: "Implement secure login/logout functionality with JWT tokens",
    priority: "high",
    storyPoints: 13,
    epic: "Authentication",
    status: "ready",
    assignee: "John Doe",
    labels: ["Backend", "Security"]
  },
  {
    id: 2,
    title: "Dashboard Analytics Widget",
    description: "Create interactive charts for project metrics visualization",
    priority: "medium",
    storyPoints: 8,
    epic: "Dashboard",
    status: "backlog",
    assignee: "Jane Smith",
    labels: ["Frontend", "Analytics"]
  },
  {
    id: 3,
    title: "Mobile Responsive Design",
    description: "Optimize UI components for mobile and tablet devices",
    priority: "medium",
    storyPoints: 5,
    epic: "UI/UX",
    status: "backlog",
    assignee: "Mike Johnson",
    labels: ["Frontend", "Responsive"]
  },
  {
    id: 4,
    title: "API Rate Limiting",
    description: "Implement rate limiting to prevent API abuse",
    priority: "low",
    storyPoints: 3,
    epic: "Backend",
    status: "icebox",
    assignee: "Sarah Wilson",
    labels: ["Backend", "Performance"]
  },
  {
    id: 5,
    title: "File Upload Feature",
    description: "Allow users to upload and manage project files",
    priority: "high",
    storyPoints: 8,
    epic: "File Management",
    status: "ready",
    assignee: "Alex Brown",
    labels: ["Backend", "Storage"]
  }
]

export default function Backlog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive"
      case "medium": return "warning"
      case "low": return "secondary"
      default: return "secondary"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready": return "success"
      case "backlog": return "default"
      case "icebox": return "secondary"
      default: return "default"
    }
  }

  const filteredItems = backlogItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = selectedTab === "all" || item.status === selectedTab
    return matchesSearch && matchesTab
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Product Backlog</h2>
          <p className="text-muted-foreground">
            Manage and prioritize your product backlog items
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Story
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search backlog items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Items ({backlogItems.length})</TabsTrigger>
          <TabsTrigger value="ready">Ready ({backlogItems.filter(i => i.status === 'ready').length})</TabsTrigger>
          <TabsTrigger value="backlog">Backlog ({backlogItems.filter(i => i.status === 'backlog').length})</TabsTrigger>
          <TabsTrigger value="icebox">Icebox ({backlogItems.filter(i => i.status === 'icebox').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          <div className="space-y-3">
            {filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-soft transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Circle className="h-4 w-4 text-muted-foreground" />
                        <h4 className="font-semibold">{item.title}</h4>
                        <Badge variant={getPriorityColor(item.priority)}>
                          {item.priority}
                        </Badge>
                        <Badge variant={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Epic: {item.epic}</span>
                        <span>Story Points: {item.storyPoints}</span>
                        <span>Assignee: {item.assignee}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.labels.map((label) => (
                          <Badge key={label} variant="outline" className="text-xs">
                            {label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon-sm">
                        <ArrowUp className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <ArrowDown className="h-3 w-3" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Story</DropdownMenuItem>
                          <DropdownMenuItem>Move to Sprint</DropdownMenuItem>
                          <DropdownMenuItem>Change Priority</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete Story
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
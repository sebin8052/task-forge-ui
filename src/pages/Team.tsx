import { useState } from "react"
import { Plus, Search, Mail, Phone, MapPin, MoreVertical, Calendar, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

const teamMembers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@projectpro.com",
    phone: "+1 (555) 123-4567",
    role: "UI/UX Designer",
    department: "Design",
    avatar: "AJ",
    status: "Active",
    location: "San Francisco, CA",
    joinDate: "Jan 15, 2023",
    projects: ["Website Redesign", "Mobile App"],
    tasksCompleted: 47,
    tasksInProgress: 3,
    efficiency: 92,
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"]
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@projectpro.com",
    phone: "+1 (555) 234-5678",
    role: "Frontend Developer",
    department: "Engineering",
    avatar: "BS",
    status: "Active",
    location: "New York, NY",
    joinDate: "Mar 10, 2023",
    projects: ["Website Redesign", "Analytics Platform"],
    tasksCompleted: 63,
    tasksInProgress: 5,
    efficiency: 88,
    skills: ["React", "TypeScript", "CSS", "JavaScript"]
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@projectpro.com",
    phone: "+1 (555) 345-6789",
    role: "Backend Developer",
    department: "Engineering",
    avatar: "CD",
    status: "Active",
    location: "Austin, TX",
    joinDate: "Feb 20, 2023",
    projects: ["Mobile App", "Security Audit"],
    tasksCompleted: 71,
    tasksInProgress: 4,
    efficiency: 95,
    skills: ["Node.js", "Python", "PostgreSQL", "AWS"]
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@projectpro.com",
    phone: "+1 (555) 456-7890",
    role: "Product Manager",
    department: "Product",
    avatar: "DW",
    status: "Active",
    location: "Seattle, WA",
    joinDate: "Dec 5, 2022",
    projects: ["Website Redesign", "Marketing Campaign"],
    tasksCompleted: 54,
    tasksInProgress: 7,
    efficiency: 90,
    skills: ["Product Strategy", "Analytics", "Roadmapping", "Agile"]
  },
  {
    id: 5,
    name: "Eva Martinez",
    email: "eva.martinez@projectpro.com",
    phone: "+1 (555) 567-8901",
    role: "Data Analyst",
    department: "Analytics",
    avatar: "EM",
    status: "Active",
    location: "Los Angeles, CA",
    joinDate: "May 18, 2023",
    projects: ["Analytics Platform", "Marketing Campaign"],
    tasksCompleted: 39,
    tasksInProgress: 2,
    efficiency: 87,
    skills: ["SQL", "Python", "Tableau", "Statistics"]
  },
  {
    id: 6,
    name: "Frank Taylor",
    email: "frank.taylor@projectpro.com",
    phone: "+1 (555) 678-9012",
    role: "DevOps Engineer",
    department: "Engineering",
    avatar: "FT",
    status: "Active",
    location: "Chicago, IL",
    joinDate: "Apr 8, 2023",
    projects: ["Security Audit", "Mobile App"],
    tasksCompleted: 42,
    tasksInProgress: 3,
    efficiency: 91,
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"]
  },
  {
    id: 7,
    name: "Grace Lee",
    email: "grace.lee@projectpro.com",
    phone: "+1 (555) 789-0123",
    role: "Marketing Specialist",
    department: "Marketing",
    avatar: "GL",
    status: "On Leave",
    location: "Boston, MA",
    joinDate: "Jun 12, 2023",
    projects: ["Marketing Campaign"],
    tasksCompleted: 28,
    tasksInProgress: 1,
    efficiency: 85,
    skills: ["Content Marketing", "SEO", "Social Media", "Analytics"]
  },
  {
    id: 8,
    name: "Henry Brown",
    email: "henry.brown@projectpro.com",
    phone: "+1 (555) 890-1234",
    role: "QA Engineer",
    department: "Engineering",
    avatar: "HB",
    status: "Active",
    location: "Denver, CO",
    joinDate: "Jul 25, 2023",
    projects: ["Website Redesign", "Mobile App"],
    tasksCompleted: 35,
    tasksInProgress: 4,
    efficiency: 89,
    skills: ["Test Automation", "Selenium", "Jest", "Bug Tracking"]
  }
]

const departmentStats = [
  { name: "Engineering", members: 5, color: "default" },
  { name: "Design", members: 1, color: "success" },
  { name: "Product", members: 1, color: "warning" },
  { name: "Marketing", members: 1, color: "destructive" },
  { name: "Analytics", members: 1, color: "secondary" }
]

export default function Team() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="space-y-8 p-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team</h1>
          <p className="text-muted-foreground">
            Manage team members and track performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            Export Team Data
          </Button>
          <Button variant="premium">
            <Plus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                <p className="text-3xl font-bold text-foreground">{teamMembers.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                <p className="text-3xl font-bold text-foreground">6</p>
              </div>
              <Calendar className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Efficiency</p>
                <p className="text-3xl font-bold text-foreground">90%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tasks Completed</p>
                <p className="text-3xl font-bold text-foreground">379</p>
              </div>
              <TrendingUp className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Department Stats */}
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          {departmentStats.map((dept, index) => (
            <Badge key={index} variant={dept.color as any} className="px-3 py-1">
              {dept.name} ({dept.members})
            </Badge>
          ))}
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-card transition-all duration-300 hover:scale-105 cursor-pointer group">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg font-semibold">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {member.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={member.status === "Active" ? "success" : "secondary"}
                    size="sm"
                  >
                    {member.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                      <DropdownMenuItem>Assign Task</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Edit Member</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{member.location}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Efficiency</span>
                  <span className="font-medium">{member.efficiency}%</span>
                </div>
                <Progress value={member.efficiency} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold text-foreground">{member.tasksCompleted}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{member.tasksInProgress}</p>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Skills</p>
                <div className="flex flex-wrap gap-1">
                  {member.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" size="sm">
                      {skill}
                    </Badge>
                  ))}
                  {member.skills.length > 3 && (
                    <Badge variant="outline" size="sm">
                      +{member.skills.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Current Projects</p>
                <div className="space-y-1">
                  {member.projects.map((project, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      • {project}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Joined {member.joinDate} • {member.department}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
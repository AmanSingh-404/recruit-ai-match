
import { useState } from "react";
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Briefcase, Calendar, FileText, Plus, Search, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import FileUpload from "@/components/FileUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchScore from "@/components/MatchScore";

// Mock job description data
const mockJobs = [
  {
    id: "1",
    title: "Senior React Developer",
    department: "Engineering",
    location: "Remote",
    created: "2023-04-01",
    status: "active",
    candidates: 24,
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    description: "We're looking for a senior React developer with experience in TypeScript and GraphQL...",
  },
  {
    id: "2",
    title: "UX/UI Designer",
    department: "Design",
    location: "New York, NY",
    created: "2023-03-15",
    status: "active",
    candidates: 18,
    skills: ["Figma", "UI Design", "User Research", "Prototyping"],
    description: "We're seeking a talented UX/UI designer to create beautiful and functional interfaces...",
  },
  {
    id: "3",
    title: "Product Manager",
    department: "Product",
    location: "San Francisco, CA",
    created: "2023-02-20",
    status: "filled",
    candidates: 12,
    skills: ["Agile", "Roadmapping", "User Stories", "Analytics"],
    description: "We need an experienced product manager to lead our product development initiatives...",
  },
  {
    id: "4",
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Remote",
    created: "2023-03-25",
    status: "active",
    candidates: 9,
    skills: ["Kubernetes", "Docker", "AWS", "CI/CD"],
    description: "Join our team as a DevOps engineer to build and maintain our cloud infrastructure...",
  },
];

const JobDescriptions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<typeof mockJobs[0] | null>(null);
  const [activeTab, setActiveTab] = useState("details");

  const filteredJobs = mockJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Job Descriptions</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Job
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Job Description</DialogTitle>
                <DialogDescription>
                  Upload a job description file or create one manually.
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload File</TabsTrigger>
                  <TabsTrigger value="manual">Create Manually</TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="py-4">
                  <FileUpload />
                </TabsContent>
                <TabsContent value="manual" className="py-4 space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="title" className="text-sm font-medium">Job Title</label>
                      <Input id="title" placeholder="e.g. Senior React Developer" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="department" className="text-sm font-medium">Department</label>
                        <Input id="department" placeholder="e.g. Engineering" />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="location" className="text-sm font-medium">Location</label>
                        <Input id="location" placeholder="e.g. Remote" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="skills" className="text-sm font-medium">Required Skills (comma separated)</label>
                      <Input id="skills" placeholder="e.g. React, TypeScript, Node.js" />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="description" className="text-sm font-medium">Job Description</label>
                      <textarea 
                        id="description" 
                        placeholder="Enter the full job description..."
                        className="flex h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Save Job</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs by title, department, or location..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{job.title}</CardTitle>
                  <Badge variant={job.status === "active" ? "default" : "outline"}>
                    {job.status === "active" ? "Active" : "Filled"}
                  </Badge>
                </div>
                <CardDescription className="flex items-center">
                  <Briefcase className="h-3 w-3 mr-1" />
                  {job.department} • {job.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-wrap gap-1 mb-3">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground line-clamp-2">
                  {job.description}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {job.created}
                </div>
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  {job.candidates} candidates
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedJob(job)}
                >
                  View
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Job Details Dialog */}
      <Dialog open={!!selectedJob} onOpenChange={(open) => !open && setSelectedJob(null)}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-auto">
          {selectedJob && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-center">
                  <DialogTitle className="text-2xl">{selectedJob.title}</DialogTitle>
                  <Badge variant={selectedJob.status === "active" ? "default" : "outline"}>
                    {selectedJob.status === "active" ? "Active" : "Filled"}
                  </Badge>
                </div>
                <DialogDescription className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  {selectedJob.department} • {selectedJob.location}
                </DialogDescription>
              </DialogHeader>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="details">
                    <FileText className="h-4 w-4 mr-2" />
                    Details
                  </TabsTrigger>
                  <TabsTrigger value="matches">
                    <Users className="h-4 w-4 mr-2" />
                    Matches
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-1">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-1">Job Description</h3>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {selectedJob.description}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <div className="p-3 bg-muted/50 rounded-md flex-1">
                      <p className="text-sm font-medium mb-1">Posted On</p>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {selectedJob.created}
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-md flex-1">
                      <p className="text-sm font-medium mb-1">Candidates</p>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        {selectedJob.candidates} applicants
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="matches" className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium">Top Matching Candidates</h3>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Candidates
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { name: "John Doe", score: 92, skillsMatch: 95, experienceMatch: 88, educationMatch: 90 },
                      { name: "Jane Smith", score: 88, skillsMatch: 90, experienceMatch: 92, educationMatch: 82 },
                      { name: "Michael Johnson", score: 84, skillsMatch: 82, experienceMatch: 85, educationMatch: 88 },
                    ].map((candidate, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-medium">{candidate.name}</h4>
                              <p className="text-sm text-muted-foreground">Applied on April 2, 2023</p>
                            </div>
                            <div className="text-center">
                              <span className="text-2xl font-bold bg-gradient-to-r from-recruit-blue to-recruit-purple bg-clip-text text-transparent">
                                {candidate.score}%
                              </span>
                              <p className="text-xs text-muted-foreground">Match Score</p>
                            </div>
                          </div>
                          
                          <MatchScore 
                            skillsMatch={candidate.skillsMatch} 
                            experienceMatch={candidate.experienceMatch} 
                            educationMatch={candidate.educationMatch}
                          />
                          
                          <div className="flex justify-end space-x-2 mt-4">
                            <Button variant="outline" size="sm">View Resume</Button>
                            <Button size="sm">Schedule Interview</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedJob(null)}>Close</Button>
                <Button>Edit Job</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </SidebarLayout>
  );
};

export default JobDescriptions;

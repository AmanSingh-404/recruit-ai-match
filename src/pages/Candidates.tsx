
import { useState } from "react";
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, User, Mail, Phone, Briefcase, MapPin, FileText, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileUpload from "@/components/FileUpload";
import MatchScore from "@/components/MatchScore";
import ScheduleInterview from "@/components/ScheduleInterview";

// Mock candidates data
const mockCandidates = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    position: "Senior React Developer",
    experience: "8 years",
    applied: "2023-04-02",
    status: "interviewed",
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    education: "M.S. Computer Science, Stanford University",
    matchScore: {
      overall: 92,
      skills: 95,
      experience: 88,
      education: 90
    }
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
    position: "UX/UI Designer",
    experience: "6 years",
    applied: "2023-03-28",
    status: "screening",
    skills: ["Figma", "UI Design", "User Research", "Prototyping"],
    education: "B.A. Design, RISD",
    matchScore: {
      overall: 88,
      skills: 90,
      experience: 92,
      education: 82
    }
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    phone: "+1 (555) 345-6789",
    location: "Chicago, IL",
    position: "Product Manager",
    experience: "5 years",
    applied: "2023-03-25",
    status: "applied",
    skills: ["Agile", "Roadmapping", "User Stories", "Analytics"],
    education: "MBA, University of Chicago",
    matchScore: {
      overall: 84,
      skills: 82,
      experience: 85,
      education: 88
    }
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 456-7890",
    location: "Remote",
    position: "DevOps Engineer",
    experience: "4 years",
    applied: "2023-03-20",
    status: "offer",
    skills: ["Kubernetes", "Docker", "AWS", "CI/CD"],
    education: "B.S. Computer Science, MIT",
    matchScore: {
      overall: 90,
      skills: 92,
      experience: 86,
      education: 94
    }
  },
];

const Candidates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<typeof mockCandidates[0] | null>(null);
  const [showScheduleInterview, setShowScheduleInterview] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "applied":
        return <Badge variant="outline">Applied</Badge>;
      case "screening":
        return <Badge variant="secondary">Screening</Badge>;
      case "interviewed":
        // Fix: Changed "primary" to "default" to match allowed variants
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Interviewed</Badge>;
      case "offer":
        return <Badge className="bg-green-100 text-green-800">Offer</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const filteredCandidates = mockCandidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Candidates</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Candidate
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Candidate</DialogTitle>
                <DialogDescription>
                  Upload a resume or add candidate details manually.
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload Resume</TabsTrigger>
                  <TabsTrigger value="manual">Add Manually</TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="py-4">
                  <FileUpload />
                </TabsContent>
                <TabsContent value="manual" className="py-4 space-y-4">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                        <Input id="firstName" placeholder="First Name" />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                        <Input id="lastName" placeholder="Last Name" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input id="email" type="email" placeholder="email@example.com" />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                      <Input id="phone" placeholder="+1 (555) 123-4567" />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="position" className="text-sm font-medium">Position</label>
                      <Input id="position" placeholder="e.g. Senior React Developer" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="experience" className="text-sm font-medium">Experience</label>
                        <Input id="experience" placeholder="e.g. 5 years" />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="location" className="text-sm font-medium">Location</label>
                        <Input id="location" placeholder="e.g. San Francisco, CA" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Save Candidate</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates by name, position, or location..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Candidate List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredCandidates.map((candidate) => (
            <Card key={candidate.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex p-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(candidate.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{candidate.name}</h3>
                        <p className="text-muted-foreground text-sm">{candidate.position}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        {getStatusBadge(candidate.status)}
                        <span className="text-sm font-semibold mt-1 bg-gradient-to-r from-recruit-blue to-recruit-purple bg-clip-text text-transparent">
                          {candidate.matchScore.overall}% Match
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {candidate.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{candidate.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="border-t px-4 py-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Mail className="h-3 w-3 mr-1" />
                    {candidate.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-3 w-3 mr-1" />
                    {candidate.phone}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {candidate.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Applied: {candidate.applied}
                  </div>
                </div>
                <div className="border-t p-3 flex justify-end space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedCandidate(candidate)}>
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => {
                      setSelectedCandidate(candidate);
                      setShowScheduleInterview(true);
                    }}
                  >
                    Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Candidate Details Dialog */}
      <Dialog open={!!selectedCandidate && !showScheduleInterview} onOpenChange={(open) => !open && setSelectedCandidate(null)}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-auto">
          {selectedCandidate && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(selectedCandidate.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <DialogTitle className="text-2xl">{selectedCandidate.name}</DialogTitle>
                      <DialogDescription className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {selectedCandidate.position} • {selectedCandidate.experience} experience
                      </DialogDescription>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl font-bold bg-gradient-to-r from-recruit-blue to-recruit-purple bg-clip-text text-transparent">
                      {selectedCandidate.matchScore.overall}%
                    </span>
                    <p className="text-xs text-muted-foreground">Match Score</p>
                  </div>
                </div>
              </DialogHeader>
              
              <Tabs defaultValue="profile">
                <TabsList className="mb-4">
                  <TabsTrigger value="profile">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="match">
                    <FileText className="h-4 w-4 mr-2" />
                    Match Analysis
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/50 rounded-md">
                      <p className="text-sm font-medium mb-1">Email</p>
                      <div className="flex items-center text-muted-foreground">
                        <Mail className="h-4 w-4 mr-1" />
                        {selectedCandidate.email}
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-md">
                      <p className="text-sm font-medium mb-1">Phone</p>
                      <div className="flex items-center text-muted-foreground">
                        <Phone className="h-4 w-4 mr-1" />
                        {selectedCandidate.phone}
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-md">
                      <p className="text-sm font-medium mb-1">Location</p>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {selectedCandidate.location}
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-md">
                      <p className="text-sm font-medium mb-1">Applied On</p>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {selectedCandidate.applied}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Education</h3>
                    <p className="text-muted-foreground">
                      {selectedCandidate.education}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Status</h3>
                    <div className="flex items-center">
                      {getStatusBadge(selectedCandidate.status)}
                      <span className="ml-2 text-muted-foreground">
                        {selectedCandidate.status === "applied" && "Candidate has applied but hasn't been screened yet."}
                        {selectedCandidate.status === "screening" && "Currently in the screening process."}
                        {selectedCandidate.status === "interviewed" && "Has completed at least one interview."}
                        {selectedCandidate.status === "offer" && "An offer has been extended to this candidate."}
                      </span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="match" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Match Score Analysis</CardTitle>
                      <CardDescription>
                        Detailed breakdown of how this candidate matches the job requirements
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MatchScore 
                        skillsMatch={selectedCandidate.matchScore.skills} 
                        experienceMatch={selectedCandidate.matchScore.experience} 
                        educationMatch={selectedCandidate.matchScore.education}
                      />
                      
                      <div className="mt-6 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-1">Skills Analysis</h4>
                          <p className="text-sm text-muted-foreground">
                            Candidate possesses {selectedCandidate.skills.length} of the required skills, 
                            with particularly strong expertise in {selectedCandidate.skills[0]} and {selectedCandidate.skills[1]}.
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-1">Experience Analysis</h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedCandidate.experience} of relevant experience, which aligns well with the 
                            job requirements of 5+ years.
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-1">Education Analysis</h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedCandidate.education} provides a strong educational 
                            background for this position.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Insights</CardTitle>
                      <CardDescription>
                        Generated insights based on resume and job description analysis
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <p className="font-medium">• Strong technical skills that match the core requirements.</p>
                        <p className="font-medium">• Experience level slightly exceeds the job requirements.</p>
                        <p className="font-medium">• Educational background is highly relevant to the position.</p>
                        <p className="font-medium">• Suggested to focus on project experience during interview.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedCandidate(null)}>Close</Button>
                <Button onClick={() => setShowScheduleInterview(true)}>Schedule Interview</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Schedule Interview Dialog */}
      {selectedCandidate && showScheduleInterview && (
        <ScheduleInterview 
          candidate={selectedCandidate}
          open={showScheduleInterview}
          onClose={() => {
            setShowScheduleInterview(false);
            setSelectedCandidate(null);
          }}
        />
      )}
    </SidebarLayout>
  );
};

export default Candidates;

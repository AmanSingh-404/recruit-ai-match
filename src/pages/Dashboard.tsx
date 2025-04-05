
import { useState, useEffect } from "react";
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, FileUp, Briefcase, User, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import ResumeUpload from "@/components/ResumeUpload";
import JobUpload from "@/components/JobUpload";
import { fetchJobDescriptions, fetchResumes, fetchMatchResults, matchDocuments } from "@/services/fileService";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [jobDescriptions, setJobDescriptions] = useState<any[]>([]);
  const [resumes, setResumes] = useState<any[]>([]);
  const [matchResults, setMatchResults] = useState<any[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<string>("");
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [isMatching, setIsMatching] = useState(false);
  const [showMatchDialog, setShowMatchDialog] = useState(false);

  // Stats for the dashboard
  const stats = [
    { title: "Job Descriptions", value: jobDescriptions.length, icon: Briefcase },
    { title: "Resumes", value: resumes.length, icon: User },
    { title: "Matches", value: matchResults.length, icon: BarChart3 },
  ];

  // Fetch data on mount
  useEffect(() => {
    if (user) {
      const loadData = async () => {
        const jobsData = await fetchJobDescriptions();
        const resumesData = await fetchResumes();
        const matchesData = await fetchMatchResults();
        
        setJobDescriptions(jobsData || []);
        setResumes(resumesData || []);
        setMatchResults(matchesData || []);
      };
      
      loadData();
    }
  }, [user]);

  // Handle resume upload completion
  const handleResumeUpload = (resumeId: string) => {
    // Refresh resumes after upload
    fetchResumes().then(data => setResumes(data || []));
    // Set the selected resume ID
    setSelectedResumeId(resumeId);
  };

  // Handle job upload completion
  const handleJobUpload = (jobId: string) => {
    // Refresh job descriptions after upload
    fetchJobDescriptions().then(data => setJobDescriptions(data || []));
    // Set the selected job ID
    setSelectedJobId(jobId);
  };

  // Handle match button click
  const handleMatchClick = () => {
    if (resumes.length > 0 && jobDescriptions.length > 0) {
      setShowMatchDialog(true);
    } else {
      toast({
        title: "Cannot create match",
        description: "You need at least one resume and one job description to create a match.",
        variant: "destructive",
      });
    }
  };

  // Handle match submission
  const handleMatchSubmit = async () => {
    if (!selectedResumeId || !selectedJobId) {
      toast({
        title: "Selection required",
        description: "Please select both a resume and a job description.",
        variant: "destructive",
      });
      return;
    }
    
    setIsMatching(true);
    
    try {
      const result = await matchDocuments(selectedResumeId, selectedJobId);
      
      if (result.success) {
        toast({
          title: "Match created",
          description: "Resume and job description matched successfully.",
        });
        
        // Refresh match results
        const matchesData = await fetchMatchResults();
        setMatchResults(matchesData || []);
      }
    } catch (error) {
      console.error("Match error:", error);
    } finally {
      setIsMatching(false);
      setShowMatchDialog(false);
    }
  };

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="flex items-center p-6">
                <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upload Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-none">
          <CardHeader>
            <CardTitle>Start Matching</CardTitle>
            <CardDescription>
              Upload job descriptions and resumes to find the perfect match
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResumeUpload onUploadComplete={handleResumeUpload} />
              <JobUpload onUploadComplete={handleJobUpload} />
            </div>
            
            <div className="flex justify-center mt-4">
              <Button 
                size="lg" 
                className="w-full md:w-auto"
                onClick={handleMatchClick}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Match Resume to Job
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Matches */}
        {matchResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Recent Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {matchResults.slice(0, 3).map((match, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-md">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <h3 className="font-medium">
                          {match.resumes?.name || "Candidate"} • {match.job_descriptions?.title || "Job Position"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Matched on {new Date(match.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-lg font-semibold bg-primary/10 text-primary px-2 py-1 rounded">
                        {match.overall_score}%
                      </span>
                    </div>
                    <Progress value={match.overall_score} className="h-2" />
                  </div>
                ))}
              </div>
              
              {matchResults.length > 3 && (
                <div className="flex justify-center mt-4">
                  <Button variant="outline" size="sm">
                    View All Matches
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Match Dialog */}
      <Dialog open={showMatchDialog} onOpenChange={setShowMatchDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Match Resume to Job</DialogTitle>
            <DialogDescription>
              Select a resume and job description to find the best match
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Resume</label>
              <Select value={selectedResumeId} onValueChange={setSelectedResumeId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a resume" />
                </SelectTrigger>
                <SelectContent>
                  {resumes.map((resume) => (
                    <SelectItem key={resume.id} value={resume.id}>
                      {resume.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Description</label>
              <Select value={selectedJobId} onValueChange={setSelectedJobId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a job description" />
                </SelectTrigger>
                <SelectContent>
                  {jobDescriptions.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMatchDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleMatchSubmit} disabled={isMatching}>
              {isMatching ? "Matching..." : "Create Match"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarLayout>
  );
};

export default Dashboard;

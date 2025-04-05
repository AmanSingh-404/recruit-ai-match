
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, FileUp, Briefcase, User, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import FileUpload from "@/components/FileUpload";

const Dashboard = () => {
  // Mock data for dashboard
  const stats = [
    { title: "Active Job Descriptions", value: 12, icon: Briefcase },
    { title: "Candidate Resumes", value: 148, icon: User },
    { title: "Scheduled Interviews", value: 28, icon: Calendar },
  ];

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
            <FileUpload />
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5" />
                Recent Job Descriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Senior React Developer", candidates: 24, filled: false },
                  { title: "UX/UI Designer", candidates: 18, filled: false },
                  { title: "Product Manager", candidates: 12, filled: true },
                ].map((job, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-sm text-muted-foreground">{job.candidates} candidates</p>
                    </div>
                    <Button variant={job.filled ? "outline" : "default"} size="sm">
                      {job.filled ? "Filled" : "View"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Top Matching Candidates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "John Doe", position: "Senior React Developer", score: 92 },
                  { name: "Jane Smith", position: "UX/UI Designer", score: 88 },
                  { name: "Michael Johnson", position: "Product Manager", score: 84 },
                ].map((candidate, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">{candidate.name}</p>
                      <span className="text-sm font-semibold bg-primary/10 text-primary px-2 py-1 rounded">
                        {candidate.score}%
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{candidate.position}</p>
                    <Progress value={candidate.score} className="h-1.5 mt-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Dashboard;

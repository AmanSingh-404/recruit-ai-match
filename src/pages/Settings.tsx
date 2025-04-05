
import { useState } from "react";
import { SidebarLayout } from "@/components/layouts/SidebarLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Bell, 
  Calendar, 
  Lock, 
  Shield, 
  Database, 
  FileText, 
  UserCheck,
  Sliders,
  BarChart,
  Search
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [thresholds, setThresholds] = useState({
    skills: 70,
    experience: 60,
    education: 50,
    overall: 65
  });
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>

        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="matching">Matching Criteria</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="fullName" className="text-sm font-medium">Full Name</label>
                      <Input id="fullName" defaultValue="John Smith" />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                      <Input id="email" type="email" defaultValue="john.smith@company.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="company" className="text-sm font-medium">Company Name</label>
                      <Input id="company" defaultValue="Acme Inc." />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="role" className="text-sm font-medium">Role</label>
                      <Input id="role" defaultValue="HR Manager" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Configure how and when you want to be notified
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Email Notifications</p>
                        <p className="text-xs text-muted-foreground">Receive emails about account activity</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">New Candidate Alerts</p>
                        <p className="text-xs text-muted-foreground">Get notified when new candidates match your job posts</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Calendar Notifications</p>
                        <p className="text-xs text-muted-foreground">Receive reminders about scheduled interviews</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  Manage your security settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="password" className="text-sm font-medium">Change Password</label>
                    <Input id="password" type="password" placeholder="New password" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
                    <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Two-Factor Authentication</p>
                        <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="matching" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Matching Algorithm Settings</CardTitle>
                <CardDescription>
                  Customize how candidates are matched to job descriptions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="text-sm font-medium">Skills Match Threshold</h3>
                      <p className="text-xs text-muted-foreground">Minimum percentage of skills that should match</p>
                    </div>
                    <Badge variant="outline">{thresholds.skills}%</Badge>
                  </div>
                  <Slider 
                    value={[thresholds.skills]} 
                    min={0} 
                    max={100} 
                    step={5}
                    onValueChange={(value) => setThresholds({...thresholds, skills: value[0]})} 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="text-sm font-medium">Experience Match Threshold</h3>
                      <p className="text-xs text-muted-foreground">Minimum percentage of experience that should match</p>
                    </div>
                    <Badge variant="outline">{thresholds.experience}%</Badge>
                  </div>
                  <Slider 
                    value={[thresholds.experience]} 
                    min={0} 
                    max={100} 
                    step={5}
                    onValueChange={(value) => setThresholds({...thresholds, experience: value[0]})} 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="text-sm font-medium">Education Match Threshold</h3>
                      <p className="text-xs text-muted-foreground">Minimum percentage of education criteria that should match</p>
                    </div>
                    <Badge variant="outline">{thresholds.education}%</Badge>
                  </div>
                  <Slider 
                    value={[thresholds.education]} 
                    min={0} 
                    max={100} 
                    step={5}
                    onValueChange={(value) => setThresholds({...thresholds, education: value[0]})} 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="text-sm font-medium">Overall Match Threshold</h3>
                      <p className="text-xs text-muted-foreground">Minimum overall match score to include a candidate</p>
                    </div>
                    <Badge variant="outline">{thresholds.overall}%</Badge>
                  </div>
                  <Slider 
                    value={[thresholds.overall]} 
                    min={0} 
                    max={100} 
                    step={5}
                    onValueChange={(value) => setThresholds({...thresholds, overall: value[0]})} 
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Weighting Factors</CardTitle>
                <CardDescription>
                  Adjust the importance of different factors in the matching algorithm
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6">
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold mb-2">40%</div>
                    <div className="text-sm font-medium">Skills</div>
                    <div className="flex justify-center mt-2">
                      <UserCheck className="h-5 w-5 text-recruit-blue" />
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold mb-2">35%</div>
                    <div className="text-sm font-medium">Experience</div>
                    <div className="flex justify-center mt-2">
                      <BarChart className="h-5 w-5 text-recruit-purple" />
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold mb-2">25%</div>
                    <div className="text-sm font-medium">Education</div>
                    <div className="flex justify-center mt-2">
                      <FileText className="h-5 w-5 text-recruit-lightBlue" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground text-center">
                  Contact support to customize these weighting factors for your account.
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>
                  Configure advanced matching options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sliders className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Semantic Matching</p>
                      <p className="text-xs text-muted-foreground">Use AI to match skills that are semantically similar</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Fuzzy Matching</p>
                      <p className="text-xs text-muted-foreground">Match terms with similar spelling or minor variations</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendar Integration</CardTitle>
                <CardDescription>
                  Connect your calendar for interview scheduling
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#4285F4] text-white p-2 rounded">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Google Calendar</p>
                      <p className="text-xs text-muted-foreground">Connected as john.smith@company.com</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#0078D4] text-white p-2 rounded">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Microsoft Outlook</p>
                      <p className="text-xs text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Button size="sm">Connect</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Document Processing</CardTitle>
                <CardDescription>
                  Configure document processing settings and integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">PDF Text Extraction</p>
                        <p className="text-xs text-muted-foreground">Extract text from PDF documents</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">DOCX Text Extraction</p>
                        <p className="text-xs text-muted-foreground">Extract text from DOCX documents</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Database Integrations</CardTitle>
                <CardDescription>
                  Connect to external data sources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#4DB33D] text-white p-2 rounded">
                      <Database className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">MongoDB</p>
                      <p className="text-xs text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Button size="sm">Connect</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>
                  Manage your API keys for accessing the RecruitAI API
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-sm font-medium">Production API Key</h3>
                      <p className="text-xs text-muted-foreground">Use this key for production environments</p>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="flex mt-2">
                    <Input 
                      value="••••••••••••••••••••••••••••••" 
                      readOnly 
                      className="font-mono text-sm"
                    />
                    <Button variant="outline" className="ml-2">
                      Copy
                    </Button>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">
                      Regenerate
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-sm font-medium">Development API Key</h3>
                      <p className="text-xs text-muted-foreground">Use this key for testing and development</p>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="flex mt-2">
                    <Input 
                      value="••••••••••••••••••••••••••••••" 
                      readOnly 
                      className="font-mono text-sm"
                    />
                    <Button variant="outline" className="ml-2">
                      Copy
                    </Button>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">
                      Regenerate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Webhook Configuration</CardTitle>
                <CardDescription>
                  Configure webhook endpoints to receive events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="webhookUrl" className="text-sm font-medium">Webhook URL</label>
                    <Input id="webhookUrl" placeholder="https://your-app.com/webhooks/recruitai" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Events to Send</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="newCandidate" />
                        <label htmlFor="newCandidate" className="text-sm">New Candidate</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="matchUpdate" defaultChecked />
                        <label htmlFor="matchUpdate" className="text-sm">Match Score Update</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="interviewScheduled" defaultChecked />
                        <label htmlFor="interviewScheduled" className="text-sm">Interview Scheduled</label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end">
          <Button onClick={handleSaveSettings}>Save Settings</Button>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Settings;

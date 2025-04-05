
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Upload, File, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: "uploading" | "complete" | "error";
}

const FileUpload = () => {
  const [jobDescFiles, setJobDescFiles] = useState<FileItem[]>([]);
  const [resumeFiles, setResumeFiles] = useState<FileItem[]>([]);
  const jobDescInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: "job" | "resume"
  ) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: FileItem[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substring(2, 11),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: "uploading",
    }));

    if (fileType === "job") {
      setJobDescFiles((prev) => [...prev, ...newFiles]);
      simulateUpload(newFiles, setJobDescFiles);
    } else {
      setResumeFiles((prev) => [...prev, ...newFiles]);
      simulateUpload(newFiles, setResumeFiles);
    }

    // Reset the input
    e.target.value = "";
  };

  // Simulate file upload progress
  const simulateUpload = (
    files: FileItem[],
    setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>
  ) => {
    files.forEach((file) => {
      const intervalId = setInterval(() => {
        setFiles((prevFiles) => {
          const updatedFiles = prevFiles.map((f) => {
            if (f.id === file.id) {
              const newProgress = Math.min(f.progress + 20, 100);
              const newStatus = newProgress === 100 ? "complete" : "uploading";
              
              if (newProgress === 100) {
                clearInterval(intervalId);
                toast({
                  title: "File uploaded successfully",
                  description: `${f.name} has been uploaded.`,
                });
              }
              
              return { ...f, progress: newProgress, status: newStatus };
            }
            return f;
          });
          return updatedFiles;
        });
      }, 500);
    });
  };

  const removeFile = (id: string, fileType: "job" | "resume") => {
    if (fileType === "job") {
      setJobDescFiles((prev) => prev.filter((file) => file.id !== id));
    } else {
      setResumeFiles((prev) => prev.filter((file) => file.id !== id));
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <Tabs defaultValue="job-descriptions" className="w-full">
      <TabsList className="mb-4 w-full">
        <TabsTrigger value="job-descriptions" className="w-1/2">
          <FileText className="h-4 w-4 mr-2" />
          Job Descriptions
        </TabsTrigger>
        <TabsTrigger value="resumes" className="w-1/2">
          <File className="h-4 w-4 mr-2" />
          Resumes
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="job-descriptions">
        <Card>
          <CardContent className="pt-6">
            <input
              type="file"
              ref={jobDescInputRef}
              onChange={(e) => handleFileSelect(e, "job")}
              accept=".pdf,.doc,.docx"
              multiple
              className="hidden"
            />
            
            <div 
              onClick={() => jobDescInputRef.current?.click()}
              className={cn(
                "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
                "hover:border-primary/50 hover:bg-muted/50",
                "flex flex-col items-center"
              )}
            >
              <Upload className="h-8 w-8 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-1">Click to upload job descriptions</p>
              <p className="text-sm text-muted-foreground mb-2">
                Supports PDF, DOC, DOCX files
              </p>
              <Button type="button">
                Select Files
              </Button>
            </div>
            
            {jobDescFiles.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Uploaded Files</h3>
                <div className="space-y-2">
                  {jobDescFiles.map((file) => (
                    <div 
                      key={file.id} 
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
                    >
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {file.status === "complete" ? (
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                        ) : (
                          <div className="w-16 mr-2">
                            <Progress value={file.progress} className="h-1.5" />
                          </div>
                        )}
                        <button 
                          onClick={() => removeFile(file.id, "job")}
                          className="p-1 hover:bg-muted rounded"
                        >
                          <X className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="resumes">
        <Card>
          <CardContent className="pt-6">
            <input
              type="file"
              ref={resumeInputRef}
              onChange={(e) => handleFileSelect(e, "resume")}
              accept=".pdf,.doc,.docx"
              multiple
              className="hidden"
            />
            
            <div 
              onClick={() => resumeInputRef.current?.click()}
              className={cn(
                "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
                "hover:border-primary/50 hover:bg-muted/50",
                "flex flex-col items-center"
              )}
            >
              <Upload className="h-8 w-8 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-1">Click to upload resumes</p>
              <p className="text-sm text-muted-foreground mb-2">
                Supports PDF, DOC, DOCX files
              </p>
              <Button type="button">
                Select Files
              </Button>
            </div>
            
            {resumeFiles.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Uploaded Files</h3>
                <div className="space-y-2">
                  {resumeFiles.map((file) => (
                    <div 
                      key={file.id} 
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
                    >
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {file.status === "complete" ? (
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                        ) : (
                          <div className="w-16 mr-2">
                            <Progress value={file.progress} className="h-1.5" />
                          </div>
                        )}
                        <button 
                          onClick={() => removeFile(file.id, "resume")}
                          className="p-1 hover:bg-muted rounded"
                        >
                          <X className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default FileUpload;

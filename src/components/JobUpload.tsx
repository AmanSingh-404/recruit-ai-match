
import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import { uploadFile } from "@/services/fileService";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

interface JobUploadProps {
  onUploadComplete?: (jobId: string) => void;
}

const JobUpload = ({ onUploadComplete }: JobUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    console.log("Uploading job description:", file.name);
    try {
      const result = await uploadFile(file, 'job');
      console.log("Job upload result:", result);
      
      if (result.success && result.file) {
        toast({
          title: "Job description uploaded",
          description: "Your job description has been uploaded and processed successfully.",
        });
        
        if (onUploadComplete) {
          onUploadComplete(result.file.id);
        }
      } else {
        console.error("Upload failed without throwing error:", result.error);
        toast({
          title: "Upload failed",
          description: result.error || "There was an error uploading your job description.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Job upload error:", error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "There was an error uploading your job description.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Briefcase className="mr-2 h-5 w-5" />
          Upload Job Description
        </CardTitle>
        <CardDescription>
          Upload a job description to find matching candidates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FileUpload 
          onFileSelect={handleUpload}
          isUploading={isUploading}
          acceptedFileTypes=".pdf,.docx"
          maxFileSizeMB={5}
        />
      </CardContent>
    </Card>
  );
};

export default JobUpload;

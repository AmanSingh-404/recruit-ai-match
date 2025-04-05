
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
    try {
      const result = await uploadFile(file, 'job');
      
      if (result.success && result.file) {
        toast({
          title: "Job description uploaded",
          description: "Your job description has been uploaded and processed successfully.",
        });
        
        if (onUploadComplete) {
          onUploadComplete(result.file.id);
        }
      }
    } catch (error) {
      console.error("Job upload error:", error);
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

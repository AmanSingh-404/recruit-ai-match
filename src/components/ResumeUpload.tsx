
import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import { uploadFile } from "@/services/fileService";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ResumeUploadProps {
  onUploadComplete?: (resumeId: string) => void;
}

const ResumeUpload = ({ onUploadComplete }: ResumeUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setError(null);
    console.log("Uploading resume:", file.name);
    try {
      const result = await uploadFile(file, 'resume');
      console.log("Resume upload result:", result);
      
      if (result.success && result.file) {
        toast({
          title: "Resume uploaded",
          description: "Your resume has been uploaded and processed successfully.",
        });
        
        if (onUploadComplete) {
          onUploadComplete(result.file.id);
        }
      } else {
        console.error("Upload failed without throwing error:", result.error);
        setError(result.error || "There was an error uploading your resume.");
        toast({
          title: "Upload failed",
          description: result.error || "There was an error uploading your resume.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Resume upload error:", error);
      const errorMessage = error instanceof Error ? error.message : "There was an error uploading your resume.";
      setError(errorMessage);
      toast({
        title: "Upload failed",
        description: errorMessage,
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
          <FileText className="mr-2 h-5 w-5" />
          Upload Resume
        </CardTitle>
        <CardDescription>
          Upload a resume to find matching job opportunities
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
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

export default ResumeUpload;

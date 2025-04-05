
import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import { uploadFile } from "@/services/fileService";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface JobUploadProps {
  onUploadComplete?: (jobId: string) => void;
}

const JobUpload = ({ onUploadComplete }: JobUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setError(null);
    console.log("Uploading job description:", file.name, "Size:", file.size, "Type:", file.type);
    
    try {
      // Convert the file to text but handle binary files appropriately
      let fileContent = "";
      
      try {
        // For PDF and DOCX, we'll just extract some metadata
        // In a real implementation, you would use a proper PDF/DOCX parser
        fileContent = `File Name: ${file.name}\nFile Size: ${file.size}\nFile Type: ${file.type}\nUpload Date: ${new Date().toISOString()}`;
      } catch (readError) {
        console.error("Error reading file:", readError);
        fileContent = `[Binary content - ${file.type}]`;
      }
      
      const result = await uploadFile(file, 'job', fileContent);
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
        setError(result.error || "There was an error uploading your job description.");
        toast({
          title: "Upload failed",
          description: result.error || "There was an error uploading your job description.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Job upload error:", error);
      const errorMessage = error instanceof Error ? error.message : "There was an error uploading your job description.";
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
          <Briefcase className="mr-2 h-5 w-5" />
          Upload Job Description
        </CardTitle>
        <CardDescription>
          Upload a job description to find matching candidates
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

export default JobUpload;

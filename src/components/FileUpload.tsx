
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Upload, File, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface FileUploadProps {
  onFileSelect: (file: File) => Promise<void>;
  isUploading: boolean;
  acceptedFileTypes?: string;
  maxFileSizeMB?: number;
}

const FileUpload = ({ 
  onFileSelect, 
  isUploading, 
  acceptedFileTypes = ".pdf,.docx",
  maxFileSizeMB = 5 
}: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const files = e.target.files;
    
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Check file type
    const fileTypeRegex = new RegExp(`(${acceptedFileTypes.split(',').join('|')})$`, 'i');
    if (!fileTypeRegex.test(file.name)) {
      setError(`Invalid file type. Accepted types: ${acceptedFileTypes}`);
      return;
    }
    
    // Check file size
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      setError(`File size exceeds the ${maxFileSizeMB}MB limit.`);
      return;
    }
    
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    try {
      await onFileSelect(selectedFile);
      // Reset after successful upload
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error("Error in file upload:", error);
      setError("An error occurred during upload. Please try again.");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedFileTypes}
        className="hidden"
      />
      
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          "hover:border-primary/50 hover:bg-muted/50",
          "flex flex-col items-center"
        )}
      >
        <Upload className="h-8 w-8 text-muted-foreground mb-4" />
        <p className="text-lg font-medium mb-1">Click to select a file</p>
        <p className="text-sm text-muted-foreground mb-2">
          {`Supports ${acceptedFileTypes} files up to ${maxFileSizeMB}MB`}
        </p>
      </div>
      
      {error && (
        <div className="mt-2 text-sm text-destructive">
          {error}
        </div>
      )}
      
      {selectedFile && (
        <div className="mt-4">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-muted-foreground mr-2" />
              <div>
                <p className="text-sm font-medium">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              {isUploading ? (
                <div className="w-16 mr-2">
                  <Progress value={50} className="h-1.5" />
                </div>
              ) : (
                <Button 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpload();
                  }}
                  disabled={isUploading}
                >
                  Upload
                </Button>
              )}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="p-1 ml-2 hover:bg-muted rounded"
                disabled={isUploading}
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;


import { toast } from "@/hooks/use-toast";

// Types for file upload
export interface UploadResult {
  success: boolean;
  file?: {
    id: string;
    name: string;
    size: number;
    type: string;
    url?: string;
    content?: string;
  };
  error?: string;
}

export interface FileMetadata {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: string;
  url?: string;
}

/**
 * Upload a file to the server or process it locally
 */
export const uploadFile = async (file: File): Promise<UploadResult> => {
  try {
    // In a real implementation, we would upload the file to a server
    // For demonstration purposes, we're simulating the upload process
    
    // Check if file is valid (PDF or DOCX)
    const isValidFileType = 
      file.type === "application/pdf" || 
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.name.endsWith(".pdf") || 
      file.name.endsWith(".docx");
    
    if (!isValidFileType) {
      throw new Error("Invalid file type. Please upload a PDF or DOCX file.");
    }
    
    // Simulate file upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const fileId = `file_${Date.now()}`;
    
    return {
      success: true,
      file: {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file) // Local URL for the file
      }
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    
    let errorMessage = "An error occurred while uploading the file.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    toast({
      title: "Upload failed",
      description: errorMessage,
      variant: "destructive",
    });
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

/**
 * Read a file as text
 */
export const readFileAsText = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      } else {
        reject(new Error("Failed to read file."));
      }
    };
    
    reader.onerror = () => {
      reject(new Error("Failed to read file."));
    };
    
    reader.readAsText(file);
  });
};

/**
 * Delete a file
 */
export const deleteFile = async (fileId: string): Promise<boolean> => {
  try {
    // In a real implementation, we would delete the file from the server
    // For demonstration purposes, we're simulating the deletion process
    
    // Simulate deletion delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return true;
  } catch (error) {
    console.error("Error deleting file:", error);
    
    toast({
      title: "Deletion failed",
      description: "An error occurred while deleting the file.",
      variant: "destructive",
    });
    
    return false;
  }
};

/**
 * Get file metadata
 */
export const getFileMetadata = (file: File): FileMetadata => {
  return {
    id: `file_${Date.now()}`,
    name: file.name,
    size: file.size,
    type: file.type,
    uploadDate: new Date().toISOString(),
  };
};

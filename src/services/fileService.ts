import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
export const uploadFile = async (file: File, documentType: 'resume' | 'job'): Promise<UploadResult> => {
  try {
    // Check if file is valid (PDF or DOCX)
    const isValidFileType = 
      file.type === "application/pdf" || 
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.name.endsWith(".pdf") || 
      file.name.endsWith(".docx");
    
    if (!isValidFileType) {
      throw new Error("Invalid file type. Please upload a PDF or DOCX file.");
    }
    
    // Read file content
    const content = await readFileAsText(file);
    
    // Get user ID
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated. Please sign in to upload files.");
    }
    
    // File metadata
    const metadata = {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      uploadDate: new Date().toISOString(),
      user_id: user.id
    };
    
    // Call Supabase Edge Function to process the document
    const { data, error } = await supabase.functions.invoke("process-document", {
      body: {
        document_type: documentType,
        content,
        metadata
      }
    });
    
    if (error) throw error;
    
    return {
      success: true,
      file: {
        id: data.id,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file), // Local URL for the file
        content
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
 * Match a resume against a job description
 */
export const matchDocuments = async (resumeId: string, jobId: string): Promise<any> => {
  try {
    // Get user ID
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated. Please sign in to match documents.");
    }
    
    // Call Supabase Edge Function to match the documents
    const { data, error } = await supabase.functions.invoke("match-documents", {
      body: {
        resume_id: resumeId,
        job_id: jobId,
        user_id: user.id
      }
    });
    
    if (error) throw error;
    
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("Error matching documents:", error);
    
    let errorMessage = "An error occurred while matching documents.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    toast({
      title: "Match failed",
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
 * Fetch all job descriptions
 */
export const fetchJobDescriptions = async (): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from('job_descriptions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error("Error fetching job descriptions:", error);
    toast({
      title: "Error",
      description: "Failed to fetch job descriptions.",
      variant: "destructive",
    });
    return [];
  }
};

/**
 * Fetch all resumes
 */
export const fetchResumes = async (): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error("Error fetching resumes:", error);
    toast({
      title: "Error",
      description: "Failed to fetch resumes.",
      variant: "destructive",
    });
    return [];
  }
};

/**
 * Fetch match results
 */
export const fetchMatchResults = async (): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from('match_results')
      .select(`
        *,
        resumes:resume_id(*),
        job_descriptions:job_id(*)
      `)
      .order('overall_score', { ascending: false });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error("Error fetching match results:", error);
    toast({
      title: "Error",
      description: "Failed to fetch match results.",
      variant: "destructive",
    });
    return [];
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

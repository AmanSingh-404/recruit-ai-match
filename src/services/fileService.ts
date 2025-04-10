
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
export const uploadFile = async (file: File, documentType: 'resume' | 'job', fileContent?: string): Promise<UploadResult> => {
  try {
    console.log(`Starting upload for ${documentType} file:`, file.name);
    
    // Check if file is valid (PDF or DOCX)
    const isValidFileType = 
      file.type === "application/pdf" || 
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.name.endsWith(".pdf") || 
      file.name.endsWith(".docx");
    
    if (!isValidFileType) {
      throw new Error("Invalid file type. Please upload a PDF or DOCX file.");
    }
    
    // Read file content if not provided
    const content = fileContent || await readFileAsText(file);
    console.log(`File content extracted, length: ${content.length} characters`);
    
    // Get user ID - this might be null for unauthenticated users
    let userId = null;
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (!userError && user) {
        userId = user.id;
        console.log("User authenticated:", userId);
      } else {
        console.log("Not authenticated or auth error:", userError);
      }
    } catch (authError) {
      console.warn("Auth error (continuing without user ID):", authError);
    }
    
    // File metadata
    const metadata = {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      uploadDate: new Date().toISOString(),
      user_id: userId
    };
    
    console.log("Calling process-document edge function with metadata:", metadata);
    
    // Call Supabase Edge Function to process the document
    const { data, error } = await supabase.functions.invoke("process-document", {
      body: {
        document_type: documentType,
        content,
        metadata
      }
    });
    
    if (error) {
      console.error("Edge function error:", error);
      throw new Error(`Edge function error: ${error.message || JSON.stringify(error)}`);
    }
    
    if (!data || !data.success) {
      console.error("Document processing failed:", data);
      throw new Error(data?.error || "Document processing failed");
    }
    
    console.log("Document processed successfully:", data);
    
    return {
      success: true,
      file: {
        id: data.data.id,
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
    console.log(`Matching resume ${resumeId} with job ${jobId}`);
    
    // Get user ID
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Auth error:", userError);
      throw new Error("Authentication error. Please sign in again.");
    }
    
    if (!user) {
      console.error("No authenticated user found");
      throw new Error("User not authenticated. Please sign in to match documents.");
    }
    
    console.log("User authenticated:", user.id);
    
    // Call Supabase Edge Function to match the documents
    const { data, error } = await supabase.functions.invoke("match-documents", {
      body: {
        resume_id: resumeId,
        job_id: jobId,
        user_id: user.id
      }
    });
    
    if (error) {
      console.error("Edge function error:", error);
      throw error;
    }
    
    console.log("Documents matched successfully:", data);
    
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
    console.log("Fetching job descriptions");
    
    const { data, error } = await supabase
      .from('job_descriptions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Database error:", error);
      throw error;
    }
    
    console.log(`Retrieved ${data?.length || 0} job descriptions`);
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
    console.log("Fetching resumes");
    
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Database error:", error);
      throw error;
    }
    
    console.log(`Retrieved ${data?.length || 0} resumes`);
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
    console.log("Fetching match results");
    
    const { data, error } = await supabase
      .from('match_results')
      .select(`
        *,
        resumes(*),
        job_descriptions(*)
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Database error:", error);
      throw error;
    }
    
    console.log(`Retrieved ${data?.length || 0} match results`);
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
  // For binary files like PDFs, we'll return a placeholder
  if (file.type === "application/pdf") {
    return `[PDF file: ${file.name}]`;
  }
  
  if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    return `[DOCX file: ${file.name}]`;
  }
  
  // For text files, try to read the content
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          // Safely handle binary files by converting to a simple text representation
          let result = event.target.result as string;
          // Strip non-printable characters if present
          result = result.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, '');
          resolve(result);
        } else {
          resolve(`[File content for: ${file.name}]`);
        }
      };
      
      reader.onerror = () => {
        console.warn("Failed to read file as text, using placeholder");
        resolve(`[File content for: ${file.name}]`);
      };
      
      reader.readAsText(file);
    } catch (e) {
      console.warn("Error in readFileAsText:", e);
      resolve(`[File content for: ${file.name}]`);
    }
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


import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log("Process document function called");
    const requestData = await req.json();
    console.log("Request data received:", JSON.stringify({
      document_type: requestData.document_type,
      metadata: requestData.metadata,
      content_length: requestData.content ? requestData.content.length : 0
    }, null, 2));
    
    const { document_type, content, metadata } = requestData;
    
    if (!document_type) {
      throw new Error("Missing document_type parameter");
    }
    
    if (!content) {
      throw new Error("Missing content parameter");
    }
    
    if (!metadata) {
      throw new Error("Missing metadata parameter");
    }
    
    console.log(`Processing ${document_type} document, metadata:`, metadata);
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    
    // Extract text content from binary data or use the text directly
    // For demonstration, we'll handle it as plain text
    // In a real implementation, you would use proper PDF/DOCX parsers
    
    let processedData = {}
    let result = null
    
    if (document_type === 'resume') {
      console.log("Processing resume document");
      // Mock resume parsing - simplified for this example
      const name = metadata.fileName.split('.')[0].replace(/-|_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const email = "candidate@example.com"; // Mock email
      
      // Sample skills list
      const skills = ["JavaScript", "TypeScript", "React", "HTML", "CSS"];
      
      processedData = {
        name,
        email,
        skills,
        summary: "Professional summary extracted from resume",
        raw_content: content.substring(0, 1000), // Store only a portion to avoid DB issues
        metadata
      }
      
      console.log("Inserting resume into database:", {
        name: processedData.name,
        email: processedData.email,
        skills: skills
      });
      
      try {
        // Insert into resumes table
        const { data, error } = await supabaseClient
          .from('resumes')
          .insert({
            name: processedData.name,
            email: processedData.email,
            summary: processedData.summary,
            skills: skills,
            raw_content: processedData.summary, // Store limited content
            metadata: metadata,
            user_id: metadata.user_id || null
          })
          .select()
          .single()
        
        if (error) {
          console.error("Database error:", error);
          throw error;
        }
        
        console.log("Resume inserted successfully:", data);
        result = data
      } catch (dbError) {
        console.error("Database operation failed:", dbError);
        throw new Error(`Database operation failed: ${dbError.message || JSON.stringify(dbError)}`);
      }
      
    } else if (document_type === 'job') {
      console.log("Processing job document");
      // Mock job description parsing
      const title = metadata.fileName.split('.')[0].replace(/-|_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      // Sample skills list
      const skills = {
        required: ["JavaScript", "React", "HTML", "CSS"],
        preferred: ["TypeScript", "Node.js"]
      };
      
      processedData = {
        title,
        skills,
        summary: "Job description summary",
        raw_content: content.substring(0, 1000), // Store only a portion to avoid DB issues
        metadata
      }
      
      console.log("Inserting job description into database:", {
        title: processedData.title,
        skills: processedData.skills
      });
      
      try {
        // Insert into job_descriptions table
        const { data, error } = await supabaseClient
          .from('job_descriptions')
          .insert({
            title: processedData.title,
            summary: processedData.summary,
            skills: processedData.skills,
            raw_content: processedData.summary, // Store limited content
            metadata: metadata,
            user_id: metadata.user_id || null
          })
          .select()
          .single()
        
        if (error) {
          console.error("Database error:", error);
          throw error;
        }
        
        console.log("Job description inserted successfully:", data);
        result = data
      } catch (dbError) {
        console.error("Database operation failed:", dbError);
        throw new Error(`Database operation failed: ${dbError.message || JSON.stringify(dbError)}`);
      }
    } else {
      throw new Error(`Unknown document type: ${document_type}`);
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        data: result
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
    
  } catch (error) {
    console.error('Error processing document:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "An unknown error occurred"
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

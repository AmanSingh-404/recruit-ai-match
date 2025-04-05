
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
    const { document_type, content, metadata } = await req.json()
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    
    // Mock NLP processing - in a real app, you would implement actual NLP here
    // using libraries like Transformers.js or OpenAI's API
    
    let processedData = {}
    let result = null
    
    if (document_type === 'resume') {
      // Mock resume parsing
      const name = content.match(/([A-Z][a-z]+ [A-Z][a-z]+)/) ? content.match(/([A-Z][a-z]+ [A-Z][a-z]+)/)[0] : 'John Doe'
      const email = content.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/) 
        ? content.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)[0] 
        : 'john.doe@example.com'
      
      // Extract skills - very simplified example
      const skillsKeywords = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 
                            'SQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'HTML', 'CSS']
      const skills = skillsKeywords.filter(skill => 
        content.toLowerCase().includes(skill.toLowerCase())
      )
      
      processedData = {
        name,
        email,
        skills,
        summary: content.slice(0, 200) + '...',
        raw_content: content,
        metadata
      }
      
      // Insert into resumes table
      const { data, error } = await supabaseClient
        .from('resumes')
        .insert({
          name: processedData.name,
          email: processedData.email,
          summary: processedData.summary,
          skills: skills,
          raw_content: content,
          metadata: metadata,
          user_id: metadata.user_id
        })
        .select()
        .single()
      
      if (error) throw error
      result = data
      
    } else if (document_type === 'job') {
      // Mock job description parsing
      const titleMatch = content.match(/([A-Z][a-zA-Z]+ [A-Za-z]+)/)
      const title = titleMatch ? titleMatch[0] : 'Software Developer'
      
      // Extract required skills - simplified example
      const skillsKeywords = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 
                            'SQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'HTML', 'CSS']
      const skills = skillsKeywords.filter(skill => 
        content.toLowerCase().includes(skill.toLowerCase())
      )
      
      processedData = {
        title,
        skills: {
          required: skills,
          preferred: []
        },
        summary: content.slice(0, 200) + '...',
        raw_content: content,
        metadata
      }
      
      // Insert into job_descriptions table
      const { data, error } = await supabaseClient
        .from('job_descriptions')
        .insert({
          title: processedData.title,
          summary: processedData.summary,
          skills: processedData.skills,
          raw_content: content,
          metadata: metadata,
          user_id: metadata.user_id
        })
        .select()
        .single()
      
      if (error) throw error
      result = data
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
        error: error.message
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

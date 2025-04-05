
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
    console.log("Match documents function called");
    const requestData = await req.json();
    const { resume_id, job_id, user_id } = requestData;
    
    console.log(`Matching resume ${resume_id} with job ${job_id} for user ${user_id}`);
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    
    // Fetch the resume and job description
    const { data: resume, error: resumeError } = await supabaseClient
      .from('resumes')
      .select('*')
      .eq('id', resume_id)
      .single()
    
    if (resumeError) {
      console.error("Resume fetch error:", resumeError);
      throw resumeError;
    }
    
    console.log("Retrieved resume:", resume.name);
    
    const { data: job, error: jobError } = await supabaseClient
      .from('job_descriptions')
      .select('*')
      .eq('id', job_id)
      .single()
    
    if (jobError) {
      console.error("Job fetch error:", jobError);
      throw jobError;
    }
    
    console.log("Retrieved job description:", job.title);
    
    // In a real application, this would use a more sophisticated algorithm
    // This is a simplified example that calculates match scores
    
    // Calculate skills match
    const resumeSkills = resume.skills || []
    const requiredSkills = job.skills?.required || []
    const preferredSkills = job.skills?.preferred || []
    
    const matchedRequired = requiredSkills.filter(skill => 
      resumeSkills.some(s => s.toLowerCase() === skill.toLowerCase())
    )
    
    const matchedPreferred = preferredSkills.filter(skill => 
      resumeSkills.some(s => s.toLowerCase() === skill.toLowerCase())
    )
    
    const skillsScore = requiredSkills.length === 0 ? 100 : Math.round(
      (matchedRequired.length / Math.max(requiredSkills.length, 1)) * 70 +
      (matchedPreferred.length / Math.max(preferredSkills.length, 1)) * 30
    )
    
    console.log(`Skills match score: ${skillsScore}%`);
    
    // Generate random scores for other categories (in a real app, you'd calculate these properly)
    const experienceScore = Math.floor(Math.random() * 30) + 70
    const educationScore = Math.floor(Math.random() * 30) + 70
    
    // Calculate overall score
    const overallScore = Math.round(
      skillsScore * 0.5 +
      experienceScore * 0.3 +
      educationScore * 0.2
    )
    
    console.log(`Overall match score: ${overallScore}%`);
    
    // Create the match result
    const matchResult = {
      resume_id,
      job_id,
      overall_score: overallScore,
      category_scores: {
        skills: skillsScore,
        experience: experienceScore,
        education: educationScore
      },
      skills_analysis: {
        matched: [...matchedRequired, ...matchedPreferred],
        missing: requiredSkills.filter(skill => !matchedRequired.includes(skill)),
        additional: resumeSkills.filter(skill => 
          !requiredSkills.includes(skill) && !preferredSkills.includes(skill)
        )
      },
      experience_analysis: {
        yearsMatch: 85,
        relevanceScore: experienceScore
      },
      education_analysis: {
        levelMatch: true,
        fieldMatch: educationScore
      },
      user_id
    }
    
    console.log("Inserting match result into database");
    
    // Insert the match result into the database
    const { data: result, error: insertError } = await supabaseClient
      .from('match_results')
      .insert(matchResult)
      .select()
      .single()
    
    if (insertError) {
      console.error("Database insert error:", insertError);
      throw insertError;
    }
    
    console.log("Match result inserted successfully:", result.id);
    
    return new Response(
      JSON.stringify({
        success: true,
        data: result
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
    
  } catch (error) {
    console.error('Error matching documents:', error)
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

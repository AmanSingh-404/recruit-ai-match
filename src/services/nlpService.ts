
import { toast } from "@/hooks/use-toast";

// Types for document content
export interface Document {
  id: string;
  type: "resume" | "job";
  content: string;
  metadata: {
    fileName: string;
    fileSize: number;
    uploadDate: string;
  };
}

// Types for parsed resume
export interface Resume {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  certifications: string[];
  languages: string[];
  rawContent: string;
  metadata: {
    fileName: string;
    fileSize: number;
    uploadDate: string;
  };
}

export interface Experience {
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string | null;
  description: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate: string | null;
  gpa?: string;
  highlights: string[];
}

// Types for parsed job description
export interface JobDescription {
  id: string;
  title: string;
  company: string;
  location: string;
  department?: string;
  employmentType?: string;
  summary: string;
  responsibilities: string[];
  requirements: {
    required: string[];
    preferred: string[];
  };
  skills: {
    required: string[];
    preferred: string[];
  };
  experience: {
    years?: number;
    description: string[];
  };
  education: {
    level?: string;
    fields: string[];
  };
  benefits?: string[];
  rawContent: string;
  metadata: {
    fileName: string;
    fileSize: number;
    uploadDate: string;
  };
}

// Types for match results
export interface MatchResult {
  resumeId: string;
  jobId: string;
  overallScore: number;
  categoryScores: {
    skills: number;
    experience: number;
    education: number;
  };
  skillsAnalysis: {
    matched: string[];
    missing: string[];
    additional: string[];
  };
  experienceAnalysis: {
    yearsMatch: number;
    relevanceScore: number;
  };
  educationAnalysis: {
    levelMatch: boolean;
    fieldMatch: number;
  };
}

/**
 * Extract text content from a document file (PDF/DOCX)
 */
export const extractTextFromDocument = async (file: File): Promise<string> => {
  try {
    // In a real implementation, we would use a library like pdf.js for PDF files
    // or mammoth.js for DOCX files to extract the text content
    
    // For demonstration purposes, we're simulating the text extraction
    return new Promise((resolve) => {
      // Simulate processing time
      setTimeout(() => {
        // This would be the actual extracted text in a real implementation
        const fileName = file.name.toLowerCase();
        
        if (fileName.includes("resume") || fileName.includes("cv")) {
          resolve(
            `John Doe\njohn.doe@example.com\n(555) 123-4567\nSan Francisco, CA\n\nSummary\nSenior Software Engineer with 8 years of experience in full-stack development.\n\nSkills\nJavaScript, TypeScript, React, Node.js, GraphQL, MongoDB, AWS\n\nExperience\nSenior Software Engineer | Tech Company | 2018 - Present\n- Led development of a customer-facing web application using React and GraphQL\n- Implemented CI/CD pipelines using GitHub Actions\n- Mentored junior developers\n\nEducation\nM.S. Computer Science | Stanford University | 2014 - 2016\nB.S. Computer Science | UC Berkeley | 2010 - 2014`
          );
        } else if (fileName.includes("job") || fileName.includes("description")) {
          resolve(
            `Senior React Developer\n\nAbout the Role\nWe're looking for a senior React developer to join our team.\n\nResponsibilities\n- Develop and maintain web applications using React\n- Collaborate with backend developers\n- Write clean, maintainable code\n\nRequirements\n- 5+ years of experience with React\n- Strong TypeScript skills\n- Experience with GraphQL\n- Understanding of CI/CD practices\n\nPreferred Qualifications\n- Experience with Next.js\n- Knowledge of AWS\n- Experience with Node.js\n\nEducation\nBachelor's degree in Computer Science or related field`
          );
        } else {
          resolve(
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.`
          );
        }
      }, 1000);
    });
  } catch (error) {
    console.error("Error extracting text from document:", error);
    toast({
      title: "Error extracting text",
      description: "There was an error processing your document. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
};

/**
 * Parse resume text into structured data
 */
export const parseResume = async (text: string, fileMetadata: any): Promise<Resume> => {
  try {
    // In a real implementation, we would use NLP techniques to extract information
    // For demonstration purposes, we're returning mock data
    
    return {
      id: `resume_${Date.now()}`,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      summary: "Senior Software Engineer with 8 years of experience in full-stack development.",
      skills: ["JavaScript", "TypeScript", "React", "Node.js", "GraphQL", "MongoDB", "AWS"],
      experience: [
        {
          title: "Senior Software Engineer",
          company: "Tech Company",
          location: "San Francisco, CA",
          startDate: "2018-01",
          endDate: null,
          description: "Led development of customer-facing web applications.",
          highlights: [
            "Led development of a customer-facing web application using React and GraphQL",
            "Implemented CI/CD pipelines using GitHub Actions",
            "Mentored junior developers"
          ]
        },
        {
          title: "Software Engineer",
          company: "Another Tech Company",
          location: "San Francisco, CA",
          startDate: "2015-06",
          endDate: "2017-12",
          description: "Developed backend services using Node.js and MongoDB.",
          highlights: [
            "Built RESTful APIs using Node.js and Express",
            "Implemented MongoDB database schema and queries",
            "Participated in code reviews and agile development processes"
          ]
        }
      ],
      education: [
        {
          degree: "M.S. Computer Science",
          institution: "Stanford University",
          location: "Stanford, CA",
          startDate: "2014-09",
          endDate: "2016-06",
          gpa: "3.8",
          highlights: []
        },
        {
          degree: "B.S. Computer Science",
          institution: "UC Berkeley",
          location: "Berkeley, CA",
          startDate: "2010-09",
          endDate: "2014-05",
          gpa: "3.7",
          highlights: []
        }
      ],
      certifications: ["AWS Certified Developer", "MongoDB Certified Developer"],
      languages: ["English (Native)", "Spanish (Intermediate)"],
      rawContent: text,
      metadata: fileMetadata
    };
  } catch (error) {
    console.error("Error parsing resume:", error);
    toast({
      title: "Error parsing resume",
      description: "There was an error extracting information from your resume. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
};

/**
 * Parse job description text into structured data
 */
export const parseJobDescription = async (text: string, fileMetadata: any): Promise<JobDescription> => {
  try {
    // In a real implementation, we would use NLP techniques to extract information
    // For demonstration purposes, we're returning mock data
    
    return {
      id: `job_${Date.now()}`,
      title: "Senior React Developer",
      company: "Tech Company, Inc.",
      location: "San Francisco, CA (Remote)",
      department: "Engineering",
      employmentType: "Full-time",
      summary: "We're looking for a senior React developer to join our team.",
      responsibilities: [
        "Develop and maintain web applications using React",
        "Collaborate with backend developers",
        "Write clean, maintainable code",
        "Participate in code reviews",
        "Mentor junior developers"
      ],
      requirements: {
        required: [
          "5+ years of experience with React",
          "Strong TypeScript skills",
          "Experience with GraphQL",
          "Understanding of CI/CD practices"
        ],
        preferred: [
          "Experience with Next.js",
          "Knowledge of AWS",
          "Experience with Node.js"
        ]
      },
      skills: {
        required: ["React", "TypeScript", "GraphQL", "JavaScript"],
        preferred: ["Next.js", "AWS", "Node.js", "MongoDB"]
      },
      experience: {
        years: 5,
        description: [
          "5+ years of experience with React",
          "3+ years of experience with TypeScript",
          "Experience with GraphQL and RESTful APIs"
        ]
      },
      education: {
        level: "Bachelor's",
        fields: ["Computer Science", "Software Engineering", "related field"]
      },
      benefits: [
        "Competitive salary",
        "Health insurance",
        "401(k) matching",
        "Flexible work schedule",
        "Remote work options"
      ],
      rawContent: text,
      metadata: fileMetadata
    };
  } catch (error) {
    console.error("Error parsing job description:", error);
    toast({
      title: "Error parsing job description",
      description: "There was an error extracting information from your job description. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
};

/**
 * Calculate semantic similarity between two texts
 * Using cosine similarity algorithm
 */
export const calculateSimilarity = (text1: string[], text2: string[]): number => {
  try {
    // In a real implementation, we would use a pre-trained model like all-MiniLM-L6-v2
    // to generate embeddings and calculate cosine similarity
    // This is a simplified implementation for demonstration
    
    // Convert texts to lowercase and create sets of unique words
    const set1 = new Set(text1.map(t => t.toLowerCase()));
    const set2 = new Set(text2.map(t => t.toLowerCase()));
    
    // Calculate intersection
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    
    // Calculate Jaccard similarity (intersection / union)
    const union = new Set([...set1, ...set2]);
    
    const similarity = intersection.size / union.size;
    
    // Scale to percentage (0-100)
    return Math.round(similarity * 100);
  } catch (error) {
    console.error("Error calculating similarity:", error);
    return 0;
  }
};

/**
 * Calculate match score between a resume and a job description
 */
export const calculateMatchScore = (resume: Resume, jobDescription: JobDescription): MatchResult => {
  try {
    // Calculate skills match
    const requiredSkills = jobDescription.skills.required.map(s => s.toLowerCase());
    const preferredSkills = jobDescription.skills.preferred.map(s => s.toLowerCase());
    const candidateSkills = resume.skills.map(s => s.toLowerCase());
    
    const matchedRequired = requiredSkills.filter(skill => 
      candidateSkills.some(s => s.includes(skill) || skill.includes(s))
    );
    
    const matchedPreferred = preferredSkills.filter(skill => 
      candidateSkills.some(s => s.includes(skill) || skill.includes(s))
    );
    
    const missingSkills = requiredSkills.filter(skill => 
      !candidateSkills.some(s => s.includes(skill) || skill.includes(s))
    );
    
    const additionalSkills = candidateSkills.filter(skill => 
      !requiredSkills.some(s => s.includes(skill) || skill.includes(s)) &&
      !preferredSkills.some(s => s.includes(skill) || skill.includes(s))
    );
    
    // Weight: required skills (70%), preferred skills (30%)
    const requiredWeight = 0.7;
    const preferredWeight = 0.3;
    
    const skillsScore = requiredSkills.length === 0 ? 100 : Math.round(
      (matchedRequired.length / requiredSkills.length) * 100 * requiredWeight +
      (matchedPreferred.length / (preferredSkills.length || 1)) * 100 * preferredWeight
    );
    
    // Calculate experience match
    // Assuming the first experience entry is the most recent
    const currentExperience = resume.experience[0];
    const totalYearsExperience = resume.experience.reduce((total, exp) => {
      const startDate = new Date(exp.startDate);
      const endDate = exp.endDate ? new Date(exp.endDate) : new Date();
      const years = (endDate.getFullYear() - startDate.getFullYear()) +
                    (endDate.getMonth() - startDate.getMonth()) / 12;
      return total + years;
    }, 0);
    
    const requiredYears = jobDescription.experience.years || 0;
    const yearsMatch = requiredYears === 0 ? 100 : Math.min(Math.round((totalYearsExperience / requiredYears) * 100), 100);
    
    // Calculate relevance of experience (simple keyword matching)
    const expKeywords = jobDescription.responsibilities.join(' ').toLowerCase().split(' ');
    const candidateExpDesc = resume.experience.map(exp => exp.description).join(' ').toLowerCase().split(' ');
    
    const relevanceScore = calculateSimilarity(expKeywords, candidateExpDesc);
    
    // Overall experience score (years 40%, relevance 60%)
    const experienceScore = Math.round(yearsMatch * 0.4 + relevanceScore * 0.6);
    
    // Calculate education match
    const requiredLevel = jobDescription.education.level?.toLowerCase() || '';
    const requiredFields = jobDescription.education.fields.map(f => f.toLowerCase());
    
    // Check highest education level
    const highestEducation = resume.education[0]?.degree.toLowerCase() || '';
    
    // Simple education level matching
    let levelMatch = false;
    if (requiredLevel.includes('bachelor') || requiredLevel.includes('bs') || requiredLevel.includes('ba')) {
      levelMatch = highestEducation.includes('bachelor') || 
                   highestEducation.includes('bs') || 
                   highestEducation.includes('ba') ||
                   highestEducation.includes('master') || 
                   highestEducation.includes('ms') || 
                   highestEducation.includes('ma') ||
                   highestEducation.includes('phd') || 
                   highestEducation.includes('doctorate');
    } else if (requiredLevel.includes('master') || requiredLevel.includes('ms') || requiredLevel.includes('ma')) {
      levelMatch = highestEducation.includes('master') || 
                   highestEducation.includes('ms') || 
                   highestEducation.includes('ma') ||
                   highestEducation.includes('phd') || 
                   highestEducation.includes('doctorate');
    } else if (requiredLevel.includes('phd') || requiredLevel.includes('doctorate')) {
      levelMatch = highestEducation.includes('phd') || 
                   highestEducation.includes('doctorate');
    } else {
      levelMatch = true; // No specific level required
    }
    
    // Check field of study matches
    const educationFields = resume.education.map(edu => edu.degree.toLowerCase());
    const matchedFields = requiredFields.filter(field => 
      educationFields.some(f => f.includes(field) || field.includes(f))
    );
    
    const fieldMatch = requiredFields.length === 0 ? 100 : 
      Math.round((matchedFields.length / requiredFields.length) * 100);
    
    // Overall education score (level 40%, field 60%)
    const educationScore = Math.round((levelMatch ? 100 : 0) * 0.4 + fieldMatch * 0.6);
    
    // Calculate overall match score (weighted average)
    // Skills (40%), Experience (35%), Education (25%)
    const overallScore = Math.round(
      skillsScore * 0.4 +
      experienceScore * 0.35 +
      educationScore * 0.25
    );
    
    return {
      resumeId: resume.id,
      jobId: jobDescription.id,
      overallScore,
      categoryScores: {
        skills: skillsScore,
        experience: experienceScore,
        education: educationScore
      },
      skillsAnalysis: {
        matched: [...matchedRequired, ...matchedPreferred],
        missing: missingSkills,
        additional: additionalSkills
      },
      experienceAnalysis: {
        yearsMatch,
        relevanceScore
      },
      educationAnalysis: {
        levelMatch,
        fieldMatch
      }
    };
  } catch (error) {
    console.error("Error calculating match score:", error);
    return {
      resumeId: resume.id,
      jobId: jobDescription.id,
      overallScore: 0,
      categoryScores: {
        skills: 0,
        experience: 0,
        education: 0
      },
      skillsAnalysis: {
        matched: [],
        missing: [],
        additional: []
      },
      experienceAnalysis: {
        yearsMatch: 0,
        relevanceScore: 0
      },
      educationAnalysis: {
        levelMatch: false,
        fieldMatch: 0
      }
    };
  }
};

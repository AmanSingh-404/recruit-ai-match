export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      companies: {
        Row: {
          created_at: string | null
          id: string
          logo_url: string | null
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name?: string
        }
        Relationships: []
      }
      contest_problems: {
        Row: {
          contest_id: string
          points: number
          problem_id: string
        }
        Insert: {
          contest_id: string
          points: number
          problem_id: string
        }
        Update: {
          contest_id?: string
          points?: number
          problem_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contest_problems_contest_id_fkey"
            columns: ["contest_id"]
            isOneToOne: false
            referencedRelation: "contests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contest_problems_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      contests: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          end_time: string
          id: string
          start_time: string
          status: Database["public"]["Enums"]["contest_status"]
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_time: string
          id?: string
          start_time: string
          status: Database["public"]["Enums"]["contest_status"]
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_time?: string
          id?: string
          start_time?: string
          status?: Database["public"]["Enums"]["contest_status"]
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      interviews: {
        Row: {
          candidate_id: string | null
          created_at: string
          date: string
          end_time: string
          id: string
          interview_type: string
          interviewers: Json | null
          job_id: string | null
          meeting_details: string | null
          start_time: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          candidate_id?: string | null
          created_at?: string
          date: string
          end_time: string
          id?: string
          interview_type: string
          interviewers?: Json | null
          job_id?: string | null
          meeting_details?: string | null
          start_time: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          candidate_id?: string | null
          created_at?: string
          date?: string
          end_time?: string
          id?: string
          interview_type?: string
          interviewers?: Json | null
          job_id?: string | null
          meeting_details?: string | null
          start_time?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interviews_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interviews_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_descriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      job_descriptions: {
        Row: {
          benefits: Json | null
          company: string | null
          created_at: string
          department: string | null
          education: Json | null
          employment_type: string | null
          experience: Json | null
          id: string
          location: string | null
          metadata: Json | null
          raw_content: string | null
          requirements: Json | null
          responsibilities: Json | null
          skills: Json | null
          summary: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          benefits?: Json | null
          company?: string | null
          created_at?: string
          department?: string | null
          education?: Json | null
          employment_type?: string | null
          experience?: Json | null
          id?: string
          location?: string | null
          metadata?: Json | null
          raw_content?: string | null
          requirements?: Json | null
          responsibilities?: Json | null
          skills?: Json | null
          summary?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          benefits?: Json | null
          company?: string | null
          created_at?: string
          department?: string | null
          education?: Json | null
          employment_type?: string | null
          experience?: Json | null
          id?: string
          location?: string | null
          metadata?: Json | null
          raw_content?: string | null
          requirements?: Json | null
          responsibilities?: Json | null
          skills?: Json | null
          summary?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      match_results: {
        Row: {
          category_scores: Json | null
          created_at: string
          education_analysis: Json | null
          experience_analysis: Json | null
          id: string
          job_id: string | null
          overall_score: number
          resume_id: string | null
          skills_analysis: Json | null
          user_id: string | null
        }
        Insert: {
          category_scores?: Json | null
          created_at?: string
          education_analysis?: Json | null
          experience_analysis?: Json | null
          id?: string
          job_id?: string | null
          overall_score: number
          resume_id?: string | null
          skills_analysis?: Json | null
          user_id?: string | null
        }
        Update: {
          category_scores?: Json | null
          created_at?: string
          education_analysis?: Json | null
          experience_analysis?: Json | null
          id?: string
          job_id?: string | null
          overall_score?: number
          resume_id?: string | null
          skills_analysis?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "match_results_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_descriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_results_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      problem_companies: {
        Row: {
          company_id: string
          problem_id: string
        }
        Insert: {
          company_id: string
          problem_id: string
        }
        Update: {
          company_id?: string
          problem_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "problem_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "problem_companies_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      problem_tags: {
        Row: {
          problem_id: string
          tag_id: string
        }
        Insert: {
          problem_id: string
          tag_id: string
        }
        Update: {
          problem_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "problem_tags_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "problem_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      problems: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          id: string
          is_premium: boolean | null
          solution: string | null
          space_limit: number
          time_limit: number
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description: string
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          is_premium?: boolean | null
          solution?: string | null
          space_limit: number
          time_limit: number
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          is_premium?: boolean | null
          solution?: string | null
          space_limit?: number
          time_limit?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bio: string | null
          created_at: string | null
          full_name: string | null
          id: string
          last_streak_date: string | null
          streak: number | null
          updated_at: string | null
          username: string
          xp: number | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          last_streak_date?: string | null
          streak?: number | null
          updated_at?: string | null
          username: string
          xp?: number | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          last_streak_date?: string | null
          streak?: number | null
          updated_at?: string | null
          username?: string
          xp?: number | null
        }
        Relationships: []
      }
      resumes: {
        Row: {
          certifications: Json | null
          created_at: string
          education: Json | null
          email: string | null
          experience: Json | null
          id: string
          languages: Json | null
          location: string | null
          metadata: Json | null
          name: string
          phone: string | null
          raw_content: string | null
          skills: Json | null
          summary: string | null
          user_id: string | null
        }
        Insert: {
          certifications?: Json | null
          created_at?: string
          education?: Json | null
          email?: string | null
          experience?: Json | null
          id?: string
          languages?: Json | null
          location?: string | null
          metadata?: Json | null
          name: string
          phone?: string | null
          raw_content?: string | null
          skills?: Json | null
          summary?: string | null
          user_id?: string | null
        }
        Update: {
          certifications?: Json | null
          created_at?: string
          education?: Json | null
          email?: string | null
          experience?: Json | null
          id?: string
          languages?: Json | null
          location?: string | null
          metadata?: Json | null
          name?: string
          phone?: string | null
          raw_content?: string | null
          skills?: Json | null
          summary?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      submissions: {
        Row: {
          code: string
          contest_id: string | null
          created_at: string | null
          id: string
          language: string
          memory_used: number | null
          problem_id: string | null
          runtime: number | null
          status: string
          user_id: string | null
        }
        Insert: {
          code: string
          contest_id?: string | null
          created_at?: string | null
          id?: string
          language: string
          memory_used?: number | null
          problem_id?: string | null
          runtime?: number | null
          status: string
          user_id?: string | null
        }
        Update: {
          code?: string
          contest_id?: string | null
          created_at?: string | null
          id?: string
          language?: string
          memory_used?: number | null
          problem_id?: string | null
          runtime?: number | null
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "submissions_contest_id_fkey"
            columns: ["contest_id"]
            isOneToOne: false
            referencedRelation: "contests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      test_cases: {
        Row: {
          expected_output: string
          hidden: boolean | null
          id: string
          input: string
          is_sample: boolean | null
          problem_id: string | null
        }
        Insert: {
          expected_output: string
          hidden?: boolean | null
          id?: string
          input: string
          is_sample?: boolean | null
          problem_id?: string | null
        }
        Update: {
          expected_output?: string
          hidden?: boolean | null
          id?: string
          input?: string
          is_sample?: boolean | null
          problem_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "test_cases_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      user_solved: {
        Row: {
          best_submission_id: string | null
          problem_id: string
          solved_at: string | null
          user_id: string
        }
        Insert: {
          best_submission_id?: string | null
          problem_id: string
          solved_at?: string | null
          user_id: string
        }
        Update: {
          best_submission_id?: string | null
          problem_id?: string
          solved_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_solved_best_submission_id_fkey"
            columns: ["best_submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_solved_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      contest_status: "upcoming" | "live" | "ended"
      difficulty_level: "easy" | "medium" | "hard"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

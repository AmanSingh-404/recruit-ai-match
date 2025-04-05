
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Code, Clock, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface MatchScoreProps {
  skillsMatch: number;
  experienceMatch: number;
  educationMatch: number;
  className?: string;
}

const MatchScore = ({ 
  skillsMatch, 
  experienceMatch, 
  educationMatch, 
  className 
}: MatchScoreProps) => {
  // Function to determine badge color based on score
  const getBadgeVariant = (score: number) => {
    if (score >= 90) return "default";
    if (score >= 75) return "secondary";
    return "outline";
  };

  // Progress bar color based on score
  const getProgressColor = (score: number) => {
    if (score >= 90) return "from-recruit-blue to-recruit-purple";
    if (score >= 75) return "from-blue-400 to-blue-600";
    return "from-gray-300 to-gray-400";
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm">
            <Code className="h-3.5 w-3.5 mr-1.5" />
            <span>Skills Match</span>
          </div>
          <Badge variant={getBadgeVariant(skillsMatch)}>
            {skillsMatch}%
          </Badge>
        </div>
        <Progress 
          value={skillsMatch} 
          className={cn("h-1.5 bg-muted", `bg-gradient-to-r ${getProgressColor(skillsMatch)}`)} 
        />
      </div>
      
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            <span>Experience Match</span>
          </div>
          <Badge variant={getBadgeVariant(experienceMatch)}>
            {experienceMatch}%
          </Badge>
        </div>
        <Progress 
          value={experienceMatch} 
          className={cn("h-1.5 bg-muted", `bg-gradient-to-r ${getProgressColor(experienceMatch)}`)} 
        />
      </div>
      
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm">
            <GraduationCap className="h-3.5 w-3.5 mr-1.5" />
            <span>Education Match</span>
          </div>
          <Badge variant={getBadgeVariant(educationMatch)}>
            {educationMatch}%
          </Badge>
        </div>
        <Progress 
          value={educationMatch} 
          className={cn("h-1.5 bg-muted", `bg-gradient-to-r ${getProgressColor(educationMatch)}`)} 
        />
      </div>
    </div>
  );
};

export default MatchScore;

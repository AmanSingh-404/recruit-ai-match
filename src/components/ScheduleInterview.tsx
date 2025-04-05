
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, CalendarIcon, Clock, User, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScheduleInterviewProps {
  candidate: {
    id: string;
    name: string;
    position: string;
  };
  open: boolean;
  onClose: () => void;
}

const ScheduleInterview = ({ candidate, open, onClose }: ScheduleInterviewProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState<string>("10:00");
  const [endTime, setEndTime] = useState<string>("10:30");
  const [interviewType, setInterviewType] = useState<string>("video");
  const [interviewers, setInterviewers] = useState<string[]>(["John Doe"]);
  const [isScheduled, setIsScheduled] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSchedule = () => {
    // Simulate scheduling success
    setTimeout(() => {
      setIsScheduled(true);
      toast({
        title: "Interview scheduled",
        description: `Interview with ${candidate.name} scheduled successfully.`,
      });
    }, 1000);
  };

  const formatDate = (date?: Date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const interviewTypeOptions = [
    { value: "video", label: "Video Call" },
    { value: "phone", label: "Phone Interview" },
    { value: "inperson", label: "In-Person Interview" },
    { value: "technical", label: "Technical Assessment" },
  ];

  const interviewerOptions = [
    { value: "John Doe", label: "John Doe (HR Manager)" },
    { value: "Jane Smith", label: "Jane Smith (Tech Lead)" },
    { value: "Michael Johnson", label: "Michael Johnson (CTO)" },
    { value: "Emily Brown", label: "Emily Brown (Senior Developer)" },
  ];

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        {!isScheduled ? (
          <>
            <DialogHeader>
              <DialogTitle>Schedule Interview</DialogTitle>
              <DialogDescription>
                Schedule an interview with {candidate.name} for the {candidate.position} position
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Select Date</h3>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="border rounded-md"
                  disabled={(date) => date < new Date()}
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Interview Time</h3>
                  <div className="flex items-center space-x-2">
                    <div className="grid gap-1">
                      <label htmlFor="startTime" className="text-xs text-muted-foreground">Start</label>
                      <Input 
                        id="startTime" 
                        type="time" 
                        value={startTime} 
                        onChange={(e) => setStartTime(e.target.value)} 
                      />
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground mt-5" />
                    <div className="grid gap-1">
                      <label htmlFor="endTime" className="text-xs text-muted-foreground">End</label>
                      <Input 
                        id="endTime" 
                        type="time" 
                        value={endTime} 
                        onChange={(e) => setEndTime(e.target.value)} 
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Interview Type</h3>
                  <Select value={interviewType} onValueChange={setInterviewType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select interview type" />
                    </SelectTrigger>
                    <SelectContent>
                      {interviewTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Select Interviewers</h3>
                  <Select value={interviewers[0]} onValueChange={(value) => setInterviewers([value])}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an interviewer" />
                    </SelectTrigger>
                    <SelectContent>
                      {interviewerOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Meeting Details</h3>
                  <Input placeholder="Add meeting location or link" />
                </div>
              </div>
            </div>
            
            <div className="bg-primary/5 p-3 rounded-md mt-2">
              <h3 className="text-sm font-medium mb-1 flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1 text-primary" />
                Selected Interview Slot
              </h3>
              <p className="text-sm text-muted-foreground">
                {formatDate(date)} • {startTime} - {endTime}
              </p>
            </div>
            
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleSchedule}>Schedule Interview</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Interview Scheduled</DialogTitle>
              <DialogDescription>
                Your interview has been successfully scheduled
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex flex-col items-center justify-center py-6">
              <div className="bg-green-100 text-green-800 rounded-full p-4 mb-4">
                <Check className="h-10 w-10" />
              </div>
              <h2 className="text-xl font-semibold mb-1">Interview Confirmed</h2>
              <p className="text-muted-foreground text-center mb-6">
                The interview has been added to your calendar and the candidate has been notified
              </p>
              
              <div className="border rounded-md w-full p-4 space-y-3 mb-4">
                <div className="flex items-start space-x-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{candidate.name}</p>
                    <p className="text-sm text-muted-foreground">{candidate.position}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CalendarIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{formatDate(date)}</p>
                    <p className="text-sm text-muted-foreground">{startTime} - {endTime}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">
                      {interviewTypeOptions.find(option => option.value === interviewType)?.label}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      with {interviewers.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={onClose}>Close</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleInterview;

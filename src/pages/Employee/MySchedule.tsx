
import React, { useState, useEffect } from "react";
import { scheduleApi } from "@/utils/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock, Calendar } from "lucide-react";

// Define Schedule type
interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  status: string;
  shiftType: string;
}

const MySchedule: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [weekStartDate, setWeekStartDate] = useState<Date>(new Date());
  
  // Helper to format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };
  
  // Helper to get current week dates
  const getWeekDates = (startDate: Date) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // Fetch schedules data
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        // In a real app, this would come from the API
        // const response = await scheduleApi.getMySchedules();
        // setSchedules(response.data);
        
        // Mock data for demonstration
        setTimeout(() => {
          const today = new Date();
          
          // Set weekStartDate to beginning of current week (Sunday)
          const diff = today.getDate() - today.getDay();
          const firstDayOfWeek = new Date(today.setDate(diff));
          setWeekStartDate(firstDayOfWeek);
          
          // Generate mock schedules for the week
          const mockSchedules = [
            {
              id: 1,
              date: new Date(firstDayOfWeek.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Monday
              startTime: "09:00",
              endTime: "17:00",
              location: "Main Office",
              status: "scheduled",
              shiftType: "regular"
            },
            {
              id: 2,
              date: new Date(firstDayOfWeek.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tuesday
              startTime: "09:00",
              endTime: "17:00",
              location: "Main Office",
              status: "scheduled",
              shiftType: "regular"
            },
            {
              id: 3,
              date: new Date(firstDayOfWeek.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Wednesday
              startTime: "09:00",
              endTime: "17:00",
              location: "Main Office",
              status: "scheduled",
              shiftType: "regular"
            },
            {
              id: 4,
              date: new Date(firstDayOfWeek.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Thursday
              startTime: "09:00",
              endTime: "17:00",
              location: "Main Office",
              status: "scheduled",
              shiftType: "regular"
            },
            {
              id: 5,
              date: new Date(firstDayOfWeek.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Friday
              startTime: "09:00",
              endTime: "13:00",
              location: "Remote",
              status: "scheduled",
              shiftType: "half-day"
            },
          ];
          
          setSchedules(mockSchedules);
          setLoading(false);
        }, 600);
      } catch (error) {
        console.error("Error fetching schedules:", error);
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  // Get current week dates
  const weekDates = getWeekDates(weekStartDate);
  
  // Helper to get schedule for a specific date
  const getScheduleForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return schedules.find(schedule => schedule.date === dateStr);
  };

  // Navigate to previous week
  const goPreviousWeek = () => {
    const newStartDate = new Date(weekStartDate);
    newStartDate.setDate(newStartDate.getDate() - 7);
    setWeekStartDate(newStartDate);
  };

  // Navigate to next week
  const goNextWeek = () => {
    const newStartDate = new Date(weekStartDate);
    newStartDate.setDate(newStartDate.getDate() + 7);
    setWeekStartDate(newStartDate);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Schedule</h1>
      </div>

      <div className="space-y-6">
        {/* Quick summary card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Weekly Overview</CardTitle>
            <CardDescription>Your work schedule for the current period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-2 rounded-lg border p-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Hours this week</p>
                  <p className="text-xl font-bold">36</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border p-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Scheduled Days</p>
                  <p className="text-xl font-bold">5</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar view */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Schedule Calendar</CardTitle>
              <CardDescription>
                {weekStartDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} -
                {' '}
                {new Date(weekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </CardDescription>
            </div>
            <div className="flex gap-1">
              <button 
                onClick={goPreviousWeek}
                className="p-2 rounded-md hover:bg-muted"
              >
                ←
              </button>
              <button 
                className="p-2 rounded-md hover:bg-muted"
                onClick={() => setWeekStartDate(new Date(new Date().setDate(new Date().getDate() - new Date().getDay())))}
              >
                Today
              </button>
              <button 
                onClick={goNextWeek}
                className="p-2 rounded-md hover:bg-muted"
              >
                →
              </button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="w-full flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-2">
                {weekDates.map((date, index) => {
                  const schedule = getScheduleForDate(date);
                  const isToday = new Date().toDateString() === date.toDateString();
                  
                  return (
                    <div 
                      key={index} 
                      className={`border rounded-md p-3 min-h-[100px] ${
                        isToday ? "bg-primary/5 border-primary/20" : ""
                      }`}
                    >
                      <div className="text-sm font-medium mb-1">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {date.toLocaleDateString('en-US', { day: 'numeric' })}
                      </div>
                      
                      {schedule ? (
                        <div className="space-y-2">
                          <Badge className={
                            schedule.shiftType === "half-day" 
                              ? "bg-blue-100 text-blue-800" 
                              : "bg-green-100 text-green-800"
                          }>
                            {schedule.shiftType === "half-day" ? "Half Day" : "Full Day"}
                          </Badge>
                          <div className="text-xs">
                            <div className="font-medium">{schedule.startTime} - {schedule.endTime}</div>
                            <div className="text-muted-foreground">{schedule.location}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs text-muted-foreground italic">No shifts</div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Schedule list */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Shifts</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="w-full flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : schedules.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No upcoming shifts scheduled
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell>{formatDate(schedule.date)}</TableCell>
                      <TableCell>{schedule.startTime} - {schedule.endTime}</TableCell>
                      <TableCell>{schedule.location}</TableCell>
                      <TableCell>
                        <Badge className={
                          schedule.shiftType === "half-day" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-green-100 text-green-800"
                        }>
                          {schedule.shiftType === "half-day" ? "Half Day" : "Full Day"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          Scheduled
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MySchedule;

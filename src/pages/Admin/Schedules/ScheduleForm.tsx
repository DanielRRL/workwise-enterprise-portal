
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { toast } from "@/components/ui/sonner";
import { scheduleApi } from "@/utils/api";

// Schema for form validation
const scheduleSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  startTime: z.string().min(5, "Seleccione una hora de inicio"),
  totalHours: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Las horas totales deben ser un número positivo",
  }),
  deductHours: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Las horas a deducir deben ser un número positivo o cero",
  }),
});

type ScheduleFormValues = z.infer<typeof scheduleSchema>;

const ScheduleForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();

  // Form initialization
  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      name: "",
      startTime: "",
      totalHours: "8",
      deductHours: "0",
    },
  });

  // Fetch schedule if in edit mode
  useQuery({
    queryKey: ["schedule", id],
    queryFn: async () => {
      if (!isEditMode) return null;
      const response = await scheduleApi.getById(Number(id));
      const schedule = response.data;
      
      // Populate the form
      form.reset({
        name: schedule.name,
        startTime: schedule.startTime,
        totalHours: String(schedule.totalHours),
        deductHours: String(schedule.deductHours),
      });
      
      return schedule;
    },
    enabled: isEditMode,
  });

  const onSubmit = async (data: ScheduleFormValues) => {
    try {
      const scheduleData = {
        ...data,
        totalHours: Number(data.totalHours),
        deductHours: Number(data.deductHours),
      };
      
      if (isEditMode) {
        await scheduleApi.update(Number(id), scheduleData);
        toast.success("Horario actualizado con éxito");
      } else {
        await scheduleApi.create(scheduleData);
        toast.success("Horario creado con éxito");
      }
      navigate("/admin/schedules");
    } catch (error) {
      toast.error("Error al guardar el horario");
      console.error("Error saving schedule:", error);
    }
  };

  // Calculate end time based on start time and total hours
  const calculateEndTime = (startTime: string, hours: string) => {
    if (!startTime || !hours || isNaN(Number(hours))) return "";
    
    const [startHour, startMinute] = startTime.split(":").map(Number);
    let endHour = startHour + Number(hours);
    const endMinute = startMinute;
    
    if (endHour >= 24) {
      endHour = endHour % 24;
    }
    
    return `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}`;
  };

  const startTime = form.watch("startTime");
  const totalHours = form.watch("totalHours");
  const endTime = calculateEndTime(startTime, totalHours);

  return (
    <div className="page-container">
      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? "Editar Horario" : "Nuevo Horario"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del horario</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Turno matutino" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hora de inicio</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormItem>
                  <FormLabel>Hora de fin (calculada)</FormLabel>
                  <Input
                    type="time"
                    value={endTime}
                    disabled
                  />
                  <FormDescription>
                    Calculada automáticamente basada en la hora de inicio y horas totales
                  </FormDescription>
                </FormItem>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="totalHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horas totales</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" step="0.5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="deductHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horas a deducir</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.5" {...field} />
                      </FormControl>
                      <FormDescription>
                        Horas que se deducirán automáticamente (ej: tiempo de almuerzo)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/schedules")}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  {isEditMode ? "Actualizar Horario" : "Crear Horario"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleForm;

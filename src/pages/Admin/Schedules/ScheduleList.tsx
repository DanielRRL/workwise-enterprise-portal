
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Clock, Plus, Users, Edit, Trash } from "lucide-react";

const ScheduleList = () => {
  // Mock data for schedules
  const [schedules] = useState([
    { id: 1, name: "Horario matutino", startTime: "08:00", endTime: "16:00", days: "Lunes-Viernes", employeesAssigned: 15 },
    { id: 2, name: "Horario vespertino", startTime: "14:00", endTime: "22:00", days: "Lunes-Viernes", employeesAssigned: 8 },
    { id: 3, name: "Horario fin de semana", startTime: "09:00", endTime: "18:00", days: "Sábado-Domingo", employeesAssigned: 5 },
    { id: 4, name: "Media jornada mañana", startTime: "08:00", endTime: "12:00", days: "Lunes-Viernes", employeesAssigned: 3 },
    { id: 5, name: "Turno nocturno", startTime: "22:00", endTime: "06:00", days: "Lunes-Domingo", employeesAssigned: 7 },
  ]);

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Gestión de Horarios</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Horario
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Horarios Actuales</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Horario</TableHead>
                <TableHead>Días</TableHead>
                <TableHead>Empleados asignados</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.map(schedule => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">{schedule.name}</TableCell>
                  <TableCell>{`${schedule.startTime} - ${schedule.endTime}`}</TableCell>
                  <TableCell>{schedule.days}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users size={16} className="mr-2 text-blue-500" />
                      {schedule.employeesAssigned}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash size={16} />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users size={14} className="mr-1" />
                        Asignar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Próximas asignaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
              <Clock size={16} />
              <span>Los cambios en los horarios se aplicarán automáticamente en la próxima jornada laboral.</span>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empleado</TableHead>
                  <TableHead>Horario asignado</TableHead>
                  <TableHead>Fecha de inicio</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Juan Pérez</TableCell>
                  <TableCell>Horario matutino</TableCell>
                  <TableCell>15/05/2025</TableCell>
                  <TableCell><span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs">Activo</span></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>María García</TableCell>
                  <TableCell>Media jornada mañana</TableCell>
                  <TableCell>18/05/2025</TableCell>
                  <TableCell><span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-md text-xs">Pendiente</span></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScheduleList;

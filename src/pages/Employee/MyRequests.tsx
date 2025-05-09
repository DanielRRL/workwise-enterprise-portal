
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Calendar, Check, Clock, File, FilePlus, FileText, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const MyRequests = () => {
  // Mock data for requests
  const [requests] = useState([
    { 
      id: 1, 
      type: "Vacaciones", 
      startDate: "12/06/2025", 
      endDate: "26/06/2025", 
      days: 10, 
      reason: "Vacaciones familiares anuales",
      status: "Pendiente", 
      submittedDate: "28/04/2025",
      comments: "" 
    },
    { 
      id: 2, 
      type: "Permiso", 
      startDate: "10/04/2025", 
      endDate: "10/04/2025", 
      days: 1, 
      reason: "Cita médica",
      status: "Aprobado", 
      submittedDate: "05/04/2025",
      comments: "Permiso aprobado. Por favor asegúrate de actualizar tus tareas pendientes antes de ausentarte." 
    },
    { 
      id: 3, 
      type: "Permiso", 
      startDate: "02/03/2025", 
      endDate: "02/03/2025", 
      days: 0.5, 
      reason: "Asuntos personales (medio día)",
      status: "Rechazado", 
      submittedDate: "25/02/2025",
      comments: "Rechazado debido a la carga de trabajo y plazos ajustados para esa semana." 
    },
  ]);

  // Mock data for balance (available days)
  const availableDays = {
    vacation: 15,
    personal: 3,
    sick: 5
  };

  // Display form state
  const [showRequestForm, setShowRequestForm] = useState(false);

  // Function to get status style
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Aprobado":
        return "bg-green-100 text-green-800";
      case "Rechazado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-amber-100 text-amber-800";
    }
  };

  // Function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Aprobado":
        return <Check size={16} className="mr-2 text-green-600" />;
      case "Rechazado":
        return <X size={16} className="mr-2 text-red-600" />;
      default:
        return <Clock size={16} className="mr-2 text-amber-600" />;
    }
  };

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Mis Solicitudes</h1>
        <Button onClick={() => setShowRequestForm(!showRequestForm)}>
          <FilePlus className="mr-2 h-4 w-4" />
          Nueva solicitud
        </Button>
      </div>

      {showRequestForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Nueva solicitud</CardTitle>
            <CardDescription>Complete los detalles de su solicitud</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="request-type" className="text-sm font-medium">Tipo de solicitud</label>
                  <select 
                    id="request-type" 
                    className="w-full border rounded-md p-2 bg-background"
                    defaultValue=""
                  >
                    <option value="" disabled>Seleccione un tipo</option>
                    <option value="vacation">Vacaciones ({availableDays.vacation} días disponibles)</option>
                    <option value="personal">Permiso personal ({availableDays.personal} días disponibles)</option>
                    <option value="sick">Permiso médico ({availableDays.sick} días disponibles)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="request-days" className="text-sm font-medium">Número de días</label>
                  <Input id="request-days" type="number" min="0.5" step="0.5" placeholder="Número de días" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="start-date" className="text-sm font-medium">Fecha de inicio</label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="end-date" className="text-sm font-medium">Fecha de fin</label>
                  <Input id="end-date" type="date" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="reason" className="text-sm font-medium">Motivo</label>
                  <Textarea id="reason" placeholder="Describa el motivo de su solicitud" rows={3} />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowRequestForm(false)}>Cancelar</Button>
            <Button>Enviar solicitud</Button>
          </CardFooter>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Días de vacaciones</p>
                <h3 className="text-xl font-bold">{availableDays.vacation} días</h3>
              </div>
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-800" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Permisos personales</p>
                <h3 className="text-xl font-bold">{availableDays.personal} días</h3>
              </div>
              <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                <File className="h-5 w-5 text-purple-800" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Permisos médicos</p>
                <h3 className="text-xl font-bold">{availableDays.sick} días</h3>
              </div>
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <FileText className="h-5 w-5 text-green-800" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de solicitudes</CardTitle>
          <CardDescription>Todas sus solicitudes y su estado actual</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Fechas</TableHead>
                <TableHead>Días</TableHead>
                <TableHead>Enviado</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map(request => (
                <TableRow key={request.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    {request.type}
                    <div className="text-xs text-muted-foreground line-clamp-1">
                      {request.reason}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>{request.startDate}</div>
                    {request.startDate !== request.endDate && (
                      <div className="text-xs text-muted-foreground">
                        hasta {request.endDate}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{request.days}</TableCell>
                  <TableCell>{request.submittedDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {getStatusIcon(request.status)}
                      <span className={`px-2 py-1 rounded-md text-xs ${getStatusStyle(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                    {request.comments && (
                      <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {request.comments}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {requests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No hay solicitudes registradas
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyRequests;

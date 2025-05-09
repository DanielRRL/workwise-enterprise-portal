
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Calendar, Check, Clock, Filter, Mail, Search, User, X } from "lucide-react";
import { Input } from "@/components/ui/input";

const RequestList = () => {
  // Mock data for requests
  const [requests] = useState([
    { 
      id: 1, 
      employee: "Carlos Mendoza", 
      type: "Vacaciones", 
      startDate: "12/06/2025", 
      endDate: "26/06/2025", 
      days: 10, 
      reason: "Vacaciones familiares anuales",
      status: "Pendiente", 
      submittedDate: "28/04/2025" 
    },
    { 
      id: 2, 
      employee: "Laura Torres", 
      type: "Permiso", 
      startDate: "15/05/2025", 
      endDate: "15/05/2025", 
      days: 1, 
      reason: "Cita médica",
      status: "Aprobado", 
      submittedDate: "05/05/2025" 
    },
    { 
      id: 3, 
      employee: "Roberto Sánchez", 
      type: "Permiso", 
      startDate: "10/05/2025", 
      endDate: "10/05/2025", 
      days: 0.5, 
      reason: "Asuntos personales (medio día)",
      status: "Rechazado", 
      submittedDate: "03/05/2025" 
    },
    { 
      id: 4, 
      employee: "Ana Ramírez", 
      type: "Vacaciones", 
      startDate: "01/07/2025", 
      endDate: "15/07/2025", 
      days: 10, 
      reason: "Vacaciones de verano",
      status: "Pendiente", 
      submittedDate: "02/05/2025" 
    },
    { 
      id: 5, 
      employee: "Miguel Ángel Díaz", 
      type: "Licencia", 
      startDate: "20/05/2025", 
      endDate: "03/06/2025", 
      days: 10, 
      reason: "Licencia por paternidad",
      status: "Aprobado", 
      submittedDate: "20/04/2025" 
    },
  ]);

  // Get status style based on status value
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

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Solicitudes de Empleados</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            Notificar a todos
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-amber-800 font-medium mb-1">Pendientes</p>
                <h3 className="text-2xl font-bold">7</h3>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-800" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-green-800 font-medium mb-1">Aprobadas</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-6 w-6 text-green-800" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-50">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-red-800 font-medium mb-1">Rechazadas</p>
                <h3 className="text-2xl font-bold">3</h3>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <X className="h-6 w-6 text-red-800" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Todas las solicitudes</CardTitle>
          <div className="flex justify-between items-center mt-2">
            <div className="text-sm text-muted-foreground">
              Mostrando 5 de 22 solicitudes
            </div>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input 
                placeholder="Buscar solicitud..." 
                className="h-9" 
                type="search"
              />
              <Button size="sm" className="h-9">
                <Search size={16} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empleado</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Fechas</TableHead>
                <TableHead>Días</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map(request => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="font-medium flex items-center">
                      <User size={16} className="mr-2 text-gray-500" />
                      {request.employee}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Enviado: {request.submittedDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {request.type === "Vacaciones" ? (
                        <Calendar size={16} className="mr-2 text-blue-500" />
                      ) : (
                        <Clock size={16} className="mr-2 text-purple-500" />
                      )}
                      {request.type}
                    </div>
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
                  <TableCell>
                    <span className={`px-2 py-1 rounded-md text-xs ${getStatusStyle(request.status)}`}>
                      {request.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {request.status === "Pendiente" ? (
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="bg-green-50 hover:bg-green-100 border-green-200">
                          <Check size={14} className="mr-1 text-green-700" />
                          Aprobar
                        </Button>
                        <Button variant="outline" size="sm" className="bg-red-50 hover:bg-red-100 border-red-200">
                          <X size={14} className="mr-1 text-red-700" />
                          Rechazar
                        </Button>
                      </div>
                    ) : (
                      <Button variant="ghost" size="sm">
                        Ver detalles
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestList;


import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Award, Plus, Search, User, Star } from "lucide-react";
import { Input } from "@/components/ui/input";

const EvaluationList = () => {
  // Mock data for evaluations
  const [evaluations] = useState([
    { id: 1, employeeName: "Carlos Mendoza", position: "Desarrollador Senior", date: "10/04/2025", score: 4.8, status: "Completada" },
    { id: 2, employeeName: "Ana Ramírez", position: "Diseñadora UX", date: "05/04/2025", score: 4.5, status: "Completada" },
    { id: 3, employeeName: "Roberto Sánchez", position: "Analista de Datos", date: "15/05/2025", score: 0, status: "Pendiente" },
    { id: 4, employeeName: "Laura Torres", position: "Project Manager", date: "20/05/2025", score: 0, status: "Pendiente" },
    { id: 5, employeeName: "Miguel Ángel Díaz", position: "DevOps Engineer", date: "02/04/2025", score: 4.2, status: "Completada" },
  ]);

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Evaluaciones de Desempeño</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Evaluación
        </Button>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Evaluaciones pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">18</span> evaluaciones pendientes para este mes
              </div>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input 
                  placeholder="Buscar por nombre de empleado..." 
                  className="h-9" 
                  type="search"
                />
                <Button size="sm" className="h-9">
                  <Search size={16} />
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empleado</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Fecha Programada</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {evaluations.map(evaluation => (
                  <TableRow key={evaluation.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <User size={16} className="mr-2 text-gray-500" />
                        {evaluation.employeeName}
                      </div>
                    </TableCell>
                    <TableCell>{evaluation.position}</TableCell>
                    <TableCell>{evaluation.date}</TableCell>
                    <TableCell>
                      {evaluation.status === "Completada" ? (
                        <div className="flex items-center">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs mr-2">Completada</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, idx) => (
                              <Star 
                                key={idx} 
                                size={12} 
                                className={idx < Math.floor(evaluation.score) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                              />
                            ))}
                            <span className="text-xs ml-1 font-medium">{evaluation.score}</span>
                          </div>
                        </div>
                      ) : (
                        <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-md text-xs">Pendiente</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        {evaluation.status === "Completada" ? "Ver detalles" : "Evaluar"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Resumen de rendimiento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-blue-600 font-medium mb-1">Promedio general</div>
              <div className="text-2xl font-bold flex items-center">
                4.3
                <Award className="ml-2 h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-green-600 font-medium mb-1">Mejor departamento</div>
              <div className="text-2xl font-bold">Desarrollo (4.7)</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-purple-600 font-medium mb-1">Evaluaciones completadas</div>
              <div className="text-2xl font-bold">65%</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EvaluationList;

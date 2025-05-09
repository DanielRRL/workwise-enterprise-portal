
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Award, Calendar, Star, TrendingUp } from "lucide-react";

const MyEvaluations = () => {
  // Mock data for evaluations
  const [evaluations] = useState([
    { 
      id: 1, 
      date: "10/04/2025", 
      evaluator: "Maria Gómez (Gerente)", 
      score: 4.8,
      skills: {
        technical: 4.9,
        teamwork: 4.7,
        communication: 4.5,
        punctuality: 5.0,
        productivity: 4.9
      },
      strengths: [
        "Excelente conocimiento técnico", 
        "Alta capacidad para resolver problemas",
        "Puntualidad destacable"
      ],
      improvements: [
        "Mejorar comunicación con otros departamentos", 
        "Documentar mejor los procesos desarrollados"
      ],
      comments: "Empleado sobresaliente, ha demostrado un gran desempeño a lo largo del trimestre. Su actitud y habilidades técnicas son un ejemplo para el equipo."
    },
    { 
      id: 2, 
      date: "10/01/2025", 
      evaluator: "Maria Gómez (Gerente)", 
      score: 4.5,
      skills: {
        technical: 4.7,
        teamwork: 4.4,
        communication: 4.3,
        punctuality: 4.8,
        productivity: 4.3
      },
      strengths: [
        "Capacidad técnica notable", 
        "Buena predisposición para asumir nuevas responsabilidades"
      ],
      improvements: [
        "Mejorar organización de tareas", 
        "Aumentar la comunicación en el equipo"
      ],
      comments: "Buen trabajo durante este período. Su desempeño técnico sigue destacando, aunque hay aspectos de comunicación y organización que podrían mejorar."
    },
    { 
      id: 3, 
      date: "10/10/2024", 
      evaluator: "Carlos Sánchez (Gerente anterior)", 
      score: 4.2,
      skills: {
        technical: 4.5,
        teamwork: 4.0,
        communication: 4.0,
        punctuality: 4.5,
        productivity: 4.0
      },
      strengths: [
        "Conocimientos técnicos sólidos", 
        "Buena capacidad de aprendizaje"
      ],
      improvements: [
        "Trabajar en la proactividad", 
        "Mejorar la gestión del tiempo",
        "Mayor participación en reuniones de equipo"
      ],
      comments: "Evaluación positiva con áreas de mejora identificadas. El empleado muestra potencial para crecer en la organización."
    }
  ]);

  // Get last evaluation
  const lastEvaluation = evaluations[0];

  // Function to render stars based on score
  const renderStars = (score: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, idx) => (
          <Star 
            key={idx} 
            size={16} 
            className={idx < Math.floor(score) 
              ? "fill-yellow-400 text-yellow-400" 
              : idx < score 
                ? "fill-yellow-400 text-yellow-400 opacity-50" 
                : "text-gray-300"
            }
          />
        ))}
        <span className="ml-1 text-sm font-medium">{score.toFixed(1)}</span>
      </div>
    );
  };

  // Get the next evaluation date (just a mock)
  const nextEvaluationDate = "10/07/2025";

  return (
    <div className="page-container">
      <h1 className="text-2xl font-bold mb-6">Mis Evaluaciones</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-blue-800 font-medium mb-1">Calificación actual</p>
                <div className="flex items-center">
                  <h3 className="text-2xl font-bold mr-2">{lastEvaluation.score.toFixed(1)}/5.0</h3>
                  {renderStars(lastEvaluation.score)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Última evaluación: {lastEvaluation.date}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-blue-800" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-purple-800 font-medium mb-1">Próxima evaluación</p>
                <h3 className="text-2xl font-bold">{nextEvaluationDate}</h3>
                <p className="text-xs text-muted-foreground mt-1">En 2 meses</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-800" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Última Evaluación</CardTitle>
            <CardDescription>Evaluación trimestral del {lastEvaluation.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Evaluador</h3>
              <p>{lastEvaluation.evaluator}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Habilidades evaluadas</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Habilidades técnicas</span>
                      <span>{lastEvaluation.skills.technical}/5</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-green-500 rounded-full" 
                        style={{ width: `${(lastEvaluation.skills.technical/5)*100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Trabajo en equipo</span>
                      <span>{lastEvaluation.skills.teamwork}/5</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-blue-500 rounded-full" 
                        style={{ width: `${(lastEvaluation.skills.teamwork/5)*100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Comunicación</span>
                      <span>{lastEvaluation.skills.communication}/5</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-purple-500 rounded-full" 
                        style={{ width: `${(lastEvaluation.skills.communication/5)*100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Puntualidad</span>
                      <span>{lastEvaluation.skills.punctuality}/5</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-amber-500 rounded-full" 
                        style={{ width: `${(lastEvaluation.skills.punctuality/5)*100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Fortalezas</h3>
                <ul className="list-disc list-inside space-y-1">
                  {lastEvaluation.strengths.map((strength, index) => (
                    <li key={index} className="text-sm">{strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Áreas de mejora</h3>
                <ul className="list-disc list-inside space-y-1">
                  {lastEvaluation.improvements.map((improvement, index) => (
                    <li key={index} className="text-sm">{improvement}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Comentarios</h3>
              <p className="text-sm">{lastEvaluation.comments}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historial de evaluaciones</CardTitle>
            <CardDescription>Tu progreso a lo largo del tiempo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {evaluations.map((evaluation) => (
                <div 
                  key={evaluation.id}
                  className={`border p-4 rounded-lg ${evaluation.id === 1 ? 'border-primary bg-primary/5' : 'hover:bg-secondary/50'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2 text-muted-foreground" />
                      <span className="text-sm font-medium">{evaluation.date}</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp size={16} className={`mr-1 ${evaluation.score >= 4.5 ? 'text-green-600' : 'text-amber-600'}`} />
                      {renderStars(evaluation.score)}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Evaluado por: {evaluation.evaluator}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyEvaluations;

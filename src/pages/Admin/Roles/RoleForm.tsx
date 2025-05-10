
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/sonner";
import { roleApi } from "@/utils/api";

// Schema for form validation
const roleSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  description: z.string().min(5, "La descripción debe tener al menos 5 caracteres"),
  salary: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "El salario debe ser un número positivo",
  }),
});

type RoleFormValues = z.infer<typeof roleSchema>;

const RoleForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();

  // Form initialization
  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      description: "",
      salary: "",
    },
  });

  // Fetch role if in edit mode
  useQuery({
    queryKey: ["role", id],
    queryFn: async () => {
      if (!isEditMode) return null;
      const response = await roleApi.getById(Number(id));
      const role = response.data;
      
      // Populate the form
      form.reset({
        name: role.name,
        description: role.description,
        salary: String(role.salary),
      });
      
      return role;
    },
    enabled: isEditMode,
  });

  const onSubmit = async (data: RoleFormValues) => {
    try {
      const roleData = {
        ...data,
        salary: Number(data.salary),
      };
      
      if (isEditMode) {
        await roleApi.update(Number(id), roleData);
        toast.success("Cargo actualizado con éxito");
      } else {
        await roleApi.create(roleData);
        toast.success("Cargo creado con éxito");
      }
      navigate("/admin/roles");
    } catch (error) {
      toast.error("Error al guardar el cargo");
      console.error("Error saving role:", error);
    }
  };

  return (
    <div className="page-container">
      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? "Editar Cargo" : "Nuevo Cargo"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del cargo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Desarrollador Frontend" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salario base</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descripción detallada del cargo y sus responsabilidades" 
                        className="min-h-32"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/roles")}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  {isEditMode ? "Actualizar Cargo" : "Crear Cargo"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleForm;

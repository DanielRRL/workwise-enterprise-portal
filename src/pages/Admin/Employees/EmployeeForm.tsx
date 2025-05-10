
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { employeeApi, roleApi } from "@/utils/api";

// Schema for form validation
const employeeSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastname: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  address: z.string().min(5, "Ingrese una dirección válida"),
  email: z.string().email("Ingrese un email válido"),
  phone: z.string().min(8, "Ingrese un número válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  company: z.string().min(2, "Ingrese el nombre de la empresa"),
  id_position: z.string().min(1, "Seleccione un cargo"),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

const EmployeeForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();

  // Form initialization
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      lastname: "",
      address: "",
      email: "",
      phone: "",
      password: "",
      company: "",
      id_position: "",
    },
  });

  // Fetch roles for dropdown
  const { data: roles = [] } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const response = await roleApi.getAll();
      return response.data || [];
    },
  });

  // Fetch employee if in edit mode
  useQuery({
    queryKey: ["employee", id],
    queryFn: async () => {
      if (!isEditMode) return null;
      const response = await employeeApi.getById(Number(id));
      const employee = response.data;
      
      // Populate the form
      form.reset({
        name: employee.name,
        lastname: employee.lastname,
        address: employee.address,
        email: employee.email,
        phone: employee.phone,
        password: "", // Don't populate password for security reasons
        company: employee.company,
        id_position: String(employee.id_position),
      });
      
      return employee;
    },
    enabled: isEditMode,
  });

  const onSubmit = async (data: EmployeeFormValues) => {
    try {
      if (isEditMode) {
        await employeeApi.update(Number(id), {
          ...data,
          id_position: Number(data.id_position),
        });
        toast.success("Empleado actualizado con éxito");
      } else {
        await employeeApi.create({
          ...data,
          id_position: Number(data.id_position),
        });
        toast.success("Empleado creado con éxito");
      }
      navigate("/admin/employees");
    } catch (error) {
      toast.error("Error al guardar el empleado");
      console.error("Error saving employee:", error);
    }
  };

  return (
    <div className="page-container">
      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? "Editar Empleado" : "Nuevo Empleado"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre del empleado" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellidos</FormLabel>
                      <FormControl>
                        <Input placeholder="Apellidos del empleado" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="correo@ejemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="Número telefónico" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input placeholder="Dirección completa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre de la empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{isEditMode ? "Nueva contraseña" : "Contraseña"}</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder={isEditMode ? "Dejar en blanco para mantener" : "Contraseña"} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="id_position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cargo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un cargo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.id} value={String(role.id)}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/employees")}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  {isEditMode ? "Actualizar Empleado" : "Crear Empleado"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeForm;


import axios from "axios";
import { toast } from "@/components/ui/sonner";

// Base API URL - would come from environment variables in a real app
const API_URL = "https://api.workwise-enterprise.com/api/v1";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    if (response) {
      // Handle different HTTP status codes
      switch (response.status) {
        case 401:
          toast.error("Authentication error", {
            description: "Your session has expired. Please log in again."
          });
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/";
          break;
        case 403:
          toast.error("Access denied", {
            description: "You don't have permission to perform this action."
          });
          break;
        case 500:
          toast.error("Server error", {
            description: "Something went wrong. Please try again later."
          });
          break;
        default:
          toast.error("Request failed", {
            description: response.data?.message || "An error occurred"
          });
      }
    } else {
      toast.error("Network error", {
        description: "Unable to connect to the server. Please check your internet connection."
      });
    }
    
    return Promise.reject(error);
  }
);

// API service functions

// Employee API
export const employeeApi = {
  getAll: () => api.get("/employees"),
  getById: (id: number) => api.get(`/employees/${id}`),
  create: (employee: any) => api.post("/employees", employee),
  update: (id: number, employee: any) => api.put(`/employees/${id}`, employee),
  delete: (id: number) => api.delete(`/employees/${id}`),
  getProfile: () => api.get("/employees/profile"),
};

// Role (Position) API
export const roleApi = {
  getAll: () => api.get("/roles"),
  getById: (id: number) => api.get(`/roles/${id}`),
  create: (role: any) => api.post("/roles", role),
  update: (id: number, role: any) => api.put(`/roles/${id}`, role),
  delete: (id: number) => api.delete(`/roles/${id}`),
};

// Schedule API
export const scheduleApi = {
  getAll: () => api.get("/schedules"),
  getById: (id: number) => api.get(`/schedules/${id}`),
  create: (schedule: any) => api.post("/schedules", schedule),
  update: (id: number, schedule: any) => api.put(`/schedules/${id}`, schedule),
  delete: (id: number) => api.delete(`/schedules/${id}`),
  assignToEmployee: (scheduleId: number, employeeId: number) => 
    api.post(`/schedules/${scheduleId}/assign`, { employeeId }),
  getByEmployee: (employeeId: number) => 
    api.get(`/employees/${employeeId}/schedules`),
  getMySchedules: () => api.get("/employees/me/schedules"),
};

// Evaluation API
export const evaluationApi = {
  getAll: () => api.get("/evaluations"),
  getById: (id: number) => api.get(`/evaluations/${id}`),
  create: (evaluation: any) => api.post("/evaluations", evaluation),
  update: (id: number, evaluation: any) => api.put(`/evaluations/${id}`, evaluation),
  delete: (id: number) => api.delete(`/evaluations/${id}`),
  getByEmployee: (employeeId: number) => 
    api.get(`/employees/${employeeId}/evaluations`),
  getMyEvaluations: () => api.get("/employees/me/evaluations"),
};

// Payroll API
export const payrollApi = {
  getAll: () => api.get("/payrolls"),
  getById: (id: number) => api.get(`/payrolls/${id}`),
  getByEmployee: (employeeId: number) => 
    api.get(`/employees/${employeeId}/payrolls`),
  getMyPayrolls: () => api.get("/employees/me/payrolls"),
  addAdjustment: (payrollId: number, adjustment: any) => 
    api.post(`/payrolls/${payrollId}/adjustments`, adjustment),
  removeAdjustment: (payrollId: number, adjustmentId: number) => 
    api.delete(`/payrolls/${payrollId}/adjustments/${adjustmentId}`),
};

// Permission Request API
export const permissionApi = {
  getAll: () => api.get("/permissions"),
  getById: (id: number) => api.get(`/permissions/${id}`),
  create: (permission: any) => api.post("/permissions", permission),
  update: (id: number, permission: any) => api.put(`/permissions/${id}`, permission),
  approve: (id: number) => api.put(`/permissions/${id}/approve`),
  reject: (id: number) => api.put(`/permissions/${id}/reject`),
  getMyPermissions: () => api.get("/employees/me/permissions"),
};

export default api;

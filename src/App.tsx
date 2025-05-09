
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { PrivateRoute } from "@/routes/PrivateRoute";

// Auth Pages
import LoginPage from "@/pages/Auth/LoginPage";
import NotFound from "@/pages/NotFound";

// Admin Pages
import AdminDashboard from "@/pages/Admin/Dashboard";
import EmployeeList from "@/pages/Admin/Employees/EmployeeList";
import RoleList from "@/pages/Admin/Roles/RoleList";

// Employee Pages
import EmployeeProfile from "@/pages/Employee/Profile";
import MySchedule from "@/pages/Employee/MySchedule";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LoginPage />} />
            
            {/* Admin Routes */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/employees" element={<EmployeeList />} />
              <Route path="/admin/roles" element={<RoleList />} />
              {/* Add more admin routes as needed */}
            </Route>
            
            {/* Employee Routes */}
            <Route element={<PrivateRoute allowedRoles={["employee"]} />}>
              <Route path="/employee/profile" element={<EmployeeProfile />} />
              <Route path="/employee/schedule" element={<MySchedule />} />
              {/* Add more employee routes as needed */}
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { employeeApi } from "@/utils/api";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { UserPlus, Edit, Trash2, FileText } from "lucide-react";

// Define Employee type
interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  status: string;
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const navigate = useNavigate();
  
  // Fetch employees data
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        // In a real app, this would come from the API
        // const response = await employeeApi.getAll();
        // setEmployees(response.data);
        
        // Mock data for demonstration
        setTimeout(() => {
          setEmployees([
            { 
              id: 1, 
              name: "John Doe", 
              email: "john.doe@example.com", 
              phone: "(555) 123-4567",
              position: "Senior Software Engineer", 
              department: "Engineering", 
              status: "active" 
            },
            { 
              id: 2, 
              name: "Jane Smith", 
              email: "jane.smith@example.com", 
              phone: "(555) 987-6543",
              position: "Marketing Manager", 
              department: "Marketing", 
              status: "active" 
            },
            { 
              id: 3, 
              name: "Robert Johnson", 
              email: "robert.johnson@example.com", 
              phone: "(555) 456-7890",
              position: "Finance Analyst", 
              department: "Finance", 
              status: "vacation" 
            },
            { 
              id: 4, 
              name: "Mary Williams", 
              email: "mary.williams@example.com", 
              phone: "(555) 321-7654",
              position: "HR Specialist", 
              department: "Human Resources", 
              status: "active" 
            },
            { 
              id: 5, 
              name: "Michael Brown", 
              email: "michael.brown@example.com", 
              phone: "(555) 234-5678",
              position: "Project Manager", 
              department: "Operations", 
              status: "leave" 
            },
          ]);
          setLoading(false);
        }, 600);
      } catch (error) {
        console.error("Error fetching employees:", error);
        toast.error("Failed to load employees");
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Handle delete employee
  const handleDeleteEmployee = async () => {
    if (!employeeToDelete) return;

    try {
      // In a real app, this would call the API
      // await employeeApi.delete(employeeToDelete.id);

      // For demo, just remove from state
      setEmployees((prev) => 
        prev.filter((emp) => emp.id !== employeeToDelete.id)
      );
      
      toast.success("Employee deleted successfully");
      setEmployeeToDelete(null);
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee");
    }
  };

  // Table columns configuration
  const columns = [
    {
      key: "name",
      header: "Name",
      cell: (employee: Employee) => <div>{employee.name}</div>,
      sortable: true,
    },
    {
      key: "email",
      header: "Email",
      cell: (employee: Employee) => <div>{employee.email}</div>,
      sortable: true,
    },
    {
      key: "position",
      header: "Position",
      cell: (employee: Employee) => <div>{employee.position}</div>,
      sortable: true,
    },
    {
      key: "department",
      header: "Department",
      cell: (employee: Employee) => <div>{employee.department}</div>,
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      cell: (employee: Employee) => {
        let badgeClass = "";
        switch (employee.status) {
          case "active":
            badgeClass = "bg-green-100 text-green-800";
            break;
          case "inactive":
            badgeClass = "bg-gray-100 text-gray-800";
            break;
          case "vacation":
            badgeClass = "bg-blue-100 text-blue-800";
            break;
          case "leave":
            badgeClass = "bg-amber-100 text-amber-800";
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-800";
        }
        return (
          <Badge className={badgeClass}>
            {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
          </Badge>
        );
      },
      sortable: true,
    },
  ];

  // Actions for each employee row
  const employeeActions = (employee: Employee) => (
    <div className="flex gap-2">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => navigate(`/admin/employees/${employee.id}/details`)}
        title="View Details"
      >
        <FileText size={16} />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => navigate(`/admin/employees/${employee.id}/edit`)}
        title="Edit"
      >
        <Edit size={16} />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => setEmployeeToDelete(employee)}
        title="Delete"
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );

  return (
    <div className="page-container">
      <div className="page-header flex items-center justify-between">
        <h1>Employees</h1>
        <Button onClick={() => navigate("/admin/employees/create")}>
          <UserPlus size={16} className="mr-2" />
          Add Employee
        </Button>
      </div>

      {loading ? (
        <div className="w-full flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <DataTable
          data={employees}
          columns={columns}
          actions={employeeActions}
          searchable
          searchKeys={["name", "email", "position", "department"]}
        />
      )}

      <AlertDialog 
        open={employeeToDelete !== null}
        onOpenChange={(isOpen) => !isOpen && setEmployeeToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Employee</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {employeeToDelete?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteEmployee}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EmployeeList;

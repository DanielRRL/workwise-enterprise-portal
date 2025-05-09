
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { roleApi } from "@/utils/api";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
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
import { Plus, Edit, Trash2 } from "lucide-react";

// Define Role type
interface Role {
  id: number;
  name: string;
  description: string;
  department: string;
  baseSalary: number;
  employeeCount: number;
}

const RoleList: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const navigate = useNavigate();

  // Fetch roles data
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoading(true);
        // In a real app, this would come from the API
        // const response = await roleApi.getAll();
        // setRoles(response.data);
        
        // Mock data for demonstration
        setTimeout(() => {
          setRoles([
            {
              id: 1,
              name: "Software Engineer",
              description: "Develops and maintains software applications",
              department: "Engineering",
              baseSalary: 85000,
              employeeCount: 12
            },
            {
              id: 2,
              name: "Product Manager",
              description: "Oversees product development lifecycle",
              department: "Product",
              baseSalary: 95000,
              employeeCount: 5
            },
            {
              id: 3,
              name: "Marketing Specialist",
              description: "Creates and implements marketing strategies",
              department: "Marketing",
              baseSalary: 75000,
              employeeCount: 8
            },
            {
              id: 4,
              name: "HR Coordinator",
              description: "Manages HR processes and employee relations",
              department: "Human Resources",
              baseSalary: 65000,
              employeeCount: 4
            },
            {
              id: 5,
              name: "Financial Analyst",
              description: "Analyzes financial data and prepares reports",
              department: "Finance",
              baseSalary: 80000,
              employeeCount: 6
            },
          ]);
          setLoading(false);
        }, 600);
      } catch (error) {
        console.error("Error fetching roles:", error);
        toast.error("Failed to load roles");
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  // Handle delete role
  const handleDeleteRole = async () => {
    if (!roleToDelete) return;

    try {
      // In a real app, this would call the API
      // await roleApi.delete(roleToDelete.id);

      // For demo, just remove from state
      setRoles((prev) => 
        prev.filter((role) => role.id !== roleToDelete.id)
      );
      
      toast.success("Role deleted successfully");
      setRoleToDelete(null);
    } catch (error) {
      console.error("Error deleting role:", error);
      toast.error("Failed to delete role");
    }
  };

  // Table columns configuration
  const columns = [
    {
      key: "name",
      header: "Role Name",
      cell: (role: Role) => <div className="font-medium">{role.name}</div>,
      sortable: true,
    },
    {
      key: "department",
      header: "Department",
      cell: (role: Role) => <div>{role.department}</div>,
      sortable: true,
    },
    {
      key: "description",
      header: "Description",
      cell: (role: Role) => <div className="max-w-xs truncate">{role.description}</div>,
    },
    {
      key: "baseSalary",
      header: "Base Salary",
      cell: (role: Role) => <div>${role.baseSalary.toLocaleString()}</div>,
      sortable: true,
    },
    {
      key: "employeeCount",
      header: "Employees",
      cell: (role: Role) => <div>{role.employeeCount}</div>,
      sortable: true,
    },
  ];

  // Actions for each role row
  const roleActions = (role: Role) => (
    <div className="flex gap-2">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => navigate(`/admin/roles/${role.id}/edit`)}
        title="Edit"
      >
        <Edit size={16} />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => setRoleToDelete(role)}
        title="Delete"
        disabled={role.employeeCount > 0}
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );

  return (
    <div className="page-container">
      <div className="page-header flex items-center justify-between">
        <h1>Roles</h1>
        <Button onClick={() => navigate("/admin/roles/create")}>
          <Plus size={16} className="mr-2" />
          Add Role
        </Button>
      </div>

      {loading ? (
        <div className="w-full flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <DataTable
            data={roles}
            columns={columns}
            actions={roleActions}
            searchable
            searchKeys={["name", "department"]}
          />
          
          <p className="text-sm text-muted-foreground mt-4">
            Note: Roles with assigned employees cannot be deleted.
          </p>
        </>
      )}

      <AlertDialog 
        open={roleToDelete !== null}
        onOpenChange={(isOpen) => !isOpen && setRoleToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Role</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the {roleToDelete?.name} role? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteRole}
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

export default RoleList;

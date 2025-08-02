import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseUser } from "@/lib/useSupabaseUser";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({ children, redirectTo = "/login" }: ProtectedRouteProps) {
  const user = useSupabaseUser();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    
    // Check if user is authenticated via either Supabase or JWT
    if (!user && !token) {
      navigate(redirectTo);
    }
  }, [user, navigate, redirectTo]);

  // Show loading state while checking authentication
  if (user === undefined) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Verifying authentication...</p>
          </div>
        </div>
      </div>
    );
  }

  const token = localStorage.getItem("jwt");
  
  // If not authenticated, don't render children
  if (!user && !token) {
    return null;
  }

  return <>{children}</>;
}

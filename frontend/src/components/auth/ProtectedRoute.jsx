import React, { useEffect } from "react";
import useAuthStore from "../../lib/store/authStore";
import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api/apiClient";
import { Navigate, useLocation } from "react-router";
import { Loader } from "lucide-react";
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { user, setAuth, clearAuth, token } = useAuthStore();
  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await api.get("/auth/profile");
      return response.data;
    },
    retry: 1,
  });

  // error
  useEffect(() => {
    if (isError) {
      clearAuth();
    }
  }, [isError, error, clearAuth]);

  // success
  useEffect(() => {
    if(isSuccess && data){
          setAuth(data, token);
    }
  }, [isSuccess, data, setAuth, token])
  if(isLoading){
    return (<div className="flex h-screen items-center justify-center">
     <Loader className="animate-spin"/>
    </div>
    )
  }
  if (isError) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children;
};

export default ProtectedRoute;

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  
  useEffect(() => {
    const checkAuthentication = async () => {
      const userId = localStorage.getItem("userId"); 
      if (!userId) {
        setIsAuthenticated(false); 
        return;
      }

      try {
        const response = await fetch("http://localhost:3001/users"); 
        if (response.ok) {
          const data = await response.json();
          const user = data.find((user) => user.id === userId); 
          setIsAuthenticated(!!user);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false); 
      }
      };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    console.log("Authenticated");
    return children;
  }

  return <Navigate to="/signin" />;
}

export default ProtectedRoute;

import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthContext from "./Context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { token, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>; 

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;

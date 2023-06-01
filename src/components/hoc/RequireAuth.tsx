import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

type RequireAuthProps = {
  children: any;
};

const RequireAuth = ({ children }: RequireAuthProps) => {
  const location = useLocation();
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/log-in" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;

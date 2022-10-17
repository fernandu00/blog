import { Navigate } from "react-router-dom";
import { useGlobalContext } from "./context";

const ProtectedRoute = ({ children }) => {
  const { auth } = useGlobalContext();
  if (!auth) {
    return <Navigate to="/" />;
  }
  return children;
};
export default ProtectedRoute;

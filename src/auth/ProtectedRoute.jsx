import { Navigate } from "react-router-dom";
import { useAuthContext } from "./AuthProvider";

export default function ProtectedRoute({ children }) {
    const { isLoggedIn } = useAuthContext();
    return isLoggedIn ? children : <Navigate to="/login" replace />;
}
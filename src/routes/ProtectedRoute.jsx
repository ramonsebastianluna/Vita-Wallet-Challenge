import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const validateHeaders = () => {
    const accessToken = localStorage.getItem("accessToken");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    return accessToken && client && uid;
};

const ProtectedRoute = ({ children }) => {
    const { authState } = useAuth();
    const isAuthInContext = authState.accessToken && authState.client && authState.uid;
    const isAuthInLocalStorage = validateHeaders();

    const isAuthenticated = isAuthInContext || isAuthInLocalStorage;

    return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;


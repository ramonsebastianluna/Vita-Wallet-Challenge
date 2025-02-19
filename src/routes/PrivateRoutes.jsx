import { Navigate } from "react-router-dom";
import Home from "../pages/dashboard/home/Home";
import Exchange from "../pages/dashboard/exchange/Exchange";
import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

const privateRoutes = [
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <MainLayout>
                    <Navigate to="/inicio" replace />
                </MainLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: "/inicio",
        element: (
            <ProtectedRoute>
                <MainLayout>
                    <Home />
                </MainLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: "/intercambiar",
        element: (
            <ProtectedRoute>
                <MainLayout>
                    <Exchange />
                </MainLayout>
            </ProtectedRoute>
        ),
    },
];

export default privateRoutes;
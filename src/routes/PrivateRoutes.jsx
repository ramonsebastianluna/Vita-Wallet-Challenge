import { Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/dashboard/home/Home";
import Transfer from "../pages/dashboard/transfer/Transfer";
import Recharge from "../pages/dashboard/recharge/Recharge";
import Exchange from "../pages/dashboard/exchange/Exchange";
import Profile from "../pages/dashboard/profile/Profile";
import Help from "../pages/dashboard/help/Help";
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
        path: "/transferir",
        element: (
            <ProtectedRoute>
                <MainLayout>
                    <Transfer />
                </MainLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: "/recargar",
        element: (
            <ProtectedRoute>
                <MainLayout>
                    <Recharge />
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
    {
        path: "/perfil",
        element: (
            <ProtectedRoute>
                <MainLayout>
                    <Profile />
                </MainLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: "/ayuda",
        element: (
            <ProtectedRoute>
                <MainLayout>
                    <Help />
                </MainLayout>
            </ProtectedRoute>
        ),
    },
];

export default privateRoutes;
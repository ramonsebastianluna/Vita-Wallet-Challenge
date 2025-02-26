import Login from "../pages/auth/Login";
import Unauthorized from "../pages/auth/Unauthorized";

const PublicRoutes = [
    { path: "/", element: <Login />},
    { path: "/no-autenticado", element: <Unauthorized />}
]

export default PublicRoutes;
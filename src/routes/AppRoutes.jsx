import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = () => {
    return (
        <Routes>
            {PublicRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}
            {PrivateRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}
        </Routes>
    );
};

export default AppRoutes;
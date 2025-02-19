import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MainLayout = ({children}) => {
    const navigate = useNavigate();
    const { setAuthState } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem("client");
        localStorage.removeItem("uid");
    
        setAuthState({
            accessToken: '',
            client: '',
            uid: ''
        });
    
        navigate('/', { replace: true });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2 d-flex flex-column">

                    <Link to="/inicio">Inicio</Link>
                    <Link to="/transferir">Transferir</Link>
                    <Link to="/recargar">Recargar</Link>
                    <Link to="/intercambiar">Intercambiar</Link>
                    <Link to="/perfil">Perfil</Link>
                    <Link to="/ayuda">Ayuda</Link>

                    <button onClick={handleLogout}>Cerrar sesión</button>
                </div>
                <div className="col-10">
                    {children}
                </div>
            </div>        
        </div>
    )
}

export default MainLayout;
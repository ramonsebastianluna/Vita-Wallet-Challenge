import { useNavigate, Link } from "react-router-dom";

const MainLayout = ({children}) => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/', { replace: true });
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-4">
                    <h2>Este es el layout</h2>
                    <Link to="/inicio">Inicio</Link>
                    <Link to="/intercambiar">Intercambiar</Link>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </div>
                <div className="col-8">
                    {children}
                </div>
            </div>        
        </div>
    )
}

export default MainLayout;
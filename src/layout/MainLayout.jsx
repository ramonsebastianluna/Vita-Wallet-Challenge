import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MainLayout = ({children}) => {
    const navigate = useNavigate();
    const { setCredentials } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem("client");
        localStorage.removeItem("uid");
    
        setCredentials({
            accessToken: '',
            client: '',
            uid: ''
        });
    
        navigate('/', { replace: true });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-sm-3 d-flex flex-column p-0">
                    <aside className="aside">
                        <div className="aside__toggle d-block d-sm-none">
                            <a className="btn border border-dark m-2" data-bs-toggle="offcanvas" href="#offcanvasMenu" role="button" aria-controls="offcanvasMenu">
                                ☰
                            </a>
                        </div>

                        <div className="aside__desktop d-none d-sm-block position-relative">
                            <ul className="list-group mx-4">
                                <li className="list-group-item"><Link to="/inicio">Inicio</Link></li>
                                <li className="list-group-item"><Link to="/transferir">Transferir</Link></li>
                                <li className="list-group-item"><Link to="/recargar">Recargar</Link></li>
                                <li className="list-group-item"><Link to="/intercambiar">Intercambiar</Link></li>
                                <li className="list-group-item"><Link to="/perfil">Perfil</Link></li>
                                <li className="list-group-item"><Link to="/ayuda">Ayuda</Link></li>
                            </ul>
                            <button onClick={handleLogout}>Cerrar sesión</button>
                        </div>

                        <div className="aside__mobile offcanvas offcanvas-start w-75" tabIndex="-1" id="offcanvasMenu" aria-labelledby="offcanvasMenuLabel">
                            <div className="offcanvas-header">
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <div className="dropdown mt-3">
                                    <ul className="list-group">
                                        <li className="list-group-item"><Link to="/inicio">Inicio</Link></li>
                                        <li className="list-group-item"><Link to="/transferir">Transferir</Link></li>
                                        <li className="list-group-item"><Link to="/recargar">Recargar</Link></li>
                                        <li className="list-group-item"><Link to="/intercambiar">Intercambiar</Link></li>
                                        <li className="list-group-item"><Link to="/perfil">Perfil</Link></li>
                                        <li className="list-group-item"><Link to="/ayuda">Ayuda</Link></li>
                                    </ul>
                                </div>
                                <button onClick={handleLogout}>Cerrar sesión</button>
                            </div>
                        </div>
                    </aside>
                </div>
                <div className="col-12 col-sm-9">
                    {children}
                </div>
            </div>        
        </div>
    )
}

export default MainLayout;
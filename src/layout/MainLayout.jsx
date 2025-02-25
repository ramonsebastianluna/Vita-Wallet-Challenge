import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MainLayout = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();
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

    const menuItems = [
        { path: "/inicio", label: "Inicio" },
        { path: "/transferir", label: "Transferir" },
        { path: "/recargar", label: "Recargar" },
        { path: "/intercambiar", label: "Intercambiar" },
        { path: "/perfil", label: "Perfil" },
        { path: "/ayuda", label: "Ayuda" },
    ];

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-sm-4 col-lg-3 d-flex flex-column p-0">
                    <aside className="aside position-relative">
                        <div className="aside__toggle d-block d-sm-none">
                            <a className="btn border border-dark m-2" data-bs-toggle="offcanvas" href="#offcanvasMenu" role="button" aria-controls="offcanvasMenu">
                                ☰
                            </a>
                        </div>

                        <div className="aside__desktop d-none d-sm-block">
                            <ul className="list-menu-desktop f-family-open-sans-regular mx-0 ps-0">
                                {menuItems.map(item => (
                                    <li 
                                        key={item.path} 
                                        className={`list-menu-desktop__item fs-5 my-2 rounded-end-5 ${location.pathname === item.path ? "active" : ""}`}
                                    >
                                        <Link className="text-white" to={item.path}>{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
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
                            </div>
                        </div>

                        <button className="btn btn-close-session f-family-open-sans-regular fs-5 text-white mx-4 p-0 position-absolute" onClick={handleLogout}>Cerrar sesión</button>

                    </aside>
                </div>
                <div className="col-12 col-sm-8 col-lg-9">
                    {children}
                </div>
            </div>        
        </div>
    )
}

export default MainLayout;
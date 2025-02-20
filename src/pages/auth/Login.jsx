import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const initialState = {
    email: 'prospecto@vitawallet.io',
    password: 'Vita.1212',
    dev_mode: true
};

const Login = () => {
    const [data, setData] = useState(initialState);
    const navigate = useNavigate();
    const {setCredentials} = useAuth();

    const handleInputChange = ({ target: { name, value } }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const params = new URLSearchParams();
            params.append('email', data.email);
            params.append('password', data.password);
            params.append('dev_mode', initialState.dev_mode);

            const response = await axios.post(
                'https://api.qa.vitawallet.io/api/auth/sign_in',
                params,  // <--- Enviamos el cuerpo como URLSearchParams
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'app-name': 'ANGIE',
                        'Accept': '*/*',
                        'Cache-Control': 'no-cache'
                    }
                }
            );

            const headers = response.headers;

            const accessToken = headers['access-token'];
            const client = headers['client'];
            const uid = headers['uid'];

            // Guardar en estado global
            setCredentials({ accessToken, client, uid });

            // Guardar en localStorage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('client', client);
            localStorage.setItem('uid', uid);

            navigate('/inicio', { replace: true });

        } catch (error) {
            console.error('Error en el login:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center">Iniciar sesión</h1>
            <form className="w-50 mx-auto" onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input type="email" className="form-control" name="email" id="email" value={data.email} onChange={handleInputChange} aria-describedby="email" placeholder="juan@gmail.com"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" name="password" id="password" value={data.password} onChange={handleInputChange} placeholder="Escribe tu contraseña"/>
                </div>

                <button type="submit" className="btn btn-primary text-white">
                    Iniciar sesión
                </button>
            </form>
        </div>
    );
};

export default Login;
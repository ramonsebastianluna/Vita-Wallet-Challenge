import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const initialState = {
    dev_mode: true
};

const useLogin = () => {
    const navigate = useNavigate();
    const { setCredentials } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams();
            params.append("email", email);
            params.append("password", password);
            params.append("dev_mode", initialState.dev_mode);

            const response = await axios.post(
                "https://api.qa.vitawallet.io/api/auth/sign_in",
                params,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "app-name": "ANGIE",
                        Accept: "*/*",
                        "Cache-Control": "no-cache",
                    },
                }
            );

            const headers = response.headers;
            const accessToken = headers["access-token"];
            const client = headers["client"];
            const uid = headers["uid"];

            setCredentials({ accessToken, client, uid });
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("client", client);
            localStorage.setItem("uid", uid);

            navigate("/inicio", { replace: true });
        } catch (err) {
            setError(err.response.data.message);
            console.error("Error en el login:", err);
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        togglePasswordVisibility,
        handleSubmit,
        loading,
        error,
    };
};

export default useLogin;
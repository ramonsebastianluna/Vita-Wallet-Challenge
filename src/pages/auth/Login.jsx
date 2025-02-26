import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import amico from "../../assets/images/auth/amico.png";
import eyeShow from "../../assets/images/auth/eye-show.png";
import eyeHide from "../../assets/images/auth/eye-hide.png";

const Login = () => {
    const { email, setEmail, password, setPassword, handleSubmit, error, loading } = useLogin();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isFormValid = isValidEmail(email) && password.length >= 8;

    return (
        <div className="login container-fluid">
            <div className="row f-family-open-sans-regular">
                <div className="left col-12 col-md-5 col-xl-6">
                    <form className="login__form m-auto" onSubmit={handleSubmit}>
                        <h1 className="form__title text-start fs-3 fw-bold">Iniciar sesión</h1>
                        <div className="form__inputs mb-4">
                            <label htmlFor="email" className="form-label mb-1 fs-6">Correo electrónico</label>
                            <input
                                name="email"
                                id="email"
                                type="email"
                                className={`input__item form-control py-2 ${isValidEmail(email) ? "is-valid" : ""}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="juan@gmail.com"
                            />
                        </div>
                        <div className="form__inputs mb-4">
                            <label htmlFor="password" className="form-label mb-1 fs-6">Contraseña</label>
                            <div className="position-relative">
                                <input
                                    name="password"
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className="input__item form-control py-2"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Escribe tu contraseña"
                                />
                                <img 
                                    src={showPassword ? eyeHide : eyeShow} 
                                    alt="toggle password visibility" 
                                    className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                                    style={{ width: "20px", cursor: "pointer" }}
                                    onClick={togglePasswordVisibility}
                                />
                            </div>
                            <p className="text-end my-2"><a href="#" className="text-dark">¿Olvidaste tu contraseña?</a></p>
                        </div>
                        <button
                            type="submit"
                            className="form__submit btn btn-primary text-white w-100 py-2"
                            disabled={!isFormValid}
                            style={{
                                background: isFormValid ? "linear-gradient(90deg, #05BCB9, #167287)" : "#B9C1C2",
                            }}
                        >
                            {loading ?
                                <div className="spinner spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                :
                                "Iniciar sesión"
                            }
                        </button>
                        {error && <p className="position-relative text-center text-danger my-2">{error}</p>}
                    </form>
                </div>
                <div className="right col-12 col-md-7 col-xl-6 position-relative d-flex justify-content-center">
                    <div className="image-container position-absolute d-flex justify-content-center py-5">
                        <img src={amico} alt="amico-img" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
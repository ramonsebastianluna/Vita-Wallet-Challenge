import viewOff from "/images/view-off.png";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center h-100dvh">
                <img src={viewOff} alt="view-off" style={{ width: "370px", height: "370px" }} />
                <p className="text-center f-family-open-sans-regular">UPS! No tienes permiso para ver este sitio...</p>
                <button className="btn btn-back me-3 w-25" onClick={() => navigate("/")}>Ir al login</button>
            </div>
        </div>
    )
}

export default Unauthorized
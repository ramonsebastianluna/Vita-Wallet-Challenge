import viewOff from "/images/view-off.png";

const Recharge = () => {
    return (
        <div className="container">
            <div className="row justify-content-center align-items-center h-100dvh">
                <img src={viewOff} alt="view-off" style={{ width: "370px", height: "370px" }} />
                <p class="text-center f-family-open-sans-regular">UPS! Interior en desarrollo. Aun estamos trabajando en ello...</p>
            </div>
        </div>
    )
}

export default Recharge
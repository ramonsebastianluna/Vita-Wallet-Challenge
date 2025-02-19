import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import './sass/App.scss'

function App() {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}

export default App

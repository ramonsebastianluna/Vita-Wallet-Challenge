import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import AppRoutes from "./routes/AppRoutes";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './sass/App.scss'

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
}

export default App

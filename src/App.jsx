import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dogs from "./pages/Dogs";
import Appointment from "./pages/Appointment";
import Signup from "./pages/Signup";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dogs />} />
                <Route path="/appointment" element={<Appointment />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
}

export default App;

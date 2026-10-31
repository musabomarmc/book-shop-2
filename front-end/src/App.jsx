
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Home from "./pages/home.jsx";
import SignUp from "./pages/sign_up.jsx";
import Signin from "./pages/sign_in.jsx";


const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/*" element={<Home />} />
                <Route path="/sign-in" element={<Signin />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </div>
    );
};

export default App;

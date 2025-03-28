import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Plans from "./pages/Plans";
import Users from "./pages/Users";
import UsersByOrganization from "./pages/UsersByOrganization";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import PlansDisplay from "./pages/PlansDisplay";
import CartPage from "./pages/CartPage";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex justify-center items-center">
          <Routes>
          <Route
  path="/"
  element={
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-center text-2xl">Welcome to TensorGo</h1>
    </div>
  }
/>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/users" element={<Users />} />
            <Route path="/organization-users" element={<UsersByOrganization />} />;
            <Route path="/plansdisplay" element={<PlansDisplay/>}/>;
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/cart" element={<CartPage />} />
              
          </Routes>
          {/* <Footer/> */}
        </main>

      </div>
    </Router>
  );
}

export default App;

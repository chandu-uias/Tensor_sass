@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

echo 🚀 Starting Frontend Setup...

REM Navigate to the client directory
cd client || (echo ❌ 'client' folder not found! & exit /b 1)

REM Check if package.json exists, else initialize npm
if not exist package.json (
    echo 📦 Initializing npm project...
    npm init -y
)

REM Install dependencies
echo 📦 Installing dependencies...
npm install react-router-dom axios @headlessui/react zustand tailwindcss @tailwindcss/forms @tailwindcss/typography

REM Initialize Tailwind CSS
echo 🎨 Initializing Tailwind CSS...
npx tailwindcss init -p

REM Modify tailwind.config.js
(
echo module.exports = {
echo   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
echo   theme: { extend: {} },
echo   plugins: [
echo     require('@tailwindcss/forms'),
echo     require('@tailwindcss/typography'),
echo   ],
echo };
) > tailwind.config.js

REM Create required directories
echo 📂 Creating project structure...
mkdir public src\assets src\components src\context src\pages src\services

REM Create global styles
(
echo @tailwind base;
echo @tailwind components;
echo @tailwind utilities;
echo.
echo /* Custom container */
echo .container {
echo   @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
echo }
) > src\assets\styles.css

REM Create index.js
(
echo import React from "react";
echo import ReactDOM from "react-dom";
echo import App from "./App";
echo import "./assets/styles.css";
echo.
echo ReactDOM.render(
echo   <React.StrictMode>
echo     <App />
echo   </React.StrictMode>,
echo   document.getElementById("root")
echo );
) > src\index.js

REM Create App.js
(
echo import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
echo import Home from "./pages/Home";
echo import Login from "./pages/Login";
echo.
echo const App = () => {
echo   return (
echo     <Router>
echo       <Routes>
echo         <Route path="/" element={<Home />} />
echo         <Route path="/login" element={<Login />} />
echo       </Routes>
echo     </Router>
echo   );
echo };
echo.
echo export default App;
) > src\App.js

REM Create Navbar.js
(
echo import { Link } from "react-router-dom";
echo.
echo const Navbar = () => {
echo   return (
echo     <nav className="bg-white shadow-md fixed w-full z-10">
echo       <div className="container flex justify-between items-center py-4">
echo         <Link to="/" className="text-2xl font-bold text-blue-600">TensorGo SaaS</Link>
echo         <div className="space-x-4">
echo           <Link to="/plans" className="text-gray-700 hover:text-blue-600">Pricing</Link>
echo           <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
echo           <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md">Sign In</Link>
echo         </div>
echo       </div>
echo     </nav>
echo   );
echo };
echo.
echo export default Navbar;
) > src\components\Navbar.js

REM Create Footer.js
(
echo const Footer = () => {
echo   return (
echo     <footer className="bg-gray-900 text-white py-6 mt-12">
echo       <div className="container flex justify-between">
echo         <p>&copy; 2025 TensorGo. All rights reserved.</p>
echo         <p>Privacy Policy | Terms of Service</p>
echo       </div>
echo     </footer>
echo   );
echo };
echo.
echo export default Footer;
) > src\components\Footer.js

REM Create Home.js
(
echo import Navbar from "../components/Navbar";
echo import Footer from "../components/Footer";
echo import { Link } from "react-router-dom";
echo.
echo const Home = () => {
echo   return (
echo     <>
echo       <Navbar />
echo       <div className="container text-center py-32">
echo         <h1 className="text-5xl font-bold text-gray-900">The Best SaaS Solution for Your Business</h1>
echo         <p className="text-gray-600 mt-4 text-lg">Manage your subscriptions, payments, and users seamlessly.</p>
echo         <Link to="/plans" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-md">View Plans</Link>
echo       </div>
echo       <Footer />
echo     </>
echo   );
echo };
echo.
echo export default Home;
) > src\pages\Home.js

REM Create Login.js
(
echo import { useState } from "react";
echo import { useNavigate } from "react-router-dom";
echo.
echo const Login = () => {
echo   const [email, setEmail] = useState("");
echo   const [password, setPassword] = useState("");
echo   const navigate = useNavigate();
echo.
echo   const handleSubmit = (e) => {
echo     e.preventDefault();
echo     navigate("/dashboard");
echo   };
echo.
echo   return (
echo     <div className="min-h-screen flex items-center justify-center bg-gray-100">
echo       <div className="bg-white p-8 shadow-md rounded-lg w-96">
echo         <h2 className="text-2xl font-bold mb-4">Login</h2>
echo         <form onSubmit={handleSubmit}>
echo           <input type="email" placeholder="Email" className="w-full p-3 border rounded-md mb-3" value={email} onChange={(e) => setEmail(e.target.value)} />
echo           <input type="password" placeholder="Password" className="w-full p-3 border rounded-md mb-3" value={password} onChange={(e) => setPassword(e.target.value)} />
echo           <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md">Login</button>
echo         </form>
echo       </div>
echo     </div>
echo   );
echo };
echo.
echo export default Login;
) > src\pages\Login.js

REM Run Prettier
echo 🔧 Formatting code...
npx prettier --write "src/**/*.{js,jsx,css}"

REM Start the development server
echo 🚀 Starting the frontend server...
npm run dev

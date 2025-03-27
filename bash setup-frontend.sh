#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "🚀 Starting Frontend Setup..."

# Navigate to the client directory
cd client || { echo "❌ 'client' folder not found!"; exit 1; }

# Initialize npm if package.json is missing
if [ ! -f "package.json" ]; then
  echo "📦 Initializing npm project..."
  npm init -y
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install react-router-dom axios @headlessui/react zustand tailwindcss @tailwindcss/forms @tailwindcss/typography

# Initialize Tailwind CSS
echo "🎨 Initializing Tailwind CSS..."
npx tailwindcss init -p

# Modify tailwind.config.js
cat > tailwind.config.js <<EOL
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
EOL

# Create required directories
echo "📂 Creating project structure..."
mkdir -p public src/assets src/components src/context src/pages src/services

# Create global styles
cat > src/assets/styles.css <<EOL
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom container */
.container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}
EOL

# Create index.js
cat > src/index.js <<EOL
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/styles.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
EOL

# Create App.js
cat > src/App.js <<EOL
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
EOL

# Create Navbar.js
cat > src/components/Navbar.js <<EOL
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="container flex justify-between items-center py-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          TensorGo SaaS
        </Link>
        <div className="space-x-4">
          <Link to="/plans" className="text-gray-700 hover:text-blue-600">
            Pricing
          </Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
            Dashboard
          </Link>
          <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
EOL

# Create Footer.js
cat > src/components/Footer.js <<EOL
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="container flex justify-between">
        <p>&copy; 2025 TensorGo. All rights reserved.</p>
        <p>Privacy Policy | Terms of Service</p>
      </div>
    </footer>
  );
};

export default Footer;
EOL

# Create Home.js
cat > src/pages/Home.js <<EOL
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container text-center py-32">
        <h1 className="text-5xl font-bold text-gray-900">
          The Best SaaS Solution for Your Business
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          Manage your subscriptions, payments, and users seamlessly.
        </p>
        <Link to="/plans" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-md">
          View Plans
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Home;
EOL

# Create Login.js
cat > src/pages/Login.js <<EOL
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle login authentication
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-md mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-md mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
EOL

# Build project
echo "🔧 Formatting code..."
npx prettier --write "src/**/*.{js,jsx,css}"

# Start the development server
echo "🚀 Starting the frontend server..."
npm run dev

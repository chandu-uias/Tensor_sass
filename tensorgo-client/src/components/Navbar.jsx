import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import "../styles/navbar.css";

const Navbar = () => {
  const [iconActive, setIconActive] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData?.role) {
        setUserRole(userData.role.toLowerCase());
      }
    } else {
      setUserRole(null);
    }
  }, [token]);

  useEffect(() => {
    if (userRole === "orgadmin") {
      const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartCount(cart.length);
      };
      
      window.addEventListener("storage", updateCartCount);
      updateCartCount();

      return () => window.removeEventListener("storage", updateCartCount);
    }
  }, [userRole]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserRole(null);
    navigate("/login");
  };

  return (
    <header>
      <nav className={iconActive ? "nav-active" : ""}>
        <h2 className="nav-logo">
          <NavLink to="/">SaaS Platform</NavLink>
        </h2>
        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {token ? (
            <>
              {userRole === "superadmin" && (
                <li>
                  <NavLink to="/plans" className="btn">
                    Plans
                  </NavLink>
                </li>
              )}
              {userRole === "orgadmin" && (
                <>
                  <li>
                    <NavLink to="/organization-users" className="btn">
                      My Organization Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/users" className="btn">
                      Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/plansdisplay" className="btn">
                      Check Plans
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/cart" className="btn">
                      🛒 Cart ({cartCount})
                    </NavLink>
                  </li>
                </>
              )}
              <li>
                <button className="btn logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink className="btn" to="/login">
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>

      <div className="menu-icons">
        {!iconActive ? (
          <FiMenu className="menu-open" onClick={() => setIconActive(true)} />
        ) : (
          <RxCross1 className="menu-close" onClick={() => setIconActive(false)} />
        )}
      </div>
    </header>
  );
};

export default Navbar;

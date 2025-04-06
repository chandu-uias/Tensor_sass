import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Users.css"; 
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;
// axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_SERVER_DOMAIN || "http://localhost:8080";

const UsersByOrganization = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const orgAdmin = JSON.parse(localStorage.getItem("user")) || null; // Handle null case
  console.log("Org Admin:", orgAdmin.email);

  useEffect(() => {
    const fetchUsersByOrganization = async () => {
      if (!orgAdmin || !orgAdmin.email) {
        toast.error("You must be logged in as an Org Admin!");
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`/get-user-by-organization?email=${orgAdmin.email}`);
setUsers(response.data.data || []);
console.log("Users:", response.data.data);

      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching organization users!");
      } finally {
        setLoading(false);
      }
    };

    fetchUsersByOrganization();
  }, []);

  return (
    <div className="user-container">
      <h1 className="user-header">Users in My Organization</h1>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="user-grid">
          {users.length === 0 ? (
            <p className="no-users">No users assigned to your organization.</p>
          ) : (
            users.map((user) => (
              <div key={user._id} className="user-card">
                <div className="user-avatar">
                  <span>{user.name?.charAt(0).toUpperCase() || "U"}</span>
                </div>
                <h2 className="user-name">{user.name || "No Name"}</h2>
                <p className="user-email">{user.email}</p>
                <p className={`user-status ${user.isActive ? "active" : "inactive"}`}>
                  <strong>Status:</strong> {user.isActive ? "Active" : "Inactive"}
                </p>
                <p className="user-role">
                  <strong>Role:</strong> {user.role}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UsersByOrganization;

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Users.css"; // Import CSS file
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;
// axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_SERVER_DOMAIN || "http://localhost:8080";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const orgAdmin = JSON.parse(localStorage.getItem("user")); // Get logged-in Org Admin

  // Fetch all users with role "user"
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/get-users");

        // Filter only users with role "user"
        const filteredUsers = response.data.data.filter(user => user.role === "user");

        setUsers(filteredUsers);
      } catch (error) {
        toast.error("Error fetching users!");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Add User under Org Admin (Store Email)
  const handleAddUserToOrganization = async (email) => {
    try {
      if (!orgAdmin) {
        toast.error("You must be logged in as an Org Admin!");
        return;
      }

      const response = await axios.put("/add-users-to-organization", {
        email: orgAdmin.email, // Org Admin Email
        users: [email], // User to be added
      });

      if (response.status === 200) {
        toast.success("User added to your organization!");

        // Update UI: Mark user as "Added to Organization"
        setUsers(users.map(user =>
          user.email === email ? { ...user, addedToOrganization: true } : user
        ));

        // Update localStorage to reflect changes
        const updatedOrgAdmin = { 
          ...orgAdmin, 
          usersUnderOrganization: [...(orgAdmin.usersUnderOrganization || []), email] 
        };
        localStorage.setItem("user", JSON.stringify(updatedOrgAdmin));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding user!");
    }
  };

  return (
    <div className="user-container">
      <h1 className="user-header">User Management</h1>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="user-grid">
          {users.length === 0 ? (
            <p className="no-users">No available users.</p>
          ) : (
            users.map((user) => (
              <div key={user._id} className="user-card">
                <div className="user-avatar">
                  <span>{user.name.charAt(0).toUpperCase()}</span>
                </div>
                <h2 className="user-name">{user.name || "No Name"}</h2>
                <p className="user-email">{user.email}</p>
                <p className={`user-status ${user.isActive ? "active" : "inactive"}`}>
                  <strong>Status:</strong> {user.isActive ? "Active" : "Inactive"}
                </p>
                <p className="user-org-status">
                  <strong>Organization:</strong> {user.addedToOrganization ? "Added to Organization ✅" : "Not Added"}
                </p>

                {/* Add to Organization Button (Disable if already added) */}
                <div className="user-actions">
                  <button 
                    className="add-btn" 
                    onClick={() => handleAddUserToOrganization(user.email)}
                    disabled={user.addedToOrganization}
                  >
                    {user.addedToOrganization ? "Already Added" : "Add to My Organization"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Users;

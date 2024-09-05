import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Importing the advanced CSS

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "" });
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users from API
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch(() => console.error("Error fetching users"));
  }, []);

  // Add new user
  const addUser = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        setNewUser({ name: "", email: "", phone: "" });
      })
      .catch(() => console.error("Error adding user"));
  };

  // Update user
  const updateUser = () => {
    axios
      .put(
        `https://jsonplaceholder.typicode.com/users/${editingUser.id}`,
        editingUser
      )
      .then(() => {
        setUsers(
          users.map((user) => (user.id === editingUser.id ? editingUser : user))
        );
        setEditingUser(null);
      })
      .catch(() => console.error("Error updating user"));
  };

  // Delete user
  const deleteUser = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch(() => console.error("Error deleting user"));
  };

  return (
    <div className="container">
      <h1>User Management</h1>

      {/* Add User Form */}
      <div className="form-container">
        <h2>Add User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
        />
        <button onClick={addUser}>Add User</button>
      </div>

      {/* Users List */}
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => setEditingUser(user)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit User Form */}
      {editingUser && (
        <div className="edit-container">
          <h2>Edit User</h2>
          <input
            type="text"
            placeholder="Name"
            value={editingUser.name}
            onChange={(e) =>
              setEditingUser({ ...editingUser, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={editingUser.email}
            onChange={(e) =>
              setEditingUser({ ...editingUser, email: e.target.value })
            }
          />
          <input
            type="tel"
            placeholder="Phone"
            value={editingUser.phone}
            onChange={(e) =>
              setEditingUser({ ...editingUser, phone: e.target.value })
            }
          />
          <button onClick={updateUser}>Update User</button>
          <button className="cancel-btn" onClick={() => setEditingUser(null)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

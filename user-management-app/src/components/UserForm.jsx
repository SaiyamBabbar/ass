// src/components/UserForm.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UserForm() {
  const { id } = useParams(); // Get the user ID from the route params (for editing)
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  // Fetch the user data if editing
  useEffect(() => {
    if (id) {
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => {
          setName(response.data.name);
          setEmail(response.data.email);
          setPhone(response.data.phone);
        })
        .catch(() => setError("Error fetching user data"));
    }
  }, [id]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email, phone };

    // Update existing user
    if (id) {
      axios
        .put(`https://jsonplaceholder.typicode.com/users/${id}`, userData)
        .then(() => navigate("/")) // Navigate back to the user list after update
        .catch(() => setError("Error updating user"));
    }
    // Create a new user
    else {
      axios
        .post("https://jsonplaceholder.typicode.com/users", userData)
        .then(() => navigate("/")) // Navigate back to the user list after creation
        .catch(() => setError("Error creating user"));
    }
  };

  return (
    <div>
      <h2>{id ? "Edit User" : "Create User"}</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        <button type="submit">{id ? "Update User" : "Create User"}</button>
      </form>
    </div>
  );
}

export default UserForm;

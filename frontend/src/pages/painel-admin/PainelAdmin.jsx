import React, { useState, useEffect } from "react";
import UserForm from "../../components/UserForm/UserForm";
import UserTable from "../../components/UserTable/UserTable";
import "../painel-admin/PainelAdmin.css"

const PainelAdmin = () => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleBlockToggle = async (id, bloqueado) => {
    try {
      const response = await fetch(`/api/users/${id}/block`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bloqueado }),
      });
      if (response.ok) {
        setUsers((prev) =>
          prev.map((user) => (user.id === id ? { ...user, bloqueado } : user))
        );
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCreateUser = async (newUser) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const createdUser = await response.json();
      setUsers((prev) => [...prev, createdUser]);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsEditing(true);
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      const response = await fetch(`/api/users/${updatedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      if (response.ok) {
        setUsers((prev) =>
          prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        setIsEditing(false);
        setEditingUser(null);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (response.ok) {
        setUsers((prev) => prev.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <main className="admin-panel">
        <h2>Manage Users</h2>
        {!isEditing ? (
          <UserForm onSubmit={handleCreateUser} />
        ) : (
          <UserForm
            onSubmit={handleUpdateUser}
            initialData={editingUser}
            onCancel={() => setIsEditing(false)}
          />
        )}
        <UserTable
          users={users}
          onBlockToggle={handleBlockToggle}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      </main>
    </div>
  );
};

export default PainelAdmin;

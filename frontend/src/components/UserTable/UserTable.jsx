import React, { useState, useEffect } from "react";
import { getUsers, deleteUser, updateUser } from "../../api/user"; // Importando os serviços

const UserTable = ({ onBlockToggle, onEdit, users, fetchUsers }) => {


  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Blocked</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.nome}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.bloqueado ? "Yes" : "No"}</td>
            <td>
              <button
                onClick={() => onBlockToggle(user.id, user.bloqueado)}
                style={{
                  backgroundColor: user.bloqueado ? "green" : "red",
                  color: "white",
                }}
              >
                {user.bloqueado ? "Unblock" : "Block"}
              </button>
              <button onClick={() => onEdit(user)}>Edit</button>
              <button
                onClick={() => handleDeleteUser(user.id)}
                style={{ color: "red", backgroundColor: "white" }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;

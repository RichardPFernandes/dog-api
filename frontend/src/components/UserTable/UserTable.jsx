import React from "react";

const UserTable = ({ users, onBlockToggle, onEdit, onDelete }) => {
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
                onClick={() => onBlockToggle(user.id, !user.bloqueado)}
                style={{
                  backgroundColor: user.bloqueado ? "green" : "red",
                  color: "white",
                }}
              >
                {user.bloqueado ? "Unblock" : "Block"}
              </button>
              <button onClick={() => onEdit(user)}>Edit</button>
              <button
                onClick={() => onDelete(user.id)}
                style={{ color: "red" }}
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

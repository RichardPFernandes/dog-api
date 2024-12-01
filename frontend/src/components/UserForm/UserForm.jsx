import React, { useState } from "react";
import "../UserTable/UserTable.css"
import "../UserForm/UserForm.css";

const UserForm = ({ onSubmit, initialData, onCancel }) => {
  const [user, setUser] = useState(
    initialData || { nome: "", email: "", role: "viewer", bloqueado: false }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nome"
        value={user.nome}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <select name="role" value={user.role} onChange={handleChange}>
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default UserForm;

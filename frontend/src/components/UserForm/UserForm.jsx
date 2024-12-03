import React, { useState, useEffect } from "react";
import "../UserTable/UserTable.css";
import "../UserForm/UserForm.css";
import { createUser, updateUser } from "../../api/user";

const UserForm = ({ initialData, onCancel, fetchUsers }) => {
  const [user, setUser] = useState(
    initialData || {
      nome: "",
      email: "",
      role: "viewer",
      senha: "",
      bloqueado: false,
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.id) {
      await createUser(user); 
    } else {
      await updateUser(initialData.id, user); 
    }
    fetchUsers();
  };

  useEffect(() => {
    if (initialData) {
      setUser(initialData);
    }
  }, [initialData]);

  return (
    <form className="user-register" onSubmit={handleSubmit}>
      <input
        type="text"
        name="nome"
        value={user.nome}
        onChange={handleChange}
        placeholder="Nome"
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
      <input
        type="password"
        name="senha"
        value={user.senha}
        onChange={handleChange}
        placeholder="Senha"
        required
      />
      <select name="role" value={user.role} onChange={handleChange}>
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>

      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm;

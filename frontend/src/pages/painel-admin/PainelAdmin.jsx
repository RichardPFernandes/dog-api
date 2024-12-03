import React, { useState, useEffect } from "react";
import UserForm from "../../components/UserForm/UserForm";
import UserTable from "../../components/UserTable/UserTable";
import "../painel-admin/PainelAdmin.css"
import { blockUser, getUsers, unblockUser } from "../../api/user";

const PainelAdmin = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    useEffect(() => {
      fetchUsers();
    }, []); 

  const handleBlockToggle = async (id, bloqueado) => {
    try {
      if (bloqueado) {
        unblockUser(id);
      } else {
        blockUser(id);
      }
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser({
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: user.role
    });
    setIsEditing(true);
  };

  return (
    <div>
      <main className="admin-panel">
        <h2>Painel de Administrador</h2>
        {!isEditing ? (
          <UserForm fetchUsers={fetchUsers} />
        ) : (
          <UserForm
            initialData={editingUser}
            fetchUsers={fetchUsers}
            onCancel={() => setIsEditing(false)}
          />
        )}
        <UserTable
          users={users}
          onBlockToggle={handleBlockToggle}
          fetchUsers={fetchUsers}
          onEdit={handleEditUser}
        />
      </main>
    </div>
  );
};

export default PainelAdmin;

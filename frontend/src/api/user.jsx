import api from "./api";

export const getUsers = async () => {
  const response = await api.get("/api/v1/user");
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/api/v1/user/${id}`);
  return response.data;
};

export const getContext = async () => {
  const response = await api.get(`/api/v1/user/context`);
  return response.data;
};

export const createUser = async (user) => {
  const response = await api.post("/api/v1/user", user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await api.put(`/api/v1/user/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  return api.delete(`/api/v1/user/${id}`);
};

export const loginUser = async (email, senha) => {
  const body = { email, senha };
  const response = await api.post("/api/v1/login", body, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const blockUser = async (id) => {
  const response = await api.post(`/api/v1/user/bloquear/${id}`);
    return response.data;
}

export const unblockUser = async (id) => {
  const response = await api.post(`/api/v1/user/desbloquear/${id}`);
  return response.data;
};


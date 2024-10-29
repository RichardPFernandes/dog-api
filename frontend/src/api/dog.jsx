import api from "./api";

export const getDogs = async (page = 1) => {
  const response = await api.get("/api/v1/dog", {
    params: {
      page: page,
    },
  });
  return response.data;
};

export const getDogById = async (id) => {
  const response = await api.get(`/api/v1/dog/${id}`);
  return response.data;
};

export const createDog = async (dog) => {
  const token = localStorage.getItem("token");
  const response = await api.post("/api/v1/dog", dog, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateDog = async (id, dog) => {
  const response = await api.put(`/api/v1/dog/${id}`, dog);
  return response.data;
};

export const deleteDog = async (id) => {
  return api.delete(`/api/v1/dog/${id}`);
};

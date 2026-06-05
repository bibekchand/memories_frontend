import api from "../api/axios.js";

export const getUserInfo = async () => {
    const response = await api.get("/user");
    return response;
};

export const postLoginInfoToServer = async (username, password) => {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);
    const response = await api.post("/login", formData);
    return response;
};

export const signUpUser = async (formData) => {
    const response = await api.post("/sign_up", formData);
    return response;
};

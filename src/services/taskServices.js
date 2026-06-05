import api from "../api/axios.js";

export const postAddTask = async (body) => {
    const response = await api.post("/task", body);
    return response;
};

export const getPendingTaskCount = async () => {
    const response = await api.get("/task/pending/count");
    return response.data.count;
}

export const deleteTask = async (taskId) => {
    const response = await api.delete(`/task/${taskId}`);
    return response.data;
}

export const updateTask = async (taskId, body) => {
    const response = await api.patch(`/task/${taskId}`, body);
    return response.data;
}
import api from "../api/axios.js";

export const postAddProject = async (body) => {
    const response = await api.post("projects", body);
    return response;
};

export const getProjects = async () => {
    const response = await api.get("projects");
    return response;
};

export const getProjectTasks = async (project_id) => {
    const response = await api.get("projects/tasks", { params: { project_id } });
    return response;
};

export const getUserTasks = async () => {
    const response = await api.get("task");
    return response;
};


export const deleteUserProject = async (project_id) => {
    const response = await api.delete("projects", { params: { id: project_id } })
    return response
}

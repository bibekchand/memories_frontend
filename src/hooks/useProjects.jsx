import { useEffect, useState } from "react";
import {
    getProjects,
    postAddProject,
    deleteUserProject,
} from "../services/projectServices.js";
import { toast } from "@heroui/react";
export default function useProjects() {
    const [projectList, setProjectList] = useState([]);
    async function addProject(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const description = formData.get("description");
        const body = { name: name, description: description };
        try {
            const response = await postAddProject(body);
            setProjectList((prev) => [...prev, response.data]);
        } catch (error) {
            console.log(error);
            console.log("Error in adding project");
        }
    }
    async function getUserProjects() {
        const response = await getProjects();
        setProjectList(response.data);
    }
    async function deleteProject(project_id) {
        try {
            const response = await deleteUserProject(project_id);
            toast.success(`Project ${response?.data.name} deleted`);
            const newProjectList = [];
            for (const project of projectList)
                if (project.id !== project_id) newProjectList.push(project);
            setProjectList(newProjectList);
        } catch (error) {
            if (error.request) toast.danger("Server out of reach");
            console.log("Error in deleting project", error);
        }
    }
    useEffect(() => {
        getUserProjects();
    }, []);
    return { addProject, projectList, deleteProject };
}

import { getProjectTasks, getUserTasks } from "../services/projectServices";
import { getUserInfo } from "../services/userServices";
import { redirect } from "react-router";
import { toast } from "@heroui/react";
import useUserInfoStore from "../store/useUserInfoStore.jsx";
import { getPendingTaskCount } from "../services/taskServices.js";

export const projectTasksLoader = async ({ params }) => {
  const response = await getProjectTasks(params.project_id);
  const taskList = response.data.task_list;
  const projectName = response.data.project_name;
  return { taskList, projectName };
};

export const inboxTaskLoader = async () => {
  const response = await getUserTasks();
  const taskList = response.data;
  return { taskList };
};

export const checkTokenLoader = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await getUserInfo();
      const { username, email } = response.data;
      useUserInfoStore.getState().setUsername(username);
      useUserInfoStore.getState().setUserEmail(email);
      toast.success("Login successful");
      return redirect("/app");
    } catch (error) {
      if (error.response?.status === 401) throw redirect("/login");
      else if (error.request) toast.danger("Server not reachable");
    }
  } else {
    throw redirect("/login");
  }
};

export const personalInfoLoader = async () => {
  if (!useUserInfoStore.getState.username) {
    try {
      const response = await getUserInfo();
      const { username, email } = response.data;
      useUserInfoStore.getState().setUsername(username);
      useUserInfoStore.getState().setUserEmail(email);
      const pendingTaskCount = await getPendingTaskCount();
      return { pendingTaskCount };
    } catch (error) {
      console.log(error)
      toast.danger("Error fetching user info");
    }
  }
};

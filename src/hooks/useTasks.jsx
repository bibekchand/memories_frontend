import { useState } from "react";
import { postAddTask, deleteTask, updateTask } from "../services/taskServices";
import { toast } from "@heroui/react";
import { useRevalidator } from "react-router";

export default function useTasks() {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const revalidator = useRevalidator();
  async function addTask(e) {
    e.preventDefault();
    console.log("Selected Projects in addTask=>", selectedProjects);
    const selectedArray = Array.from(selectedProjects);
    const formData = new FormData(e.target);
    let body = {
      title: formData.get("title"),
      description: formData.get("description"),
      date: formData.get("date"),
      status: "pending",
      time: formData.get("time"),
      projects: selectedArray,
    };
    try {
      await postAddTask(body);
      toast.success("Task added successfully");
      revalidator.revalidate();
    } catch {
      toast.danger("Error in adding task");
    }
  }
  async function deleteUserTask(taskId) {
    try {
      await deleteTask(taskId);
      toast.success("Task deleted successfully");
      revalidator.revalidate();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.danger("Error in deleting task");
    }
  }
  async function updateUserTask(e, task) {
    e.preventDefault();
    const taskId = task.id;
    console.log("Selected Projects in updateUserTask=>", selectedProjects);
    const formData = new FormData(e.target);
    task.status = formData.get("status") === "completed" ? "completed" : null;
    task.title = formData.get("title");
    task.description = formData.get("description");
    task.date = formData.get("date");
    task.time = formData.get("time");
    const status =
      formData.get("status") === "completed" ? "completed" : "pending";
    console.log("Status=>", status);
    const body = {
      title: formData.get("title"),
      description: formData.get("description"),
      date: formData.get("date"),
      time: formData.get("time"),
      status: status,
      projects: Array.from(selectedProjects),
    };
    try {
      await updateTask(taskId, body);
      toast.success("Task updated successfully");
      revalidator.revalidate();
    } catch (error) {
      console.error("Error updating task:", error);
      toast.danger("Error in updating task");
    }
  }
  return {
    addTask,
    selectedProjects,
    setSelectedProjects,
    deleteUserTask,
    updateUserTask,
  };
}

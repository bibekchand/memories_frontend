import useUserInfoStore from "../store/useUserInfoStore";
import { getUserInfo } from "../services/userServices";
import { useNavigate } from "react-router";
import { toast } from "@heroui/react";
import { useEffect } from "react";

export default function useAuth() {
  const navigate = useNavigate();
  async function checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await getUserInfo();
        const { username, email } = response.data;
        useUserInfoStore.getState().setUsername(username);
        useUserInfoStore.getState().setUserEmail(email);
        toast.success("Login successful");
        navigate("/app");
      } catch (error) {
        if (error.response?.status === 401) navigate("/login");
        else if (error.request) toast.danger("Server not reachable");
      }
    } else {
      navigate("/login");
    }
  }
  useEffect(() => {
    checkToken();
  }, []);
}

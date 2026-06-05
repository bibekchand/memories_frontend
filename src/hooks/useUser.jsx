import { toast } from "@heroui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
    postLoginInfoToServer,
    signUpUser,
} from "../services/userServices.js";

export default function useUser() {
    const navigate = useNavigate();
    async function signUp(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const form = {
            username: formData.get("username"),
            password: formData.get("password"),
            email: formData.get("email"),
        };
        try {
            await signUpUser(form);
            toast.success("Account created successfully");
            navigate("/login");
        } catch (error) {
            console.log("Error=>", error?.response?.status);
            if (error?.response?.status === 409) {
                toast.danger("Username already taken. Choose another username");
            } else if (error?.response?.status === 422) {
                toast.danger("Form not valid");
            } else {
                toast.danger("Unkown error");
            }
        }
    }
    function signOut() {
        localStorage.clear();
        navigate("/login");
    }
    async function login(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");
        const password = formData.get("password");
        try {
            const tokenObject = await postLoginInfoToServer(username, password);
            localStorage.setItem("token", tokenObject.data.access_token);
            toast.success("Logged in successfully");
            navigate("/app");
        } catch (error) {
            if (error.response) toast.danger(error.response.data.detail);
            else if (error.request) toast.danger("Server out of reach");
            else toast.danger("Unknown Problem");
        }
    }
    return {  signOut, login, signUp };
}

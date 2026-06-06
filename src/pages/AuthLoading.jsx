import {Spinner, Toast} from "@heroui/react"
import useAuth from "../hooks/useAuth";
export default function AuthLoading() {
    useAuth()
    return (
        <div className="bg-black w-screen h-screen flex items-center justify-center">
            <Spinner />
            <Toast.Provider/>
        </div>
    );
}
import {Spinner, Toast} from "@heroui/react"
export default function AuthLoading() {
    return (
        <div className="bg-black w-screen h-screen flex items-center justify-center">
            <Spinner />
            <Toast.Provider/>
        </div>
    );
}
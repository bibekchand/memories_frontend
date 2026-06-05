import { useEffect } from "react";
import { useThemeStore } from "../store/useThemeStore.jsx";
export default function useTheme() {
    const theme = useThemeStore((state) => state.theme);
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);
}

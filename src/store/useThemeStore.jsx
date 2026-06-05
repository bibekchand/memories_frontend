import { create } from "zustand";
export const useThemeStore = create((set) => ({
    theme: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
    setTheme: (theme) => set({ theme }),
    toggleTheme: () =>
        set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
}));

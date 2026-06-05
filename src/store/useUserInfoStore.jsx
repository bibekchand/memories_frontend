import { create } from "zustand";
export const useUserInfoStore = create((set) => ({
  username: null,
  userEmail: null,
  setUsername: (username) => set({ username }),
  setUserEmail: (userEmail) => set({ userEmail }),
}));

export default useUserInfoStore;
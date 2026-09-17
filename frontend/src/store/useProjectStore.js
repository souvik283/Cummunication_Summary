import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";

// const baseURL =
//   import.meta.env.MODE === "development"
//     ? "http://localhost:2000"
//     : "https://chatvibe-backend-clce.onrender.com";
// const baseURL = "http://localhost:3000"

export const useProjectStore = create((set, get) => ({
  projects: [],
  isGettingProject: false,
  selectedProject: null,
  // selectedProjectId: localStorage.getItem("selectedProject"),
  
  setSelcetedProject: async (project) => {
    try {
      await set({ selectedProject: project });
      // console.log(project);
      // localStorage.setItem("selectedProject", project._id);

      return true;
    } catch (error) {
      toast.error(`${error}`);
    }
  },

  getProjects: async () => {
    set({ isGettingProject: true });
    try {
      const res = await axiosInstance.get("/project");
      // console.log(res.data.projects);
      //   toast.success("Account Created Successfully!");
      set({ projects: res.data.projects });
      return true;
    } catch (error) {
      //   console.log("Error in Signing Up: ", error.response.data.message,);
      toast.error(`${error.response.data.message}`);
    } finally {
      set({ isGettingProject: false });
    }
  },
}));

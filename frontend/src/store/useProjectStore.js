import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";
import { data } from "react-router-dom";

// const baseURL =
//   import.meta.env.MODE === "development"
//     ? "http://localhost:2000"
//     : "https://chatvibe-backend-clce.onrender.com";
// const baseURL = "http://localhost:3000"

export const useProjectStore = create((set, get) => ({
  projects: [],
  isGettingProject: false,
  selectedProject: null,
  isCreatingProject: false,
  isAddProject: false,
  isEditingMember: false,
  isAddingMember: false,

  toggleAddProject: async () => {
    const { isAddProject } = get();
    const tf = isAddProject ? false : true;
    await set({ isAddProject: tf });
    // console.log(isAddProject);
  },

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

  createProject: async (data) => {
    set({ isCreatingProject: true });
    try {
      const res = await axiosInstance.post("/project/create", data);

      //  console.log(res.data);
      toast.success("project Created Successfully!");
    } catch (error) {
      console.log("Error in creating project: ", error.response.data.message);
      toast.error(`${error.response.data.message}`);
    } finally {
      set({ isCreatingProject: false });
    }
  },

  RemoveProjectMember: async (userId) => {
    set({ isEditingMember: true });
    const {selectedProject}= get()
    try {
      const res = await axiosInstance.post(`/project/remove/${selectedProject._id}`, {
        "deleteMembers": [userId]
      });

      //  console.log(res.data.project);
       set({selectedProject: res.data.project})
      toast.success("Member Removed Successfully!");
    } catch (error) {
      console.log("Error in creating project: ", error.response.data.message);
      toast.error(`${error.response.data.message}`);
    } finally {
      set({ isEditingMember: false });
    }
  },

  addProjectMember: async (email) =>{
    set({ isAddingMember: true });
    const{selectedProject} = get()
    
    try {
      const res = await axiosInstance.post(`/project/add/${selectedProject._id}`, {email});
      //  console.log(res.data);
       set({selectedProject: res.data.project})
      toast.success("Member Added Successfully!");
    } catch (error) {
      // console.log("Error in adding member: ", error.response.data.message);
      toast.error(`${error.response.data.message}`);
    } finally {
      set({ isAddingMember: false });
    }
  }
}));

import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";
import { useProjectStore } from "./useProjectStore.js";

export const useChannelStore = create((set, get) => ({
  channels: [],
  selectedChannel: null,
  isGettingChannels: false,

  setSelcetedChannel: async (channel) => {
    try {
      await set({ selectedChannel: channel });
      // console.log(channel);

      // console.log(project);
      // localStorage.setItem("selectedProject", project._id)
      return true;
    } catch (error) {
      toast.error(`${error}`);
    }
  },

  // getChannels: async () => {
  
  //   set({ isGettingChannels: true });
  //   try {
  //     const { selectedProject, selectedProjectId } =
  //       useProjectStore.getState();

  //     const projectName = location.pathname.split("/").pop();
  //     // console.log(channelName);

  //     if (selectedProject == null) {
  //       try {
  //         const res2 = await axiosInstance.get(`/channel/get/${projectName}`);
  //         console.log(res2.data.channels);
  //         set({ channels: res2.data.channels });
  //       } catch (error) {
  //         toast.error(`${error.response.data.message}`);
  //       }
  //     }else{

  //     const res = await axiosInstance.get(`/channel/${selectedProjectId}`);
  //       console.log(res.data.channels);
  //     //   toast.success("Account Created Successfully!");
  //     await set({ channels: res.data.channels });

  //     return true;
  //     }
  //   } catch (error) {
  //     console.log("Error in getting channel: ", error.reponse);
  //     // toast.error(`${error.response.data.message}`);
  //   } finally {
  //     set({ isGettingChannels: false });
  //   }
  
  // },

  
  getChannels: async () => {
  set({ isGettingChannels: true });

  try {
    const projectName = window.location.pathname.split("/").pop();

    // console.log("Project Name:", projectName);

    const res = await axiosInstance.get(
      `/channel/get/${projectName}`
    );

    // console.log("Channels:", res.data.channels);

    set({
      channels: res.data.channels,
    });

    return true;

  } catch (error) {
    console.log(
      "Error in getting channels:",
      error.response?.data || error.message
    );

    toast.error(
      error.response?.data?.message || "Failed to get channels"
    );

    return false;

  } finally {
    set({ isGettingChannels: false });
  }
},

}));

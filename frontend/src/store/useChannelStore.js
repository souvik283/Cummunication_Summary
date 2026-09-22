import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";
import { useProjectStore } from "./useProjectStore.js";

export const useChannelStore = create((set, get) => ({
  channels: [],
  selectedChannel: null,
  isGettingChannels: false,
  isAddChannel: false,
  isCreatingChannel: false,
  isAddChannelMember:false,

  toggleAddChannel: async () =>{
    const {isAddChannel} = get()
    const tf = isAddChannel ? false : true
    await set({isAddChannel: tf})
    // console.log(isAddProject);
  },

  toggleAddChannelMember: async () =>{
    const {isAddChannelMember} = get()
    const tf = isAddChannelMember ? false : true
    await set({isAddChannelMember: tf})
    // console.log(isAddChannelMember);
  },

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

   createChannel: async (data)=>{
    set({isCreatingChannel: true})
    const {selectedProject} = useProjectStore.getState()
    try {
      const res = await axiosInstance.post(`/channel/create/${selectedProject._id}`, data)

      //  console.log(res.data);
        toast.success("Channel Created Successfully!");
    } catch (error) {
       // console.log("Error in creating channel: ", error.response.data.error,);
      toast.error(`${error.response.data.message}`);
    }finally{
      set({isCreatingChannel: false})
    }
  },
  
  getChannels: async () => {
  set({ isGettingChannels: true });
    const {setSelcetedProject} = useProjectStore.getState()
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
    setSelcetedProject(res.data.project)

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

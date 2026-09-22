import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";
import { useChannelStore } from "./useChannelStore.js";

export const useSummaryStore = create((set, get) => ({
    summary: null,
    isGettingSummary: false,
    isGenaratingSummary: false,


    getSummary: async () => {
    set({ isGettingSummary: true });

  try {
  const {selectedChannel} = useChannelStore.getState()

    // console.log("Project Name:", projectName);

    const res = await axiosInstance.get(
      `/summary/get/${selectedChannel._id}`
    );

    // console.log("Channels:", res.data.summary.summary);

    set({
      summary : res.data.summary.summary,
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
    set({ isGettingSummary: false });
  }
},


    genarateSummary: async () => {
    set({ isGenaratingSummary: true });

  try {
  const {selectedChannel} = useChannelStore.getState()

    // console.log("Project Name:", projectName);

    await axiosInstance.get(
      `/summary/${selectedChannel._id}`
    );

    // console.log("Channels:", res.data.summary.summary);

    // set({
    //   summary : res.data.summary,
    // });

    return true;

  } catch (error) {
    // console.log(
    //   "Error in getting channels:",
    //   error.response?.data || error.message
    // );

    toast.error(
      error.response?.data?.message || "Failed to get channels"
    );

    return false;

  } finally {
    set({ isGenaratingSummary: false });
  }
},

})
)
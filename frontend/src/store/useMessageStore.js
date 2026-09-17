import { create } from "zustand";
import toast from "react-hot-toast";
import { useChannelStore } from "./useChannelStore.js";
import { useAuthStore } from "./useAuthStore.js";
import axiosInstance from "../lib/axios";

export const UseMessageStore = create((set, get) => ({
messages: [],
isLoadingMessages: false,
isSendingMessages: false,

getChat: async (selectedChannel) => {
  set({ isLoadingMessages: true });

  try {
    if (!selectedChannel?._id) return;

    const res = await axiosInstance.get(
      `/message/${selectedChannel._id}`
    );

    set({
      messages: res.data.data,
    });
  } catch (error) {
    console.log("Error getting messages:", error);
  } finally {
    set({ isLoadingMessages: false });
  }
},

sendMessage: async (text) => {
  set({ isSendingMessages: true });

  const { messages } = get();
  const { selectedChannel } = useChannelStore.getState();
  const { authUser } = useAuthStore.getState();

  if (!text?.trim() || !selectedChannel?._id) {
    set({ isSendingMessages: false });
    return;
  }

  const tempId = `temp-${Date.now()}`;

  const tempMessage = {
    _id: tempId,
    senderId: authUser.user._id,
    content: text.trim(),
    sender: {
      _id: authUser.user._id,
      fullName: authUser.user.fullName,
      position: authUser.user.position
    },
    createdAt: new Date().toISOString(),
  };

  // Show message immediately
  set({
    messages: [...messages, tempMessage],
  });

  try {
    const res = await axiosInstance.post(
      `/message/send/${selectedChannel._id}`,
      {
        text: text.trim(),
      }
    );

    // Replace temporary message with actual message
    // set((state) => ({
    //   messages: state.messages.map((message) =>
    //     message._id === tempId
    //       ? res.data.data
    //       : message
    //   ),
    // }));

    return res.data;
  } catch (error) {
    console.log("Error sending message:", error);

    // Remove temporary message if sending failed
    // set((state) => ({
    //   messages: state.messages.filter(
    //     (message) => message._id !== tempId
    //   ),
    // }));
  } finally {
    set({ isSendingMessages: false });
  }
},

})
)
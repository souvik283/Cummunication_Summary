import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";
// const baseURL =
//   import.meta.env.MODE === "development"
//     ? "http://localhost:2000"
//     : "https://chatvibe-backend-clce.onrender.com";
// const baseURL = "http://localhost:3000"

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSignUP: false,
  isLoggingIn: false,
  regUser: null,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log(res.data);
      
      set({ authUser: res.data });
      // get().connectSocket()      
      
    } catch (error) {
      console.log("Error in auth check: ", error);
      set({ authUser: null });
    } finally {
      setTimeout(() => {
        set({ isCheckingAuth: false });
      }, 600);
    }
  },

  signUp: async (data) => {
    set({ isSignUP: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      // console.log(res.data.userNew);
      toast.success("Account Created Successfully!");
      set({ regUser: res.data.userNew });
      return true;
    } catch (error) {
    //   console.log("Error in Signing Up: ", error.response.data.message,);
      toast.error(`${error.response.data.message}`);
    } finally {
      set({ isSignUP: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/signin", data);
      set({ isCheckingAuth: true });
      toast.success("Logged In Successfully!");
      await set({ authUser: res.data });

      setTimeout(() => {
        set({ isCheckingAuth: false });
      }, 300);
      get().connectSocket();
      return true;
    } catch (error) {
      // console.log(error);
      toast.error(`${error.response.data.message}`);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ isCheckingAuth: true });
      toast.success("Logged Out Successfully!");
      set({ authUser: null });
      get().disconnectSocket()
      setTimeout(() => {
        set({ isCheckingAuth: false });
      }, 300);
      return true;
    } catch (error) {
      toast.error(`${error.response}`);
    }
  },


//   connectSocket: () => {
//     const { authUser } = get();

//     if (!authUser?.user || get().socket?.connected) return;

//     console.log(baseURL);

//     const socket = io(baseURL, {
//       withCredentials: true,
//       reconnection: true,
//       reconnectionAttempts: Infinity,
//       reconnectionDelay: 1000,
//       transports: ["websocket"],
//     });

//     // socket.connect()

//     set({ socket });
//     socket.on("getOnlineUsers", (userIds) => {
//       set({ onlineUsers: userIds });
//     });
//   },

//   disconnectSocket: () => {
//     if (get().socket?.connected) get().socket.disconnect();
//   },
}));

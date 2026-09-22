import React from "react";
import { UseMessageStore } from "../store/useMessageStore";
import { useEffect } from "react";
import { useChannelStore } from "../store/useChannelStore";
import { LogIn } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ROLE_STYLES = {
  Manager: { bg: "#EDE9FB", text: "#5B4FCF" },
  Developer: { bg: "#E4F3EB", text: "#2E9B63" },
};

const MessageBubble = () => {
  const { selectedChannel } = useChannelStore;
  const { messages, isLoadingMessages } = UseMessageStore();
  const {authUser} = useAuthStore()

  useEffect(() => {
    // console.log(messages, messages.length);
  }, [messages.length, selectedChannel]);

  if (isLoadingMessages) {
    return <div>loading....</div>;
  }

  if (messages.length == 0) {
    return <div>start conversation</div>;
  }

  // const roleStyle = ROLE_STYLES[role] || { bg: "#F4F1EC", text: "#8A8474" };

  return (
    <div className="flex-1 min-h-[23vh] overflow-y-auto px-6 py-5 flex flex-col gap-5">
      {/* {console.log(messages)
      } */}
      {messages.map((m) => (
        <div key={m._id} className={`flex gap-3 ${m.sender._id == authUser.user._id ? "justify-end" : "justify-start"}`}>
          <span
            className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold shrink-0"
            style={{ background: "#759654", color: "#FFFFFF" }}
          >
            {m.sender.fullName[0]}
          </span>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-sm font-semibold"
                style={{ color: "#1A0F0B" }}
              >
                {m.sender.fullName}
              </span>
              <span
                className="text-[11px] font-medium px-1.5 py-0.5 rounded"
                style={{ background: "#987654", color:"#FFFFFF" }}
              >
                {m.sender.position}
              </span>

              <span className="text-xs" style={{ color: "#A39C8C" }}>
                {/* 12:20 */}
              </span>
            </div>

            <p className="text-sm mt-0.5" style={{ color: "#4A4638" }}>
              {m.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageBubble;

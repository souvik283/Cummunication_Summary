import React, { useState } from "react";
import { useChannelStore } from "../../store/useChannelStore";
import { UseMessageStore } from "../../store/useMessageStore";

const StatusComposer = () => {

  const {selectedChannel} = useChannelStore()
  const {sendMessage} = UseMessageStore()
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    sendMessage(trimmed)
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 px-6 py-4 border-t"
      style={{ background: "#FFFFFF", borderColor: "#E6E1D6" }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={`Post a status update in #${selectedChannel.name}`}
        className="flex-1 rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-[#1A0F0B] transition-colors"
        style={{ background: "#F4F1EC", color: "#1A0F0B" }}
      />
      <button
        type="submit"
        className="h-11 px-5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 cursor-pointer"
        style={{ background: "#FF6B4A", color: "#1A0F0B" }}
      >
        Send
      </button>
    </form>
  );
};

export default StatusComposer;
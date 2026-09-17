import React from "react";
import { useChannelStore } from "../../store/useChannelStore";

const ChannelHeader = ({ onToggleSummary, summaryOpen }) => {
  const {selectedChannel} = useChannelStore()
  if (selectedChannel == null) {
    return (
      <div>
        
      </div>
    )
  }
  return (
    <div
      className="flex items-center justify-between gap-4 px-6 py-4 border-b"
      style={{ background: "#FFFFFF", borderColor: "#E6E1D6" }}
    >
      <div className="min-w-0">
        <h1
          className="text-lg font-semibold flex items-center gap-1.5"
          style={{ color: "#1A0F0B" }}
        >
          <span style={{ color: "#A39C8C" }}>#</span>
          {selectedChannel.name}
        </h1>
        <p className="text-sm truncate" style={{ color: "#8A8474" }}>
          {/* {description} */}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden sm:flex -space-x-2">
          {selectedChannel.members.map((member, i) => (
            <span
              key={i}
              title={member.fullName}
              className="flex items-center cursor-pointer justify-center w-7 h-7 rounded-full text-xs font-semibold border-2"
              style={{ background: "#773567", color: "#FFFFFF", borderColor: "#FFFFFF" }}
            >
              {member.fullName?.[0].toUpperCase()}
              
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={onToggleSummary}
          className="flex cursor-pointer items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg transition-colors"
          style={{
            background: summaryOpen ? "#1A0F0B" : "#F4F1EC",
            color: summaryOpen ? "#F4F1EC" : "#1A0F0B",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path
              d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2"
              strokeLinecap="round"
            />
          </svg>
          AI Summary
        </button>
      </div>
    </div>
  );
};

export default ChannelHeader;
import React, { useEffect, useState} from "react";
import { useProjectStore } from "../../store/useProjectStore";
import { useChannelStore } from "../../store/useChannelStore";
import { UseMessageStore } from "../../store/useMessageStore";
import ProjectHeader from "./ProjectHeader"
import ProjectMembers from "./ProjectMembers"
const ChannelSidebar = ({ onSelect }) => {
  const { selectedProject } = useProjectStore();
  const { getChannels, isGettingChannels, channels, setSelcetedChannel, selectedChannel } =
    useChannelStore();
  const { getChat } = UseMessageStore();

    const [showChannelMembers, setShowChannelMembers] = useState(false);


  useEffect(() => {
    getChannels();
  }, [getChannels]);

  if (isGettingChannels) {
    return <div></div>;
  }

  return (
    <aside
      className="w-full sm:w-64 shrink-0 border-r flex flex-col"
      style={{
        background: "#FFFFFF",
        borderColor: "#E6E1D6",
      }}
    >
      <ProjectHeader/>
  
      <ProjectMembers/>

      {/* CHANNELS */}
      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        <p
          className="px-3 text-xs font-semibold tracking-wide mb-2 mt-2"
          style={{ color: "#A39C8C" }}
        >
          CHANNELS
        </p>

        <ul className="flex flex-col gap-1">
          {channels.map((channel) => {
            const isActive = selectedChannel?._id === channel._id;

            return (
              <li key={channel._id}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(channel._id);
                    setSelcetedChannel(channel);
                    getChat(channel);
                  }}
                  className="w-full flex cursor-pointer border-x-3 items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors"
                  style={{
                    background: isActive ? "#FCEAE3" : "transparent",
                    color: isActive ? "#D9603F" : "#4A4638",
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  <span
                    style={{
                      color: isActive ? "#D9603F" : "#A39C8C",
                    }}
                  >
                    #
                  </span>

                  <span className="truncate">{channel.name}</span>
                </button>
              </li>
            );
          })}
        </ul>

      
      </nav>
    </aside>
  );
};

export default ChannelSidebar;

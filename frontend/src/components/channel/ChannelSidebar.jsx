import React, { useEffect } from "react";
import { useProjectStore } from "../../store/useProjectStore";
import { useChannelStore } from "../../store/useChannelStore";
import LoaderIcon from "../loading/LoaderIcon";
import { UseMessageStore } from "../../store/useMessageStore";

const ChannelSidebar = ({
  onSelect,

}) => {

  const { selectedProject } = useProjectStore();
    const { getChannels, isGettingChannels, channels, setSelcetedChannel } = useChannelStore();
  const {getChat} = UseMessageStore()
  
    useEffect(() => {
      getChannels();
    }, [getChannels, selectedProject]);

    if (isGettingChannels) {
      return(
        <div></div>
      )
    }
    const projectName = location.pathname.split("/").pop();


  return (
    <aside
      className="w-full sm:w-64 shrink-0 border-r flex flex-col"
      style={{ background: "#FFFFFF", borderColor: "#E6E1D6" }}
    >
      <div className="px-5 pt-5 pb-3">
        <p
          className="text-xs font-semibold tracking-wide mb-1"
          style={{ color: "#A39C8C" }}
        >
          PROJECT
        </p>
        <h2
          className="text-base font-semibold"
          style={{ fontFamily: "'Fraunces', serif", color: "#1A0F0B" }}
        >
          {selectedProject?.name || projectName}
        </h2>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        <p
          className="px-3 text-xs font-semibold tracking-wide mb-2 mt-2"
          style={{ color: "#A39C8C" }}
        >
          CHANNELS
        </p>
        <ul className="flex flex-col gap-1">
          {channels.map((channel) => {
            const isActive = false;
            return (
              <li key={channel._id}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(channel._id)
                    setSelcetedChannel(channel)
                    getChat(channel)
                  }
                  }
                  className="w-full flex cursor-pointer border-x-3 items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors"
                  style={{
                    background: isActive ? "#FCEAE3" : "transparent",
                    color: isActive ? "#D9603F" : "#4A4638",
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  <span style={{ color: isActive ? "#D9603F" : "#A39C8C" }}>
                    #
                  </span>
                  <span className="truncate">{channel.name}</span>
                  {/* {channel.unread > 0 && !isActive && (
                    <span
                      className="ml-auto text-xs rounded-full px-1.5 py-0.5"
                      style={{ background: "#FF6B4A", color: "#1A0F0B" }}
                    >
                      {channel.unread}
                    </span>
                  )} */}
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

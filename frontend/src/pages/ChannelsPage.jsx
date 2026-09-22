import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ChannelSidebar from "../components/channel/ChannelSidebar";
import ChannelHeader from "../components/channel/ChannelHeader";
import AISummaryCard from "../components/AISummaryCard";
import MessageBubble from "../components/MessageBubble";
import StatusComposer from "../components/channel/StatusComposer";
import { useChannelStore } from "../store/useChannelStore";
import { useProjectStore } from "../store/useProjectStore";
import { UseMessageStore } from "../store/useMessageStore";
import { useSummaryStore } from "../store/useSummaryStore";
import CreateChannelPopuup from "../components/channel/CreateChannelPopuup";
import ChannelPopupMembers from "../components/channel/ChannelPopupMembers";

const initialChannels = {
  "full-stack": {
    id: "full-stack",
    name: "full-stack",
    description: "Cross-cutting integration, releases and API contracts.",
    unread: 0,
    members: [
      { initial: "P", color: "#5B4FCF", name: "Priya (Manager)" },
      { initial: "R", color: "#2E9B63", name: "Rahul" },
      { initial: "S", color: "#D9603F", name: "Sara" },
    ],
    aiSummary:
      "Team agreed on the auth API contract and is on schedule for Friday's integration checkpoint. No blockers reported this week.",
    updatedAt: "3m ago",
    messages: [
      {
        id: 1,
        author: "Priya",
        initial: "P",
        avatarColor: "#5B4FCF",
        role: "Manager",
        time: "9:02 AM",
        content: "Let's sync on API contracts before Friday's release.",
      },
      {
        id: 2,
        author: "Rahul",
        initial: "R",
        avatarColor: "#2E9B63",
        role: "Developer",
        time: "9:14 AM",
        content: "Sounds good, backend auth endpoints are already frozen.",
      },
      {
        id: 3,
        author: "Sara",
        initial: "S",
        avatarColor: "#D9603F",
        role: "Developer",
        time: "9:20 AM",
        content: "I'll integrate the login flow against that today.",
      },
    ],
  },
  backend: {
    id: "backend",
    name: "backend",
    description: "API, database and infrastructure updates.",
    unread: 2,
    members: [
      { initial: "R", color: "#2E9B63", name: "Rahul" },
      { initial: "A", color: "#D9822B", name: "Amit" },
    ],
    aiSummary:
      "Auth endpoints shipped. Profile API is in progress and expected by tomorrow. Amit flagged a slow query on the messages table that needs indexing.",
    updatedAt: "8m ago",
    messages: [
      {
        id: 1,
        author: "Rahul",
        initial: "R",
        avatarColor: "#2E9B63",
        role: "Developer",
        time: "8:41 AM",
        content: "Status: auth endpoints done ✅. Starting on profile APIs next.",
      },
      {
        id: 2,
        author: "Amit",
        initial: "A",
        avatarColor: "#D9822B",
        role: "Developer",
        time: "8:55 AM",
        content: "Found a slow query on the messages table, adding an index today.",
      },
    ],
  },
  frontend: {
    id: "frontend",
    name: "frontend",
    description: "UI, styling and client-side integration updates.",
    unread: 0,
    members: [
      { initial: "S", color: "#D9603F", name: "Sara" },
      { initial: "P", color: "#5B4FCF", name: "Priya (Manager)" },
    ],
    aiSummary:
      "Login UI is integrated with the new auth flow. Dashboard redesign is at risk — Sara is waiting on final coral/ink theme approval from design.",
    updatedAt: "12m ago",
    messages: [
      {
        id: 1,
        author: "Sara",
        initial: "S",
        avatarColor: "#D9603F",
        role: "Developer",
        time: "10:05 AM",
        content: "Status: login screen now uses the new auth flow end to end.",
      },
      {
        id: 2,
        author: "Priya",
        initial: "P",
        avatarColor: "#5B4FCF",
        role: "Manager",
        time: "10:22 AM",
        content: "Nice. Can we get the dashboard theme signed off by design this week?",
      },
    ],
  },
};

const ChannelsPage = () => {
  const {getChannels, selectedChannel, isAddChannel, isAddChannelMember} = useChannelStore()
  const {messages, sendMessage} = UseMessageStore()
  const {genarateSummary} = useSummaryStore()

  
  const [channels2, setChannels] = useState(initialChannels);
  const [activeChannelId, setActiveChannelId] = useState("");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const channelList = Object.values(channels2);
  const activeChannel = channels2[activeChannelId];

  const handleSelectChannel = (id) => {
    setActiveChannelId(id);
    setChannels((prev) => ({
      ...prev,
      [id]: { ...prev[id], unread: 0 },
    }));
  };

  const handleSend = (text) => {
    sendMessage(text)
    // TODO: send status update to backend / socket and let the AI
    // summary regenerate from the live message history.
  };

  const handleRefreshSummary = async () => {
    setRefreshing(true);
    await genarateSummary()
    setTimeout(() => setRefreshing(false), 900);
  };


  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F4F1EC", fontFamily: "'Inter', sans-serif" }}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600;700&display=swap"
      />

      <Navbar />
      {isAddChannelMember ? 
      <ChannelPopupMembers/>
      :
      null}

      {isAddChannel ? <CreateChannelPopuup/> : null}

      <div className="flex flex-1 min-h-0 flex-col sm:flex-row">
        <ChannelSidebar
          channels={channelList}
          activeChannelId={activeChannelId}
          onSelect={handleSelectChannel}
          projectName="Website Redesign"
        />

        <div className="flex-1 flex flex-col min-w-0">
          <ChannelHeader
            summaryOpen={summaryOpen}
            onToggleSummary={() => setSummaryOpen((v) => !v)}
          />

          {selectedChannel && summaryOpen && (
            <AISummaryCard
              summary={activeChannel.aiSummary}
              updatedAt={activeChannel.updatedAt}
              onRefresh={handleRefreshSummary}
              loading={refreshing}
            />
          )}

        
              <MessageBubble  />
  

         {selectedChannel ?  <StatusComposer  channelName={activeChannel.name} /> : null }
        </div>
      </div>
    </div>
  );
};

export default ChannelsPage;
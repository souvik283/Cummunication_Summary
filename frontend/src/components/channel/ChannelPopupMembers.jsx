import React, { useState } from "react";
import { X } from "lucide-react";
import { useChannelStore } from "../../store/useChannelStore";
import { useProjectStore } from "../../store/useProjectStore";
import { useAuthStore } from "../../store/useAuthStore";
const ChannelPopupMembers = () => {
  const { toggleAddChannelMember, selectedChannel } = useChannelStore();
  const { selectedProject } = useProjectStore();
  const { isAdmin } = useAuthStore();

  const [selectedMembers, setSelectedMembers] = useState([]);
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={() => toggleAddChannelMember()}
    >
      <div
        className="relative w-full max-w-[550px] max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl"
        style={{
          background: "#F4F1EC",
          color: "#1A0F0B",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-7 py-5 border-b"
          style={{
            background: "#F4F1EC",
            borderColor: "#D8D0C7",
          }}
        >
          <div>
            <p
              className="text-[11px] font-semibold tracking-[2px]"
              style={{ color: "#A85D19" }}
            >
              CHANNEL MEMBERS
            </p>

            <h2 className="text-xl font-semibold mt-1">
              Manage channel members
            </h2>
          </div>

          <button
            type="button"
            onClick={toggleAddChannelMember}
            className="w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer hover:bg-black/5"
            style={{
              borderColor: "#8E877F",
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-7 py-6">
          {/* CURRENT MEMBERS */}
          <div className="mb-7">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Current Members</h3>

              <span
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  background: "#E5DED5",
                  color: "#1A0F0B",
                }}
              >
                {selectedChannel?.members?.length || 0}
              </span>
            </div>

            {selectedChannel?.members?.length > 0 ? (
              <div className="flex flex-col gap-2">
                {selectedChannel.members.map((member) => (
                  <div
                    key={member._id}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{
                      background: "#FFFFFF",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {/* PROFILE */}
                      {member.profileImg ? (
                        <img
                          src={member.profileImg}
                          alt={member.fullName}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold"
                          style={{
                            background: "#1A0F0B",
                            color: "#F4F1EC",
                          }}
                        >
                          {member.fullName?.charAt(0)?.toUpperCase()}
                        </div>
                      )}

                      <div>
                        <p className="text-sm font-medium">{member.fullName}</p>

                        <p className="text-xs" style={{ color: "#756E67" }}>
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm" style={{ color: "#756E67" }}>
                No members in this channel.
              </p>
            )}
          </div>

          {/* DIVIDER */}
          <div
            className="border-t mb-6"
            style={{
              borderColor: "#D8D0C7",
            }}
          />

          {/* ADD MEMBERS */}
          {isAdmin ? (
            <div>
              <button className="text-sm font-semibold cursor-pointer mb-3">
                Add Members
              </button>

              <div className="flex flex-col gap-2">
                {selectedProject.members
                  ?.filter(
                    (member) =>
                      !selectedChannel?.members?.some(
                        (channelMember) => channelMember._id === member._id,
                      ),
                  )
                  .map((member) => {
                    const isSelected = selectedMembers.includes(member._id);

                    return (
                      <button
                        type="button"
                        key={member._id}
                        onClick={() => {
                          setSelectedMembers((prev) =>
                            isSelected
                              ? prev.filter((id) => id !== member._id)
                              : [...prev, member._id],
                          );
                        }}
                        className="w-full flex items-center justify-between p-3 rounded-lg border text-left transition-colors cursor-pointer"
                        style={{
                          background: isSelected ? "#E5DED5" : "#FFFFFF",
                          borderColor: isSelected ? "#1A0F0B" : "#D8D0C7",
                        }}
                      >
                        <div className="flex items-center gap-3">
                          {member.profileImg ? (
                            <img
                              src={member.profileImg}
                              alt={member.fullName}
                              className="w-9 h-9 rounded-full object-cover"
                            />
                          ) : (
                            <div
                              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold"
                              style={{
                                background: "#1A0F0B",
                                color: "#F4F1EC",
                              }}
                            >
                              {member.fullName?.charAt(0)?.toUpperCase()}
                            </div>
                          )}

                          <div>
                            <p className="text-sm font-medium">
                              {member.fullName}
                            </p>

                            <p className="text-xs" style={{ color: "#756E67" }}>
                              {member.email}
                            </p>
                          </div>
                        </div>

                        {/* CHECKBOX */}
                        <div
                          className="w-5 h-5 rounded border flex items-center justify-center"
                          style={{
                            background: isSelected ? "#1A0F0B" : "#FFFFFF",
                            borderColor: "#1A0F0B",
                          }}
                        >
                          {isSelected && (
                            <span
                              className="text-xs"
                              style={{ color: "#FFFFFF" }}
                            >
                              ✓
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          ) : null}

          
          {/* ADD BUTTON */}

          {isAdmin ? (
            <button
              type="button"
              disabled={selectedMembers.length === 0}
              onClick={async () => {
                try {
                  // Your API/store function
                  // await addChannelMembers(
                  //   selectedChannel._id,
                  //   selectedMembers
                  // );

                  // setSelectedMembers([]);

                  toggleAddChannelMember();
                } catch (error) {
                  console.error("Failed to add channel members:", error);
                }
              }}
              className="w-full h-12 mt-6 flex items-center justify-center rounded-lg font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              style={{
                background: "#1A0F0B",
                color: "#F4F1EC",
              }}
            >
              Add{" "}
              {selectedMembers.length > 0 ? `${selectedMembers.length} ` : ""}
              Member{selectedMembers.length !== 1 ? "s" : ""}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ChannelPopupMembers;

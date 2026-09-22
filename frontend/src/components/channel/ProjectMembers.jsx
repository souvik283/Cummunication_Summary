import React, { useEffect, useState } from "react";
import { useProjectStore } from "../../store/useProjectStore";
import { LogOut, Trash } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
const ProjectMembers = () => {
  const { selectedProject, RemoveProjectMember, addProjectMember , getProjects} = useProjectStore();

  const [showProjectMembers, setShowProjectMembers] = useState(false);
  const [showAddProjectMember, setShowAddProjectMember] = useState(false);
  const [projectMemberEmail, setProjectMemberEmail] = useState("");
  const { authUser, isAdmin } = useAuthStore();

  useEffect(() => {}, [selectedProject]);

  async function handelAddMember() {
    
    await addProjectMember(projectMemberEmail)
    setProjectMemberEmail("")
  
  }

  function deleteProjectmember(id) {
    RemoveProjectMember(id);
  }
  

  return (
    <div className="px-3 mb-3">
      <button
        type="button"
        onClick={() => setShowProjectMembers(!showProjectMembers)}
        className="w-full cursor-pointer flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors hover:bg-[#F7F4EE]"
        style={{ color: "#4A4638" }}
      >
        <div className="flex items-center gap-2">
          <span>👥</span>

          <span className="font-medium">Project Members</span>

          <span
            className="text-xs px-1.5 py-0.5 rounded-full"
            style={{
              background: "#F1EEE6",
              color: "#817967",
            }}
          >
            {selectedProject?.members.length}
          </span>
        </div>

        <span className="text-xs">{showProjectMembers ? "▲" : "▼"}</span>
      </button>

      {showProjectMembers && (
        <div className="mt-1 ml-2 border-l pl-3">
          <div className="flex flex-col relative gap-1">
            {selectedProject.members.length === 0 ? (
              <p className="text-xs py-2" style={{ color: "#A39C8C" }}>
                No project members
              </p>
            ) : (
              selectedProject.members.map((member) => (
                <div
                  key={member._id}
                  className="flex items-center gap-2 px-2 py-2 rounded-md"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                    style={{
                      background: "#E8DED4",
                      color: "#4A4638",
                    }}
                  >
                    {member.fullName?.[0]?.toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <p
                      className="text-xs font-medium truncate"
                      style={{ color: "#1A0F0B" }}
                    >
                      {member.fullName}
                    </p>

                    <p
                      className="text-[10px] truncate"
                      style={{ color: "#A39C8C" }}
                    >
                      {member.email}
                    </p>
                  </div>

                  {isAdmin ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        deleteProjectmember(member._id);
                      }}
                      className=" absolute cursor-pointer rounded-full  p-1 right-1"
                    >
                      {member._id == authUser.user._id ?
                      
                      <LogOut size={13} color="#ec5f5f" />
                      :
                      <Trash size={13} color="#ec5f5f" />
}
                    </button>
                  ) : null}
                </div>
              ))
            )}
          </div>

          {/* {!showAddProjectMember && isAdmin ? ( */}
          {isAdmin ? (
            <button
              type="button"
              onClick={() => setShowAddProjectMember(true)}
              className="w-full text-left text-xs cursor-pointer px-2 py-2 mt-1 rounded-md hover:bg-[#F7F4EE]"
              style={{ color: "#D9603F" }}
            >
              + Add project member
            </button>
          ) : null }
          
          {showAddProjectMember && isAdmin ? (
            <div className="mt-2">
              <input
                type="email"
                value={projectMemberEmail}
                onChange={(e) => setProjectMemberEmail(e.target.value)}
                placeholder="Member email"
                className="w-full px-2.5 py-2 text-xs rounded-md border outline-none"
                style={{
                  borderColor: "#E6E1D6",
                  color: "#1A0F0B",
                }}
              />

              <div className="flex gap-1 mt-2">
                <button
                  type="button"
                  onClick={handelAddMember}
                  className="flex-1 cursor-pointer text-xs py-1.5 rounded-md"
                  style={{
                    background: "#D9603F",
                    color: "#FFFFFF",
                  }}
                >
                  Add
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowAddProjectMember(false);
                    setProjectMemberEmail("");
                  }}
                  className="flex-1 cursor-pointer text-xs py-1.5 rounded-md"
                  style={{
                    background: "#F1EEE6",
                    color: "#4A4638",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ):
          null
        }
        </div>
      )}
    </div>
  );
};

export default ProjectMembers;

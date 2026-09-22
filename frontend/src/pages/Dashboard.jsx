import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/dashboard/ProjectCard";
import { useProjectStore } from "../store/useProjectStore";
import { useState } from "react";
import LoaderIcon from "../components/loading/LoaderIcon";
import {X} from "lucide-react"

// import { useAuthStore } from "../store/useAuthStore";
// const projects = [
//   {
//     title: "Communication Summary",
//     description: "AI powered project communication and message summarization.",
//     status: "On track",
//     members: [
//       { initial: "S", color: "#5B4FCF" },
//       { initial: "R", color: "#2E9B63" },
//     ],
//     teamCount: 2,
//   },
//   {
//     title: "Website Redesign",
//     description: "Redesign the company website and improve user experience.",
//     status: "At risk",
//     members: [
//       { initial: "R", color: "#2E9B63" },
//       { initial: "P", color: "#D9603F" },
//     ],
//     teamCount: 2,
//   },
// ];

const notifications = [
  {
    tone: "warning",
    title: "Website Redesign needs attention",
    message: "Marked at risk based on recent messages.",
    time: "Just now",
  },
  {
    tone: "info",
    title: "Weekly summaries are ready",
    message: "AI-generated recaps for every active project.",
    time: "Just now",
  },
];

const DashboardPage = () => {
  const [formData, setFormData] = useState({ name: "", description: "" });

  const {
    getProjects,
    projects,
    createProject,
    isCreatingProject,
    isAddProject,
    toggleAddProject,
  } = useProjectStore();
  useEffect(() => {
    getProjects();
  }, [getProjects]);

  async function HandleCreateProjects (e) {
    e.preventDefault()
    await createProject(formData);
    toggleAddProject()
    setFormData({name: "", description: ""})
    await getProjects()
    
  
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "#F4F1EC", fontFamily: "'Inter', sans-serif" }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600;700&display=swap"
      />

      <Navbar />

      <main className="px-6 sm:px-10 py-8">

        {isAddProject && (
          <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => toggleAddProject()}
          >
            
            <div
            className="relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl"
              style={{
                background: "#F4F1EC",
                color: "#1A0F0B",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              
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
                    PROJECT CREATION
                  </p>

                  <h2 className="text-xl font-semibold mt-1">
                    Create a new project
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => toggleAddProject()}
                  className="w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer hover:bg-black/5"
                  style={{
                    borderColor: "#8E877F",
                  }}
                >
                  <X size={18}/>
                </button>
              </div>

              <div className="px-7 py-6">
                <form
                  className="flex flex-col gap-5"
                  onSubmit={HandleCreateProjects}
                >
                  {/* Project Name */}
                  <div>
                    <label className="block text-xs font-semibold mb-2">
                      PROJECT NAME
                    </label>

                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      placeholder="Enter the name of project"
                      required
                      className="w-full rounded-lg px-4 py-3 text-sm outline-none border transition-colors"
                      style={{
                        background: "#FFFFFF",
                        color: "#1A0F0B",
                        borderColor: "#D8D0C7",
                      }}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-semibold mb-2">
                      PROJECT DESCRIPTION
                    </label>

                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Enter the description of the project"
                      required
                      rows={5}
                      className="w-full rounded-lg px-4 py-3 text-sm outline-none border resize-none transition-colors"
                      style={{
                        background: "#FFFFFF",
                        color: "#1A0F0B",
                        borderColor: "#D8D0C7",
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isCreatingProject}
                    // onClick={toggleAddProject()}
                    className="w-full h-12 flex items-center justify-center rounded-lg font-semibold text-sm hover:opacity-90 disabled:opacity-70 cursor-pointer"
                    style={{
                      background: "#1A0F0B",
                      color: "#F4F1EC",
                    }}
                  >
                    {isCreatingProject ? (
                      <LoaderIcon className="w-5 h-5 animate-spin" />
                    ) : (
                      "Create Project"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-between gap-6 items-start">
          {projects.map((project) => (
            <ProjectCard key={project._id} {...project} />
          ))}

          {/* <div className="lg:row-span-1">
            <h2
              className="text-xs font-semibold tracking-wide mb-3"
              style={{ color: "#6B5F4F" }}
            >
              NOTIFICATIONS
            </h2>
            <div className="flex flex-col gap-3">
              {notifications.map((notification, i) => (
                <NotificationCard key={i} {...notification} />
              ))}
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;

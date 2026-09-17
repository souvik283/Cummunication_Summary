import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/dashboard/ProjectCard";
import NotificationCard from "../components/dashboard/NotificationCard";
import {useProjectStore} from "../store/useProjectStore"
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

  const {getProjects, projects} = useProjectStore()
  useEffect(()=>{
    getProjects()
  }, [getProjects])
  return (
    <div className="min-h-screen" style={{ background: "#F4F1EC", fontFamily: "'Inter', sans-serif" }}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600;700&display=swap"
      />

      <Navbar />

      <main className="px-6 sm:px-10 py-8">
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
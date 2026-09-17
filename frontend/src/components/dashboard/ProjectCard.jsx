import React from "react";
import { Link } from "react-router-dom";
import { useProjectStore } from "../../store/useProjectStore";
const STATUS_STYLES = {
  "On track": { dot: "#2E9B63", text: "#2E9B63" },
  "At risk": { dot: "#D9822B", text: "#D9822B" },
};

const ProjectCard = ({ ...project }) => {
  const { setSelcetedProject } = useProjectStore();

  const statusStyle = STATUS_STYLES[status] || {
    dot: "#8B96A5",
    text: "#8B96A5",
  };
  const teamCount = project.members.length;

  return (
    <Link
      className=" w-[30vw] rounded-2xl p-6 border transition-shadow hover:shadow-md cursor-pointer"
      style={{ background: "#FFFFFF", borderColor: "#E6E1D6" }}
      to={`/channel/${project.name.replace(/\s+/g, "-")}`}
      onClick={() => {
        setSelcetedProject(project);
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="text-lg font-semibold" style={{ color: "#1A0F0B" }}>
          {project.name}
        </h3>
        <span className="flex items-center gap-1.5 text-sm font-medium whitespace-nowrap">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: statusStyle.dot }}
          />
          <span style={{ color: statusStyle.text }}>{status}</span>
        </span>
      </div>

      <p className="text-sm mb-6" style={{ color: "#6B6355" }}>
        {project.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {project.members.map((member) => (
            <span
              key={member._id}
              className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold border-2"
              style={{
                background: "#879435",
                color: "#FFFFFF",
                borderColor: "#FFFFFF",
              }}
            >
              {member.fullName?.[0]?.toUpperCase()}
            </span>
          ))}
        </div>
        <span
          className="text-xs"
          style={{ color: "#A39C8C", fontFamily: "monospace" }}
        >
          {teamCount} on project
        </span>
      </div>
    </Link>
  );
};

export default ProjectCard;

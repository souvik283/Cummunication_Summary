import React from 'react'
import { useProjectStore } from '../../store/useProjectStore';

const ProjectHeader = () => {
      const projectName = location.pathname.split("/").pop();
    const {selectedProject} = useProjectStore()
  return (
     <div className="px-5 pt-5 pb-3">
        <p
          className="text-xs font-semibold tracking-wide mb-1"
          style={{ color: "#A39C8C" }}
        >
          PROJECT
        </p>

        <h2
          className="text-base font-semibold"
          style={{
            fontFamily: "'Fraunces', serif",
            color: "#1A0F0B",
          }}
        >
          {selectedProject?.name || projectName}
        </h2>
      </div>
  )
}

export default ProjectHeader

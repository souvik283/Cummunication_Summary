import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import ChatBox from '../components/ChatBox.jsx'
import { useProjects } from '../context/ProjectContext.jsx'

export default function Chat() {
  const { projectId } = useParams()
  const { projects } = useProjects()
  const project = projects.find((p) => p.id === projectId)

  if (!project) return <Navigate to="/" replace />

  return (
    <div className="flex flex-1 flex-col">
      <Navbar
        title={project.name}
        subtitle="Status is read automatically from this conversation"
        actions={
          <Link
            to={`/projects/${projectId}`}
            className="flex items-center gap-1 text-sm font-medium text-ink-500 hover:text-ink-900"
          >
            <ChevronLeft size={15} />
            Overview
          </Link>
        }
      />
      <div className="flex-1 overflow-hidden">
        <ChatBox projectId={projectId} />
      </div>
    </div>
  )
}

import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react'
import * as api from '../services/api.js'

const ProjectContext = createContext(null)

export function useAuth () {
  return null
}

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [messagesByProject, setMessagesByProject] = useState({})
  const [tasksByProject, setTasksByProject] = useState({})
  const [summaryByProject, setSummaryByProject] = useState({})
  const [summarizing, setSummarizing] = useState({})

  useEffect(() => {
    api.fetchProjects().then((data) => {
      setProjects(data)
      setLoading(false)
    })
  }, [])

  const createProject = useCallback(async (payload) => {
    const project = await api.createProject(payload)
    setProjects((prev) => [project, ...prev])
    return project
  }, [])

  const addEmployee = useCallback(async (projectId, userId) => {
    const updated = await api.addEmployeeToProject(projectId, userId)
    setProjects((prev) => prev.map((p) => (p.id === projectId ? updated : p)))
  }, [])

  const loadMessages = useCallback(async (projectId) => {
    const data = await api.fetchMessages(projectId)
    setMessagesByProject((prev) => ({ ...prev, [projectId]: data }))
    return data
  }, [])

  const sendMessage = useCallback(async (projectId, message) => {
    const saved = await api.sendMessage(projectId, message)
    setMessagesByProject((prev) => ({
      ...prev,
      [projectId]: [...(prev[projectId] || []), saved],
    }))
    return saved
  }, [])

  const loadTasks = useCallback(async (projectId) => {
    const data = await api.fetchTasks(projectId)
    setTasksByProject((prev) => ({ ...prev, [projectId]: data }))
    return data
  }, [])

  const updateTaskStatus = useCallback(async (projectId, taskId, status) => {
    const updated = await api.updateTaskStatus(projectId, taskId, status)
    setTasksByProject((prev) => ({
      ...prev,
      [projectId]: (prev[projectId] || []).map((t) => (t.id === taskId ? updated : t)),
    }))
  }, [])

  const generateSummary = useCallback(async (projectId) => {
    setSummarizing((prev) => ({ ...prev, [projectId]: true }))
    const summary = await api.summarizeProject(projectId)
    setSummaryByProject((prev) => ({ ...prev, [projectId]: summary }))
    setSummarizing((prev) => ({ ...prev, [projectId]: false }))
    return summary
  }, [])

  const value = useMemo(
    () => ({
      projects,
      loading,
      messagesByProject,
      tasksByProject,
      summaryByProject,
      summarizing,
      createProject,
      addEmployee,
      loadMessages,
      sendMessage,
      loadTasks,
      updateTaskStatus,
      generateSummary,
    }),
    [projects, loading, messagesByProject, tasksByProject, summaryByProject, summarizing, createProject, addEmployee, loadMessages, sendMessage, loadTasks, updateTaskStatus, generateSummary],
  )

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
}

export function useProjects() {
  const ctx = useContext(ProjectContext)
  if (!ctx) throw new Error('useProjects must be used within ProjectProvider')
  return ctx
}

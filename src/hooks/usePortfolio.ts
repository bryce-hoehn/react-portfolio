import { useState, useEffect } from 'react'
import type { Project } from '../types'

export function usePortfolio() {
  const [portfolioProjects, setPortfolioProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/projects.json')
        const projects = await response.json()
        setPortfolioProjects(projects)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { portfolioProjects, isLoading }
}

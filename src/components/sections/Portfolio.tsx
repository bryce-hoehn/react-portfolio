import { Button } from '../ui/button'
import type { Project } from '../../types'

interface PortfolioProps {
  isLoading: boolean
  portfolioProjects: Project[]
}

export function Portfolio({ isLoading, portfolioProjects }: PortfolioProps) {
  return (
    <section id="portfolio" className="py-20 bg-gray-50 w-full">
      <div className="w-full px-4">
        {/* Portfolio Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center uppercase text-gray-800 mb-4">Portfolio</h2>
        {/* Icon Divider */}
        <div className="flex items-center justify-center mb-12">
          <div className="w-16 h-1 bg-gray-800"></div>
          <div className="mx-4 text-2xl text-blue-600"><i className="fas fa-star"></i></div>
          <div className="w-16 h-1 bg-gray-800"></div>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto" id="projects-container">
            {isLoading ? (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">Loading projects...</p>
              </div>
            ) : portfolioProjects.length > 0 ? (
              portfolioProjects.map((project, index) => (
                <div key={index} className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  {project.image && (
                    <img 
                      src={project.image} 
                      alt={project.alt || project.title}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{project.title}</h3>
                    <p className="flex-1 min-h-20 text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                    <div className="mb-4 min-h-15">
                      <p className="text-sm text-gray-700 font-medium">Technologies:</p>
                      <p className="text-sm text-gray-600">{project.technologies}</p>
                    </div>
                    <div className="mt-auto pt-4 flex gap-2">
                      {project.source && (
                        <Button asChild size="sm">
                          <a 
                            href={project.source}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Source Code
                          </a>
                        </Button>
                      )}
                      {project.live && (
                        <Button asChild size="sm" variant="secondary">
                          <a 
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No projects found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

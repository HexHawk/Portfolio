import React from 'react';
import type { Project } from '../data/projects';

interface ProjectItemProps {
  project: Project;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  return (
    <div className="group relative flex items-baseline gap-x-6 p-4 rounded-lg hover:bg-cyber-dark-800/50 transition-all duration-200">
      <div className="flex-none w-28">
        <span className="text-sm font-mono bg-cyber-dark-900 text-cyber-green px-3 py-1 rounded-full border border-cyber-green/20">
          {project.year}
        </span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <a 
            href={project.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-base font-medium text-cyber-yellow hover:text-cyber-red transition-colors"
          >
            {project.title}
          </a>
          <div className="h-px flex-1 bg-gradient-to-r from-gray-500/50 to-transparent"></div>
        </div>
        <p className="mt-2 text-sm text-gray-300 leading-relaxed">{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectItem;

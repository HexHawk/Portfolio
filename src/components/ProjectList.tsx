import React from 'react';
import { projects } from '../data/projects';
import ProjectItem from './ProjectItem';

interface ProjectListProps {
  type: 'active' | 'legacy';
  title: string;
}

const ProjectList: React.FC<ProjectListProps> = ({ type, title }) => {
  const filteredProjects = projects.filter(project => project.type === type);

  return (
    <div className="mb-10">
      <h2 className="text-cyber-red text-xl font-heading mb-6 flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-cyber-yellow rounded-full animate-pulse-subtle"></span>
        #{title}
      </h2>
      
      <div className="mb-6">
        {type === 'active' ? (
          <p className="text-gray-300 mb-6">Projects and tools that I am currently maintaining and improving.</p>
        ) : (
          <p className="text-gray-300 mb-6">Past projects, tools, and experiments I've built along the way.</p>
        )}
        
        <div className="space-y-2 relative">
          <div className="absolute left-[6.5rem] top-0 bottom-0 w-px bg-gradient-to-b from-gray-500/50 via-gray-600/30 to-transparent"></div>
          {filteredProjects.map(project => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectList;

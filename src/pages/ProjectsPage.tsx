
import React from 'react';
import ProjectList from '../components/ProjectList';

const ProjectsPage = () => {
  return (
    <div>
      <h1 className="text-3xl text-cyber-yellow font-heading mb-8">Projects</h1>
      
      <div className="max-w-3xl">
        <ProjectList type="active" title="Recent Work" />
  
        <ProjectList type="legacy" title="Legacy projects" />
      
      </div>
    </div>
  );
};

export default ProjectsPage;

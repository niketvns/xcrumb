import React from "react";

const ProjectDetailsPage = async ({ params }) => {
  const { projectId } = await params;

  return <div>Project Details: {projectId}</div>;
};

export default ProjectDetailsPage;

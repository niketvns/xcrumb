import { getProject } from "@/actions/projects";
import { notFound } from "next/navigation";
import React from "react";
import SprintCreationForm from "../_components/createSprint";

const ProjectDetailsPage = async ({ params }) => {
  const { projectId } = await params;
  const project = await getProject(projectId);

  if (!project) return notFound();

  console.log(project);

  return (
    <div className="container mx-auto">
      {/* sprint creation */}
      <SprintCreationForm
        projectTitle={project.name}
        projectKey={project.key}
        projectId={project.id}
        sprintKey={(project?.sprints?.length ?? 0) + 1}
      />

      {/* sprint board */}
      {project?.sprints?.length > 0 ? (
        <></>
      ) : (
        <div>Create Your First Sprint</div>
      )}
    </div>
  );
};

export default ProjectDetailsPage;

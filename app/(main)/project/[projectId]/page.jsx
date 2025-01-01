import { getProject } from "@/actions/projects";
import { notFound } from "next/navigation";
import React from "react";
import SprintCreationForm from "../_components/createSprint";
import SprintBoard from "../_components/sprintBoard";

const ProjectDetailsPage = async ({ params }) => {
  const { projectId } = await params;
  const project = await getProject(projectId);

  if (!project) return notFound();

  return (
    <div className="container mx-auto">
      <SprintCreationForm
        projectTitle={project.name}
        projectKey={project.key}
        projectId={project.id}
        sprintKey={(project?.sprints?.length ?? 0) + 1}
      />

      {project?.sprints?.length > 0 ? (
        <SprintBoard
          sprints={project.sprints}
          projectId={projectId}
          orgId={project.organizationId}
        />
      ) : (
        <div>Create Your First Sprint</div>
      )}
    </div>
  );
};

export default ProjectDetailsPage;

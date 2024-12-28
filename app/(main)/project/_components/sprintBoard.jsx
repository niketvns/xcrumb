"use client";
import React, { useState } from "react";
import SprintManager from "./sprintManager";

const SprintBoard = ({ sprints, projectId, orgId }) => {
  const [currentSprint, setCurrentSprint] = useState(
    sprints?.find((sprint) => sprint.status === "ACTIVE") || sprints?.[0]
  );

  return (
    <div>
      {/* Sprint Manager */}
      <SprintManager
        sprint={currentSprint}
        setSprint={setCurrentSprint}
        sprints={sprints}
        projectId={projectId}
      />

      {/* Kanban Board */}
    </div>
  );
};

export default SprintBoard;

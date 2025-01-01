"use client";
import React, { useState } from "react";
import SprintManager from "./sprintManager";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import statuses from "@/data/status.json";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import IssueCreationDrawer from "./createIssue";

const SprintBoard = ({ sprints, projectId, orgId }) => {
  const [currentSprint, setCurrentSprint] = useState(
    sprints?.find((sprint) => sprint.status === "ACTIVE") || sprints?.[0]
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleAddIssue = (status) => {
    setIsDrawerOpen(true);
    setSelectedStatus(status);
  };

  const handleIssueCreated = async () => {};

  const handleDragEnd = () => {};

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
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="w-full overflow-x-auto flex gap-4 mt-4 bg-slate-900 p-4 rounded-lg">
          {statuses?.map((column) => {
            return (
              <Droppable
                key={column.key}
                droppableId={column.key}
                className="bg-green-50"
              >
                {(provided) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2 min-w-[300px]"
                    >
                      <h3 className="font-semibold mb-2 text-center">
                        {column.name}
                      </h3>

                      {/* Issues */}

                      {provided.placeholder}
                      {column.key === "TODO" &&
                        currentSprint.status !== "COMPLETED" && (
                          <Button
                            variant="ghost"
                            className="w-full"
                            onClick={() => handleAddIssue(column.key)}
                          >
                            <Plus className="mr-1 h-4 w-4" />
                            Creata Issue
                          </Button>
                        )}
                    </div>
                  );
                }}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>

      <IssueCreationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sprintId={sprints.id}
        status={selectedStatus}
        projectId={projectId}
        onIssueCreated={handleIssueCreated}
        orgId={orgId}
      />
    </div>
  );
};

export default SprintBoard;

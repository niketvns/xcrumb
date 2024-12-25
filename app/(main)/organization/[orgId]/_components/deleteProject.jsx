"use client";
import { deleteProject } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { useOrganization } from "@clerk/nextjs";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const DeleteProject = ({ projectId }) => {
  const { membership } = useOrganization();
  const router = useRouter();
  const {
    data: deleted,
    error,
    loading: isDeleting,
    fn: deleteProjectFn,
  } = useFetch(deleteProject);

  const handleDeleteProject = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteProjectFn(projectId);
    }
  };

  useEffect(() => {
    if (deleted?.success) {
      toast.error("Project deleted successfully");
      router.refresh();
    }
  }, [deleted]);

  const isAdmin = membership?.role === "org:admin";

  if (!isAdmin) return null;

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className={isDeleting ? "animate-pulse" : ""}
        disabled={isDeleting}
        onClick={handleDeleteProject}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </>
  );
};

export default DeleteProject;

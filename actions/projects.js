"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const createProject = async (data) => {
  const { userId, orgId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  if (!orgId) throw new Error("No Organization Selected");

  const { data: membership } = await (
    await clerkClient()
  ).organizations.getOrganizationMembershipList({
    organizationId: orgId,
  });

  const userMembership = membership?.find(
    (member) => member.publicUserData.userId === userId
  );

  //   If user is not a member or not admin
  if (!userMembership || userMembership.role !== "org:admin") {
    throw new Error("Only organization admins can create projects");
  }

  try {
    const project = await db.project.create({
      data: {
        name: data.name,
        key: data.key,
        description: data.description,
        organizationId: orgId,
      },
    });
    return project;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating project: " + error.message);
  }
};

export const getProjects = async (orgId) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const projects = db.project.findMany({
      where: { organizationId: orgId },
      orderBy: { createdAt: "desc" },
    });

    return projects;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProject = async (projectId) => {
  const { userId, orgId, orgRole } = await auth();

  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  if (orgRole !== "org:admin") {
    throw new Error("Only organization admins can delete Projects");
  }

  try {
    const project = await db.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project || project.organizationId !== orgId) {
      throw new Error(
        "Project not found or you don't have permission to delete it"
      );
    }

    await db.project.delete({
      where: {
        id: projectId,
      },
    });

    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProject = async (projectId) => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const project = await db.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        sprints: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!project) {
      return null;
    }

    if (project.organizationId !== orgId) {
      return null;
    }

    return project;
  } catch (error) {
    throw new Error(error.message);
  }
};

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
  } catch (error) {
    console.error(error);
    throw new Error("Error creating project: " + error.message);
  }
};

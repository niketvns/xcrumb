"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const createIssue = async (projectId, data) => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  try {
    const user = await db.user.findUnique({
      where: {
        userClerkId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const lastIssue = await db.issue.findFirst({
      where: {
        projectId,
        status: data.status,
      },
      orderBy: {
        order: "desc",
      },
    });

    const newOrder = lastIssue ? lastIssue.order + 1 : 0;

    const issue = await db.issue.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        projectId,
        sprintId: data.sprintId,
        reporterId: user.id,
        assigneeId: data.assigneeId || null,
        order: newOrder,
      },
      include: {
        assignee: true,
        reporter: true,
      },
    });

    return issue;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

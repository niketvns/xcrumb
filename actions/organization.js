"use server";

const { db } = require("@/lib/prisma");
const { auth, clerkClient } = require("@clerk/nextjs/server");

export const getOrganization = async (slug) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    throw new Error("User Not Found");
  }

  const organization = await (
    await clerkClient()
  ).organizations.getOrganization({
    slug,
  });

  if (!organization.id) {
    return null;
  }

  const { data: membership } = await (
    await clerkClient()
  ).organizations.getOrganizationMembershipList({
    organizationId: organization.id,
  });

  const userMembership = membership.find((member) => {
    return (member.publicUserData.userId = userId);
  });

  //   if user is not a member, return null
  if (!userMembership) {
    return null;
  }

  return organization;
};

export const getOrganizationUsers = async (orgId) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      userClerkId: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const { data: orgMembers } = await (
    await clerkClient()
  ).organizations.getOrganizationMembershipList({
    organizationId: orgId,
  });

  const userIds = orgMembers?.map((member) => member.publicUserData?.userId);

  const users = await db.user.findMany({
    where: {
      clerkUserId: userIds,
    },
  });

  return users;
};

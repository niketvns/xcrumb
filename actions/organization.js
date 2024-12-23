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

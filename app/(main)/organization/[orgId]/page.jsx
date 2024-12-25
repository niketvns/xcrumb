import { getOrganization } from "@/actions/organization";
import OrgSwitcher from "@/components/orgSwitcher";
import React from "react";
import ProjectList from "./_components/projectList";

const OrganizationPagae = async ({ params }) => {
  const { orgId } = await params;
  const organization = await getOrganization(orgId);

  if (!organization) return <div>Organization Not Found</div>;

  return (
    <div className="container mx-auto px-2">
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start">
        <h1 className="text-5xl font-bold gradient-title pb-2">
          {organization.name}&apos;s Projects
        </h1>
        <OrgSwitcher />
      </div>
      <div className="mb-5">
        <ProjectList orgId={organization.id} />
      </div>
      <div className="mt-8">Show User Assigned and Reported Issues Here</div>
    </div>
  );
};

export default OrganizationPagae;

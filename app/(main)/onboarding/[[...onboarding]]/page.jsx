"use client";
import { URL_PATHS } from "@/lib/helperVariables";
import { OrganizationList, useOrganization } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const OnboardingPage = () => {
  const { organization } = useOrganization();
  const router = useRouter();

  useEffect(() => {
    if (organization) {
      router.push(`/${URL_PATHS.ORGANIZATION}/${organization.slug}`);
    }
  }, [organization]);

  return (
    <div className="flex justify-center items-center pt-14">
      <OrganizationList
        hidePersonal
        afterCreateOrganizationUrl={`/${URL_PATHS.ORGANIZATION}/:slug`}
        afterSelectOrganizationUrl={`/${URL_PATHS.ORGANIZATION}/:slug`}
      />
    </div>
  );
};

export default OnboardingPage;

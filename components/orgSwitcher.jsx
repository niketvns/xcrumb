"use client";

import { URL_PATHS } from "@/lib/helperVariables";
import {
  OrganizationSwitcher,
  SignedIn,
  useOrganization,
  useUser,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React from "react";

const OrgSwitcher = () => {
  const { isLoaded } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();
  const pathname = usePathname();

  if (!isLoaded && !isUserLoaded) return null;

  return (
    <div>
      <SignedIn>
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl={`/${URL_PATHS.ORGANIZATION}/:slug`}
          afterSelectOrganizationUrl={`/${URL_PATHS.ORGANIZATION}/:slug`}
          appearance={{
            elements: {
              organizationSwitcherTrigger:
                "border border-gray-300 rounded-md px-5 py-2",
              organizationSwitcherTriggerIcon: "text-white",
            },
          }}
          createOrganizationMode={
            pathname === `/${URL_PATHS.ORGANIZATION}` ? "navigation" : "modal"
          }
          createOrganizationUrl={`/${URL_PATHS.ORGANIZATION}`}
        />
      </SignedIn>
    </div>
  );
};

export default OrgSwitcher;

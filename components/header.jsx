import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { PenBox } from "lucide-react";
import { URL_PATHS } from "@/lib/helperVariables";
import UserMenu from "./userMenu";
import { checkUser } from "@/lib/helperFunctions";
import UserLoading from "./userLoading";

const Header = async () => {
  await checkUser();

  return (
    <header className="container mx-auto">
      <nav className="flex justify-between gap-4 p-4">
        <Link href={"/"}>
          <Image
            src={"/assets/xcrumb_logo.png"}
            alt="xcrumb logo"
            width={400}
            height={200}
            className="w-56 object-contain"
          />
        </Link>
        <div className="flex justify-center gap-4 items-center">
          <Link href="/project/create">
            <Button
              variant="destructive"
              className="flex justify-center items-center gap-2"
            >
              <PenBox size={18} />
              <span>Create Project</span>
            </Button>
          </Link>

          <SignedOut>
            <SignInButton forceRedirectUrl={`/${URL_PATHS.ONBOARDING}`}>
              <Button variant="secondary">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserMenu />
          </SignedIn>
        </div>
      </nav>
      <UserLoading />
    </header>
  );
};

export default Header;

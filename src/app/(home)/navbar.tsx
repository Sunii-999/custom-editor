import Link from "next/link";
import Image from "next/image";

import { SearchInput } from "./search-input";
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full h-14 px-4 text-white">
      <div className="flex items-center gap-2 shrink-0">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80">
          <Image src="/logo.svg" alt="Logo" width={50} height={50} className="invert"/>
          <p>BluDocs</p>
        </Link>
      </div>
      <div className="flex-1 max-w-lg mx-4">
        <SearchInput />
      </div>
      <div className="flex items-center gap-3">
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
        />
        <UserButton />
      </div>
    </nav>
  );
};

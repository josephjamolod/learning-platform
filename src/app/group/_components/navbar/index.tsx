import GlassSheet from "@/components/global/glass-sheet";

import SideBar from "@/components/global/sidebar";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

import { currentUser } from "@clerk/nextjs/server";
import { Menu } from "lucide-react";
import Link from "next/link";
import Search from "@/components/global/search";
import { UserWidget } from "@/components/global/user-widget";

type NavbarProps = {
  groupid: string;
  userid: string;
};

export const Navbar = async ({ groupid, userid }: NavbarProps) => {
  const user = await currentUser();
  return (
    <div className="bg-[#1A1A1D] py-2 px-3 md:px-7 md:py-5 flex gap-5 justify-between md:justify-end items-center">
      <GlassSheet trigger={<Menu className="md:hidden cursor-pointer" />}>
        <SideBar groupid={groupid} userid={userid} mobile />
      </GlassSheet>
      <Search
        searchType="GROUPS"
        className="rounded-full border-themeGray bg-muted-foreground !opacity-100 px-3"
        placeholder="Search..."
      />
      <Link href={`/group/create`} className="hidden md:inline">
        <Button variant="secondary" className=" rounded-2xl  flex gap-2 ">
          <CheckCircle />
          Create Group
        </Button>
      </Link>
      <UserWidget
        userid={userid}
        image={user?.imageUrl || ""}
        groupid={groupid}
      />
    </div>
  );
};

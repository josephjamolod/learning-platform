import Link from "next/link";
import Menu from "./menu";
import { Button } from "@/components/ui/button";
import { LogOut, MenuIcon } from "lucide-react";
import GlassSheet from "@/components/global/glass-sheet";

const LandingPageNavBar = () => {
  return (
    <div className="w-full flex justify-between sticky top-0 items-center py-5 z-50 ">
      <p className="font-bold text-2xl">Logo</p>
      <Menu orientation="desktop" />
      <div className="flex gap-2">
        <Link href={"/sign-in"}>
          <Button className="bg-theme" variant={"outline"}>
            <LogOut />
            Login
          </Button>
        </Link>
        <GlassSheet
          trigger={
            <Button variant={"ghost"} className="hover:bg-transparent">
              <MenuIcon size={30} />
            </Button>
          }
          triggerClass="lg:hidden"
        >
          <Menu orientation="mobile" />
        </GlassSheet>
      </div>
    </div>
  );
};
export default LandingPageNavBar;

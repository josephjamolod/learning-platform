"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LOGO_CONSTANTS } from "@/constants";
import { useNavigation } from "@/hooks/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

type MenuProps = {
  orientation: "mobile" | "desktop";
};

const Menu = ({ orientation }: MenuProps) => {
  const { section, onSetSection } = useNavigation();
  switch (orientation) {
    case "desktop":
      return (
        <Card className="bg-themeGray border-themeGray bg-clip-padding backdop--blur__safari backdrop-filter backdrop-blur-2xl bg-opacity-60 p-1 lg:flex hidden rounded-xl">
          <CardContent className="p-0 flex gap-2">
            {LOGO_CONSTANTS.landingPageMenu.map((menuItem) => {
              return (
                <Link
                  href={menuItem.path}
                  {...(menuItem.section && {
                    onClick: () => onSetSection(menuItem.path),
                  })}
                  key={menuItem.id}
                  className={cn(
                    "rounded-xl flex gap-2 py-2 px-4 items-center",
                    section == menuItem.path
                      ? "bg-primary text-secondary border-primary"
                      : ""
                  )}
                >
                  {section == menuItem.path && menuItem.icon}
                  {menuItem.label}
                </Link>
              );
            })}
          </CardContent>
        </Card>
      );
    case "mobile":
      return (
        <div className="flex flex-col my-10">
          {LOGO_CONSTANTS.landingPageMenu.map((menuItem) => {
            return (
              <Link
                href={menuItem.path}
                {...(menuItem.section && {
                  onClick: () => onSetSection(menuItem.path),
                })}
                key={menuItem.id}
                className={cn(
                  "rounded-xl flex gap-2 py-2 px-4 items-center",
                  section == menuItem.path
                    ? "bg-primary text-secondary border-primary"
                    : ""
                )}
              >
                {menuItem.icon}
                {menuItem.label}
              </Link>
            );
          })}
        </div>
      );
    default:
      return <></>;
  }
};
export default Menu;

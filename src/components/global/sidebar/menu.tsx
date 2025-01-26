"use client";

import { usePathname } from "next/navigation";
import { IChannels } from ".";
import { useChannelInfo } from "@/hooks/channels";
import { SIDEBAR_SETTINGS_MENU } from "@/constants/menus";
import Link from "next/link";
import { cn } from "@/lib/utils";

type SideBarMenuProps = {
  channels: IChannels[];
  optimisticChannel: IChannels | undefined;
  loading: boolean;
  groupid: string;
  groupUserId: string;
  userId: string;
};
const SideBarMenu = ({
  channels,
  groupUserId,
  groupid,
  loading,
  optimisticChannel,
  userId,
}: SideBarMenuProps) => {
  const pathname = usePathname();
  console.log({
    channels,
    groupUserId,
    groupid,
    loading,
    optimisticChannel,
    userId,
  });
  const currentPage = pathname.split("/").pop();

  const {
    // channel: current,
    // onEditChannel,
    // channelRef,
    // inputRef,
    // variables,
    // isPending,
    // edit,
    // triggerRef,
    // onSetIcon,
    // icon,
    // onChannelDelete,
    // deleteVariables,
  } = useChannelInfo();
  if (pathname.includes("settings")) {
    return (
      <div className="flex flex-col">
        {SIDEBAR_SETTINGS_MENU.map((item) =>
          item.integration ? (
            userId === groupUserId && (
              <Link
                className={cn(
                  "flex gap-x-2 items-center font-semibold rounded-xl text-themeTextGray hover:bg-themeGray p-2",
                  currentPage === "settings"
                    ? !item.path && "text-white"
                    : currentPage === item.path && "text-white"
                )}
                href={`/group/${groupid}/settings/${item.path}`}
                key={item.id}
              >
                {item.icon}
                {item.label}
              </Link>
            )
          ) : (
            <Link
              className={cn(
                "flex gap-x-2 items-center font-semibold rounded-xl text-themeTextGray hover:bg-themeGray p-2",
                currentPage === "settings"
                  ? !item.path && "text-white"
                  : currentPage === item.path && "text-white"
              )}
              href={`/group/${groupid}/settings/${item.path}`}
              key={item.id}
            >
              {item.icon}
              {item.label}
            </Link>
          )
        )}
      </div>
    );
  }
};
export default SideBarMenu;

"use client";

import { usePathname } from "next/navigation";
import { IChannels } from ".";
import { useChannelInfo } from "@/hooks/channels";
import { SIDEBAR_SETTINGS_MENU } from "@/constants/menus";
import Link from "next/link";
import { cn } from "@/lib/utils";
import IconDropDown from "./icon-dropdown";
import { IconRenderer } from "../icon-renderer";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";

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
    loading,
    optimisticChannel,
  });
  const currentPage = pathname.split("/").pop();

  const {
    channel: channelId,
    onEditChannel,
    channelRef,
    inputRef,
    variables,
    isPending,
    edit,
    triggerRef,
    onSetIcon,
    icon,
    onChannelDelete,
    deleteVariables,
  } = useChannelInfo();
  // console.log("channels here");
  // console.log(channels);
  console.log(icon);

  // console.log(pathname);
  console.log(deleteVariables?.id);
  console.log(variables);

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

  return (
    <div className="flex flex-col">
      {channels && channels.length > 0 ? (
        <>
          {channels.map(
            (channel) =>
              channel.id !== deleteVariables?.id && (
                <Link
                  id="channel-link"
                  key={channel.id}
                  className={cn(
                    "flex justify-between hover:bg-themeGray p-2 group rounded-lg items-center",
                    channel.id === channelId && edit && "bg-themeGray"
                  )}
                  href={`/group/${channel.groupId}/channel/${channel.id}`}
                  {...(channel.name !== "general" &&
                    channel.name !== "announcements" && {
                      onDoubleClick: () => onEditChannel(channel.id),
                      ref: channelRef,
                    })}
                >
                  <div className="flex gap-x-2 items-center">
                    {/* for icon edit or render */}
                    {channel.id === channelId && edit ? (
                      <IconDropDown
                        ref={triggerRef}
                        page={currentPage}
                        onSetIcon={onSetIcon}
                        channelid={channel.id}
                        icon={channel.icon}
                        currentIcon={icon}
                      />
                    ) : (
                      <IconRenderer
                        icon={channel.icon}
                        mode={currentPage === channel.id ? "LIGHT" : "DARK"}
                      />
                    )}
                    {/* for channel name edit or render */}
                    {channel.id === channelId && edit ? (
                      <Input
                        type="text"
                        ref={inputRef}
                        className="bg-transparent p-0 text-lg m-0 h-full"
                      />
                    ) : (
                      <p
                        className={cn(
                          "text-lg capitalize",
                          currentPage === channel.id
                            ? "text-white"
                            : "text-themeTextGray"
                        )}
                      >
                        {isPending && variables && channelId === channel.id
                          ? variables.name
                          : channel.name}
                      </p>
                    )}
                  </div>
                  {channel.name !== "general" &&
                    channel.name !== "announcements" &&
                    userId === groupUserId && (
                      <Trash
                        onClick={() => onChannelDelete(channel.id)}
                        className="group-hover:inline hidden content-end text-themeTextGray hover:text-gray-400"
                        size={16}
                      />
                    )}
                </Link>
              )
          )}
          {/* {loading && (
            <Link
              href={`/group/${optimisticChannel?.groupId}/channel/${optimisticChannel?.id}`}
              className="flex justify-between hover:bg-themeGray p-2 group rounded-lg items-center"
            >
              <div className="flex gap-x-2 items-center">
                <IconRenderer
                  icon={optimisticChannel?.icon || ""}
                  mode={
                    currentPage === optimisticChannel?.id ? "LIGHT" : "DARK"
                  }
                />
                <p
                  className={cn(
                    "text-lg capitalize",
                    currentPage === optimisticChannel?.id
                      ? "text-white"
                      : "text-themeTextGray"
                  )}
                >
                  {optimisticChannel?.name}
                </p>
              </div>
            </Link>
          )} */}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default SideBarMenu;

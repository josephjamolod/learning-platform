"use client";

import { Button } from "@/components/ui/button";
import { useGroupChatOnline } from "@/hooks/groups";
import { useSideBar } from "@/hooks/navigation";
import { cn } from "@/lib/utils";
import { Group, ChevronsUpDown, Plus } from "lucide-react";
import Link from "next/link";
import { v4 } from "uuid";
import Dropdown from "../drop-down";
import SideBarMenu from "./menu";

type SidebarProps = {
  groupid: string;
  userid: string;
  mobile?: boolean;
};

export interface IGroupInfo {
  status: number;
  group:
    | {
        id: string;
        name: string;
        category: string;
        thumbnail: string | null;
        description: string | null;
        gallery: string[];
        jsonDescription: string | null;
        htmlDescription: string | null;
        privacy: boolean;
        active: boolean;
        createdAt: Date;
        userId: string;
        icon: string;
      }
    | undefined;
  groupOwner: boolean;
}

export interface IChannels {
  id: string;
  name: string;
  icon: string;
  createdAt: Date;
  groupId: string | null;
}

interface IGroup {
  icon: string | null;
  id: string;
  name: string;
}

export interface IGroups {
  status: number;
  groups: IGroup[] | undefined;
}

const Sidebar = ({ groupid, userid, mobile }: SidebarProps) => {
  const { channels, groupInfo, groups, isPending, createChannel, variables } =
    useSideBar(groupid);
  // console.log(groups.groups);
  console.log("here");
  console.log(groupInfo);

  useGroupChatOnline(userid);
  const hasGroups: boolean =
    groups.groups && groups.groups.length > 0 ? true : false;
  const hasChannel =
    channels && channels.channels && channels.channels?.length > 0;
  // console.log(hasGroups);
  // console.log(hasChannel);
  // console.log(groups.groups);

  // console.log(hasGroups);
  // if (channels?.channels) {
  //   console.log(channels.channels[0].id);
  // }

  return (
    <div
      className={cn(
        "h-screen flex-col gap-y-10 sm:px-5",
        !mobile
          ? "hidden text-secondary bg-black md:w-[300px] fixed md:flex"
          : "w-full flex"
      )}
    >
      {hasGroups && (
        <Dropdown
          title="Groups"
          trigger={
            <div className="w-full flex items-center justify-between text-themeTextGray md:border-[1px] border-themeGray p-3 rounded-xl">
              <div className="flex gap-x-3 items-center">
                <img
                  src={`https://ucarecdn.com/${
                    groupInfo.group?.icon as string
                  }/`}
                  alt="icon"
                  className="w-10 rounded-lg"
                />
                <p className="text-sm">{groupInfo.group?.name}</p>
              </div>
              <span className="">
                <ChevronsUpDown />
              </span>
            </div>
          }
        >
          {hasGroups &&
            hasChannel &&
            groups.groups?.map((item: IGroup) => (
              <Link
                key={item.id}
                className="text-secondary"
                href={`/group/${item.id}/channel/${channels.channels[0].id!}`}
              >
                <Button
                  variant="default"
                  className="flex  gap-2 w-full text-secondary justify-start  items-center"
                >
                  <Group />
                  {item.name}
                </Button>
              </Link>
            ))}
        </Dropdown>
      )}

      <div className="flex flex-col  gap-y-5">
        <div className="flex justify-between items-center text-secondary">
          <p className="text-xs ">CHANNELS</p>

          {groupInfo.groupOwner && (
            <Plus
              size={16}
              className={cn("  cursor-pointer", isPending && "opacity-70")}
              {...(!isPending && {
                onClick: () =>
                  createChannel({
                    id: v4(),
                    icon: "general",
                    name: "unnamed",
                    createdAt: new Date(),
                    groupId: groupid,
                  }),
              })}
            />
          )}
        </div>
        <SideBarMenu
          channels={channels?.channels || []}
          optimisticChannel={variables}
          loading={isPending}
          groupid={groupid}
          groupUserId={groupInfo.group?.userId as string}
          userId={userid}
        />
      </div>
    </div>
  );
};
export default Sidebar;

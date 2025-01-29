import { MessageCircleIcon } from "lucide-react";
import Link from "next/link";
import { Notification } from "./notification";
import { UserAvatar } from "./user";

type UserWidgetProps = {
  image: string;
  groupid?: string;
  userid?: string;
};

export const UserWidget = ({ image, groupid, userid }: UserWidgetProps) => {
  return (
    <div className="gap-5 items-center text-secondary hidden md:flex">
      <Notification />
      <Link href={`/group/${groupid}/messages`}>
        <MessageCircleIcon />
      </Link>
      <UserAvatar userid={userid} image={image} groupid={groupid} />
    </div>
  );
};

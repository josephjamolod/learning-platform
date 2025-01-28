import { onAuthenticateUser } from "@/actions/auth";
import {
  onGetAllGroupMembers,
  onGetGroupChannels,
  onGetGroupInfo,
  onGetGroupSubscriptions,
  onGetUserGroups,
} from "@/actions/groups";
import Sidebar from "@/components/global/sidebar";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import MobileNav from "../_components/mobile-nav";
import { Navbar } from "../_components/navbar";

type GroupLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ ["group-id"]: string }>;
  // groupid: string;
};
export default async function GroupLayout({
  children,
  params,
}: GroupLayoutProps) {
  const { "group-id": groupid } = await params;

  const query = new QueryClient();
  const user = await onAuthenticateUser();
  if (!user.id) redirect("/sign-in");

  //get group info
  await query.prefetchQuery({
    queryKey: ["group-info"],
    queryFn: () => onGetGroupInfo(groupid),
  });
  //get user's group
  await query.prefetchQuery({
    queryKey: ["user-groups"],
    queryFn: () => onGetUserGroups(user.id),
  });
  //user group channel
  await query.prefetchQuery({
    queryKey: ["group-channels"],
    queryFn: () => onGetGroupChannels(groupid),
  });
  //group subcriptions
  await query.prefetchQuery({
    queryKey: ["group-subscriptions"],
    queryFn: () => onGetGroupSubscriptions(groupid),
  });
  //member-chats
  await query.prefetchQuery({
    queryKey: ["member-chats"],
    queryFn: () => onGetAllGroupMembers(groupid),
  });
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className=" flex h-screen md:pt-5">
        <Sidebar groupid={groupid} userid={user.id} />
        <div className="md:ml-[300px] flex flex-col flex-1 bg-[#101011] md:rounded-tl-xl overflow-y-auto border-l-[1px] border-t-[1px] border-[#28282D]">
          <Navbar groupid={groupid} userid={user.id} />
          {children}
          <MobileNav groupid={groupid} />
        </div>
      </div>
    </HydrationBoundary>
  );
}

import { onAuthenticateUser } from "@/actions/auth";
import { onGetChannelInfo } from "@/actions/channels";
import { onGetGroupInfo } from "@/actions/groups";
import { currentUser } from "@clerk/nextjs/server";
import { QueryClient } from "@tanstack/react-query";

type GroupChannelPageProps = {
  params: Promise<{
    channelid: string;
    ["group-id"]: string;
  }>;
  // {
  //   channelid: string;
  //   groupid: string;
  // };
};

export default async function GroupChannelPage({
  params,
}: GroupChannelPageProps) {
  const { channelid, "group-id": groupid } = await params;
  // console.log(channelid);
  // console.log("red");
  // console.log(groupid);

  const query = new QueryClient();
  const user = await currentUser();
  const authenticatedUser = await onAuthenticateUser();
  console.log(user, authenticatedUser);

  await query.prefetchQuery({
    queryKey: ["channel-info"],
    queryFn: () => onGetChannelInfo(channelid),
  });

  await query.prefetchQuery({
    queryKey: ["about-group-info"],
    queryFn: () => onGetGroupInfo(groupid),
  });

  return <div>GroupChannelPage</div>;
}

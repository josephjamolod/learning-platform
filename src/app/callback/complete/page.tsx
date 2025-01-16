import { onSignUpUser } from "@/actions/auth";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function CompleteOauthAfterCallback() {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  console.log("here");
  console.log(user);
  console.log(user.firstName);

  const complete = await onSignUpUser({
    firstname: user.firstName as string,
    lastname: user.lastName as string,
    clerkId: user.id,
    image: user.imageUrl,
  });
  if (complete.status === 200) {
    redirect("/group/create");
  }
  if (complete.status !== 200) {
    redirect("/sign-in");
  }
}

import { onAuthenticateUser } from "@/actions/auth";
import BackdropGradient from "@/components/global/backdrop-gradient";
import GlassCard from "@/components/global/glass-card";
import { redirect } from "next/navigation";

type AuthLayOut = {
  children: React.ReactNode;
};
export default async function AuthLayOut({ children }: AuthLayOut) {
  //check user using "currentUser()" from "@clerk/nextjs/server" and db if there is
  // if there is redirect to "/callback/sign" page
  const user = await onAuthenticateUser();
  if (user.status === 200) redirect("/callback/sign-in");
  console.log("red");

  return (
    <div className="container h-screen flex justify-center">
      <div className="flex flex-col w-full items-center py-24">
        <h2 className="text-4xl fond-bold text-themeTextWhite">Logo</h2>
        <BackdropGradient
          className="w-4/12 h-2/4 opacity-60"
          container="flex flex-col items-center"
        >
          <GlassCard className="xs:w-full md:w-7/12 lg:w-5/12 xl:w-4/12 p-7 mt-16">
            {children}
          </GlassCard>
        </BackdropGradient>
      </div>
    </div>
  );
}

"use client";

import { OAuthStrategy } from "@clerk/types";
import { Button } from "@/components/ui/button";
import Loader from "../loader";
import { useGoogleAuth } from "@/hooks/authentication";

interface GoogleAuthButtonProps {
  method: "signin" | "signup";
}
const GoogleAuthButton = ({ method }: GoogleAuthButtonProps) => {
  const { signUpWith, signInWith } = useGoogleAuth();
  const provider: OAuthStrategy = "oauth_google";
  return (
    <Button
      {...(method === "signin"
        ? { onClick: () => signInWith(provider) }
        : { onClick: () => signUpWith(provider) })}
      className="w-full rounded-2xl flex gap-3 bg-themeBlack border-themeGray"
      variant={"outline"}
    >
      <Loader loading={false} /> Google
    </Button>
  );
};
export default GoogleAuthButton;

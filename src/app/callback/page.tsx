import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function CallBackPage() {
  return <AuthenticateWithRedirectCallback />;
}

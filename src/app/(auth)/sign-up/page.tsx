import SignUpForm from "@/components/forms/sign-up-form";
import GoogleAuthButton from "@/components/global/google-oauth";
import { Separator } from "@/components/ui/separator";

export default function SignUpPage() {
  return (
    <>
      <h5 className="font-bold text-base text-themeTextWhite">Login</h5>
      <p className="text-themeTextGray leading-tight">
        Network with people from around the world, join groups, create your own,
        watch courses and become the best version of yourself
      </p>
      <SignUpForm />
      <div className="my-10 w-full  border relative ">
        <div className="bg-black z-10 p-3 absolute text-white text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          OR CONTINUE WITH
        </div>
        <Separator
          orientation="horizontal"
          className="bg-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <GoogleAuthButton method="signin" />
    </>
  );
}

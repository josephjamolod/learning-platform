"use client";

import { FormGenerator } from "@/components/global/form-generator";
import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { LOGO_CONSTANTS } from "@/constants";
import { useAuthSignUp } from "@/hooks/authentication";
import dynamic from "next/dynamic";

const OtpInput = dynamic(
  () =>
    import("@/components/global/otp-input").then(
      (component) => component.default
    ),
  { ssr: false }
);

const SignUpForm = () => {
  const {
    errors,
    register,
    code,
    creating,
    verifying,
    getValues,
    onGenerateCode,
    onInitiateUserRegistration,
    setCode,
  } = useAuthSignUp();
  return (
    <form
      onSubmit={onInitiateUserRegistration}
      className="flex flex-col gap-3 mt-10"
    >
      {verifying ? (
        <div className="flex justify-center mb-5">
          <OtpInput otp={code} setOtp={setCode} />
        </div>
      ) : (
        LOGO_CONSTANTS.signUpForm.map((field) => (
          <FormGenerator
            {...field}
            key={field.id}
            register={register}
            errors={errors}
          />
        ))
      )}
      {verifying ? (
        <Button type="submit" className="rounded-2xl">
          <Loader loading={creating} />
          Sign Up With Email
        </Button>
      ) : (
        <Button
          type="button"
          className="rounded-2xl"
          onClick={() =>
            onGenerateCode({
              email: getValues("email"),
              password: getValues("password"),
            })
          }
        >
          <Loader loading />
          Generate Code
        </Button>
      )}
    </form>
  );
};
export default SignUpForm;

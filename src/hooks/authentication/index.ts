import { useSignIn, useSignUp } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInSchema } from "../../../schemas/sign-in-schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { signUpSchema } from "../../../schemas/sign-up-schema";
import { onSignUpUser } from "@/actions/auth";

export const useAuthSignIn = () => {
  const router = useRouter();
  const { isLoaded, setActive, signIn } = useSignIn();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });

  const onClerkAuth = async ({
    email,
    password,
  }: z.infer<typeof signInSchema>) => {
    if (!isLoaded) {
      return toast("Error", { description: "Oops! something went wrong" });
    }
    try {
      const authenticated = await signIn.create({
        identifier: email,
        password,
      });
      if (authenticated.status === "complete") {
        reset();
        await setActive({ session: authenticated.createdSessionId });
        toast("Success", { description: "Welcome back!" });
        router.push("/callback/sign-in");
      }
    } catch (error) {
      // Explicitly typing the error
      if (
        error &&
        typeof error === "object" &&
        "errors" in error &&
        Array.isArray(error.errors) &&
        error.errors[0]?.code === "form_password_incorrect"
      ) {
        toast("Error", { description: "Email/password incorrect, try again" });
      } else {
        toast("Error", { description: "An unexpected error occurred" });
      }
    }
  };

  const { mutate: InitilizeLoginFlow, isPending } = useMutation({
    mutationFn: ({ email, password }: z.infer<typeof signInSchema>) =>
      onClerkAuth({ email, password }),
  });

  const onAuthenticateUser = handleSubmit(
    async (values: z.infer<typeof signInSchema>) => {
      InitilizeLoginFlow({ email: values.email, password: values.password });
    }
  );

  return { onAuthenticateUser, isPending, register, errors };
};

export const useAuthSignUp = () => {
  const router = useRouter();
  const { isLoaded, setActive, signUp } = useSignUp();
  const [creating, setCreating] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");

  const {
    formState: { errors },
    reset,
    getValues,
    handleSubmit,
    register,
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const onGenerateCode = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    if (!isLoaded) {
      return toast("Error", { description: "Oops! something went wrong" });
    }
    try {
      if (email && password) {
        await signUp.create({
          emailAddress: getValues("email"),
          password: getValues("password"),
        });
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        setVerifying(true);
      } else {
        return toast("Error", {
          description: "No fields must be empty",
        });
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  const onInitiateUserRegistration = handleSubmit(async (values) => {
    if (!isLoaded) {
      return toast("Error", { description: "Oops! something went wrong" });
    }
    try {
      setCreating(true);
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        return toast("Error", {
          description: "Oops! something went wrong. Status incomplete",
        });
      }
      if (completeSignUp.status === "complete") {
        if (!signUp.createdUserId) return;
        const user = await onSignUpUser({
          firstname: values.firstname,
          lastname: values.lastname,
          clerkId: signUp.createdUserId,
          image: "",
        });
        reset();
        if (user?.status === 200) {
          toast("Success", { description: user.message });
          await setActive({ session: completeSignUp.createdSessionId });
          router.push("/group/create");
        }
        if (user?.status !== 200) {
          toast("Error", { description: user.message + "action failed" });
        }
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  });

  return {
    register,
    errors,
    onGenerateCode,
    onInitiateUserRegistration,
    verifying,
    creating,
    code,
    setCode,
    getValues,
  };
};

export const useGoogleAuth = () => {
  const { isLoaded: LoadedSignIn, signIn } = useSignIn();
  const { isLoaded: LoadedSignUp, signUp } = useSignUp();

  const signInWith = (strategy: OAuthStrategy) => {
    if (!LoadedSignIn) return;
    try {
      return signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/callback",
        redirectUrlComplete: "/callback/sign-in",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const signUpWith = (strategy: OAuthStrategy) => {
    if (!LoadedSignUp) return;
    try {
      return signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: "/callback",
        redirectUrlComplete: "/callback/sign-in",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { signInWith, signUpWith };
};

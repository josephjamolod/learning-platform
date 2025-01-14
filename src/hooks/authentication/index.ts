import { useSignIn } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInSchema } from "../../../schemas/sign-in-schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

export const useAuthSignIn = () => {
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
  const router = useRouter();

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

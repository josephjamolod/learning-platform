"use client";

import { usePayments } from "@/hooks/payment";
import { CreateGroupProps } from ".";
import { ErrorMessage } from "@hookform/error-message";
import { FormGenerator } from "@/components/global/form-generator";
import { CardElement } from "@stripe/react-stripe-js";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { Loader } from "@/components/global/loader";

const GroupList = dynamic(
  () =>
    import("@/components/global/group-list-slider").then(
      (component) => component.GroupListSlider
    ),
  {
    ssr: false,
  }
);

const PaymentForm = ({ userId, affiliate, stripeId }: CreateGroupProps) => {
  const {
    onCreateGroup,
    creatingIntent,
    errors,
    isCategory,
    isPending,
    register,
  } = usePayments({ userId, affiliate, stripeId });

  return (
    <Loader loading={creatingIntent}>
      <form className="pt-5" onSubmit={onCreateGroup}>
        <GroupList
          selected={isCategory}
          register={register}
          label="Select Category"
          slidesOffsetBefore={28}
        />
        <div className="px-7 mb-2">
          <ErrorMessage
            errors={errors}
            name={"category"}
            render={({ message }) => {
              return (
                <p className="text-red-400">
                  {message === "Required" ? "" : message}
                </p>
              );
            }}
          />
        </div>
        <div className="px-7">
          <FormGenerator
            errors={errors}
            register={register}
            name="name"
            inputType="input"
            placeholder="Group Name"
          />
        </div>
        <div className="px-7 my-3">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#B4B0AE",
                  "::placeholder": {
                    color: "#B4B0AE",
                  },
                },
              },
            }}
            className="bg-themeBlack border-[1px] border-themeGray outline-none rounded-lg p-3"
          />
        </div>
        <div className="px-7 flex flex-col gap-5">
          <p className="text-sm text-themeTextGray">
            Cancel anytime with 1-click. By clicking below, you accept
            our terms.
          </p>
          <Link className="text-sm text-themeTextGray" href={"/explore"}>
            Skip for now
          </Link>
          <Button
            variant="outline"
            type="submit"
            className="bg-themeBlack border-themeGray rounded-xl"
          >
            <Loader loading={isPending}>Get Started</Loader>
          </Button>
        </div>
      </form>
    </Loader>
  );
};

export default PaymentForm;

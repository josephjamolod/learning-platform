import StripeElements from "@/components/global/stripe/elements";
import PaymentForm from "./payment-form";

export type CreateGroupProps = {
  userId: string;
  affiliate: boolean;
  stripeId?: string;
};
const CreateGroup = ({ affiliate, userId, stripeId }: CreateGroupProps) => {
  return (
    <StripeElements>
      <PaymentForm affiliate={affiliate} userId={userId} stripeId={stripeId} />
    </StripeElements>
  );
};
export default CreateGroup;

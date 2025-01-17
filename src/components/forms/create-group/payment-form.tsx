import { CreateGroupProps } from ".";

const PaymentForm = ({ userId, affiliate, stripeId }: CreateGroupProps) => {
  console.log({ userId, affiliate, stripeId });

  return <div>PaymentForm</div>;
};

export default PaymentForm;

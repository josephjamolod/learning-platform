import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";

type Props = {
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
};
const OTPInput = ({ otp, setOtp }: Props) => {
  return (
    <InputOTP maxLength={6} value={otp} onChange={(otp) => setOtp(otp)}>
      <div className="flex gap-3">
        {new Array(6).fill("").map((_, index) => {
          return (
            <div key={index}>
              <InputOTPSlot index={index - 1} />
            </div>
          );
        })}
      </div>
    </InputOTP>
  );
};
export default OTPInput;

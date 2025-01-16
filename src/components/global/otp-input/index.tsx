import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type Props = {
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
};
const OTPInput = ({ otp, setOtp }: Props) => {
  return (
    <InputOTP maxLength={6} value={otp} onChange={(otp) => setOtp(otp)}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
      {/* <div className="flex gap-3">
        {new Array(6).fill("").map((_, index) => {
          return (
            <div key={index}>
              <InputOTPSlot index={index - 1} />
            </div>
          );
        })}
      </div> */}
    </InputOTP>
  );
};
export default OTPInput;

import BackdropGradient from "@/components/global/backdrop-gradient";
import GradientText from "@/components/global/gradient-text";
import { LOGO_CONSTANTS } from "@/constants";

type CreateGroupLayOutProps = { children: React.ReactNode };
export default function CreateGroupLayOut({
  children,
}: CreateGroupLayOutProps) {
  return (
    <div className="container h-screen grid grid-cols-1 lg:grid-cols-2 content-center">
      <div className="flex items-center">
        <BackdropGradient className="w-8/12 h-2/6 opacity-50">
          <h5 className="text-2xl font-bold text-themeWhite">Logo</h5>
          <GradientText element="H2" className="text-4xl font-semibold py-1">
            Create Your Group
          </GradientText>
          <p className="text-themeGray">
            Free for 14 days, then $99/month. Cancel anytime. All features.
            Unlimited everything. No hidden fees
          </p>
          <div className="flex flex-col gap-3 mt-16 pl-5">
            {LOGO_CONSTANTS.createGroupPlaceholder.map((placeholder) => {
              return (
                <div key={placeholder.id} className="flex gap-3">
                  {placeholder.icon}
                  <p className="text-themeGray">{placeholder.label}</p>
                </div>
              );
            })}
          </div>
          {children}
        </BackdropGradient>
      </div>
    </div>
  );
}

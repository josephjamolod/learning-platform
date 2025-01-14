import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
};
const GlassCard = ({ children, className }: GlassCardProps) => {
  return (
    <Card
      className={cn(
        "rounded-2xl bg-themeGray border-themeGray bg-clip-padding backdrop--blur__safari backdrop-filter backdrop-blur-4xl bg-opacity-40",
        className
      )}
    >
      {children}
    </Card>
  );
};
export default GlassCard;

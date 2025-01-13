import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type GlassSheetProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  className?: string;
  triggerClass?: string;
  title?: string; // Optional title for the sheet
};

const GlassSheet = ({
  children,
  trigger,
  className,
  triggerClass,
  title = "Dialog Title", // Default title for accessibility
}: GlassSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild className={cn(triggerClass)}>
        {trigger}
      </SheetTrigger>
      <SheetContent
        className={cn(
          "bg-clip-padding backdrop-filter backdrop-blur__safari backdrop-blur-3xl bg-opacity-20  border-themeGray",
          className
        )}
        // bg-themeGray
      >
        <SheetTitle className="hidden">{title}</SheetTitle>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default GlassSheet;

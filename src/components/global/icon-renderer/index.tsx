import { cn } from "@/lib/utils";
import { Home, Megaphone, File } from "lucide-react";

type IconRendererProps = {
  icon: string;
  mode: "LIGHT" | "DARK";
};
export const IconRenderer = ({ icon, mode }: IconRendererProps) => {
  switch (icon) {
    case "general":
      return (
        <Home
          className={cn(
            "text-white",
            mode === "DARK" && "text-muted-foreground"
          )}
        />
      );
    case "announcement":
      return (
        <Megaphone
          className={cn(
            "text-white",
            mode === "DARK" && "text-muted-foreground"
          )}
        />
      );
    case "doc":
      return (
        <File
          className={cn(
            "text-white",
            mode === "DARK" && "text-muted-foreground"
          )}
        />
      );
    default:
      return <></>;
  }
};

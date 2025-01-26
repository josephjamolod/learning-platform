import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

type DropdownProps = {
  children: React.ReactNode;
  title: string;
  trigger: React.ReactNode;
  ref?: React.RefObject<HTMLButtonElement>;
};
const Dropdown = ({ children, title, trigger, ref }: DropdownProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild ref={ref}>
        {trigger}
      </PopoverTrigger>
      <PopoverContent className="rounded-2xl w-56 items-start text-black  bg-white border-themeGray bg-clip-padding backdrop--blur__safari backdrop-filter backdrop-blur-4xl p-4">
        <h4 className="text-sm pl-3">{title}</h4>
        <Separator className="bg-themeGray my-3" />
        {children}
      </PopoverContent>
    </Popover>
  );
};
export default Dropdown;

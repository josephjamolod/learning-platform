import { usePathname } from "next/navigation";
import { useState } from "react";

export const useNavigation = () => {
  const pathname = usePathname();
  const [section, setSection] = useState(pathname);
  const onSetSection = (page: string) => {
    setSection(page);
  };
  return { section, onSetSection };
};

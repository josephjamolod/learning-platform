import { RefreshCcw } from "lucide-react";
import {
  Building,
  Dumbbell,
  Leaf,
  Music,
  PersonStanding,
  Phone,
  Settings,
} from "lucide-react";
import { JSX } from "react";

export type GroupListProps = {
  id: string;
  label: string;
  icon: JSX.Element;
  path: string;
};

export const GROUP_LIST: GroupListProps[] = [
  {
    id: "0",
    label: "All",
    icon: <RefreshCcw />,
    path: "",
  },
  {
    id: "1",
    label: "Fitness",
    icon: <Dumbbell />,
    path: "fitness",
  },
  {
    id: "2",
    label: "Music",
    icon: <Music />,
    path: "music",
  },
  {
    id: "3",
    label: "Business",
    icon: <Building />,
    path: "business",
  },
  {
    id: "4",
    label: "Lifestyle",
    icon: <Leaf />,
    path: "lifestyle",
  },
  {
    id: "5",
    label: "Personal Development",
    icon: <PersonStanding />,
    path: "personal-development",
  },
  {
    id: "6",
    label: "Social Media",
    icon: <Phone />,
    path: "social-media",
  },
  {
    id: "7",
    label: "Tech",
    icon: <Settings />,
    path: "tech",
  },
];

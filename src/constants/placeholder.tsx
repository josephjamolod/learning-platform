import { JSX } from "react";
import {
  Megaphone,
  // Heart,
  // MessageCircleIcon,
  // Folder,
  // Grid,
  // Home,
} from "lucide-react";

export interface CREATE_GROUP_PLACEHOLDER_PROPS {
  id: string;
  label: string;
  icon: JSX.Element;
}

export const CREATE_GROUP_PLACEHOLDER: CREATE_GROUP_PLACEHOLDER_PROPS[] = [
  { id: "0", label: "Highly engaging", icon: <Megaphone /> },
  { id: "1", label: "Easy to setup", icon: <Megaphone /> },
  { id: "2", label: "Group chat and posts", icon: <Megaphone /> },
  {
    id: "3",
    label: "Students can create teams within Groups",
    icon: <Megaphone />,
  },
  { id: "4", label: "Gamification", icon: <Megaphone /> },
  { id: "5", label: "Host unlimited courses", icon: <Megaphone /> },
  { id: "6", label: "White-labeling options", icon: <Megaphone /> },
];

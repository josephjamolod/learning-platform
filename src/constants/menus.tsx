import { JSX } from "react";
import { Home, CreditCard, MapPinIcon } from "lucide-react";

export interface MenuProps {
  id: number;
  label: string;
  icon: JSX.Element;
  path: string;
  section?: boolean;
  integration?: boolean;
}

export const LANDING_PAGE_MENU: MenuProps[] = [
  {
    id: 0,
    label: "Home",
    icon: <Home key={0} />,
    path: "/",
    section: true,
  },
  {
    id: 1,
    label: "Pricing",
    icon: <CreditCard key={1} />,
    path: "#pricing",
    section: true,
  },
  {
    id: 2,
    label: "Explore",
    icon: <MapPinIcon key={2} />,
    path: "/explore",
  },
];

export const SIDEBAR_SETTINGS_MENU: MenuProps[] = [
  {
    id: 0,
    label: "General",
    icon: <CreditCard />,
    path: "",
  },
  {
    id: 1,
    label: "Subscriptions",
    icon: <CreditCard />,
    path: "subscriptions",
  },
  {
    id: 2,
    label: "Affiliates",
    icon: <CreditCard />,
    path: "affiliates",
  },
  {
    id: 3,
    label: "Domain Config",
    icon: <CreditCard />,
    path: "domains",
  },
  {
    id: 4,
    label: "Integration",
    icon: <CreditCard />,
    path: "integrations",
    integration: true,
  },
];

// export const GROUP_PAGE_MENU: MenuProps[] = [
//   {
//     id: 0,
//     label: "Group",
//     icon: <Home />,
//     path: "/",
//     section: true,
//   },
//   {
//     id: 1,
//     label: "Courses",
//     icon: <Courses />,
//     path: "#pricing",
//     section: true,
//   },
//   {
//     id: 2,
//     label: "Events",
//     icon: <Buisness />,
//     path: "/explore",
//   },
//   {
//     id: 3,
//     label: "Members",
//     icon: <PersonalDevelopment />,
//     path: "/explore",
//   },
//   {
//     id: 4,
//     label: "About",
//     icon: <Document />,
//     path: "/explore",
//   },
//   {
//     id: 5,
//     label: "Huddle",
//     icon: <Chat />,
//     path: "/explore",
//   },
// ];

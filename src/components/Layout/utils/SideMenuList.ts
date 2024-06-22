import { SideMenuItem } from "../types/SideMenu";
import { IoPersonCircleOutline } from "react-icons/io5";
import { PiNotebook } from "react-icons/pi";
import { IoBriefcaseOutline } from "react-icons/io5";
import { GrChatOption } from "react-icons/gr";
import { MdOutlineMailOutline } from "react-icons/md";

export const sideMenuList: SideMenuItem[] = [
  {
    key: "about",
    name: "About",
    icon: IoPersonCircleOutline,
  },
  {
    key: "resume",
    name: "Resume",
    icon: PiNotebook,
  },
  {
    key: "projects",
    name: "Projects",
    icon: IoBriefcaseOutline,
  },
  {
    key: "articles",
    name: "Articles",
    icon: GrChatOption,
  },
  {
    key: "contact",
    name: "Contact",
    icon: MdOutlineMailOutline,
  },
];

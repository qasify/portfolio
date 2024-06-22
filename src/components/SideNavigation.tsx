import React from "react";
import { MenuExpander } from ".";

const sideMenus = [
  {
    key: "about",
    name: "About",
    icon: "about",
  },
  {
    key: "resume",
    name: "Resume",
    icon: "about",
  },
  {
    key: "projects",
    name: "Projects",
    icon: "about",
  },
  {
    key: "articles",
    name: "Articles",
    icon: "about",
  },
  {
    key: "contact",
    name: "Contact",
    icon: "about",
  },
];

const SideNavigation = () => {
  return (
    <div className="flex flex-col items-center justify-between w-full p-4 bg-text-dark dark:bg-text-light bg-opacity-30">
      {/* Menu button */}
      <MenuExpander />

      {/* Menu Items */}
      {sideMenus.map((menuItem) => (
        <div key={menuItem.key}>{menuItem.name}</div>
      ))}
    </div>
  );
};

export default SideNavigation;

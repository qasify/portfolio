import React from "react";
import { BackgroundContainer, MenuExpander } from "..";
import { sideMenuList } from "./utils/SideMenuList";

const SideNavigation: React.FC<any> = ({
  className = "",
  children,
  ...restProps
}) => {
  return (
    <BackgroundContainer
      className={`relative h-max flex flex-col items-center gap-6 justify-between w-max py-6 translate-x-[50%] z-10 ${className} text-text-light dark:text-text-dark `}
      {...restProps}
    >
      {/* Menu button */}
      <MenuExpander />

      {/* Menu Items */}
      <div className="flex flex-col items-center justify-between gap-6">
        {sideMenuList.map((menuItem, index) => (
          <div
            key={menuItem.key}
            className={`flex px-3 pb-1 flex-col w-full items-center justify-center hover:text-green-1 hover:cursor-pointer transition-all duration-300 ease-in-out ${
              index !== sideMenuList.length - 1 ? "border-b-[1px]" : ""
            } border-border-light dark:border-border-dark`}
          >
            {<menuItem.icon className="text-2xl" />}
            {menuItem.name}
          </div>
        ))}
      </div>
    </BackgroundContainer>
  );
};

export default SideNavigation;

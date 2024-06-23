import React from "react";
import { BackgroundContainer, MenuExpander, IconButton } from "..";
import { sideMenuList } from "./utils/SideMenuList";
import { AiOutlineSun } from "react-icons/ai";
import { IoMoonOutline } from "react-icons/io5";

interface SideNavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  isDarkTheme: boolean;
  onThemeChange: React.MouseEventHandler<HTMLButtonElement>;
}

const SideNavigation: React.FC<SideNavigationProps> = ({
  isDarkTheme,
  onThemeChange,
  className = "",
  children,
  ...restProps
}) => {
  return (
    <BackgroundContainer
      className={`relative h-max flex flex-col items-center gap-8 justify-between w-max py-6 translate-x-[50%] z-10 ${className} text-text-light dark:text-text-dark bg-light-gradient-right`}
      {...restProps}
    >
      {/* Menu button */}
      <MenuExpander />

      {/* Menu Items */}
      <div className="flex flex-col items-center justify-between gap-6">
        {sideMenuList.map((menuItem, index) => (
          <div
            key={menuItem.key}
            className={`flex px-3 pb-1 flex-col w-full items-center justify-center hover:text-primary-light hover:cursor-pointer transition-all duration-300 ease-in-out ${
              index !== sideMenuList.length - 1 ? "border-b-[1px]" : ""
            } border-border-light dark:border-border-dark`}
          >
            {<menuItem.icon className="text-2xl" />}
            {menuItem.name}
          </div>
        ))}
      </div>

      {/* Theme Switch Button */}
      <IconButton
        onClick={onThemeChange}
        buttonIcon={isDarkTheme ? AiOutlineSun : IoMoonOutline}
      />
    </BackgroundContainer>
  );
};

export default SideNavigation;

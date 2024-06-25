import React from "react";
import { IconType } from "react-icons";

interface IconButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  buttonIcon?: IconType;
  label?: string;
  buttonClass?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  buttonIcon = undefined,
  label = "",
  className = "",
  buttonClass = "",
  children,
  onClick,
  ...restProps
}) => {
  return (
    <button
      className={`flex px-3 gap-2 w-full items-center justify-center hover:text-primary-light hover:cursor-pointer transition-all duration-300 ease-in-out ${className}`}
      onClick={onClick}
      {...restProps}
    >
      {label}
      {buttonIcon && buttonIcon({ className: `text-2xl ${buttonClass}` })}
    </button>
  );
};

export default IconButton;

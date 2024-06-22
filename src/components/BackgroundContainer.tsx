import React from "react";

interface BackgroundContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  // Optionally, you can define specific props if needed
}

const BackgroundContainer: React.FC<BackgroundContainerProps> = ({
  className = "",
  children,
  ...restProps
}) => {
  return (
    <div
      className={`w-full h-full rounded-26 border border-border-light dark:border-border-dark bg-light-gradient dark:bg-dark-gradient backdrop-blur-[12px] ${className}`}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default BackgroundContainer;

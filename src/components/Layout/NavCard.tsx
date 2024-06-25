import BackgroundContainer from "../BackgroundContainer";
import ProfileWidget from "./ProfileWidget";
import SideNavigation from "./SideNavigation";

interface NavCardProps extends React.HTMLAttributes<HTMLDivElement> {
  isDarkTheme: boolean;
  onThemeChange: React.MouseEventHandler<HTMLButtonElement>;
}

const NavCard: React.FC<NavCardProps> = ({
  isDarkTheme,
  onThemeChange,
  className = "",
  children,
  ...restProps
}) => {
  return (
<div className="flex-1 flex flex-col xl:flex-row justify-center items-center gap-5 xl:gap-0 px-[5%] 2xl:px-[15%]">
  <div className="flex flex-col xl:flex-row xl:items-center w-full xl:w-[500px] h-auto xl:h-[700px] gap-6 py-6 xl:gap-0 xl:p-0">
    <div className="relative flex items-center justify-center">
      <div className="hidden xl:block absolute min-w-full min-h-full z-10 border border-border-primary rounded-36 xl:translate-x-[40%] xl:translate-y-[1%] "></div>
      <SideNavigation isDarkTheme={isDarkTheme} onThemeChange={onThemeChange} className="w-[100%] xl:w-max"/>
    </div>
    <ProfileWidget />
  </div>
  <BackgroundContainer className="flex flex-1 flex-col xl:flex-row xl:items-center h-auto xl:h-[610px]">
    Content
  </BackgroundContainer>
</div>

  );
};

export default NavCard;

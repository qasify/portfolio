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
    <div className="flex h-full justify-center items-center ">
      <SideNavigation isDarkTheme={isDarkTheme} onThemeChange={onThemeChange} />
      <ProfileWidget />
      <BackgroundContainer>Content</BackgroundContainer>
    </div>
  );
};

export default NavCard;

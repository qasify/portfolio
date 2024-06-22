import BackgroundContainer from "../BackgroundContainer";
import SideNavigation from "./SideNavigation";

const NavCard = () => {
  return (
    <div className="flex h-full justify-center items-center">
      <SideNavigation />
      <BackgroundContainer className="w-[400px]">
        Image Container
      </BackgroundContainer>
      <BackgroundContainer>Content</BackgroundContainer>
    </div>
  );
};

export default NavCard;

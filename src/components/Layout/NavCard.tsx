import BackgroundContainer from "../BackgroundContainer";
import SideNavigation from "./SideNavigation";
import profileImage from "../../assets/images/profile.jpg";

const NavCard = () => {
  return (
    <div className="flex h-full justify-center items-center ">
      <SideNavigation />
      <BackgroundContainer className="relative w-[700px] overflow-hidden skew-y-1 origin-bottom-left">
        <img
          src={profileImage}
          alt="profile"
          className="object-cover w-full h-full"
        />
        <div className="absolute z-10 h-[25%] bottom-0 left-0 w-full backdrop-blur-[12px]">
          asdasd
        </div>
        <div className="absolute z-20 top-0 left-0 w-full h-full flex items-center justify-center">
          <span className="text-white text-4xl font-bold">
            Content Over Image
          </span>
        </div>
      </BackgroundContainer>
      <BackgroundContainer>Content</BackgroundContainer>
    </div>
  );
};

export default NavCard;

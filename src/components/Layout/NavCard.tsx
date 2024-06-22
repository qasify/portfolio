import BackgroundContainer from "../BackgroundContainer";
import SideNavigation from "./SideNavigation";
import profileImage from "../../assets/images/profile.jpg";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

const NavCard = () => {
  return (
    <div className="flex h-full justify-center items-center ">
      <SideNavigation />
      <div className="w-[800px] h-[114%] skew-y-[6deg] overflow-hidden origin-bottom-left rounded-26 bg-transparent">
        <div className="w-full h-full overflow-hidden skew-y-[-12deg] origin-bottom-left rounded-26 " >
          <BackgroundContainer className="relative w-full skew-y-[12deg] overflow-hidden origin-bottom-left ">
            <img
              src={profileImage}
              alt="profile"
              className="object-cover w-full h-full"
            />
            <div className="absolute z-50 h-[28%] bottom-0 left-0 w-full backdrop-blur-[12px] skew-y-[-12deg] pt-3
                flex flex-col justify-between mb-[3.6rem] bg-gradient-to-b from-transparent to-gray-6-dark items-center"
            >
              <div className="w-auto items-center flex flex-col">
                <p className="text-white text-4xl font-bold">Benjamin Ryan</p>
                <p className="text-primary-light text-2xl font-semibold overflow-hidden whitespace-nowrap border-r-2 border-black animate-typing">Full-Stack Developer</p>
              </div>
              <div className="flex flex-row gap-4 mb-8">
                <button><FaLinkedin size='1.8rem' className="text-white hover:text-green-1" /></button>
                <button><FaFacebook size='1.8rem' className="text-white hover:text-green-1" /></button>
                <button><FaGithub size='1.8rem' className="text-white hover:text-green-1" /></button>
              </div>
              <div className="w-full h-[32%]">
                <button className="uppercase w-1/2 text-white h-full border-t-[1px] border-gray-4-dark border-r-[1px]">Download CV</button>
                <button className="uppercase w-1/2 text-white h-full border-t-[1px] border-gray-4-dark">Contact Me</button>
              </div>
            </div>
            {/* <div className="absolute z-20 top-0 left-0 w-full h-full flex items-center justify-center">
              <span className="text-white text-4xl font-bold">
                Content Over Image
              </span>
            </div> */}
          </BackgroundContainer>
        </div>
      </div>
      <BackgroundContainer>Content</BackgroundContainer>
    </div>
  );
};

export default NavCard;

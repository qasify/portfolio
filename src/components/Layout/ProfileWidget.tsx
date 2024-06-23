import React from "react";
import { BackgroundContainer, IconButton } from "..";
import profileImage from "../../assets/images/profile.jpg";
import { IoCallOutline, IoCloudDownloadOutline } from "react-icons/io5";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

interface ProfileWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  // add any prop if required
}

const ProfileWidget: React.FC<ProfileWidgetProps> = ({
  className = "",
  children,
  ...restProps
}) => {
  return (
    <div className="w-[800px] h-[114%] skew-y-[6deg] overflow-hidden origin-bottom-left rounded-26 bg-transparent">
      <div className="w-full h-full overflow-hidden skew-y-[-12deg] origin-bottom-left rounded-26 ">
        <BackgroundContainer className="relative w-full skew-y-[12deg] overflow-hidden origin-bottom-left ">
          <img
            src={profileImage}
            alt="profile"
            className="object-cover w-full h-full"
          />
          <div
            className="absolute z-50 h-[28%] bottom-0 left-0 w-full backdrop-blur-[12px] skew-y-[-12deg] pt-3
                flex flex-col justify-between mb-[3.6rem] bg-gradient-to-b from-transparent to-gray-6-dark items-center"
          >
            <div className="w-auto items-center flex flex-col">
              <p className="text-white text-4xl font-bold">Benjamin Ryan</p>
              <p className="text-primary-light text-2xl font-semibold overflow-hidden whitespace-nowrap border-r-2 border-black animate-typing">
                Full-Stack Developer
              </p>
            </div>
            <div className="flex flex-row gap-4 mb-8 text-white">
              <IconButton
                buttonIcon={FaLinkedin}
                className="px-1"
                buttonClass="text-3xl"
                onClick={() => {
                  //TODO: on linked in clicked
                }}
              />
              <IconButton
                buttonIcon={FaFacebook}
                className="px-1"
                buttonClass="text-3xl"
                onClick={() => {
                  //TODO: on facebook clicked
                }}
              />
              <IconButton
                buttonIcon={FaGithub}
                className="px-1"
                buttonClass="text-3xl"
                onClick={() => {
                  //TODO: on github clicked
                }}
              />
            </div>
            <div className="flex w-full h-[32%] p-0 m-0">
              <IconButton
                className="uppercase font-bold w-1/2 text-white h-full hover:text-white border-t-[1px] border-gray-4-dark border-r-[1px] group"
                label="Download CV"
                buttonIcon={IoCloudDownloadOutline}
                buttonClass="text-xl transform group-hover:text-primary-light group-hover:-translate-y-1 transition-transform duration-300 ease-in-out"
                onClick={() => {
                  //TODO: on download clicked
                }}
              />
              <IconButton
                className="uppercase font-bold w-1/2 text-white hover:text-white h-full border-t-[1px] border-gray-4-dark group"
                label="Contact Me"
                buttonIcon={IoCallOutline}
                buttonClass="text-xl transform group-hover:text-primary-light group-hover:-translate-y-1 transition-transform duration-300 ease-in-out"
                onClick={() => {
                  //TODO: on click me clicked
                }}
              />
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
  );
};

export default ProfileWidget;

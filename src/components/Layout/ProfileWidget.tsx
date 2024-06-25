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
    <div className="h-full w-full overflow-hidden rounded-26 bg-transparent xl:skew-y-[6deg] xl:origin-bottom-left">
      <div className="relative w-full h-full overflow-hidden rounded-26 xl:skew-y-[-12deg] xl:origin-bottom-left ">
        <BackgroundContainer className="relative w-full overflow-hidden xl:skew-y-[12deg] xl:origin-bottom-left ">
          <img
            src={profileImage}
            alt="profile"
            className="object-cover w-full h-full"
          />
        </BackgroundContainer>
        <div
            className="absolute z-50 flex flex-col rounded-br-[24px] justify-between items-center h-[28%] bottom-0 left-0 w-full backdrop-blur-[12px] pt-3 bg-gradient-to-b from-transparent "
          >
            <div className="flex flex-col items-center w-auto">
              <p className="text-4xl font-bold text-white">Benjamin Ryan</p>
              <p className="overflow-hidden text-2xl font-semibold border-r-2 border-black text-primary-light whitespace-nowrap animate-typing">
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
      </div>
    </div>
  );
};

export default ProfileWidget;

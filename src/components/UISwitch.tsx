import React from "react";

type UISwitchProps = {
  label: string;
  checked: boolean;
  onChange: (event?: React.ChangeEvent<HTMLInputElement>) => void;
};

const UISwitch = ({ label, checked, onChange }: UISwitchProps) => {
  return (
    <div>
      <label className="relative inline-flex gap-2 items-center hover:cursor-pointer text-gray-1">
        {label}
        <input
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
          type="checkbox"
        />
        <div className="group peer bg-gradient-to-l from-gray-1 to-gray-3-light rounded-full outline-none duration-1000 after:duration-300 transition-all w-10 h-5 shadow-md  peer-focus:outline-none after:content-[''] after:rounded-full after:absolute peer-checked:after:rotate-180 after:[background:conic-gradient(from_135deg,_#b2a9a9,_#b2a8a8,_#ffffff,_#d7dbd9_,_#ffffff,_#b2a8a8)] after:outline-none after:h-4 after:w-4 after:top-[4px] after:right-[22px] peer-checked:after:translate-x-5 peer-hover:after:scale-110"></div>
      </label>
    </div>
  );
};

export default UISwitch;

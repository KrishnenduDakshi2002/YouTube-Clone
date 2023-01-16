import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "../assets/youtube-icon.png";
import Sidebar from "./Sidebar";

const SlidingSidebar = ({
  setSideBarToggling,
}: {
  setSideBarToggling: () => void;
}) => {
  return (
    <div className={`w-[15rem] h-full grid grid-rows-[56px_1fr]`}>
      <div className="flex items-center justify-start pl-[16px] bg-black">
        <button
        onClick={()=>setSideBarToggling()}
        >

        <RxHamburgerMenu
          color="white"
          size={38}
          className="cursor-pointer p-2 rounded-full hover:bg-[#272727] "
          />
          </button>
        <div className="flex justify-center items-center h-full cursor-pointer p-3">
          <img src={Logo} alt="Youtube logo" className="w-[27px] mr-1" />
          <h1 className="text-white text-[1.1rem]">YouTube</h1>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default SlidingSidebar;

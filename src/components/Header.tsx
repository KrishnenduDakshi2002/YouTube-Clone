import { RxHamburgerMenu } from "react-icons/rx";
import { BiVideoPlus } from "react-icons/bi";
import { IoMdMic } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import Logo from "../assets/youtube-icon.png";
import SearchBar from "./SearchBar";
import { AiOutlineSearch } from "react-icons/ai";
import { TfiAngleLeft } from "react-icons/tfi";
import { useState } from "react";
import NotificationBox from "./Notification";
import { Link } from "react-router-dom";

const Header = ({
  setHeaderToggling,
  setSideBarToggling,
  setNotificationToggling,
}: {
  setHeaderToggling: (state: boolean) => void;
  setSideBarToggling: () => void;
  setNotificationToggling:()=>void;
}) => {
  return (
    <div className="bg-black h-[56px] flex items-center justify-between px-[16px]">
      <div className="flex items-center justify-evenly ">
        <button
          // just invoking or calling the setSidebarToggling function passed from the parent
          // when this fn is invoked, in parent component we set the present state to (!previous) state
          onClick={() => setSideBarToggling()}
        >
          <RxHamburgerMenu
            color="white"
            size={38}
            className="cursor-pointer p-2 rounded-full hover:bg-[#272727] "
          />
        </button>
        <Link to="/">
          <div className="flex justify-center items-center h-full cursor-pointer p-3">
            <img src={Logo} alt="Youtube logo" className="w-[27px] mr-1" />
            <h1 className="text-white text-[1.1rem]">YouTube</h1>
          </div>
        </Link>
      </div>
      {/* searchbar and voice container */}
      <div className="h-full hidden md:flex justify-center items-center w-[60%] pl-20">
        <SearchBar />
        <div className="rounded-full p-2 bg-[#181818] ml-2">
          <IoMdMic color="white" size={25} />
        </div>
      </div>
      <div className="h-full w-1/6 flex justify-end items-center pr-1 ml-[3rem]">
        {/* **************   short version of search btn and voice *************/}
        {/* hidden for mobile */}
        <div className="md:hidden sm:flex hidden">
          <div
            className="rounded-md p-2 bg-[#2d2d2d] ml-2 cursor-pointer"
            onClick={() => setHeaderToggling(true)}
          >
            <AiOutlineSearch size={25} color="white" />
          </div>
          <div className="rounded-full p-2 bg-[#181818] ml-2">
            <IoMdMic color="white" size={25} />
          </div>
        </div>
        <button>
          <div className="rounded-full hover:bg-[#181818] p-2 m-[0.4rem]">
            <BiVideoPlus color="white" size={25} />
          </div>
        </button>
        <div className="rounded-full hover:bg-[#181818] p-2 m-[0.4rem] relative">
          <button onClick={() => setNotificationToggling()}>
            <IoMdNotificationsOutline color="white" size={25} />
          </button>
        </div>
        <button>
          <div className="rounded-full bg-[white] m-[0.4rem]">
            <FaUserCircle color="dodgerblue" size={30} />
          </div>
        </button>
      </div>
    </div>
  );
};

const SearchBarHeader = ({
  setHeaderToggling,
}: {
  setHeaderToggling: (state: boolean) => void;
}) => {
  return (
    <div className="bg-black h-[56px] flex items-center justify-between pr-2">
      <div
        className="rounded-full hover:bg-[#181818] p-2 ml-5"
        onClick={() => setHeaderToggling(false)}
      >
        <TfiAngleLeft color="white" size={20} />
      </div>
      <div className="h-full flex justify-center items-center w-full">
        <SearchBar />
        <div className="rounded-full p-2 bg-[#181818] ml-2">
          <IoMdMic color="white" size={25} />
        </div>
      </div>
    </div>
  );
};

export default Header;
export { SearchBarHeader };

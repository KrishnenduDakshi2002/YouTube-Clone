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
import { Link } from "react-router-dom";
import { RiBroadcastLine, RiVideoUploadFill } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import VoiceSearchComponent from "./VoiceSearchComponent";

const CreateMenu = [
  {
    Icon: RiVideoUploadFill,
    title: "Create video",
  },
  {
    Icon: RiBroadcastLine,
    title: "Go live",
  },
  {
    Icon: TbEdit,
    title: "Create post",
  },
];

const Header = ({
  setHeaderToggling,
  setSideBarToggling,
  setNotificationToggling,
}: {
  setHeaderToggling: (state: boolean) => void;
  setSideBarToggling: () => void;
  setNotificationToggling: () => void;
}) => {
  const [ToggleCreate, setToggleCreate] = useState(false);
  const [ToggleVoiceSearch, setToggleVoiceSearch] = useState(false);
  let TargetId: string;

  window.addEventListener("click", (e) => {
    if (e.target != null) {
      if ("id" in e.target) TargetId = e.target.id as string;
      // console.log(TargetId);
    }
  });

  return (
    <div className="bg-black h-[56px] flex items-center justify-between px-[16px] relative z-10">
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
      <div className="h-full hidden md:flex justify-center items-center w-[55%] pl-20">
        <SearchBar />
        <button className="rounded-full p-2 bg-[#181818] ml-2" onClick={()=>setToggleVoiceSearch(prev=>!prev)}>
          <IoMdMic color="white" size={25} />
        </button>
        {
          ToggleVoiceSearch&&
          <VoiceSearchComponent setIsVisibleVoiceSearch={()=>setToggleVoiceSearch(prev=>!prev)}/>
        }
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
        <div className="relative rounded-full hover:bg-[#181818] w-10 h-10 m-[0.4rem] flex justify-center items-center">
          <button onClick={() => setToggleCreate((prev) => !prev)}>
            <BiVideoPlus color="white" size={25} />
          </button>
          {
            ToggleCreate && (
              // overlay
              <div className="fixed top-0 left-0 right-0 bottom-0 z-[100]" onClick={()=>setToggleCreate(prev=>!prev)}>
                {/* modal */}
                <div id="create_menu_container" className="bg-[#282828] overflow-hidden flex flex-col absolute w-[12rem] h-[8rem] rounded-xl right-[7rem] top-[50px] text-white">
                  {
                    CreateMenu.map(({Icon,title},i)=>
                    <button id="create_menu_btn" key={i} className="flex-1 px-4 flex items-center hover:bg-gray-700" onClick={()=>console.log('clicked')}>
                      <Icon size={22}/>
                      <p className="ml-4">{title}</p>
                    </button>
                    )
                  }
                </div>
              </div>
            )
          }
        </div>
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

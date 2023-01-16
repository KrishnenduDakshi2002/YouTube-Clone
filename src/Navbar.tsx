import { useState } from "react";
import { SideBarMini } from "./components/Sidebar_mini";
import {
  Header,
  Home,
  NotificationBox,
  SearchBarHeader,
  Sidebar,
  SlidingSidebar,
} from "./components/components";
import { Outlet } from "react-router-dom";

const NavBar = ({ sidebarVisibility,children }: { sidebarVisibility: boolean;children:JSX.Element }) => {
  const [Toggle_Header_sm_screen, setToggle_Header_sm_screen] = useState(false);
  const [ToggleSideBar, setToggleSideBar] = useState(false);
  const [ToggleNotification, setToggleNotification] = useState(false);
  return (
    <div
      className={`grid 
      
      ${
        sidebarVisibility
          ? `
      ${
        !ToggleSideBar
          ? "2xl:grid-cols-[15rem_1fr]"
          : "2xl:grid-cols-[4.5rem_1fr]"
      } lg:grid-cols-[4.5rem_1fr]
      `
          : "2xl:grid-cols-1 lg:grid-cols-1"
      }

        grid-cols-[1fr] grid-rows-[56px_1fr] w-screen h-screen relative`}
    >
      <div
        className={`${
          Toggle_Header_sm_screen ? "hidden" : "block"
        } md:block bg-red-300 col-span-2`}
      >
        <Header
          setNotificationToggling={() => setToggleNotification((prev) => !prev)}
          setHeaderToggling={(state) => setToggle_Header_sm_screen(state)}
          setSideBarToggling={() => setToggleSideBar((prev) => !prev)}
        />
        {ToggleNotification ? (
          <div className="w-[30rem] h-[80%] absolute top-[50px] right-[5rem]">
            <NotificationBox />
          </div>
        ) : null}
      </div>
      <div
        className={`${
          Toggle_Header_sm_screen ? "block" : "hidden"
        } md:hidden bg-red-300 col-span-2`}
      >
        <SearchBarHeader
          setHeaderToggling={(state) => setToggle_Header_sm_screen(state)}
        />
      </div>
      <div
        className={`bg-green-300 hidden ${
          !ToggleSideBar ? "2xl:block" : "hidden"
        }`}
      >
        <Sidebar />
      </div>
      <div
        className={`bg-green-300 lg:block hidden ${
          !ToggleSideBar ? "2xl:hidden" : "2xl:block"
        }`}
      >
        <SideBarMini />
      </div>
      <div
        className={`absolute left-0 top-0 h-full 2xl:hidden ${
          !ToggleSideBar ? "translate-x-[-100%]" : "translate-x-0"
        } ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] duration-200`}
      >
        <SlidingSidebar
          setSideBarToggling={() => setToggleSideBar((prev) => !prev)}
        />
      </div>

      {/* every child for this route will be render by replacing the Outlet component */}

      {/* If overflow is not hidden then scroll will not work in child */}

      <div className="overflow-hidden">
        {
          children
        }
      </div>
    </div>
  );
};

export default NavBar;

import React from "react";
import {
    AiOutlineSetting,
  } from "react-icons/ai";

const NotificationBox = () => {
  return (
    <div
      className={`bg-[#272727] w-full h-full rounded-xl grid grid-rows-[3rem_1fr] overflow-hidden`}
    >
        <div className="flex justify-between items-center px-4 border-b-[1px] border-[#585858]">
            <p className={`text-white`}>Notifications</p>
            <AiOutlineSetting color={`white`} size={25}/>
        </div>
        <div className={`grid grid-flow-row gap-1 overflow-y-scroll`}>
            <Notification/>
            <Notification/>
            <Notification/>
            <Notification/>
            <Notification/>
            <Notification/>
            <Notification/>
        </div>
    </div>
  );
};

const Notification = () =>{
    return(
        <div className="grid grid-cols-[1fr_3fr_1.5fr_0.5fr] grid-rows-1 h-[10rem]">
            <div className="bg-blue-300">dfs</div>
            <div className="bg-green-300">Kjklajdsk</div>
            <div className="bg-pink-300">ads</div>
            <div className="bg-yellow-300">adf</div>
        </div>
    )
}

export default NotificationBox;

import React, { useState } from "react";
import { Link,useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineSubscriptions, MdOutlineVideoLibrary } from "react-icons/md";
import YoutubeShortWhite from '../assets/youtube-shorts-white.png'

export const SideBarMini = () => {
  const location = useLocation();
  const currentRoute = location.pathname.split('/')[1];
  const paragraph = 'mt-1 text-xs text-white truncate w-full text-center'
  const button = 'w-full py-4 flex flex-col items-center justify-center rounded-xl hover:bg-[#272727]'
  return (
    <div className="bg-black flex w-full h-full flex-col items-center px-1">
      <Link
        to="/"
        className={button}
        >
        <AiFillHome color="white" size={20} />
        <p className={paragraph}>Home</p>
      </Link>
      <Link
        to="/shorts"
        className={button}
        >
        <img src={YoutubeShortWhite} className="w-[20px]"/>
        <p className={paragraph}>Shorts</p>
      </Link>
      <Link
        to="/subscriptions"
        className={button}
        >
        <MdOutlineSubscriptions color="white" size={20} />
        <p className={paragraph}>Subscriptions</p>
      </Link>
      <Link
        to="/"
        className={button}
      >
        <MdOutlineVideoLibrary color="white" size={20} />
        <p className={paragraph}>Library</p>
      </Link>
    </div>
  );
};

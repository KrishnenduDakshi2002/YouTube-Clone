import { useState } from "react";
import {Link} from 'react-router-dom';
import {
  AiFillHome,
  AiOutlinePlaySquare,
  AiOutlineSetting,
  AiOutlineFlag,
} from "react-icons/ai";
import {
  MdOutlineSubscriptions,
  MdOutlineVideoLibrary,
  MdOutlineWatchLater,
  MdOutlineContentCut,
  MdPlaylistPlay,
  MdOutlineChat,
} from "react-icons/md";
import { VscHistory } from "react-icons/vsc";
import { GrHistory } from "react-icons/gr";
import { BiLike, BiMoviePlay } from "react-icons/bi";
import { IoRadioOutline, IoMusicalNoteOutline } from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import { HiFire } from "react-icons/hi";
import { IconType } from "react-icons";

import YoutubeShortWhite from '../assets/youtube-shorts-white.png'

const Theme = "white";

const Playlists = [
  "ReactJs WebDev Simplified",
  "ReactNative tutorials",
  "MacOS",
  "Machine Learning and Artificial intelligence",
  "ReactJs WebDev Simplified",
  "ReactNative tutorials",
  "MacOS",
  "Machine Learning and Artificial intelligence",
  "ReactJs WebDev Simplified",
  "ReactNative tutorials",
  "MacOS",
  "Machine Learning and Artificial intelligence",
];

const Sidebar = () => {
  const [Toggle, setToggle] = useState(false);
  return (
    <div className="bg-black w-full h-full relative">
      <div className="absolute top-0 w-full h-full overflow-scroll">
        <div className="w-full px-3 border-b-[1px] border-gray-800">
          <div className="border-b-[1px] border-gray-800 py-3">
            < SidebarTile
              path={'/'}
              Icon={<AiFillHome color="white" size={22} />}
              title="Home"
            />
            < SidebarTile
              path="/shorts"
              Icon={<img src={YoutubeShortWhite} className="w-[20px]"/>}
              title="Shorts"
            />
            < SidebarTile
              path="/subscriptions"
              Icon={<MdOutlineSubscriptions color="white" size={25} />}
              title="Subscriptions"
            />
          </div>
          <div className="pt-3">
            < SidebarTile
              path="/"
              Icon={<MdOutlineVideoLibrary color="white" size={25} />}
              title="Library"
            />
            < SidebarTile
              path="/"
              Icon={<VscHistory color="white" size={22} />}
              title="History"
            />
            < SidebarTile
              path="/"
              Icon={<AiOutlinePlaySquare color="white" size={25} />}
              title="Your videos"
              />
            < SidebarTile
              path="/"
              Icon={<MdOutlineWatchLater color="white" size={25} />}
              title="Watch Later"
              />
            < SidebarTile
              path="/"
              Icon={<MdOutlineContentCut color="white" size={22} />}
              title="Watch Later"
              />
            < SidebarTile
              path="/"
              Icon={<BiLike color="white" size={22} />}
              title="Liked Videos"
              />
            <div className={`${Toggle ? "block" : "hidden"} w-full`}>
              {Playlists.map((playlist,id) => (
                <SidebarTile
                path="/"
                key={id}
                Icon={<MdPlaylistPlay color="white" size={27} />}
                title={playlist}
                />
                ))}
            </div>
            <SidebarTile
              path="/"
              onClick={() => setToggle((prev) => !prev)}
              Icon={
                Toggle ? (
                  <TfiAngleUp color="white" size={15} />
                  ) : (
                    <TfiAngleDown color="white" size={15} />
                    )
                  }
                  title={Toggle ? "Show less" : "Show more"}
                  />
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarTile = ({
  key,
  Icon,
  title,
  active,
  onClick,
  path,
}: {
  key?: string | number;
  Icon: any;
  title: string;
  active?: boolean;
  onClick?: () => void;
  path: string;
}) => {
  return (
    <Link to={path} className="bg-white">
      <div
        key={key}
        className={`flex justify-start items-center ${
          active ? "bg-[#272727]" : "bg-none"
        } hover:bg-[#272727] px-3 py-[0.6rem] rounded-xl`}
        onClick={() => {
          if (onClick) onClick();
        }}
      >
          <div>{Icon}</div>
          <p className="text-white ml-6 font-semibold text-[0.8rem] truncate">{title}</p>
      </div>
        </Link>
  );
};

export default Sidebar;

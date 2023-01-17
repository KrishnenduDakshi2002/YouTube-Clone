import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import Thumbnail1 from "../assets/Thumbnail-1.jpg";
import Thumbnail2 from "../assets/Thumbnail-2.jpg";
import Thumbnail3 from "../assets/Thumbnail-3.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineWatchLater, MdPlaylistPlay } from "react-icons/md";
import CommentSection from "./CommentSection";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

const Filters = [
  "All",
  "Related",
  "Watched",
  "From Youtube",
  "More",
  "Similar",
];

const VideoScreen = () => {
  const useQuery = () => new URLSearchParams(useLocation().search);

  let query = useQuery();
  const [VideoId, setVideoId] = useState(query.get("v"));
  const [ToggleMoreVideoComment, setToggleMoreVideoComment] = useState(true);
  return (
    <div className="p-6 bg-black w-full h-full grid xl:grid-cols-[2fr_1fr] 2xl:grid-cols-[2.2fr_1fr] grid-cols-1 gap-x-3 relative -z-0">
      <div className="overflow-y-scroll scrollbar-hidden">
        <div className="aspect-video ">
          <VideoPlayer />
        </div>
        <div className="mt-5 text-white text-xl font-bold">
          OVERWATCH 2 & 1 Full Movie (2020) All Animated Short Cinematics 4K
          ULTRA HD
        </div>
        <div className="grid grid-cols-[1fr_2fr_3fr_5fr_3fr_2fr_1fr] gap-x-2 mt-5">
          <div className="bg-green-300 rounded-full w-[2.5rem] h-[2.5rem]"></div>
          <div className=" text-white">
            <div className="">Youtube</div>
            <div className="text-xs truncate">128M Subscribers</div>
          </div>
          <div className="bg-white min-w-[140px] rounded-2xl flex justify-center items-center font-semibold font-sans cursor-pointer">
            Subscribe
          </div>
          <div className=""></div>
          <div className="bg-[#282828] rounded-2xl grid grid-cols-[2fr_1fr] overflow-hidden min-w-[8rem]">
            <div className="flex-center-center text-white">
              <AiOutlineLike size={25} />
              <span>400</span>
            </div>
            <div className="flex-center-center text-white">
              <AiOutlineDislike size={25} />
            </div>
          </div>
          <div className="bg-gray-400 rounded-full"></div>
          <div className="bg-gray-400 rounded-full">
            <BsThreeDotsVertical color={`white`} size={22} />
          </div>
        </div>
        <div className="pt-5">
          <CommentSection />
        </div>
      </div>
      <div className="overflow-y-scroll scrollbar-hidden">
        <SideVideoBar />
      </div>
    </div>
  );
};

const SideVideoBar = () => {
  const [active, setActive] = useState("0");

  return (
    <div className="w-full h-full grid grid-rows-[3rem_1fr] pt-5 pl-5 pr-1">
      <div className="h-[3rem] grid grid-flow-col overflow-x-scroll scrollbar-hidden py-[8px]">
        {Filters.map((filter, i) => (
          <button key={i} onClick={() => setActive(i.toString())}>
            <p
              className={`${
                active === i.toString()
                  ? "bg-[white] text-black"
                  : "bg-[#272727] text-white hover:bg-[#444444]"
              } mx-2 px-3 py-1 flex justify-center items-center whitespace-nowrap rounded-lg text-sm cursor-pointer `}
            >
              {filter}
            </p>
          </button>
        ))}
      </div>
      <div className="bg-black overflow-y-scroll scrollbar-hidden pt-2">
        {Array.from({ length: 10 }, (v, i) => (
          <div key={i}>
            <SideVideoTile />
          </div>
        ))}
      </div>
    </div>
  );
};

const SideVideoTile = () => {
  const [ToggleMenu, setToggleMenu] = useState(false);
  useEffect(() => {
    // window.addEventListener('click',(e)=>console.log(e.target))
  }, [])
  
  return (
    <div className="group grid grid-rows-[1fr_0.3fr_0.5fr_0.5fr] grid-cols-[12rem_3fr_0.05fr] gap-1 cursor-pointer relative">
      <div className="bg-green-300 row-span-full rounded-xl overflow-hidden mr-[5px] relative aspect-video">
        <img src={Thumbnail3} alt="" className="object-cover" />
        <p className="bg-black text-white text-sm absolute bottom-[2px] right-2 p-1 rounded-md">
          22:15
        </p>
        <div className="group-hover:flex hidden bg-[#5a5a5a] w-[1.725rem] h-[1.75rem] absolute top-2 right-2 justify-center items-center rounded-md">
          <MdOutlineWatchLater color={`white`} size={25} />
        </div>
        <div className="group-hover:flex hidden bg-[#5a5a5a] w-[1.725rem] h-[1.75rem] absolute top-12 right-2 justify-center items-center rounded-md">
          <MdPlaylistPlay color={`white`} size={25} />
        </div>
      </div>
      <div className=" col-start-2">
        <p className="text-sm font-semibold text-white text-oveflow-hidden">
          How People Profit Off India’s Garbage | World Wide Waste | Business
          Insider
        </p>
      </div>
      <div className="group-hover:visible invisible">
        <button onClick={() => setToggleMenu((prev) => !prev)}>
          <BsThreeDotsVertical color={`white`} size={22} />
        </button>
      </div>
      <div className="col-start-2 ">
        <p className="text-[0.85rem] text-gray-300 truncate">Inside Business</p>
      </div>
      <div className="col-start-2 ">
        <p className="text-[0.85rem] text-gray-300 overflow-y-hidden truncate">
          20k views . 2 weeks ago
        </p>
      </div>
      <div className="bg-orange-300 col-start-2 hidden">live</div>
      <SideBarVideoTileMenu toggle={ToggleMenu}/>
    </div>
  );
};

function SideBarVideoTileMenu({toggle}:{toggle:boolean}) {

  return (
    <div className={`bg-red-300 w-[250px] h-[10rem] absolute top-[2rem] right-0 ${toggle?'block':'hidden'} z-10`}>menu</div>
  );
}

export default VideoScreen;

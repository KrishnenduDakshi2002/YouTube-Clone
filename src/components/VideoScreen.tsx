import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import Thumbnail1 from "../assets/Thumbnail-1.jpg";
import Thumbnail2 from "../assets/Thumbnail-2.jpg";
import Thumbnail3 from "../assets/Thumbnail-3.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineWatchLater, MdPlaylistPlay } from "react-icons/md";
import CommentSection from "./CommentSection";

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
        <div className="mt-5 text-white text-xl font-bold ">
          OVERWATCH 2 & 1 Full Movie (2020) All Animated Short Cinematics 4K
          ULTRA HD
        </div>
        <div className="h-[2.8rem] grid grid-cols-[1fr_2fr_3fr_5fr_3fr_2fr_1fr] gap-x-2 bg-blue-300 border border-red-500">
          <div className="bg-green-300 rounded-full w-[2.5rem] h-[2.5rem]"></div>
          <div className="bg-blue-300">
            <div className="">Youtube</div>
          </div>
          <div className="bg-white rounded-2xl my-1 flex justify-center items-center font-semibold font-sans cursor-pointer">
            Subscribe
          </div>
          <div className=""></div>
          <div className="bg-gray-400 rounded-full my-1 grid grid-cols-[2fr_1fr] overflow-hidden">
            <div className="bg-pink-300"></div>
          </div>
          <div className="bg-gray-400 rounded-full my-1"></div>
          <div className="bg-gray-400 rounded-full my-1">
            <BsThreeDotsVertical color={`white`} size={22} />
          </div>
        </div>
        <div className="pt-5">
            <CommentSection/>
        </div>
      </div>
      <div className="overflow-y-scroll scrollbar-hidden">
        <SideVideoBar/>
      </div>
    </div>
  );
};

const SideVideoBar = () => {
  const [active, setActive] = useState("0");

  return (
    <div className="w-full h-full grid grid-rows-[3rem_1fr] pt-5 pr-1">
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
          <SideVideoTile/>
          <SideVideoTile/>
          <SideVideoTile/>
          <SideVideoTile/>
          <SideVideoTile/>
          <SideVideoTile/>
          <SideVideoTile/>
          <SideVideoTile/>
          <SideVideoTile/>
          <SideVideoTile/>
          <SideVideoTile/>
      </div>
    </div>
  );
};

const SideVideoTile = () => {
  return (
    <div className="my-2 group grid grid-rows-[1fr_0.3fr_0.3fr_0.5fr] grid-cols-[12rem_3fr_0.05fr] gap-1 cursor-pointer">
      <div className="bg-green-300 row-span-full rounded-xl overflow-hidden mr-[5px] relative">
        <img src={Thumbnail3} alt="" className="object-cover aspect-video" />
        <p className="bg-black text-white text-sm absolute bottom-1 right-2 p-1">
          22:15
        </p>
        <div className="group-hover:flex hidden bg-[#5a5a5a] w-[1.725rem] h-[1.75rem] absolute top-2 right-2 justify-center items-center rounded-md">
          <MdOutlineWatchLater color={`white`} size={25} />
        </div>
        <div className="group-hover:flex hidden bg-[#5a5a5a] w-[1.725rem] h-[1.75rem] absolute top-12 right-2 justify-center items-center rounded-md">
          <MdPlaylistPlay color={`white`} size={25} />
        </div>
      </div>
      <div className=" col-start-2 text-sm font-semibold text-white text-oveflow-hidden">
        How People Profit Off India’s Garbage | World Wide Waste | Business
        Insider
      </div>
      <div className="group-hover:visible invisible">
        <BsThreeDotsVertical color={`white`} size={22} />
      </div>
      <div className="col-start-2 text-[0.85rem] text-gray-300 leading-6">
        Inside Business
      </div>
      <div className="col-start-2 text-[0.85rem] text-gray-300">
        20k views . 2 weeks ago
      </div>
      <div className="bg-orange-300 col-start-2 hidden">live</div>
    </div>
  );
};

export default VideoScreen;

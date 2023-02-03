import { HiDotsVertical } from "react-icons/hi";
import { RiBroadcastLine } from "react-icons/ri";
import { GoMute, GoUnmute } from "react-icons/go";
import { MdOutlineWatchLater, MdPlaylistPlay } from "react-icons/md";
import { Link } from "react-router-dom";

import Thumbnail1 from "../assets/Thumbnail-1.jpg";
import Thumbnail2 from "../assets/Thumbnail-2.jpg";
import Thumbnail3 from "../assets/Thumbnail-3.jpg";
import TestVideo from "../assets/Video/test-video.mp4";
import { useRef, useState } from "react";
import { useAddtoQueueContext } from "../Context/AddToQueueContext";

const ImageMap = new Map();
ImageMap.set(0, Thumbnail1);
ImageMap.set(1, Thumbnail2);
ImageMap.set(2, Thumbnail3);


interface VideoComponentInterface{
  id: string;
  publishedAt: Date;
  title: string;
  thumbnail: string;
  channelTitle:string;
  liveBroadcastContent:string;
  videoId:string;
}

const VideoComponent:React.FC<VideoComponentInterface> = ({channelTitle,id,liveBroadcastContent,publishedAt,thumbnail,title,videoId}) => {
  const ImageRandom = Math.floor(Math.random() * 3);
  const [activePreview, setActivePreview] = useState(false);

  const {AddtoQueueList,setAddtoQueueList} = useAddtoQueueContext();

  let activePreviewTimeout: any;

  function startTimer() {
    return setTimeout(() => setActivePreview(() => true), 2000);
  }

  function HandleAddToQueue(){
    setAddtoQueueList(prev => [...prev,{
      channelTitle,
      thumbnail,
      liveBroadcastContent,
      title,
      videoUrl:TestVideo
    }])
  }

  return (
    // Transform origin-top (any transformation will originated from top, in this case we have scale)
    <div className="cursor-pointer h-[330px] max-w-[25rem]">
      <div
        className={`${activePreview ? "hidden" : "flex"} w-full h-full
          flex-col cursor-pointer rounded-xl overflow-hidden relative z-[2]`}
      >
        <Link to={`/watch?v=${videoId}`} className="">
          <div
            className="relative group"
            onMouseEnter={() => {
              activePreviewTimeout = startTimer();
            }}
            onMouseLeave={() => {
              clearTimeout(activePreviewTimeout);
            }}
          >
            <img
              // src={ImageMap.get(ImageRandom)}
              src={thumbnail}
              alt=""
              className="max-h-full w-full object-cover aspect-video rounded-xl"
            />
            {/* if live streaming */}
            {/* <div className="bg-red-600 h-[5px] w-full absolute bottom-0"></div> */}

            {/* keep hovering text */}
            <div className="group-hover:block hidden absolute min-w-1/2 p-1 text-sm right-2 bottom-2 bg-black text-white">
              Keep hovering to play
            </div>
            <div className="group-hover:hidden block absolute min-w-1/2 rounded-md p-1 text-sm right-2 bottom-2 bg-black text-white">
              12:45
            </div>
          </div>
        </Link>

        <div className="group flex-1 grid grid-cols-[3rem_auto_1.5rem] grid-rows-[2fr_repeat(3,1fr)] gap-x-2 gap-y-2 pt-4 text-white">
          <div className="col-span-1 flex justify-center items-center">
            <img src={Thumbnail3} alt="" className="rounded-full w-10 h-10" />
          </div>
          <div className="col-span-1 text-bold text-sm font-bold">
            {title}
          </div>
          <div className="group-hover:block hidden">
            <div>
              <HiDotsVertical size={20} />
            </div>
          </div>
          <div className=" col-start-2 col-span-1 text-gray-400 text-[0.9rem]">
            {channelTitle}
          </div>
          <div className=" col-start-2 col-span-1 text-gray-400 text-[0.9rem]">
            22k views. 13 days ago
          </div>
          <div className=" col-start-2 col-span-1">
            {false && (
              <div className="bg-red-600 w-12 rounded-sm text-[0.75rem] flex items-center justify-evenly">
                <RiBroadcastLine />
                LIVE
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Hoverred element */}
      <div
        onMouseLeave={() => setActivePreview(() => false)}
        className={`
          relative z-[5]
          h-[22rem]
          ${
            activePreview ? "block" : "hidden"
          } bg-[#212121] shadow-xl overflow-hidden rounded-xl w-full h-full hover:scale-[1.2]
          origin-top ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] duration-300`}
      >
        <div className="text-white w-full h-full grid gap-y-2 grid-cols-[1fr_4fr] grid-rows-[auto_1fr_repeat(3,0.7rem)_3fr] cursor-pointer">
          <div className="col-span-3 aspect-video">
            <div className="">
              {activePreview && <PreviewVideoPlayer videoId={videoId} />}
            </div>
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <img
              src={Thumbnail3}
              alt=""
              className="w-[2rem] h-[2rem] rounded-full"
            />
          </div>
          <div className="col-span-1 text-bold text-[0.7rem] font-bold">
            {title}
          </div>
          <div className=" col-start-2 col-span-1 text-gray-400 text-[0.7rem]">
            {channelTitle}
          </div>
          <div className=" col-start-2 col-span-1 text-gray-400 text-[0.7rem]">
            22k views. 13 days ago
          </div>
          <div className=" col-start-2 col-span-1">
            {false && (
              <div className="bg-red-600 w-12 rounded-sm text-[0.75rem] flex items-center justify-evenly">
                <RiBroadcastLine />
                LIVE
              </div>
            )}
          </div>
          <div className="col-start-1 col-span-3 flex flex-col justify-evenly items-center">
            <button className="bg-[#383838] w-[85%] flex justify-center items-center p-[0.25rem] rounded-xl">
              <MdOutlineWatchLater color={`#d7d6d6`} size={20} />
              <p className="text-[#d7d6d6] text-[0.8rem] ml-3">Watch Later</p>
            </button>
            <button className="bg-[#383838] w-[85%] flex justify-center items-center p-[0.25rem] rounded-xl"
            onClick={HandleAddToQueue}
            >
              <MdPlaylistPlay color={`#d7d6d6`} size={20} />
              <p className="text-[#d7d6d6] text-[0.8rem] ml-2">Add To Queue</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function PreviewVideoPlayer({ videoId }: { videoId: string }) {
  const [muted, setMuted] = useState(true);
  return (
    <div className="relative">
      <button
        className={`absolute top-2 right-5 bg-gray-700 p-2 rounded-md opacity-50`}
        onClick={() => {
          setMuted((prev) => !prev);
        }}
      >
        {muted ? <GoMute color="white" /> : <GoUnmute color="white" />}
      </button>
      <Link to={`/watch?v=${videoId}`}>
        <video
          src={TestVideo}
          className="w-full h-full"
          autoPlay
          muted={muted}
        ></video>
      </Link>
    </div>
  );
}

export default VideoComponent;

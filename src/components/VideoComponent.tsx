import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineWatchLater, MdPlaylistPlay } from "react-icons/md";
import { Link } from "react-router-dom";

const VideoComponent = ({ key,videoId }: { key:string;videoId:string; }) => {
  console.log(videoId);
  return (
    // Transform origin-top (any transformation will originated from top, in this case we have scale)
    <Link to={`/watch?v=${key}`} className="">
      <div className="group bg-green-300 cursor-pointer h-[330px] max-w-[25rem]">
        <div
          className="group-hover:hidden w-full h-full
          grid grid-cols-[1fr_4fr_0.5fr] grid-rows-[4fr_1.5fr_0.5fr_0.5fr_1fr] cursor-pointer"
        >
          <div className="bg-blue-300 col-span-3 pb-3">
            <div className="border border-black w-full h-full rounded-xl">
              Img
            </div>
          </div>

          <div className="bg-red-200 col-span-1">icon</div>
          <div className="bg-pink-300 col-span-1">Title</div>
          <div className="bg-lime-400">
            <BsThreeDotsVertical size={18} />
          </div>
          <div className="bg-yellow-300 col-start-2 col-span-1">Channel</div>
          <div className="bg-amber-500 col-start-2 col-span-1">Post Date</div>
          <div className="bg-yellow-300 col-start-2 col-span-1">Live</div>
        </div>

        {/* Hoverred element */}
        <div className="group-hover:block hidden bg-[#323232] shadow-xl overflow-hidden rounded-xl w-full h-full hover:scale-[1.2] origin-top ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] duration-200 hover:delay-1000">
          <div className="w-full h-full grid grid-cols-[1fr_4fr_0.5fr] grid-rows-[6fr_1.5fr_0.1fr_0.1fr_0.1fr_2.5fr] cursor-pointer">
            <div className="bg-blue-300 col-span-3">
              <div className="border border-black w-full h-full rounded-xl">
                Video
              </div>
            </div>
            <div className="bg-red-200 col-span-1">icon</div>
            <div className="bg-pink-300 col-span-1">Title</div>
            <div className="bg-lime-400">
              <BsThreeDotsVertical size={18} />
            </div>
            <div className="bg-yellow-300 col-start-2 col-span-1 group-hover:text-xs">
              Channel
            </div>
            <div className="bg-amber-500 col-start-2 col-span-1 group-hover:text-xs">
              Post Date
            </div>
            <div className="bg-yellow-300 col-start-2 col-span-1 group-hover:text-xs">
              Live
            </div>
            <div className="bg-blue-500 col-start-1 col-span-3">
              <div
                className={`group-hover:flex group-hover:delay-1000 hidden flex-col justify-center items-center`}
              >
                <div className="bg-[#3b3b3b] w-[85%] flex justify-center items-center my-[2.5px] p-1 rounded-xl">
                  <MdOutlineWatchLater color={`#d7d6d6`} size={20} />
                  <p className="text-[#d7d6d6] text-[0.8rem] ml-3">
                    Watch Later
                  </p>
                </div>
                <div className="bg-[#3b3b3b] w-[85%] flex justify-center items-center my-[2.5px] p-1 rounded-xl">
                  <MdPlaylistPlay color={`#d7d6d6`} size={20} />
                  <p className="text-[#d7d6d6] text-[0.8rem] ml-2">
                    Add To Queue
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoComponent;

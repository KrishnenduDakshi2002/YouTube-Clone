import React, { useState } from "react";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import YouTubeShort from "../assets/youtube-shorts.png";
import { VideoComponent } from "../components/components";



const VideosWrapper = () => {
  return (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] grid-flow-row gap-4 overflow-y-scroll px-6 py-4">
      {Array.from({ length: 16 }, (v, i) => (
        <VideoComponent key={i.toString()} videoId={i.toString()}/>
      ))}
      <div className="col-span-full row-start-3">
        <ShortsSection />
      </div>
      <div className="col-span-full row-start-5">
        <LatestYoutubePostSection />
      </div>
    </section>
  );
};

const LatestYoutubePostSection = () => {
  return (
    <section>
      <p className="text-white h-[4rem] text-2xl font-bold flex items-center pl-3">
        Latest Youtube Posts
      </p>
      <div className="grid grid-cols-[repeat(3,minmax(160px,1fr))] grid-rows-1 auto-rows-[0] overflow-y-hidden gap-x-3 p-3">
        <LatestYoutubePost />
        <LatestYoutubePost />
        <LatestYoutubePost />
      </div>
    </section>
  );
};

const ShortsSection = () => {
  const [shorts_showmore, setShorts_showmore] = useState(false);
  return (
    <section>
      <div className=" h-[4rem] flex items-center pl-6">
        <img src={YouTubeShort} className="w-[25px]" />
        <p className={`text-white text-xl font-bold ml-4`}>Shorts</p>
      </div>
      {/* Hidding extra rows(Implicitly defined 1row of 1fr) formed by the grid 
        by 
        auto-rows-[0]
        overflow-y-hidden

        gap will result in buggy layout
        */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] grid-rows-1 auto-rows-[0] overflow-y-hidden gap-x-3">
        <ShortComponent />
        <ShortComponent />
        <ShortComponent />
        <ShortComponent />
        <ShortComponent />
        <ShortComponent />
        <ShortComponent />
      </div>
      {shorts_showmore && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] grid-rows-1 auto-rows-[0] overflow-y-hidden gap-x-3 mt-3">
          <ShortComponent />
          <ShortComponent />
          <ShortComponent />
          <ShortComponent />
          <ShortComponent />
          <ShortComponent />
          <ShortComponent />
          <ShortComponent />
        </div>
      )}
      <div className="h-[3rem] hover:bg-[#343434]">
        <button
          className="w-full h-full flex justify-center items-center"
          onClick={() => setShorts_showmore((prev) => !prev)}
        >
          {shorts_showmore ? (
            <TfiAngleUp color="white" size={25} />
          ) : (
            <TfiAngleDown color="white" size={25} />
          )}
        </button>
      </div>
    </section>
  );
};
const ShortComponent = () => {
  return (
    <div
      className="bg-green-300  h-[380px] max-w-[220px] 
    grid grid-cols-[4fr_0.5fr] grid-rows-[5fr_1fr_0.5fr] cursor-pointer overflow-hidden rounded-xl"
    >
      <div className="bg-blue-300 col-span-2 pb-3">
        <div className="rounded-xl border border-red-700 h-full w-full"></div>
      </div>
      <div className="bg-amber-500 col-span-1">Channel</div>
      <div className="bg-red-500 col-span-1">Dot</div>
      <div className="bg-green-300">Views</div>
    </div>
  );
};

const LatestYoutubePost = () => {
  return (
    <div className="h-[210px] rounded-xl bg-[#242424] grid grid-cols-[3fr_1.5fr] grid-rows-[1fr_3fr_1fr] p-3 cursor-pointer">
      <div className="bg-blue-300 col-span-2">top</div>
      <div className="bg-green-300">Story</div>
      <div className="bg-pink-300">Img</div>
      <div className="bg-yellow-300">Like</div>
      <div className="bg-orange-700">Share</div>
    </div>
  );
};

const Divider = () => {
  return <div className="bg-[#343434] w-full h-[4px]"></div>;
};
export default VideosWrapper;

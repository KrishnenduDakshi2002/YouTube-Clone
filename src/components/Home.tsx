import React, { useState } from "react";
import VideosWrapper from "./VideosWrapper";
const Filters = [
  "All",
  "Gaming",
  "Mix",
  "Call of Duty",
  "Hauting Story",
  "Story telling",
  "Developement",
  "Music",
  "Comedy",
  "Programming",
  "Background music",
  "Bollywood music",
  "Dance",
  "New to me",
  "Trends",
  "Badminton",
  "Web development",
  "Watched",
  "Recently uploaded",
  "Laughter",
  "Netflix movies",
  "Movie review",
];
const Home = () => {
  const [filter, setfilter] = useState("");
  const [active, setActive] = useState("0");
  return (
    <div className="bg-black w-full h-full grid grid-rows-[3rem_1fr]">
      <div className="grid  grid-flow-col overflow-x-auto scrollbar-hidden py-2">
        {Filters.map((filter, id) => (
          <button
            id={id.toString()}
            onClick={(e) => {
              setfilter(filter);
              const res = (e.target as HTMLButtonElement).id;
              setActive(res);
            }}
            key={id}
            className={`${
              active === id.toString()
                ? "bg-[white] text-black"
                : "bg-[#272727] text-white hover:bg-[#444444]"
            } mx-2 px-3 py-1 flex justify-center items-center whitespace-nowrap rounded-lg text-sm cursor-pointer `}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* https://codepen.io/lookininward/pen/zYOQjZM */}
      <VideosWrapper/>
    </div>
  );
};

export default Home;

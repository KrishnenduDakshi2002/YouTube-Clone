import React, { useState } from "react";
import VideosWrapper from "../molecule/VideosWrapper";
import AddToQueueComponent from "../molecule/AddToQueueComponent";
import { useAddtoQueueContext } from "../../../Context/AddToQueueContext";
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
  const {AddtoQueueList} = useAddtoQueueContext();
  const [filter, setfilter] = useState("");
  const [active, setActive] = useState("0");
  const [isAddToQueueVisible, setIsAddToQueueVisible] = useState(true);

  return (
    <div className="bg-black w-full h-full grid grid-rows-[3rem_1fr] relative">
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
      <VideosWrapper />
      {
        AddtoQueueList.length > 0 && isAddToQueueVisible &&
      <AddToQueueComponent setVisibility={()=>setIsAddToQueueVisible(prev=>!prev)}/>
      }
    </div>
  );
};

export default Home;

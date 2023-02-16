import React, { useEffect, useRef, useState } from "react";
import TestVideo from "../assets/Video/test-video.mp4";
import { MdDragHandle, MdKeyboardArrowDown } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import Thumbnail4 from "../assets/Thumbnail-4.jpg";

import { useAddtoQueueContext } from "../../../Context/AddToQueueContext";
import { RxExternalLink } from "react-icons/rx";
import { FaPause, FaPlay } from "react-icons/fa";
import {
  AiOutlineClose,
  AiOutlineStepBackward,
  AiOutlineStepForward,
} from "react-icons/ai";

function AddToQueueComponent({setVisibility}:{setVisibility:()=>void}) {
  const [expandQueue, setExpandQueue] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const VideoRef = useRef<HTMLVideoElement | null>(null);
  const { AddtoQueueList,setAddtoQueueList } = useAddtoQueueContext();

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div>
      <div className="bg-[#212121] w-[25rem] absolute bottom-0 right-5 rounded-t-xl overflow-hidden z-[4]">
        <div className="bg-blue-300 aspect-video relative group">
          {/* Controls */}
          <div className="group-hover:flex hidden items-center absolute bg-[rgba(0,0,0,0.6)] cursor-pointer w-full h-full top-0 text-white">
            <div className="flex justify-between p-2 absolute top-0 w-full">
              <button className="rotate-[-90deg]">
                <RxExternalLink size={25} />
              </button>
              <button
              onClick={()=>setIsModalVisible(prev=>!prev)}
              >
                <AiOutlineClose size={25} />
              </button>
            </div>
            <div className="flex justify-evenly items-center w-full">
              <button className="">
                <AiOutlineStepBackward size={40} />
              </button>
              <button
                className=""
                onClick={() => {
                  if (VideoRef.current == null) return;
                  if (!isPlaying) VideoRef.current.play();
                  else VideoRef.current.pause();
                  VideoRef.current.muted = false;
                  setIsPlaying((prev) => !prev);
                }}
              >
                {isPlaying ? <FaPause size={32} /> : <FaPlay size={35} />}
              </button>
              <button className="">
                <AiOutlineStepForward size={40} />
              </button>
            </div>
          </div>
          {/* video player */}
          <video
            ref={VideoRef}
            src={TestVideo}
            muted
            loop
            className="w-full h-full"
          ></video>
        </div>
        <div className="py-3 flex text-white">
          <p>CODM is getting more popular than Apex legend mobile?</p>
          <button onClick={() => setExpandQueue((prev) => !prev)}>
            <MdKeyboardArrowDown size={25} />
          </button>
        </div>

        {expandQueue && (
          <div className="bg-black border border-gray-700">
            <div className="">save</div>
            <div className="h-[15rem] overflow-y-auto">
              {AddtoQueueList.map((v, i) => (
                <VideoQueueElement
                  isDragging
                  setIsDragging={(val: boolean) => setIsDragging(() => val)}
                  index={i}
                  title={v.title}
                  channelTitle={v.channelTitle}
                  thumbnail={v.thumbnail}
                  video_url={v.videoUrl}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {
        isModalVisible &&
        <CloseModal isVisible={isModalVisible} setIsVisible={()=>setIsModalVisible(prev=>!prev)} setClosePlayer={()=>setAddtoQueueList([])}/>
      }
    </div>
  );
}

function CloseModal({isVisible,setIsVisible,setClosePlayer}:{isVisible:boolean;setIsVisible:()=>void;setClosePlayer:()=>void;}) {

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.4)] z-[100] flex justify-center items-center">
      {/* modal */}
      <div className="bg-[#212121] w-[25rem] h-[12rem] rounded-xl text-white flex items-end flex-col p-7">
        <div className="flex-1 w-full font-bold font-sans">
          Queue will be cleared
        </div>
        <div className="flex-1 w-full text-gray-500">
          Are you sure that you want to close the player?
        </div>
        <div className="flex-1 w-full flex items-end justify-end">
          <button className="mr-8 font-bold" onClick={()=>setIsVisible()}>Cancel</button>
          <button className="mr-8 text-blue-500 font-bold" onClick={()=>setClosePlayer()}>Close player</button>
        </div>
      </div>
    </div>
  );
}

function VideoQueueElement({
  isDragging,
  setIsDragging,
  title,
  channelTitle,
  thumbnail,
  video_url,
  index,
}: {
  isDragging: boolean;
  setIsDragging: (val: boolean) => void;
  title: string;
  channelTitle: string;
  thumbnail: string;
  video_url: string;
  index: number;
}) {
  const { AddtoQueueList, setAddtoQueueList } = useAddtoQueueContext();
  // getting the item which is been dragged
  const [dragStartItem, setDragStartItem] = useState(AddtoQueueList[index]);

  const [dragOverItemIndex, setDragOverItemIndex] = useState<number>(index);

  return (
    <div
      draggable
      className="cursor-move grid grid-cols-[auto_7rem_auto_1rem] grid-rows-[auto_2rem] gap-x-1 text-white justify-items-start"
      onDragStart={(e) => {
        e.dataTransfer.setData("queue_index", index.toString());
        setIsDragging(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOverItemIndex(index);
      }}
      onDrop={(e) => {
        e.preventDefault();
        const prev_idx = +e.dataTransfer.getData("queue_index");
        const curr_idx = dragOverItemIndex;
        let CurrentPos;
        let PrevPos;
        let ReplacementData = AddtoQueueList[prev_idx];
        if (curr_idx >= prev_idx) {
          CurrentPos = curr_idx + 1;
          PrevPos = prev_idx;
        } else {
          CurrentPos = curr_idx;
          PrevPos = prev_idx + 1;
        }
        AddtoQueueList.splice(CurrentPos, 0, ReplacementData);
        AddtoQueueList.splice(PrevPos, 1);
        setIsDragging(false);
      }}
    >
      <div className="flex items-end">
        <MdDragHandle size={22} />
      </div>
      <div className="">
        <img
          src={thumbnail}
          alt=""
          className="rounded-xl aspect-video w-[12rem] object-cover"
        />
      </div>
      <p>{title}</p>
      <button>
        <BsThreeDotsVertical />
      </button>
      <p className="col-start-3 col-span-full">{channelTitle}</p>
    </div>
  );
}

export default AddToQueueComponent;

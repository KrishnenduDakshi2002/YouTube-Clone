import { AiFillSetting, AiOutlineStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import TestVideo from "../assets/Video/test-video.mp4";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { GrPauseFill, GrPlayFill } from "react-icons/gr";
// import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { FaPlay, FaPause } from "react-icons/fa";
import { IconType, IconBaseProps } from "react-icons";
import { MdClosedCaption } from "react-icons/md";
import { TbPictureInPicture, TbRectangle } from "react-icons/tb";
import { BiFullscreen } from "react-icons/bi";

import "../css/VideoPlayer.css";

const LeadingZeroFormater = Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

function FormatDuration(time: number) {
  const minutes = Math.floor(time / 60) % 60;
  const seconds = Math.floor(time % 60);
  const hours = Math.floor(minutes / 60);
  if (hours === 0) {
    return `${LeadingZeroFormater.format(minutes)}:${LeadingZeroFormater.format(
      seconds
    )}`;
  } else {
    return `${LeadingZeroFormater.format(hours)}:${LeadingZeroFormater.format(
      minutes
    )}:${LeadingZeroFormater.format(seconds)}`;
  }
}

const VideoPlayer = () => {
  const VideoRef = useRef<HTMLVideoElement | null>(null);
  const SeekRef = useRef<HTMLInputElement | null>(null);
  const VideoContrainerRef = useRef<HTMLDivElement | null>(null);

  const HandleProgress = () => {
    if (VideoRef.current && SeekRef.current) {
      if (isNaN(VideoRef.current.duration)) return;
      const progress =
        (VideoRef.current.currentTime / VideoRef.current.duration) * 100;
      // setProgress(progress);
      SeekRef.current.value = progress.toString();
    }
  };

  return (
    <div ref={VideoContrainerRef} className="relative bg-black">
      <Controls VideoRef={VideoRef} VideoContainerRef={VideoContrainerRef} />
      <video
        src={TestVideo}
        ref={VideoRef}
        onPlay={() => {}}
        onProgress={(e) => {
          const target = e.target as HTMLVideoElement;
          const Buffer = target.buffered.end(0);
          const duration = target.duration;
          const currentTime = target.currentTime;
          console.log("buffered: ", (Buffer / duration) * 100);
          console.log("current time: ", currentTime);
        }}
        className="h-full w-full"
        onTimeUpdate={HandleProgress}
      ></video>
    </div>
  );
};

function Controls({
  VideoRef,
  VideoContainerRef,
}: {
  VideoRef: React.MutableRefObject<HTMLVideoElement | null>;
  VideoContainerRef: React.MutableRefObject<HTMLDivElement | null>;
}) {
  const [isPlaying, setisPlaying] = useState(false);
  const [ToggleAutoPlay, setToggleAutoPlay] = useState(false);
  const VolumeRef = useRef<HTMLInputElement | null>(null);
  const [Theme, setTheme] = useState("white");

  const CurrentTimeStamp = useRef<HTMLParagraphElement | null>(null);
  const DurationTimeStamp = useRef<HTMLParagraphElement | null>(null);
  const TimeLine = useRef<HTMLDivElement | null>(null);
  const BufferLine = useRef<HTMLDivElement | null>(null);

  function ToggleFullScreen() {
    if (VideoContainerRef.current) {
      if (document.fullscreenElement == null)
        VideoContainerRef.current.requestFullscreen();
      else document.exitFullscreen();
    }
  }

  // getting duration and setting it to current time and duration paragraph
  if (VideoRef.current != null) {
    VideoRef.current.ontimeupdate = () => {
      // for updating the current time
      if (CurrentTimeStamp.current) {
        CurrentTimeStamp.current.innerText = FormatDuration(
          VideoRef.current?.currentTime || 0
        );
      }
      // for updating the duration
      if (DurationTimeStamp.current) {
        DurationTimeStamp.current.innerText = FormatDuration(
          VideoRef.current?.duration || 0
        );
      }
      // for updating the timeline
      if(TimeLine.current != null && VideoRef.current != null){
        const timeFactor = VideoRef.current.currentTime / VideoRef.current.duration;
        TimeLine.current.style.setProperty('--progress',timeFactor.toString());
      }
    };
  }

  function HandleSeeking(e: React.MouseEvent<HTMLDivElement, MouseEvent>){
    const target = e.target as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    const percentage =
      Math.min(Math.max(0, e.clientX - rect.x), rect.width) /
      rect.width;
    return percentage;
  }

  return (
    <div className="z-10 w-full h-[3rem] absolute bottom-0 grid grid-rows-[1rem_1fr] grid-cols-[repeat(3,1fr)_2fr_10fr_1.1fr_repeat(5,1fr)]">
      <div className="col-span-full flex-center-center">
        {/* timeline */}
        <div
          ref={TimeLine}
          className="timeline-container"
          onMouseMove={(e) => {
            const percentage = HandleSeeking(e);
            if (TimeLine.current != null) {
              TimeLine.current.style.setProperty(
                "--buffer",
                percentage.toString()
              );
            }
          }}
          onClick={(e) => {
            const percentage = HandleSeeking(e);
            if (TimeLine.current != null) {
              TimeLine.current.style.setProperty(
                "--progress",
                percentage.toString()
              );
            }
            if(VideoRef.current != null){
              VideoRef.current.currentTime = VideoRef.current.duration * percentage;
            }
          }}
        >
          <div
            className="timeline-cursor"
            onMouseMove={(e) => e.stopPropagation()}
          ></div>
        </div>
      </div>
      {!isPlaying && (
        <Button
          onClick={() => {
            VideoRef.current?.play();
            setisPlaying(true);
          }}
          icon={<FaPlay color="white" size={25} />}
        />
      )}
      {isPlaying && (
        <Button
          onClick={() => {
            VideoRef.current?.pause();
            setisPlaying(false);
          }}
          icon={<FaPause color="white" size={25} />}
        />
      )}
      <Button icon={<AiOutlineStepForward color={Theme} size={30} />} />
      <div className="group flex-center-center">
        <div className="">
          <Button icon={<HiSpeakerWave color={Theme} size={22} />} />
        </div>
        <input
          ref={VolumeRef}
          className="group-hover:block hidden bg-red-300 w-[100px] h-[5px]"
          type={"range"}
          defaultValue={"100"}
          onChange={(e) => {
            if (VideoRef.current) {
              VideoRef.current.volume = +e.target.value / 100;
            }
          }}
        />
      </div>

      <div className="text-[0.8rem] text-white flex-center-center w-[7rem] flex items-center">
        <p ref={CurrentTimeStamp}>00:00</p>
        <span>/</span>
        <p ref={DurationTimeStamp}>23:12</p>
      </div>
      <div className=""></div>
      <div className="flex-center-center w-[2.5rem]">
        <Toggle
          toggle={ToggleAutoPlay}
          setToggle={() => setToggleAutoPlay((prev) => !prev)}
        />
      </div>
      <Button icon={<MdClosedCaption color={Theme} size={26} />} />
      <Button icon={<AiFillSetting color={Theme} size={26} />} />
      <Button icon={<TbPictureInPicture color={Theme} size={26} />} />
      <Button icon={<TbRectangle color={Theme} size={26} />} />
      <Button
        onClick={ToggleFullScreen}
        icon={<BiFullscreen color={Theme} size={26} />}
      />
    </div>
  );
}

const Button = ({ icon, onClick }: { icon: any; onClick?: () => void }) => (
  <div className="mx-auto px-3 flex justify-center items-center">
    <button onClick={onClick}>{icon}</button>
  </div>
);

const Toggle = ({
  toggle,
  setToggle,
}: {
  toggle: boolean;
  setToggle: () => void;
}) => {
  return (
    <button
      onClick={() => setToggle()}
      className="bg-gray-300 rounded-2xl h-[0.8rem] w-full relative"
    >
      <div
        className={`absolute bg-white rounded-full p-[0.4rem] translate-y-[-50%] ${
          toggle ? "translate-x-full" : "translate-x-0"
        }`}
      >
        {!toggle ? (
          <GrPauseFill color={"black"} size={10} />
        ) : (
          <GrPlayFill color={"black"} size={10} />
        )}
      </div>
    </button>
  );
};

export default VideoPlayer;

import { AiFillSetting, AiOutlineStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import TestVideo from "../assets/Video/test-video.mp4";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GrPauseFill, GrPlayFill } from "react-icons/gr";
import { MdClosedCaption } from "react-icons/md";
import { TbPictureInPicture, TbRectangle } from "react-icons/tb";
import { BiFullscreen } from "react-icons/bi";

import "../css/VideoPlayer.css";
import { IoMdPause, IoMdPlay } from "react-icons/io";

const LeadingZeroFormatter = Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

function FormatDuration(time: number) {
  const minutes = Math.floor(time / 60) % 60;
  const seconds = Math.floor(time % 60);
  const hours = Math.floor(minutes / 60);
  if (hours === 0) {
    return `${LeadingZeroFormatter.format(minutes)}:${LeadingZeroFormatter.format(
      seconds
    )}`;
  } else {
    return `${LeadingZeroFormatter.format(hours)}:${LeadingZeroFormatter.format(
      minutes
    )}:${LeadingZeroFormatter.format(seconds)}`;
  }
}

const VideoPlayer = () => {
  const VideoRef = useRef<HTMLVideoElement | null>(null);
  const SeekRef = useRef<HTMLInputElement | null>(null);
  const VideoContainerRef = useRef<HTMLDivElement | null>(null);

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
    <div ref={VideoContainerRef} className="relative bg-black">
      <Controls VideoRef={VideoRef} VideoContainerRef={VideoContainerRef} />
      <video
        src={TestVideo}
        ref={VideoRef}
        onPlay={() => {}}
        className="h-full w-full"
        onTimeUpdate={HandleProgress}
      ></video>
      {/* <div className=" absolute top-[50%] left-[50%] bg-white rounded-full">
        {VideoRef.current?.paused ? (
          <FaPlayCircle size={75} />
        ) : (
          <FaPauseCircle size={75} />
        )}
      </div> */}
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
  const [Theme, setTheme] = useState("white");

  const CurrentTimeStamp = useRef<HTMLParagraphElement | null>(null);
  const DurationTimeStamp = useRef<HTMLParagraphElement | null>(null);
  const TimeLine = useRef<HTMLDivElement | null>(null);
  const VolumeRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  useEffect(() => {
    document.addEventListener("keydown", HandlePlayPause);
    return () => {
      document.removeEventListener("keydown", HandlePlayPause);
    };
  }, []);

  function HandlePlayPause(e: KeyboardEvent) {
    e.preventDefault();
    if (e.repeat) return;
    if (e.code === "Space") {
      if (VideoRef.current) {
        if (VideoRef.current.paused) {
          VideoRef.current.play();
          setisPlaying(true);
        } else {
          VideoRef.current.pause();
          setisPlaying(false);
        }
      }
    }
  }

  function ToggleFullScreen() {
    if (VideoContainerRef.current) {
      if (document.fullscreenElement == null)
        VideoContainerRef.current.requestFullscreen();
      else document.exitFullscreen();
    }
  }

  function HandleSeeking(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    const percentage =
      Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width;
    return percentage;
  }
  function HandleVolume(e: MouseEvent) {
    const target = e.target as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    const percentage = (rect.width - (e.clientX - rect.x)) / rect.width;
    console.log(percentage);
    if (VolumeRef.current != null && VideoRef.current != null) {
      VolumeRef.current.style.setProperty("--volume", percentage.toString());
      // VideoRef.current.volume = percentage;
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
      if (TimeLine.current != null && VideoRef.current != null) {
        const timeFactor =
          VideoRef.current.currentTime / VideoRef.current.duration;
        const bufferFactor =
          VideoRef.current.buffered.end(0) / VideoRef.current.duration;
        TimeLine.current.style.setProperty("--progress", timeFactor.toString());
        TimeLine.current.style.setProperty("--buffer", bufferFactor.toString());
      }
    };
  }

  return (
    <div className="control-container z-10 w-full p-3 absolute bottom-0 grid grid-rows-[1rem_1fr]">
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
          if (VideoRef.current != null) {
            VideoRef.current.currentTime =
              VideoRef.current.duration * percentage;
          }
        }}
      >
        <div
          className="timeline-cursor"
          onMouseMove={(e) => e.stopPropagation()}
        ></div>
      </div>
      <div className="flex">
        <div className="w-full flex-[2_2_0%] flex items-center">
          <div>
            {!isPlaying ? (
              <Button
                onClick={() => {
                  VideoRef.current?.play();
                  setisPlaying(true);
                }}
                icon={<IoMdPlay color="white" size={25} />}
              />
            ) : (
              <Button
                onClick={() => {
                  VideoRef.current?.pause();
                  setisPlaying(false);
                }}
                icon={<IoMdPause color="white" size={25} />}
              />
            )}
          </div>
          <div>
            <Button icon={<AiOutlineStepForward color={Theme} size={30} />} />
          </div>
          <div className="group flex-center-center">
            <div className="">
              <Button icon={<HiSpeakerWave color={Theme} size={22} />} />
            </div>

            {/* volume */}
            <div
              ref={VolumeRef}
              className="group-hover:block hidden volume-container"
            >
              <div
                className="volume-cursor"
                onMouseMove={(e) => e.stopPropagation()}
              ></div>
            </div>
          </div>

          <div className="text-[0.8rem] text-white flex-center-center w-[7rem] flex items-center">
            <p ref={CurrentTimeStamp}>00:00</p>
            <span>/</span>
            <p ref={DurationTimeStamp}>23:12</p>
          </div>
        </div>

        <div className=" w-full flex-1 grid grid-cols-6 place-content-center">
          <div className="flex-center-center">
            <Toggle
              toggle={ToggleAutoPlay}
              setToggle={() => setToggleAutoPlay((prev) => !prev)}
            />
          </div>
          <div>
            <Button icon={<MdClosedCaption color={Theme} size={28} />} />
          </div>
          <div>
            <Button icon={<AiFillSetting color={Theme} size={28} />} />
          </div>
          <div>
            <Button icon={<TbPictureInPicture color={Theme} size={28} />} />
          </div>
          <div>
            <Button icon={<TbRectangle color={Theme} size={28} />} />
          </div>
          <div>
            <Button
              onClick={ToggleFullScreen}
              icon={<BiFullscreen color={Theme} size={28} />}
            />
          </div>
        </div>
      </div>
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
      className="bg-gray-300 rounded-2xl h-[0.8rem] w-full max-w-[2.5rem] relative"
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

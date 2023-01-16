import { AiFillSetting, AiOutlineStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import TestVideo from "../assets/Video/One Earth - Environmental Short Film.mp4";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { GrPauseFill, GrPlayFill } from "react-icons/gr";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { IconType, IconBaseProps } from "react-icons";
import { MdClosedCaption } from "react-icons/md";
import { TbPictureInPicture, TbRectangle } from "react-icons/tb";
import { BiFullscreen } from "react-icons/bi";

const VideoPlayer = () => {
  const [Theme, setTheme] = useState("white");
  const VideoRef = useRef<HTMLVideoElement | null>(null);
  const VolumeRef = useRef<HTMLInputElement | null>(null);
  const SeekRef = useRef<HTMLInputElement | null>(null);
  const [isPlaying, setisPlaying] = useState(false);
  const [Progress, setProgress] = useState(0);
  const [ToggleAutoPlay, setToggleAutoPlay] = useState(false);

  const HandleProgress = ()=>{
    if(VideoRef.current && SeekRef.current){
      if(isNaN(VideoRef.current.duration)) return;
      const progress = ((VideoRef.current.currentTime / VideoRef.current.duration) * 100)
      // setProgress(progress);
      SeekRef.current.value = progress.toString()

    }
  }
  return (
      <div className="w-full h-full relative">
        <div className="z-20 w-full h-[3rem] cursor-pointer absolute bottom-0 grid grid-rows-[1rem_1fr] grid-cols-[repeat(3,1fr)_2fr_10fr_1.1fr_repeat(5,1fr)]">
          <div className="col-span-full flex-center-center">
            <input
              ref={SeekRef}
              defaultValue={0}
              type="range"
              className="w-full bg-red-600 h-[5px]"
              step={'0'}
              onChange={(e) => {
                if (VideoRef.current) {
                  VideoRef.current.currentTime = +e.target.value;
                }
              }}
            />
            {/* <div ref={SeekRef} className={`bg-red-600 h-full w-[${5}%]`}></div> */}
          </div>
          {!isPlaying && (
            <Button
              onClick={() => {
                VideoRef.current?.play();
                setisPlaying(true);
              }}
              icon={<BsFillPlayFill color={Theme} size={35} />}
            />
          )}
          {isPlaying && (
            <Button
              onClick={() => {
                VideoRef.current?.pause();
                setisPlaying(false);
              }}
              icon={<BsFillPauseFill color={Theme} size={35} />}
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
              defaultValue={'100'}
              onChange={(e) => {
                if (VideoRef.current) {
                  VideoRef.current.volume = +e.target.value / 100;
                }
              }}
            />
          </div>
  
          <div className="text-[0.8rem] text-white flex-center-center w-[7rem]">
            00:00 / 20:12
          </div>
          <div className=""></div>
          <div className="flex-center-center w-[2.5rem]">
            <Toggle toggle={ToggleAutoPlay} setToggle={()=>setToggleAutoPlay(prev=> !prev)} />
          </div>
          <Button icon={<MdClosedCaption color={Theme} size={26} />} />
          <Button icon={<AiFillSetting color={Theme} size={26} />} />
          <Button icon={<TbPictureInPicture color={Theme} size={26} />} />
          <Button icon={<TbRectangle color={Theme} size={26} />} />
          <Button icon={<BiFullscreen color={Theme} size={26} />} />
        </div>
        <video
          src={TestVideo}
          ref={VideoRef}
          onPlay={() =>{
          }}
          className="h-full w-full"
          onTimeUpdate={HandleProgress}
        ></video>
      </div>

  );
};

const Setting = () =>{
  return
}

const Button = ({ icon, onClick }: { icon: any; onClick?: () => void }) => (
  <div className="mx-auto px-3 flex justify-center items-center">
    <button onClick={onClick}>{icon}</button>
  </div>
);

const Toggle = ({ toggle, setToggle }: { toggle: boolean; setToggle:()=>void }) => {
  return (
    <button onClick={()=> setToggle()} className="bg-gray-300 rounded-2xl h-[0.8rem] w-full relative">
      <div className={`absolute bg-white rounded-full p-[0.4rem] translate-y-[-50%] ${toggle ? 'translate-x-full':'translate-x-0'}`}>
        { !toggle ? <GrPauseFill color={"black"} size={10} /> :  <GrPlayFill color={"black"} size={10} /> }
      </div>
    </button>
  );
};

export default VideoPlayer;

import React, { useEffect, useRef, useState } from 'react'
import { FaMicrophone } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import TestVideo from '../assets/Video/test-video.mp4'


function VoiceSearchComponent({setIsVisibleVoiceSearch}:{setIsVisibleVoiceSearch:()=>void}) {
    const AudioRef = useRef<HTMLAudioElement|null>(null);
    const [isMicroPhoneActive, setIsMicroPhoneActive] = useState(true);
    useEffect(() => {
        navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
            if(AudioRef.current == null)return;
            // getting the first audio track
            const AudioTrack = stream.getAudioTracks()[0];
            
            AudioRef.current.srcObject = stream;
            AudioRef.current.autoplay = true;
        })
        .catch((err) => {
          console.error(`you got an error: ${err}`);
        });
    }, [])
    
  return (
    <div className='fixed top-2 bottom-0 right-0 left-0 z-[110] bg-[rgba(0,0,0,0.5)] flex justify-center' onClick={(e)=>{
        setIsVisibleVoiceSearch();
    }}>
        <div className="bg-[#212121] w-[40rem] h-[28rem] flex flex-col rounded-xl p-5 text-white" onClick={e=>e.stopPropagation()}>
            <div className="flex-3 flex justify-end">
                <button onClick={()=>setIsVisibleVoiceSearch()} >
                    <IoClose  size={30}/>
                </button>
            </div>
            <div className='text-3xl flex-1'>
                {/* <p>Listening...</p>
                <p>Microphone off. Try again</p> */}
                <audio ref={AudioRef} controls></audio>

            </div>
            <div className="flex-1  flex flex-col justify-center items-center">
                <button className='w-20 h-20 rounded-full bg-red-700 flex justify-center items-center cursor-pointer'>
                    <FaMicrophone size={30}/>
                </button>
                <p className='text-sm text-gray-400'>Tap the microphone to try again</p>
            </div>
        </div>
    </div>
  )
}

export default VoiceSearchComponent
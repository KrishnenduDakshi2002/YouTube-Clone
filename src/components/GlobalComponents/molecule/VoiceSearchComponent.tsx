import React, { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

function VoiceSearchComponent({
  setIsVisibleVoiceSearch,
}: {
  setIsVisibleVoiceSearch: () => void;
}) {
  //   Hooks

  const [isMicroPhoneActive, setIsMicroPhoneActive] = useState(true);
  const SearchTextAreaRef = useRef<HTMLParagraphElement | null>(null);


  // Speech recognition
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  let speechRecognition = new window.SpeechRecognition();
  speechRecognition.interimResults = true;
  speechRecognition.lang = "en-US";

  speechRecognition.addEventListener("result", (e: any) => {
    const searchString = e.results[0][0].transcript;
    console.log(e.results[0][0].transcript);
    if(SearchTextAreaRef.current){
        SearchTextAreaRef.current.innerText = searchString;
    }
  });

  function HandleSessionEnd(){
    console.log("session restarting");
    speechRecognition.start();
  }

  useEffect(()=>{
    // adding end event listner when mounting
    console.log('mounting')
    speechRecognition.addEventListener("end", HandleSessionEnd);

    return ()=>{
        console.log('unmounting')
        // on unmounting it will remove the event listener which has been add while mounting
        speechRecognition.removeEventListener('end',HandleSessionEnd);
    }
  })

  return (
    <div
      className="fixed top-2 bottom-0 right-0 left-0 z-[110] bg-[rgba(0,0,0,0.5)] flex justify-center"
      onClick={(e) => {
        setIsVisibleVoiceSearch();
      }}
    >
      <div
        className="bg-[#212121] w-[40rem] h-[28rem] flex flex-col rounded-xl p-5 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-3 flex justify-end">
          <button onClick={() => {setIsVisibleVoiceSearch()}}>
            <IoClose size={30} />
          </button>
        </div>
        <div className="text-3xl flex-1">
          {isMicroPhoneActive ? (
            <p ref={SearchTextAreaRef}>Listening...</p>
          ) : (
            <p>Microphone off. Try again</p>
          )}
        </div>
        <div className="flex-1  flex flex-col justify-center items-center">
          {isMicroPhoneActive ? (
            <button
              className="w-20 h-20 rounded-full bg-red-700 flex justify-center items-center cursor-pointer"
              onClick={() => {
                // setIsMicroPhoneActive(false);
                speechRecognition.start();
              }}
            >
              <FaMicrophone size={30} />
            </button>
          ) : (
            <button
              className="w-20 h-20 rounded-full bg-red-700 flex justify-center items-center cursor-pointer"
              onClick={() => {
                // setIsMicroPhoneActive(true);
                // speechRecognition.start();
              }}
            >
              <FaMicrophoneSlash size={30} />
            </button>
          )}
          <p className="text-sm text-gray-400">
            Tap the microphone to try again
          </p>
        </div>
      </div>
    </div>
  );
}

export default VoiceSearchComponent;

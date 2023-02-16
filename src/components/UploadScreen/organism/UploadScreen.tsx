import React from 'react'

function UploadScreen() {
  return (
    <div className='bg-black h-full flex justify-center items-center'>
        <div className="bg-[#212121] rounded-xl h-full w-3/4 grid grid-rows-[3rem_5rem_1fr_3rem] overflow-hidden">
          <div className="bg-green-300">
            header
          </div>
          <div className="">
            
          </div>
          <div className="bg-blue-300 overflow-hidden grid grid-cols-[2fr_1fr]">
            <div className="bg-red-300 overflow-auto">body</div>
            <div className="">sidebar</div>
          </div>
          <div className="">footer</div>
        </div>
    </div>
  )
}

export default UploadScreen
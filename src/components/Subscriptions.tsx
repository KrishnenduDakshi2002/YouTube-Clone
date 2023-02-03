import React, { useRef } from 'react'
import {uploadFile} from '../AWS/uploadFile';


const Subscriptions = () => {
  const FileRef = useRef<HTMLInputElement|null>(null)
  return (
    <div>
      <form className='w-full h-full' onSubmit={async (e)=>{
          e.preventDefault();
          if(FileRef.current?.files == null) return;
          
          const file = FileRef.current.files[0];
          uploadFile(file,'thumbnails/'+file.name);

      }}>
        <input type="file" ref={FileRef}/>
        <button className='bg-blue-300 p-2 rounded-xl'>submit</button>
      </form>

      <img src="https://youtube-clone-storage-kd.s3.ap-south-1.amazonaws.com/thumbnails/IMG_20211015_135533_459.jpeg" alt="" className='w-[20rem] aspect-square' />
    </div>
  )
}

export default Subscriptions
import React, { useState } from "react";
import Comment from "./Comment";
import { MdOutlineSort } from "react-icons/md";
import Comments from '../data/comments.json';
import NestedComment from "./NestedComment";

const CommentSection = () => {
  const [ToggleSort, setToggleSort] = useState(false);
  return (
    <div>
      <div className="flex items-center">
        <p className="font-semibold text-[1.1rem] text-white mr-10">
          {Comments.length} Comments
        </p>
        <div className="relative flex-center-center">
          <button onClick={()=>setToggleSort(prev => !prev)}>
            <MdOutlineSort color="white" size={30} />
          </button>
          <p className="font-semibold text-[1.1rem] text-white ml-2 ">Sort By</p>
          {
            ToggleSort &&
            (
              <div className="absolute top-[2rem] left-0 w-[8rem] h-[6rem] bg-red-400 rounded-xl grid grid-rows-2">
                <p>Top Comments</p>
                <p>Newest First</p>
              </div>

            )
          }
        </div>
      </div>
      <div className="my-5 flex">
        <div className="h-[50px] w-[50px] rounded-full bg-pink-100"></div>
        <input
          className="ml-5 outline-none w-full bg-inherit border-b border-gray-400 text-white"
          placeholder="Comment"
        />
      </div>
      <div className="">
        <button className="bg-blue-400 p-2 rounded-lg ">Comment</button>
      </div>
      <div>
        {
            Comments.map(comment=> <NestedComment comments={comment}/>)
        }
      </div>
    </div>
  );
};

export default CommentSection;

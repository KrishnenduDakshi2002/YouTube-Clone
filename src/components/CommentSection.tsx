import React from "react";
import Comment from "./Comment";
import { MdOutlineSort } from "react-icons/md";
import Comments from '../data/comments.json';
import NestedComment from "./NestedComment";

const CommentSection = () => {
  return (
    <div>
      <div className="flex items-center">
        <p className="font-semibold text-[1.1rem] text-white mr-10">
          {Comments.length} Comments
        </p>
        <button>
          <MdOutlineSort color="white" size={30} />
        </button>
        <p className="font-semibold text-[1.1rem] text-white ml-2 ">Sort By</p>
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

import React, { useState } from "react";
import NestedComment from "./NestedComment";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
export interface CommentInterface {
  author: string;
  date: string;
  comment: string;
  replies: Array<CommentInterface>;
}
const Comment: React.FC<CommentInterface> = ({
  author,
  date,
  replies,
  comment,
}) => {
  const [CollapseReply, setCollapseReply] = useState(true);
  return (
    <div className="mb-5 grid grid-cols-[4rem_1fr] grid-rows-[1.5rem_auto_1.5rem_auto_auto] gap-y-1">
      <div className="row-span-full">
        <div className="bg-purple-300 h-[3rem] w-[3rem] rounded-full"></div>
      </div>
      <div className="text-sm text-white font-semibold">{author} <span className="text-xs text-gray-400 ml-2">{date}</span></div>
      <div className="text-[0.9rem] text-white mb-2">{comment}</div>
      <div className="flex items-center">
        <AiOutlineLike  size={22} color="white"/>
        <span className="text-sm text-gray-300 ml-2 mr-5">20</span>
        <AiOutlineDislike size={22} color="white"/>
      </div>
      {replies.length > 0 ? (
        <div className={`mb-3`}>
          <button
            className="flex-center-center text-[#1e90ff]"
            onClick={() => setCollapseReply((prev) => !prev)}
          >
            {CollapseReply ? (
              <TiArrowSortedDown  size={20}/>
            ) : (
              <TiArrowSortedUp  size={20}/>
            )}
            <span className="ml-2">{replies.length} {replies.length > 1 ? 'replies' :'reply'}</span>
          </button>
        </div>
      ) : (
        <></>
      )}
      {
        !CollapseReply &&
        (
            <div className="">
                {replies.length > 0 &&
                replies.map((reply) => <NestedComment comments={reply} />)}
            </div>

        )
      }
    </div>
  );
};

export default Comment;

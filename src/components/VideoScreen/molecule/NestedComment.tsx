import React from 'react'
import Comment, { CommentInterface } from '../atom/Comment';

const NestedComment = ({comments}:{comments:CommentInterface}) => {
  return (
    <Comment {...comments}/>
  )
}

export default NestedComment
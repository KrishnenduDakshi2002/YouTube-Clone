import React from 'react'
import Comment, { CommentInterface } from './Comment';

const NestedComment = ({comments}:{comments:CommentInterface}) => {
  return (
    <Comment {...comments}/>
  )
}

export default NestedComment
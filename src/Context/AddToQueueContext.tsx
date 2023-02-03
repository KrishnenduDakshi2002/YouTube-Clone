import React, { createContext, useContext, useState } from 'react';

interface Queue{
  title: string;
  thumbnail: string;
  channelTitle:string;
  liveBroadcastContent:string;
  videoUrl: string;
}

const Queue:Array<Queue> = [];

interface QueueContextInterface{
    AddtoQueueList : Array<Queue>,
    setAddtoQueueList:  React.Dispatch<React.SetStateAction<Queue[]>>
}

const QueueContext = createContext<QueueContextInterface>({
    AddtoQueueList : [],
    setAddtoQueueList : () => {}
})

export function useAddtoQueueContext(){
  return useContext(QueueContext);
}

function AddToQueueContext({children}:{children:JSX.Element}) {
    const [AddtoQueueList, setAddtoQueueList] = useState(Queue);
  return (
    <QueueContext.Provider value={{
        AddtoQueueList : AddtoQueueList,
        setAddtoQueueList: setAddtoQueueList
    }}>
        {children}
    </QueueContext.Provider>
  )
}

export default AddToQueueContext
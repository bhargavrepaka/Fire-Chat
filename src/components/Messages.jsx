import React, { useEffect, useState } from 'react'
import Message from './Message'
import { useChat } from '../context/ChatContext'
import { onSnapshot,doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase-config'

const Messages = () => {
  const [messages,setMessages]=useState([])
  const {data}=useChat()

  useEffect(()=>{
     function getMessages(){
      const unsub=onSnapshot(doc(db,"chats",data.chatId),
     (doc)=>{
      doc.exists() && setMessages(doc.data().messages)
     })
     return ()=> unsub()
    }
    data.chatId && getMessages()
    
    },[data.chatId])
   

  return (
    <div className='messages'>
      {messages.map((m)=>{
        return <Message message={m} key={m.id}></Message>
      })}
        

    </div> 
  )
}

export default Messages
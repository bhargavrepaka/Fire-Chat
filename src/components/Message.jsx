import React, {  useEffect, useRef } from 'react'
import { useUser } from '../context/AuthContext'
import { useChat } from '../context/ChatContext'


const Message = ({message}) => {

  const {currentUser}=useUser()
  const {data}=useChat()
  const ref=useRef();

  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:'smooth'})
  },[message])

  
  
  return (
    <div ref={ref} className={`message ${currentUser.uid===message.senderId && "owner"}`}>
        <div className="messageInfo">
            <img src={currentUser.uid===message.senderId? currentUser.photoURL:data.user.photoURL} alt="" />
            <span>{message.date.toDate().toTimeString().slice(0,5)}</span>
        </div>
        <div className="messageContent">
            <p>{message.text}</p>
            <img src={message.img && message.img} alt="" />
        </div>
    </div>
  )
}

export default Message
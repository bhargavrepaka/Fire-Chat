import { onSnapshot,doc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase-config'
import { useUser } from '../context/AuthContext'
import { useChat } from '../context/ChatContext'

const Chats = () => {

  const [chats,setChats]=useState([])
  const {currentUser}=useUser()
  const {dispatch}=useChat()

  useEffect(()=>{
    function getChats(){
      const unsub =onSnapshot(doc(db,"userChats",currentUser.uid),(doc)=>{
      setChats(doc.data())
      })
    
      return ()=>unsub()
    }
    currentUser.uid && getChats()
  },[currentUser.uid])

  function handleSelect(u){
    dispatch({type:"CHANGE_USER",payload:u})
    

  }
  return (
    <div className='chats'> 
    
      {Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat)=>{
        return <div className="userChat" key={chat[0]}  onClick={()=>handleSelect(chat[1].userInfo)}>
        <img src={chat[1].userInfo.photoURL} alt="" />
        <div className="userChatInfo">   
          <span>{chat[1].userInfo.displayName}</span>
          <p>{chat[1]?.lastMessage?.slice(0,15)}{chat[1]?.lastMessage?.length>10 && "..."}</p>
        </div>
      </div>

      })}
    </div>
  )
}

export default Chats
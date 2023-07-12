import React, { useState } from 'react'
import Img from '../img/img.png'
import Attach from '../img/attach.png'
import { useUser } from '../context/AuthContext'
import { useChat } from '../context/ChatContext'
import { arrayUnion, serverTimestamp, updateDoc,doc, Timestamp } from 'firebase/firestore'
import { db, storage } from '../firebase-config'
import {v4 as uuid, v4} from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const Input = () => {
  const[text,setText]=useState('')
  const [img,setImg]=useState(null)
  const {currentUser}=useUser()
  const {data}=useChat()

  async function handleSend(){
    if(img){
      const metadata = {
        contentType: 'image/jpeg'
      };
      const storageRef=ref(storage,uuid())
      const uploadTask = uploadBytesResumable(storageRef, img, metadata);

      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          switch (snapshot.state) {
            case 'paused':

              break;
            case 'running':

              break;
          }
        },
        (error) => {
          setErr(true)

        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

            updateDoc(doc(db,"chats",data.chatId),{
              messages:arrayUnion({
                id: uuid(),
                text,
                senderId:currentUser.uid,
                date:Timestamp.now(),
                img:downloadURL
              })
            })

           
          });
        }
      );
      
    }else{
      updateDoc(doc(db,"chats",data.chatId),{
        messages:arrayUnion({
          id: uuid(),
          text,
          senderId:currentUser.uid,
          date:Timestamp.now()
        })
      })
    }

    updateDoc(doc(db,"userChats",currentUser.uid),{
     [ data.chatId+".lastMessage"]:text,
     [data.chatId+".date"]:serverTimestamp()
    })

    updateDoc(doc(db,"userChats",data.user.uid),{
      [ data.chatId+".lastMessage"]:text,
      [data.chatId+".date"]:serverTimestamp()
     })

     setText('')
     setImg(null)
    
  }
  return (
    <div className='input'>
        <input type="text" 
        placeholder='Type something....'
        value={text} 
        onChange={(e)=>setText(e.target.value)}
        />
        <div className="send">
            <img src={Img} alt="" />
            <input type="file" style={{display:"none"}} id="file"  onChange={(e)=>setImg(e.target.files[0])} />
            <label htmlFor="file"><img src={Attach} alt="" /></label>
            <button onClick={handleSend}>Send</button>
        </div>
    </div>
  )
}

export default Input
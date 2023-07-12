import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase-config'
import { useUser } from '../context/AuthContext'
const Nav = () => {

  const {currentUser}=useUser()

  return (
    <div className='navbar'>
      <span className="logo">Fire Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default Nav
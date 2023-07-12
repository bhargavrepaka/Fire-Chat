import React, { useState } from 'react'
import { query, where, collection, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase-config.js'
import { useUser } from '../context/AuthContext.jsx'

const Search = () => {
  const [username, setUsername] = useState()
  const [user, setUser] = useState()
  const [err, setErr] = useState(false)
  const { currentUser } = useUser();

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username))
    try {
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      })
    } catch (error) {
      console.log(error)
      setErr(true)
    }

  }

  function handleKey(e) {

    e.code === 'Enter' && handleSearch()
  }

  async function handleSelect() {
    const combinedId = currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid
    const res = await getDoc(doc(db, "chats", combinedId))


    try {
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] })
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp()
        })

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp()
        })
      }

    } catch (error) {
      console.log(error)
    }
    setUser(null)
    setUsername('')

  }

  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Find User...' onKeyDown={handleKey} value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      {err && <span>User Not Found {":("} </span>}
      {user &&
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      }
    </div>
  )
}

export default Search
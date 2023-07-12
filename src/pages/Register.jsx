import React, { useState } from 'react'
import Add from '../img/addAvatar.png'
import { auth, db, storage } from '../firebase-config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const userRef = collection(db, "users")


const Register = () => {
  const [err, setErr] = useState(false)
  const navigate = useNavigate()

  async function handlesubmit(e) {
    setErr(false)
    e.preventDefault()
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: 'image/jpeg'
      };

      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      // Listen for state changes, errors, and completion of the upload.
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

             await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL
            })

             await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL
            });

             await setDoc(doc(db, "userChats", res.user.uid), {})
            navigate('/')
          });
        }
      );


    } catch (error) {
      setErr(true)
    }


  }
  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className="logo">Fire Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handlesubmit}>
          <input type="text" name="" id="displanamefield" placeholder='Display Name' />
          <input type="email" name="" id="emailfield" placeholder='Email' />
          <input type="password" name="" id="passwordfield" placeholder='Password' />
          <input style={{ display: 'none' }} type="file" name="" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar </span>
          </label>
          <button>Sign Up</button>
        </form>
        {err && <span>Something went wrong....</span>}
        <p>Have an account? <Link to={'/login'}>Login</Link> </p>
      </div>
    </div>
  )
}

export default Register
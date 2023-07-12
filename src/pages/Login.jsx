import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase-config'
import { useUser } from '../context/AuthContext'




const Login = () => {
  const navigate = useNavigate()
  const [err, setErr] = useState('')
  const { currentUser } = useUser()

  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  })

  async function handleSubmit(e) {
    e.preventDefault()
    setErr('')
    const email = e.target[0].value
    const password = e.target[1].value

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (error) {
      setErr(error.message)

    }

  }
  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className="logo">Mist Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit} >
          <input type="email" name="" id="loginemailfeild" placeholder='Email' />
          <input type="password" name="" id="loginpasswordfield" placeholder='Password' />
          <button >Sign in</button>
        </form>
        {err && <span style={{ color: "red" }}>{err}</span>}
        <p>Don't have an account? <Link to={'/register'}>Register</Link></p>
      </div>

    </div>
  )
}

export default Login
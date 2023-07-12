import "./style.scss"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route, Navigate } from 'react-router-dom'
import { useUser } from "./context/AuthContext";
import { auth } from "./firebase-config";




function App() {
  const { currentUser } = useUser()

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={"/login"}></Navigate>
    }
    return children
  }

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute> <Home></Home></ProtectedRoute>} />
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>

    </Routes>
  );
}

export default App;

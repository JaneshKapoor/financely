import React, { useEffect } from 'react'
import "./styles.css"
import { auth } from '../../firebase';
import { useAuthState} from "react-firebase-hooks/auth";
import { Navigate, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import userImg from "../../assets/user.svg";

function Header() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
      if(user){
        navigate("/dashboard");
      }
    }, [user, loading])
    

    function logoutFnc() {
      try{
        signOut(auth).then(() => {
          // Sign-out successful.
          toast.success("Logout Successfull!")
          navigate("/")
        }).catch((error) => {
            toast.error(error.message);
          // An error happened.
        });
        alert("Logout!!!")
      }catch(e){
        toast.error(e.message);
      }
    }

  return (
    <div className='navbar'>
        <p className='logo'>Financely.</p>
        {user && (
        <div style={{display: "flex", alignItems: "center", gap: "0.75rem"}}>
          <img src={user.photoURL ? user.photoURL : userImg} alt="Photo" style={{width: "1.5rem", height: "1.5rem", borderRadius: "50%"}} />
          <p className='logo link' onClick={logoutFnc}>Logout</p> </div>)}
    </div>
  )
}

export default Header

import React, {useState} from 'react'
import "./styles.css"
import Input from "../Input" 
import Button from "../Button"
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, setDoc, getDoc} from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { provider } from '../../firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function SignupSigninComponent() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [loginForm, setLoginForm] = useState(true);
    const navigate = useNavigate();

    function signupWithEmail(){
        setLoading(true);
        // console.log("Name", name);
        // console.log("Email", email);
        // console.log("Password", password);
        // console.log("Confirm Password", confirmpassword);
        //Authenticate the user or create a new account using email and password
        if(name!=="" && email!=="" && password!== "" && confirmpassword!==""){
            if(password === confirmpassword){
                createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log("User>>>>>>", user);
                toast.success("User Created")
                setLoading(false);
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                createDoc(user);
                navigate("/dashboard")
                //Create a doc  with user id as the following id
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                toast.error(errorMessage)
                setLoading(false);
            });
        }else{
            toast.error("Password And Confirm Password should be same");
            setLoading(false);
        }
        }else{
            toast.error("All fields are mandatory")
            setLoading(false);
        }
    }

    function loginUsingEmail(){
        // console.log("Email", email);
        // console.log("Password", password);
        setLoading(true)
        if(email!=="" && password!==""){
            signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            toast.success("Login Successfull!!")
            setLoading(false);
            navigate("/dashboard")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error("Invalid Credentials")
            setLoading(false);
        });
        }else{
            toast.error("All fields are mandatory")
            setLoading(false);
        }
    }

    async function createDoc(user){
        //Make sure that the doc with the uid doesn't exist
        //Create a doc
        setLoading(true);
        const userRef = doc(db, "users", user.uid);
        const userData = await getDoc(userRef);

        if(!userData.exists()){
            try{
                await setDoc(doc(db, "users", user.uid),{
                    name: user.displayName ? user.displayName : name,
                    email: user.email,
                    photoURL: user.photoURL ? user.photoURL : "",
                    createdAt: new Date(), 
                });
                toast.success("Doc created")
                setLoading(false);
            }catch(e){
                toast.error(e.message);
                setLoading(false);
            }
        }
        else{
            toast.error("Doc already exists");
            setLoading(false);
        }   
    }
    

  function googleAuth(){
        setLoading(true);
        try{
            signInWithPopup(auth, provider)
            .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log("user>>>>", user);
            createDoc(user);
            setLoading(false);
            navigate("/dashboard")
            toast.success("User authenticated!!!")
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            }).catch((error) => {
            setLoading(false);

            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage)
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            });
        }catch(e){
            setLoading(false);
            toast.error(e.message);
        }
  }  

  return (
    <>
    {loginForm ? <div className='signup-wrapper'>
      <h2 className='title'>Login on <span style={{color: "var(--theme)"}}>Financely.</span></h2>
      <form>
      <Input type={"email"} label={"Email"} state={email} setState={setEmail} placeholder={"john@gmail.com"}/>
      <Input type={"password"} label={"Password"} state={password} setState={setPassword} placeholder={"Example@123"}/>
      <Button disabled={loading} text={loading ? "Loading..." : "Login Using Email and Password"} onClick={loginUsingEmail}/>
      <p style={{textAlign: "center", margin: 0}}>or</p>
      <Button text={loading ? "Loading..." : "Login Using Google"} blue={true} onClick={googleAuth}/>
      <p className='p-login' style={{textAlign: "center", margin: 0}}>Don't have an Account? <span style={{cursor: 'pointer', color: 'var(--theme)', textDecoration: 'underline'}} onClick={() => setLoginForm(!loginForm)}>Sign Up</span> </p>
      </form>
    </div> : 
    <div className='signup-wrapper'>
      <h2 className='title'>Sign up on <span style={{color: "var(--theme)"}}>Financely.</span></h2>
      <form>
      <Input label={"Full Name"} state={name} setState={setName} placeholder={"John Doe"}/>
      <Input type={"email"} label={"Email"} state={email} setState={setEmail} placeholder={"john@gmail.com"}/>
      <Input type={"password"} label={"Password"} state={password} setState={setPassword} placeholder={"Example@123"}/>
      <Input type={"password"} label={"Confirm Password"} state={confirmpassword} setState={setConfirmPassword} placeholder={"Example@123"}/>
      <Button disabled={loading} text={loading ? "Loading..." : "Signup Using Email and Password"} onClick={signupWithEmail}/>
      <p style={{textAlign: "center", margin: 0}}>or</p>
      <Button text={loading ? "Loading..." : "Signup Using Google"} blue={true} onClick={googleAuth}/>
      <p className='p-login' style={{textAlign: "center", margin: 0}}>Already have an Account?? <span style={{cursor: 'pointer', color: 'var(--theme)', textDecoration: 'underline'}} onClick={() => setLoginForm(!loginForm)}>Login</span> </p>
      </form>
    </div>}
    </>
  )
}

export default SignupSigninComponent

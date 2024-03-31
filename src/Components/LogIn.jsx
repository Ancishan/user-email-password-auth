import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import auth from "../firebase-config";
import { Link } from "react-router-dom";

const LogIn = () => {
const[loginError,setLoginError] = useState('')
const [loginsuccess, setLogInSucces] = useState('')
const emailRef = useRef(null);

    const handlelogin = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;


        console.log(email,password)
        // re load 
        setLogInSucces('');
        setLoginError('');

        //add vallidation

        signInWithEmailAndPassword(auth,email,password)
        .then(result =>{
            console.log(result.user)
            if(result.user.emailVerified){
                setLogInSucces('user Logged In successfully')
            }
            else{
                alert('please verify your email address')
            }
            
        })
        .catch(error => {
            console.log(error)
            setLoginError(error.message)
        })
        
    }
    const handleForgetPassword = () =>{
        const email = emailRef.current.value;
        if(!email){
            console.log('send reset email', emailRef.current.value)
        }
        else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            console.log('please write a valid email')
            return;
        }
        // send validation email
        sendPasswordResetEmail(auth,email)
        .then(() =>{
            alert('please check your email')
        })
        .catch(error => {
            console.log(error)
        })
        
    }

    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handlelogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" ref={emailRef} placeholder="email" name="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" name="password" className="input input-bordered" required />
          <label className="label">
            <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      {
        loginsuccess && <p>{loginsuccess}</p>
      }
      {
        loginError && <p>{loginError}</p>
      }

<p>New to this website Please <Link to= "/register"> Register</Link> </p>
    </div>
    
  </div>
  
</div>
    );
};

export default LogIn;
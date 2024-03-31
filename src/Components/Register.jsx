import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../firebase-config";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";


const Register = () => {
    const [registerError, setRegisterError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPass, setShowPass] =useState(false)

    const handleRegister = e =>{
        e.preventDefault();   //this part basically after submit as if the page do not load 
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email, password, accepted)
        if(password.length < 6){
            setRegisterError('password e at least 6 characters');
            return; 
        }
        else if(!/[A-Z]/.test(password)){
            setRegisterError('Your password should have at least one upper case')
            return;
        }
        else if(!accepted){
            setRegisterError('please accept our terms')
            return;
        }

        // reset error & succes ..error dekhanor por avr new user er jnnno
        setRegisterError('');
        setSuccess('')


        // create user
        createUserWithEmailAndPassword(auth,email,password)
        .then(result => {
            console.log(result.user )
            setSuccess('user successfully')

            // update profile
            updateProfile(result.user<{
                
            })

            // send verification email:
            sendEmailVerification(result.user)
            .then(()=>{
                alert('please check your email and verify your account')
            })
        })
        .catch(error => {
            console.log(error);
            setRegisterError(error.message); //if email alreday in use
        })

    }


    return (
        <div>
            <h2 className="text-3xl">Please Register</h2>

           <form onSubmit={handleRegister}>
           <div className="border border solid p-3 m-3 bg-slate-400 rounded-lg ">
           <label className="input input-bordered flex mt-4 ">               
                <input type="text" name="name"  className="grow"  placeholder="Your name"/>
            </label>
           <label className="input input-bordered flex mt-4 ">               
                <input type="email" name="email"  className="grow"  placeholder="email"/>
            </label>
            <br />
            <label className="input input-bordered flex items-center gap-2">                
                <input type={showPass ? "text" :"password"} 
                className="grow" 
                name="password"
                placeholder="password" />
                {/* <span onClick={() => setShowPass(!showPass)}><FaEye /></span>  */} 
                <span onClick={() => setShowPass(!showPass)}>
                {
                    showPass ? <FaEyeSlash /> : <FaEye />
                }
                </span>
                
            </label>
            <br />
                    <div className="mb-2">
                    <input type="checkbox" name="terms" id="terms"/>
                    <label htmlFor="terms" className="">Accept our <a href="http://192.168.1.254/welcome.htm">Terms and Conditions</a></label>
                    </div>
            <br />
            <label className="input input-bordered flex justify-center gap-2 bg-green-600 text-3xl">               
                <input  type="submit"  value="Register" />
            </label>
           
           </div>
           </form>
           {
            registerError && <p className="text-3xl text-red-700">{registerError}</p>
           }
           {
            success && <p className="text-green-900">{success}</p>
           }
           <p>Alreday have an account? please <Link to="/login">LogIn</Link> </p>
        </div>
    );
};

export default Register;
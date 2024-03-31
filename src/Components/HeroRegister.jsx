import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase-config";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const HeroRegister = () => {
  const[showPass, setShowpassword] = useState('false')

    const handleRegister = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)

       createUserWithEmailAndPassword(auth,email,password)
       .then( result =>{
        console.log(result.user)
       })
       .catch(error =>{
        console.log('error ')
       })
    }
    return (
        <div>
           <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Register now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleRegister} className="card-body">
      <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" name="email" className="input input-bordered" required />
        </div>

        <div className="border border solid p-3 m-3 ">
        <label className="input input-bordered flex items-center gap-2">
          <input type={showPass ? "text" : "password"} placeholder="password"
           name="password" 
           className="input input-bordered" required />
            <span onClick={() => setShowpassword(!showPass)}>
              {
                showPass ? <FaEyeSlash /> : <FaEye />
              }
            </span>
          </label>
        </div>
       
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
          
        </div>
        </form>
      
    </div>
  </div>
</div>
        </div>
    );
};

export default HeroRegister;
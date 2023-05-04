import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import * as sessionActions from "../store/session";

function SignupPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Navigate to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
        <div className="grid grid-cols-[1fr,1fr] relative">
            <div className="border-r-2 border-black h-[100vh] ">
                <img className="object-cover w-[100vw] h-[100vh]" src="https://w0.peakpx.com/wallpaper/905/425/HD-wallpaper-im-batman-929-amoled-bat-black-dark-hero-logo-man-marvel-minimal-minimalist-night-simple-super-vector-white.jpg"/>
                <div className="absolute top-[200px] left-20 text-white text-6xl">
                    <div>
                        Create your login
                    </div>
                    <div className="text-sm mt-16 w-[90%]">
                        We'll need your name, email address, and a unique password. You'll use this login to access Batman's hood next time.
                    </div>
                </div>

            </div>
            <div className=" relative">
                <form className="ml-20" onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <div className="w-full pr-20 mt-40">
                        <div className="text-xl">
                            Enter your first and last name as they appear on your government ID.
                        </div>
                        <div className="flex gap-x-4 mt-8">
                
                            <input
                            placeholder="First name"
                            className="border p-4 w-full text-lg mt-8" 
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                    
                            <input
                            placeholder="Last name"
                            className="border p-4 w-full text-lg mt-8" 
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            />
                        </div>

                        <input
                        placeholder="Email address"
                        className="border p-4 w-full text-lg mt-8" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                
                        <input
                        placeholder="Password (min. 10 characters)"
                        className="border p-4 w-full text-lg mt-8" 
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        />
                    </div>
        
                </form>
                <div className="absolute bottom-20 right-0 h-200px w-full border-t-2 border-black">
                    <button className="py-4 bg-black text-white font-bold rounded-full px-16 float-right mr-10 mt-20 hover:bg-gray-600" type="submit">Continue</button>

                </div>

            </div>
        </div>
    </>
  );
}

export default SignupPage;
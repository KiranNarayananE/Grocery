import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../Axios/axios.js";
import { AdminLogin } from "../../../Redux/AdminAuth.js";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminFormSubmit = (e) => {
      e.preventDefault();
      if (email === "" || password === "") {
        setErrMsg("All fields are required.");
        return;
      }
  
      if (!/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setErrMsg("Invalid email address.");
        return;
      }
  
      try {
  
        axiosInstance.post("/login", { email, password }).then((response) => {
  
            if (response.status === 201) {
                setErrMsg("Invalid Email");
              } else if (response.status === 202) {
                setErrMsg("Incorrect Password");
              } else {
                dispatch(
                    AdminLogin({
                    token: response.data.token,
                  })
                );
                navigate("/");
              }
        });
        
      } catch (error) {
        
      }
      
  };

  return (
    <div>
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">Welcome.</p>
            <form
              className="flex flex-col pt-3 md:pt-8"
              onSubmit={adminFormSubmit}
            >
              <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div class="relative">
                  <input
                    autocomplete="off"
                    id="email"
                    name="email"
                    value={email}
                    onChange={e=>{setEmail(e.target.value)}}
                    type="text"
                    class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Email address"
                  />
                  <label
                    for="email"
                    class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>
                <div class="relative">
                  <input
                    autocomplete="off"
                    id="password"
                    name="password"
                    value={password}
                    onChange={e=>{setPassword(e.target.value)}}
                    type="password"
                    class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                  />
                  <label
                    for="password"
                    class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
              </div>
              {errMsg.length > 0 && <a style={{ color: "red" }}>{errMsg}</a>}
              <input
                type="submit"
                defaultValue="Log In"
                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              />
              
            </form>
            
          </div>
        </div>
        {/* Image Section */}
        <div className="w-1/2 shadow-2xl">
          <img
            className="object-cover w-full h-screen hidden md:block py-5"
            src="https://images.unsplash.com/photo-1601600576337-c1d8a0d1373c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGdyb2Nlcnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

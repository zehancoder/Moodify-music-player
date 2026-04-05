import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router";
import { getMe, login, logoutUser } from "../services/auth.api";
import { useState } from "react";
import { currentUser, loadingState } from "../../../toolkit/slice";
import { useEffect } from "react";

function Login() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // login user
  const dispatch = useDispatch();
  const loginFunc = async (e) => {
    e.preventDefault();
    dispatch(loadingState(true));
    if (email === "" || password === "") {
      alert("please fill the form");
      return;
    }
    const response = await login({ email, username, password });
    dispatch(currentUser(response));
    if (response.success) {
      navigate("/");
    }
    dispatch(loadingState(false));
  };

  // get already login user
  const getCurrent = async () => {
    dispatch(loadingState(true));
    const response = await getMe();
    dispatch(currentUser(response));
    dispatch(loadingState(false));
    if(response.success){
      navigate('/')
    }
  };
  useEffect(() => {
    getCurrent();
  }, []);

  // logout user
  const logoutFunc = async () => {
    const response = await logoutUser();
    dispatch(currentUser(response));
  };

  const data = useSelector((state) => state.user);
  console.log(data);

  return (
    <div className="mx-auto max-w-[440px] px-4 py-16 sm:px-6 lg:px-8 w-full absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] border rounded-lg border-gray-400">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Welcome Back!</h1>
        <p className="mt-4 text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
          nulla eaque error neque ipsa culpa autem, at itaque nostrum!
        </p>
      </div>

      <form className="mx-auto mb-0 mt-8 max-w-md space-y-4" action="#">
        <div>
          <label className="sr-only" for="email">
            Email
          </label>
          <div className="relative">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
              className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              id="email"
              type="email"
            />
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  stroke-width="2"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                ></path>
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label className="sr-only" for="password">
            Password
          </label>
          <div className="relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
              className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              id="password"
              type="password"
            />
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  stroke-width="2"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                ></path>
                <path
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  stroke-width="2"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                ></path>
              </svg>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            No account yet?
            <Link to="/register" className="underline">
              Create one
            </Link>
          </p>
          <button
            onClick={loginFunc}
            className="inline-block rounded-lg bg-purple-600 px-5 py-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

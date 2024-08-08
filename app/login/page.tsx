"use client";
import React, { useEffect, useState } from "react";
import useSession from "../hooks/useSession";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

const Login = () => {
    const router = useRouter();
    const isLoggedIn = useAppSelector((state) => state.session.isLoggedIn);
    const [loginInput, setLoginInput] = useState({
        email: '',
        password: '',
        passwordFieldType: 'password'
    });

    const { loginHandler, isLoginLoading } = useSession();

    useEffect(() => {
        if(isLoggedIn) {
            router.push("/dashboard");
        }
    }, [isLoggedIn]);

  return (
    <div className="w-full bg-white dark:bg-gray-900 p-20">
      <div className="flex flex-row justify-center items-center">

        <div className="border-2 shadow-lg px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg">
            <div
              className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
            >
              <p className="text-center text-lg font-medium">
                Sign in to your account
              </p>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>

                <div className="relative">
                  <input
                    type="email"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter email"
                    onChange={(e) => setLoginInput((prev) => ({
                        ...prev,
                        email: e.target.value
                    }))}
                  />

                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>

                <div className="relative">
                  <input
                    type="password"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter password"
                    onChange={(e) => setLoginInput((prev) => ({
                        ...prev,
                        password: e.target.value
                    }))}
                  />

                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <button
                className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                onClick={() => loginHandler(loginInput.email, loginInput.password)}
              >
                {isLoginLoading ? <span className="loading loading-spinner loading-sm"></span> : 'Sign in'}
              </button>

              <p className="text-center text-sm text-gray-500">
                No account?
                <a className="underline" href="#">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

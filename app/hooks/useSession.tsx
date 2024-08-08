import React, { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useLoginMutation } from "@/store/apis/loginApi";
import { setIsLoggedIn } from "@/store/features/session";
import { useAppDispatch } from "@/store/hooks";

const useSession = () => {
  const dispatch = useAppDispatch();

  const [login, { data, isLoading, isError, isSuccess }] = useLoginMutation();

  useEffect(() => {
    if (!isError && !isLoading && isSuccess && data) {
      console.log(data);
      localStorage.setItem("accessToken", data.payload.data.accessToken);
      localStorage.setItem("refreshToken", data.payload.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.payload.data.user));
      localStorage.setItem('isLoggedIn','true');
      toast({
        title: "Successfully Logged In!",
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
      dispatch(setIsLoggedIn(true));
    }

    if (isError && !isLoading) {
    }
  }, [data, isError, isLoading, isSuccess]);

  const loginHandler = (email: string, password: string) => {
    login({
      email: email,
      password: password,
      authProvider: "Email",
    });
  };

  return {
    loginHandler,
    isLoginLoading: isLoading,
  };
};

export default useSession;

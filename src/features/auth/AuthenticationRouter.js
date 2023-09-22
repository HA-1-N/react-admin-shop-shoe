import { isRejected } from "@reduxjs/toolkit";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCurrentUserApiAsync } from "./authSlice";

const AuthenticationRouter = (props) => {
  const dispatch = useDispatch();
  const getUser = localStorage.getItem("user");
  const user = JSON.parse(getUser);
  const accessToken = user?.token;
  const id = user?.id;
  const currentUser = useSelector((state) => state.auth.currentUser);
  const init = async () => {
    if (accessToken) {
      if (!currentUser) {
        const currentUserApiAsyncAction = await dispatch(
          getCurrentUserApiAsync(id)
        );
        if (isRejected(currentUserApiAsyncAction)) {
          localStorage.clear();
        }
      }
    }
  };

  useEffect(() => {
    init();
  }, []);

  if (accessToken) {
    if (user.isAdmin) {
      return <>{props.children}</>;
    } else {
      return <Navigate to={"/"} replace />;
    }
  }
  return <Navigate to={"/"} replace />;
};

export default AuthenticationRouter;

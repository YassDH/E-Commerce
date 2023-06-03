import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useUserContext } from "../context/user_context";
import axios from "axios";

const PrivateRoute = ({ children, ...rest }) => {
  const { myUser , setMyUser } = useUserContext()
  useEffect(async ()=>{ 
    try{
      const res = await axios.get("http://localhost:5000/user")
      setMyUser(res.data);
    }catch(e){
      localStorage.removeItem("token")
      setMyUser(null);
    }
  },[])
  return (
    <Route
      {...rest}
      render={() => {
        return myUser ? children : <Redirect to="/"></Redirect>;
      }}
    ></Route>
  );
};
export default PrivateRoute;

import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useUserContext } from "../context/user_context";
import axios from "axios";

const AdminRoute = ({ children, ...rest }) => {
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
        return myUser && myUser.role === "admin" ?  children : <Redirect to="/"></Redirect>;
      }}
    ></Route>
  );
};
export default AdminRoute;

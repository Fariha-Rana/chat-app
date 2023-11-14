"use client"
import { createContext, useState, useEffect} from "react";
import userAuth from "@/appwrite/authentication";
export const AuthContext = createContext()

export default function AuthProvider({children}) {
  const [authStatus, setAuthStatus] = useState(false);
  useEffect(() => {
    async function checkLogInStatus(){
     try{
      const isLogIn = await userAuth.isLoggedIn();
      if(isLogIn) setAuthStatus(true)
     }catch(err){
        console.log(err);
     }
    }
    checkLogInStatus()
  }, [])
  return (
    <AuthContext.Provider value={{ authStatus, setAuthStatus}}>
    {children}
    </AuthContext.Provider>
  );
}
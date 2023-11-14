"use client"
import LoginComponent from "@/component/Login";
import useAuth from "@/context/useAuth";
import ChatComponent from "@/component/ChatRoom";
export default function LoginPage() {
  const { authStatus} = useAuth()
  return (
  <>
    {authStatus ? 
    <ChatComponent/>
    : <LoginComponent/> }
  </>
  )
}
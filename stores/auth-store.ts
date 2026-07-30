"use client";
import { create } from "zustand"; import { persist } from "zustand/middleware"; import type { User } from "@/lib/types";
type State={user:User|null;token:string|null;setAuth:(u:User,t:string)=>void;logout:()=>void};
export const useAuth=create<State>()(persist((set)=>({user:null,token:null,setAuth:(user,token)=>{localStorage.setItem("gearup-token",token);document.cookie=`gearup-token=${token}; path=/; max-age=604800; samesite=lax`;document.cookie=`gearup-role=${user.role}; path=/; max-age=604800; samesite=lax`;set({user,token})},logout:()=>{localStorage.removeItem("gearup-token");document.cookie="gearup-token=; path=/; max-age=0";document.cookie="gearup-role=; path=/; max-age=0";set({user:null,token:null})}}),{name:"gearup-auth"}));

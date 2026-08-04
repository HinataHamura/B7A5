"use client";
import { Moon,Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect,useState } from "react";

export function ThemeToggle(){const {resolvedTheme,setTheme}=useTheme();const [mounted,setMounted]=useState(false);useEffect(()=>setMounted(true),[]);if(!mounted)return <span className="theme-placeholder" aria-hidden="true"/>;const dark=resolvedTheme==="dark";return <button className="theme-toggle" type="button" aria-label={`Switch to ${dark?"light":"dark"} mode`} title={`Switch to ${dark?"light":"dark"} mode`} onClick={()=>setTheme(dark?"light":"dark")}>{dark?<Sun size={18}/>:<Moon size={18}/>}</button>}

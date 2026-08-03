"use client";
import Image from "next/image";
import { useState } from "react";

export function ImageGallery({images,name}:{images:string[];name:string}){const [active,setActive]=useState(images[0]);if(!active)return null;return <div><div className="card" style={{overflow:"hidden",position:"relative",height:480}}><Image src={active} fill sizes="70vw" style={{objectFit:"cover"}} alt={name}/></div>{images.length>1&&<div style={{display:"flex",gap:10,marginTop:12,overflowX:"auto"}}>{images.map((src,i)=><button key={src} onClick={()=>setActive(src)} aria-label={`View image ${i+1}`} style={{position:"relative",width:90,height:70,border:active===src?"3px solid #18794e":"1px solid #ddd",borderRadius:10,overflow:"hidden",cursor:"pointer"}}><Image src={src} fill sizes="90px" style={{objectFit:"cover"}} alt=""/></button>)}</div>}</div>}

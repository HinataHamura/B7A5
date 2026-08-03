"use client";
import { useEffect,useState } from "react";
import { api } from "@/lib/api";

export function PaymentConfirmation({sessionId}:{sessionId?:string}){
 const [message,setMessage]=useState(sessionId?"Confirming payment with Stripe…":"Payment received.");
 useEffect(()=>{if(!sessionId)return;api("/payments/confirm",{method:"POST",body:JSON.stringify({transactionId:sessionId})}).then(()=>setMessage("Payment confirmed and your rental status is updated.")).catch(()=>setMessage("Stripe received the payment. Status will update through the secure webhook shortly."))},[sessionId]);
 return <p className="muted" aria-live="polite">{message}</p>
}

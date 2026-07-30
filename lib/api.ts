import { demoGear, demoPayments, demoRentals, demoUsers } from "./demo-data";
const BASE=process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/,"")||"";
export const demoMode=process.env.NEXT_PUBLIC_DEMO_MODE!=="false";
export class ApiError extends Error { constructor(message:string,public status=500,public fields?:Record<string,string>){super(message)} }
export async function api<T>(path:string,init:RequestInit={}):Promise<T>{
 const token=typeof window!=="undefined"?localStorage.getItem("gearup-token"):null;
 const res=await fetch(`${BASE}${path}`,{...init,headers:{"Content-Type":"application/json",...(token?{Authorization:`Bearer ${token}`}:{ }),...init.headers}}).catch(()=>{throw new ApiError("Unable to reach the server. Check your connection.")});
 const body=await res.json().catch(()=>null); if(!res.ok) throw new ApiError(body?.message||"Something went wrong. Please try again.",res.status,body?.errors); return (body?.data??body) as T;
}
export async function getGear(){return demoMode?demoGear:api<typeof demoGear>("/gear")}
export async function getGearById(id:string){if(demoMode)return demoGear.find(g=>g.id===id);return api<(typeof demoGear)[0]>(`/gear/${id}`)}
export async function getRentals(scope="rentals"){return demoMode?demoRentals:api<typeof demoRentals>(`/${scope}`)}
export async function getPayments(){return demoMode?demoPayments:api<typeof demoPayments>("/payments")}
export async function getUsers(){return demoMode?demoUsers:api<typeof demoUsers>("/admin/users")}

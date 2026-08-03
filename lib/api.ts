import { demoGear, demoPayments, demoRentals, demoUsers } from "./demo-data";
import type { Gear, Payment, Rental, RentalStatus, User } from "./types";
const BASE=process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/,"")||"";
export const demoMode=process.env.NEXT_PUBLIC_DEMO_MODE!=="false";
export class ApiError extends Error { constructor(message:string,public status=500,public fields?:Record<string,string>){super(message)} }
export async function api<T>(path:string,init:RequestInit={}):Promise<T>{
 const token=typeof window!=="undefined"?localStorage.getItem("gearup-token"):null;
 const res=await fetch(`${BASE}${path}`,{...init,headers:{"Content-Type":"application/json",...(token?{Authorization:`Bearer ${token}`}:{ }),...init.headers}}).catch(()=>{throw new ApiError("Unable to reach the server. Check your connection.")});
 const body=await res.json().catch(()=>null); if(!res.ok) throw new ApiError(body?.message||"Something went wrong. Please try again.",res.status,body?.errors); return (body?.data??body) as T;
}
type RawGear={id:string;name:string;description:string;brand?:string|null;pricePerDay:number|string;stock:number;available:boolean;images?:string[];specifications?:Record<string,unknown>|null;category?:{id:string;name:string}|string;categoryId?:string;provider?:{id:string;name:string};averageRating?:number;reviewCount?:number};
type RawRental={id:string;status:RentalStatus;startDate:string;endDate:string;totalAmount:number|string;createdAt:string;customer?:User;items:Array<{quantity:number;gearItem:RawGear}>};
type RawPayment={id:string;rentalOrderId:string;amount:number|string;status:"PENDING"|"COMPLETED"|"FAILED";createdAt:string;paidAt?:string|null;transactionId:string};
const fallbackImages=["photo-1551698618-1dfe5d97d256","photo-1538805060514-97d9cc17730c","photo-1517836357463-d25dfeac3438"];
function normalizeGear(g:RawGear,index=0):Gear{return {id:g.id,name:g.name,description:g.description,brand:g.brand||"Independent",pricePerDay:Number(g.pricePerDay),stock:g.stock,available:g.available,images:g.images,image:g.images?.[0]||`https://images.unsplash.com/${fallbackImages[index%fallbackImages.length]}?auto=format&fit=crop&w=1200&q=80`,category:typeof g.category==="string"?g.category:g.category?.name||"Outdoor",categoryId:typeof g.category==="object"?g.category.id:g.categoryId,provider:g.provider,rating:g.averageRating??0,reviewCount:g.reviewCount??0,specifications:g.specifications?Object.fromEntries(Object.entries(g.specifications).map(([k,v])=>[k,String(v)])):undefined}}
function normalizeRental(r:RawRental):Rental{const item=r.items?.[0];const start=new Date(r.startDate),end=new Date(r.endDate);return {id:r.id,status:r.status,startDate:r.startDate.slice(0,10),endDate:r.endDate.slice(0,10),days:Math.max(1,Math.ceil((end.getTime()-start.getTime())/86400000)),total:Number(r.totalAmount),createdAt:r.createdAt.slice(0,10),customer:r.customer,gear:item?normalizeGear(item.gearItem):demoGear[0]}}
export async function getGear(){if(demoMode)return demoGear;return (await api<RawGear[]>("/gear")).map(normalizeGear)}
export async function getProviderGear(){if(demoMode)return demoGear;return (await api<RawGear[]>("/provider/gear")).map(normalizeGear)}
export async function getCategories(){if(demoMode)return [{id:"demo",name:"Camping"}];return api<{id:string;name:string}[]>("/categories")}
export async function getGearById(id:string){if(demoMode)return demoGear.find(g=>g.id===id);const value=await api<RawGear>(`/gear/${id}`);return normalizeGear(value)}
export async function getRentals(scope="rentals"){if(demoMode)return demoRentals;return (await api<RawRental[]>(`/${scope}`)).map(normalizeRental)}
export async function getPayments(){if(demoMode)return demoPayments;return (await api<RawPayment[]>("/payments")).map<Payment>(p=>({id:p.id,rentalId:p.rentalOrderId,amount:Number(p.amount),status:p.status==="COMPLETED"?"PAID":p.status,date:(p.paidAt||p.createdAt).slice(0,10),transactionId:p.transactionId}))}
export async function getUsers(){return demoMode?demoUsers:api<typeof demoUsers>("/admin/users")}

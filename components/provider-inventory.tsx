"use client";
import Link from "next/link";
import { useQuery,useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api,getProviderGear } from "@/lib/api";
import { money } from "@/lib/utils";
import { Button,Card } from "./ui";

export function ProviderInventory(){const qc=useQueryClient();const {data=[],isLoading}=useQuery({queryKey:["provider-gear"],queryFn:getProviderGear});async function remove(id:string,name:string){if(!confirm(`Delete ${name}? This cannot be undone.`))return;try{await api(`/provider/gear/${id}`,{method:"DELETE"});qc.setQueryData(["provider-gear"],data.filter(g=>g.id!==id));toast.success("Gear listing deleted")}catch(e){toast.error(e instanceof Error?e.message:"Could not delete gear")}}return <Card><div className="table-wrap"><table className="table"><thead><tr><th>Gear</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead><tbody>{isLoading?<tr><td colSpan={6}>Loading inventory…</td></tr>:data.map(g=><tr key={g.id}><td>{g.name}</td><td>{g.category}</td><td>{money(g.pricePerDay)}</td><td>{g.stock}</td><td><span className="badge">{g.available?"AVAILABLE":"HIDDEN"}</span></td><td style={{display:"flex",gap:8}}><Link className="btn btn-outline" href={`/dashboard/provider/gear/${g.id}/edit`}>Edit</Link><Button variant="danger" onClick={()=>remove(g.id,g.name)}>Delete</Button></td></tr>)}</tbody></table></div></Card>}

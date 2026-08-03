import { notFound } from "next/navigation";
import { Star,ShieldCheck,MapPin } from "lucide-react";
import { getGearById } from "@/lib/api";
import { money } from "@/lib/utils";
import { RentPanel } from "@/components/rent-panel";
import { ImageGallery } from "@/components/image-gallery";

export default async function GearDetail({params}:{params:Promise<{id:string}>}){
 const {id}=await params;const gear=await getGearById(id);if(!gear)notFound();
 return <div className="page container"><div style={{display:"grid",gridTemplateColumns:"1.4fr .6fr",gap:28}}><div><ImageGallery images={gear.images||[gear.image]} name={gear.name}/><p className="badge" style={{marginTop:24}}>{gear.category}</p><h1 className="section-title">{gear.name}</h1><div style={{display:"flex",gap:20}}><span><Star size={16} fill="currentColor"/> {gear.rating} ({gear.reviewCount} reviews)</span><span><MapPin size={16}/> Dhaka</span></div><p style={{fontSize:18,lineHeight:1.8}}>{gear.description}</p><h2>What you should know</h2><div className="grid" style={{gridTemplateColumns:"repeat(3,1fr)"}}>{Object.entries(gear.specifications||{}).map(([k,v])=><div className="card stat" key={k}><small className="muted">{k}</small><strong style={{fontSize:16}}>{v}</strong></div>)}</div><div className="card" style={{padding:20,marginTop:20}}><ShieldCheck color="#18794e"/><h3>Provided by {gear.provider?.name}</h3><p className="muted">Verified provider · Usually responds within one hour</p></div></div><div><p><span className="price">{money(gear.pricePerDay)}</span> / day</p><RentPanel gear={gear}/></div></div></div>
}

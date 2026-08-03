"use client";
import { useMemo,useState } from "react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getGear,getGearForDates } from "@/lib/api";
import { GearCard } from "@/components/gear-card";
import { Input,Select } from "@/components/ui";

export default function GearPage(){
 const [q,setQ]=useState("");const [category,setCategory]=useState("All");const [brand,setBrand]=useState("All");const [max,setMax]=useState(100);const [available,setAvailable]=useState(false);const [startDate,setStartDate]=useState("");const [endDate,setEndDate]=useState("");
 const validDates=Boolean(startDate&&endDate&&endDate>startDate);
 const {data=[],isLoading,error}=useQuery({queryKey:["gear",startDate,endDate],queryFn:()=>validDates?getGearForDates(startDate,endDate):getGear()});
 const categories=["All",...new Set(data.map(g=>g.category))];const brands=["All",...new Set(data.map(g=>g.brand))];
 const filtered=useMemo(()=>data.filter(g=>(g.name+g.brand).toLowerCase().includes(q.toLowerCase())&&(category==="All"||g.category===category)&&(brand==="All"||g.brand===brand)&&g.pricePerDay<=max&&(!available||g.available)),[data,q,category,brand,max,available]);
 const today=format(new Date(),"yyyy-MM-dd");
 return <div className="page container"><h1 className="section-title">Find your gear</h1><p className="muted">Quality equipment, ready when the adventure calls.</p><div className="card" style={{padding:18,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:12,margin:"25px 0"}}><Input aria-label="Search" placeholder="Search gear or brand…" value={q} onChange={e=>setQ(e.target.value)}/><Select aria-label="Category" value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(x=><option key={x}>{x}</option>)}</Select><Select aria-label="Brand" value={brand} onChange={e=>setBrand(e.target.value)}>{brands.map(x=><option key={x}>{x}</option>)}</Select><Input label="Available from" type="date" min={today} value={startDate} onChange={e=>{setStartDate(e.target.value);if(endDate<=e.target.value)setEndDate("")}}/><Input label="Available until" type="date" min={startDate||today} value={endDate} onChange={e=>setEndDate(e.target.value)}/><label className="field"><span>Up to ${max}/day</span><input type="range" min="10" max="100" value={max} onChange={e=>setMax(+e.target.value)}/></label><label><input style={{width:"auto"}} type="checkbox" checked={available} onChange={e=>setAvailable(e.target.checked)}/> Available only</label></div>{(startDate||endDate)&&!validDates&&<p className="error-box">Choose both dates, with the return date after the pickup date.</p>}{error?<div className="error-box">Could not load gear. Please try again.</div>:<><p><b>{filtered.length}</b> items found {validDates&&`for ${startDate} to ${endDate}`}</p><div className="grid gear-grid">{isLoading?[1,2,3,4,5,6].map(i=><div className="skeleton" key={i}/>):filtered.map(g=><GearCard key={g.id} gear={g}/>)}</div></>}</div>
}

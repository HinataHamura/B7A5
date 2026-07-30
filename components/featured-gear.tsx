"use client";
import { useQuery } from "@tanstack/react-query"; import { getGear } from "@/lib/api"; import { GearCard } from "./gear-card";
export function FeaturedGear(){const {data,error,isLoading}=useQuery({queryKey:["gear"],queryFn:getGear});if(error)return <div className="error-box">We couldn’t load featured gear. Please refresh the page.</div>;return <div className="grid gear-grid">{isLoading?[1,2,3].map(i=><div className="skeleton" key={i}/>):data?.slice(0,3).map(g=><GearCard key={g.id} gear={g}/>)}</div>}

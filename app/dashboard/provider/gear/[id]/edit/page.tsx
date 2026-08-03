"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getGearById } from "@/lib/api";
import { GearForm } from "@/components/gear-form";

export default function EditGear(){const {id}=useParams<{id:string}>();const {data,isLoading,error}=useQuery({queryKey:["gear",id],queryFn:()=>getGearById(id)});if(isLoading)return <div className="skeleton"/>;if(error||!data)return <div className="error-box">Could not load this gear listing.</div>;return <><h1 className="section-title">Edit gear</h1><p className="muted">Update pricing, stock, availability and listing details.</p><GearForm gear={data}/></>}

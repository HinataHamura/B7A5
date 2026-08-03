"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { gearSchema } from "@/lib/schemas";
import { api,demoMode,getCategories } from "@/lib/api";
import type { Gear } from "@/lib/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button,Input,Select } from "./ui";

type InputValues=z.input<typeof gearSchema>; type Values=z.output<typeof gearSchema>;
export function GearForm({gear}:{gear?:Gear}){
 const router=useRouter();const categories=useQuery({queryKey:["categories"],queryFn:getCategories});
 const {register,handleSubmit,formState:{errors,isSubmitting},setError}=useForm<InputValues,unknown,Values>({resolver:zodResolver(gearSchema),defaultValues:gear?{name:gear.name,category:gear.categoryId||"",brand:gear.brand,pricePerDay:gear.pricePerDay,stock:gear.stock,image:gear.image,description:gear.description,available:gear.available}:{available:true,stock:1}});
 async function submit(v:Values){try{if(!demoMode)await api(gear?`/provider/gear/${gear.id}`:"/provider/gear",{method:gear?"PUT":"POST",body:JSON.stringify({name:v.name,description:v.description,brand:v.brand,pricePerDay:v.pricePerDay,stock:v.stock,available:v.available,images:[v.image],categoryId:v.category})});toast.success(gear?"Gear listing updated":"Gear listing published");router.push("/dashboard/provider");router.refresh()}catch(e){setError("root",{message:e instanceof Error?e.message:"Could not save gear"})}}
 return <form className="form card" style={{padding:24}} onSubmit={handleSubmit(submit)}><Input label="Gear name" {...register("name")} error={errors.name?.message}/><div className="grid" style={{gridTemplateColumns:"1fr 1fr"}}><Select label="Category" {...register("category")} error={errors.category?.message}><option value="">Choose…</option>{categories.data?.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</Select><Input label="Brand" {...register("brand")} error={errors.brand?.message}/><Input label="Daily price ($)" type="number" step=".01" {...register("pricePerDay")} error={errors.pricePerDay?.message}/><Input label="Stock" type="number" {...register("stock")} error={errors.stock?.message}/></div><Input label="Image URL" type="url" {...register("image")} error={errors.image?.message}/><label className="field"><span>Description</span><textarea rows={5} {...register("description")}/>{errors.description&&<small>{errors.description.message}</small>}</label><label><input style={{width:"auto"}} type="checkbox" {...register("available")}/> Available for rental</label>{errors.root&&<div className="error-box">{errors.root.message}</div>}<Button disabled={isSubmitting||categories.isLoading}>{isSubmitting?"Saving…":gear?"Save changes":"Publish gear"}</Button></form>
}

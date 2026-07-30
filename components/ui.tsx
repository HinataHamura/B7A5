import { cn } from "@/lib/utils";
export function Button({className,variant="primary",...p}:React.ButtonHTMLAttributes<HTMLButtonElement>&{variant?:"primary"|"outline"|"danger"}){return <button className={cn("btn",variant!=="primary"&&`btn-${variant}`,className)} {...p}/>}
export function Input({label,error,...p}:React.InputHTMLAttributes<HTMLInputElement>&{label?:string;error?:string}){return <label className="field">{label&&<span>{label}</span>}<input aria-invalid={!!error} {...p}/>{error&&<small role="alert">{error}</small>}</label>}
export function Select({label,error,children,...p}:React.SelectHTMLAttributes<HTMLSelectElement>&{label?:string;error?:string}){return <label className="field">{label&&<span>{label}</span>}<select {...p}>{children}</select>{error&&<small>{error}</small>}</label>}
export function Card({className,...p}:React.HTMLAttributes<HTMLDivElement>){return <div className={cn("card",className)} {...p}/>}

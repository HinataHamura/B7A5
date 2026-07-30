import type { RentalStatus } from "./types";
export const cn=(...v:(string|false|null|undefined)[])=>v.filter(Boolean).join(" ");
export const money=(n:number)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(n);
export const statusClass=(s:RentalStatus)=>`status status-${s.toLowerCase().replace("_","-")}`;

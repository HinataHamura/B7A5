import type { Metadata } from "next"; import "./globals.css"; import { Providers } from "@/components/providers"; import { Navbar } from "@/components/navbar"; import { Footer } from "@/components/footer";
export const metadata:Metadata={title:{default:"GearUp — Rent. Explore. Repeat.",template:"%s | GearUp"},description:"Rent quality sports and outdoor equipment instantly."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Providers><Navbar/><main>{children}</main><Footer/></Providers></body></html>}

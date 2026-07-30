import { NextResponse } from "next/server"; import type { NextRequest } from "next/server";
const roles={customer:"CUSTOMER",provider:"PROVIDER",admin:"ADMIN"} as const;
export function middleware(req:NextRequest){const token=req.cookies.get("gearup-token")?.value;const role=req.cookies.get("gearup-role")?.value;const segment=req.nextUrl.pathname.split("/")[2] as keyof typeof roles;if(!token){const url=new URL("/auth/login",req.url);url.searchParams.set("next",req.nextUrl.pathname);return NextResponse.redirect(url)}if(roles[segment]&&role!==roles[segment])return NextResponse.redirect(new URL(`/dashboard/${role?.toLowerCase()||"customer"}`,req.url));return NextResponse.next()}
export const config={matcher:["/dashboard/:path*","/checkout"]};

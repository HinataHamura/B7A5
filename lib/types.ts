export type Role = "CUSTOMER" | "PROVIDER" | "ADMIN";
export type RentalStatus = "PLACED" | "CONFIRMED" | "PAID" | "PICKED_UP" | "RETURNED" | "CANCELLED";
export interface User { id: string; name: string; email: string; role: Role; status?: "ACTIVE" | "SUSPENDED"; avatar?: string }
export interface Gear { id: string; name: string; category: string; categoryId?: string; brand: string; pricePerDay: number; available: boolean; stock: number; image: string; images?: string[]; description: string; specifications?: Record<string,string>; provider?: Pick<User,"id"|"name">; rating: number; reviewCount: number }
export interface Rental { id: string; gear: Gear; customer?: User; startDate: string; endDate: string; days: number; total: number; status: RentalStatus; createdAt: string }
export interface Payment { id: string; rentalId: string; amount: number; status: "PAID"|"PENDING"|"FAILED"; date: string; transactionId?: string }
export interface ApiResponse<T> { success: boolean; message: string; data: T }

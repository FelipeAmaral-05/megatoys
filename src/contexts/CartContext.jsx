import { createContext, useState, useEffect } from "react"
export const CartContext = createContext()
export function CartProvider({children}){
const [cart, setCart] = useState(()=> JSON.parse(localStorage.getItem("megatoys_cart") ||
"[]"))
useEffect(()=> localStorage.setItem("megatoys_cart", JSON.stringify(cart)),[cart])
return <CartContext.Provider value={{cart,setCart}}>{children}</CartContext.Provider>
}
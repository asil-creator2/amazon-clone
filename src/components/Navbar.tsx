import { useEffect, useState } from "react"
import { FaBars, FaMagnifyingGlass, FaCartShopping } from "react-icons/fa6"
import { FaLocationDot } from "react-icons/fa6"
import { NavLink } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { setCategory, setSearchQuery } from "../Redux/slices/searchSlice"
import type { RootState } from "../Redux/store"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { FaRegHeart } from "react-icons/fa";

const Navbar = () => {

const [name,setName] = useState("Sign In")
const [open,setOpen] = useState(false)

const auth = getAuth()

useEffect(()=>{

const unsubscribe = onAuthStateChanged(auth,(user)=>{

if(user){
setName(user.displayName ?? "User")
}else{
setName("Sign In")
}

})

return ()=>unsubscribe()

},[])

const dispatch = useDispatch()

const searchQuery = useSelector((state:RootState)=>state.search.query)
const selectedCategory = useSelector((state:RootState)=>state.search.category)
const cart = useSelector((state:RootState)=>state.cart.products)
const favorites = useSelector((state : RootState ) => state.favorites.favorites)
const firstLetter = name !== "Sign In" ? name[0].toUpperCase() : "?"

return (
<>
<header className="bg-[#0f172a]/95 backdrop-blur border-b border-slate-700 sticky top-0 z-50">

<div className="max-w-7xl mx-auto px-6">

<div className="flex items-center justify-between h-16">

{/* LEFT */}

<div className="flex items-center gap-6">

<button
className="lg:hidden text-gray-300"
onClick={()=>setOpen(!open)}
>
<FaBars size={20}/>
</button>

<NavLink
to="/"
className="text-xl font-semibold text-white"
>
ShopSphere
</NavLink>

{/* LOCATION */}

<div className="hidden md:flex items-center gap-2 text-gray-300 text-sm">

<FaLocationDot />

<div className="leading-3">

<p className="text-xs text-gray-400">Deliver To</p>
<p>Egypt</p>

</div>

</div>

</div>

{/* SEARCH */}

<div className="hidden md:flex items-center bg-slate-800 rounded-xl overflow-hidden w-[420px]">

<select
value={selectedCategory}
onChange={(e)=>dispatch(setCategory(e.target.value))}
className="bg-slate-800 text-gray-300 text-sm px-3 outline-none"
>
<option value="all">All</option>
  <option value="beauty">beauty</option>
  <option value="fragrances">fragrances</option>
  <option value="furniture">furniture</option>
  <option value="groceries">groceries</option>
  <option value="home-decoration">home-decoration</option>
  <option value="kitchen-accessories">kitchen-accessories</option>
  <option value="laptops">laptops</option>
  <option value="mens-shirts">mens-shirts</option>
  <option value="mens-shoes">mens-shoes</option>
  <option value="mens-watches">mens-watches</option>
  <option value="mobile-accessories">mobile-accessories</option>
  <option value="motorcycle">motorcycle</option>
  <option value="skin-care">skin-care</option>
  <option value="smartphones">smartphones</option>
  <option value="sports-accessories">sports-accessories</option>
  <option value="sunglasses">sunglasses</option>
  <option value="tablets">tablets</option>
  <option value="tops">tops</option>
  <option value="vehicle">vehicle</option>
  <option value="womens-bags">womens-bags</option>
  <option value="womens-dresses">womens-dresses</option>
  <option value="womens-jewellery">womens-jewellery</option>
  <option value="womens-shoes">womens-shoes</option>
  <option value="womens-watches">womens-watches</option>

</select>

<input
type="text"
value={searchQuery}
onChange={(e)=>dispatch(setSearchQuery(e.target.value))}
placeholder="Search products..."
className="flex-1 bg-slate-800 px-3 py-2 outline-none text-sm text-white"
/>

<button className="px-4 text-gray-300">
<FaMagnifyingGlass/>
</button>

</div>

{/* RIGHT */}

<div className="flex items-center gap-6">

{/* ORDERS */}

<div className="hidden md:block text-sm text-gray-300 leading-3">

<p className="text-xs text-gray-400">Returns</p>
<p>& Orders</p>

</div>

{/* FAVORITES */}
<NavLink
to="/favorites"
className="relative text-gray-300 hover:text-white"
>

<FaRegHeart size={20}/>

<span className="absolute -top-2 -right-3 bg-red-500 text-xs px-1.5 rounded-full">

{favorites.length}

</span>

</NavLink>

{/* CART */}

<NavLink
to="/cart"
className="relative text-gray-300 hover:text-white"
>

<FaCartShopping size={20}/>

<span className="absolute -top-2 -right-3 bg-red-500 text-xs px-1.5 rounded-full">

{cart.length}

</span>

</NavLink>

{/* USER */}

<NavLink
to={name === "Sign In" ? "/signin" : "/userinfo"}
className="flex items-center text-white text-sm gap-2"
>
<div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold text-sm">{firstLetter}</div>
<div>{name}</div>

</NavLink>

</div>

</div>

</div>

</header>

{/* MOBILE MENU */}

{open && (

<div className="lg:hidden bg-slate-900 border-t border-slate-700">

<div className="p-5 space-y-4">

{/* SEARCH */}

<div className="flex bg-slate-800 rounded-lg overflow-hidden">

<input
type="text"
value={searchQuery}
onChange={(e)=>dispatch(setSearchQuery(e.target.value))}
placeholder="Search..."
className="flex-1 bg-slate-800 px-3 py-2 text-sm outline-none"
/>

<button className="px-4 text-gray-300">
<FaMagnifyingGlass/>
</button>

</div>

{/* LOCATION */}

<div className="flex items-center gap-2 text-gray-300 text-sm">

<FaLocationDot />
<span>Deliver To Egypt</span>

</div>

<NavLink to="/favorites" className="block text-gray-300">
Favorites
</NavLink>

<NavLink to="/cart" className="flex items-center gap-2 text-gray-300">

Cart

<span className="bg-red-500 text-xs px-2 rounded-full">
{cart.length}
</span>

</NavLink>

<NavLink
to={name === "Sign In" ? "/signin" : "/userinfo"}
className="block text-white"
>
{name}
</NavLink>

</div>

</div>

)}

</>
)

}

export default Navbar
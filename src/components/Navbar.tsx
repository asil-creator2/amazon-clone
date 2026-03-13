import { useEffect, useState } from "react"
import { FaLocationDot, FaMagnifyingGlass, FaBars } from "react-icons/fa6"
import {  FaShoppingCart } from "react-icons/fa"
import { NavLink } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { setCategory, setSearchQuery } from "../Redux/slices/searchSlice"
import type {RootState} from '../Redux/store'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import type { User } from "firebase/auth"

const Navbar = () => {
const [name, setName] = useState("Sign In")

const auth = getAuth()

useEffect(() => {

  const unsubscribe = onAuthStateChanged(auth, (user) => {

    if (user) {
      console.log(user.displayName)
      setName(user.displayName ?? "Sign In")
    } else {
      setName("Sign In")
    }

  })

  return () => unsubscribe()

}, [])
const [open,setOpen] = useState(false)
const dispatch = useDispatch()
const searchQuery = useSelector((state:RootState) => state.search.query)
const selectedCategory = useSelector((state:RootState) => state.search.category)
const cart = useSelector((state:RootState) => state.cart.products)
return (
<>
{/* TOP NAVBAR */}

<div className="bg-[#131921] text-white px-4 py-2">

<div className="flex items-center gap-6">

{/* logo */}
<div className="text-2xl font-bold cursor-pointer">
amazon
</div>

{/* location */}
<div className="hidden md:flex items-center gap-1 text-sm cursor-pointer">
<FaLocationDot />
<div>
<p className="text-gray-300 text-xs">Deliver To</p>
<p className="font-semibold">Egypt</p>
</div>
</div>

{/* search */}
<div className="flex flex-1 max-w-[700px]">

<select
value={selectedCategory}
onChange = {(e) => dispatch(setCategory(e.target.value))}
className="bg-gray-200 max-w-[80px] text-black px-2 rounded-l-md hidden sm:block">
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
onChange = {(e) => dispatch(setSearchQuery(e.target.value))}
placeholder="Search Amazon"
className="w-full h-10 px-3 bg-white text-black outline-none"
/>

<button className="bg-[#febd69] px-4 rounded-r-md">
<FaMagnifyingGlass className="text-black"/>
</button>

</div>

{/* right side */}
<div className="hidden lg:flex items-center gap-6 text-sm">

<div>
<NavLink
to={name === "Sign In" ? "/signin" : "/userinfo"}
className="text-gray-300 text-xs"
>
Hello, {name}
</NavLink>
<p className="font-semibold">Accounts & Lists</p>
</div>

<div>
<p className="text-gray-300 text-xs">Returns</p>
<p className="font-semibold">& Orders</p>
</div>

<div className="flex items-center gap-1 cursor-pointer">
<FaShoppingCart size={22}/>
<NavLink to={'/cart'} className="font-semibold">Cart</NavLink>
</div>

</div>

{/* mobile menu button */}
<button
className="lg:hidden"
onClick={()=>setOpen(!open)}
>
<FaBars size={22}/>
</button>

</div>

</div>

{/* SECOND NAVBAR */}

<div className="bg-[#232f3e] text-white px-4 py-2 hidden lg:flex gap-6 text-sm">

<NavLink to={'/'} className="cursor-pointer">All</NavLink>
<p className="cursor-pointer">Today's Deals</p>
<p className="cursor-pointer">Customer Service</p>
<p className="cursor-pointer">Gift Cards</p>
<p className="cursor-pointer">Registry</p>
<NavLink to={'/favorites'} className="cursor-pointer">Favorites</NavLink>

</div>

{/* MOBILE MENU */}

{open && (
<div className="lg:hidden bg-[#232f3e] text-white px-4 py-4 space-y-3 flex flex-col gap-2">
<NavLink to={'/signin'} className="text-gray-300 text-lg">Hello, {name}</NavLink>
<NavLink to={'/'} className="cursor-pointer">All</NavLink>
<NavLink to={'/cart'}><span className="w-5 h-5 rounded-full bg-red-500 p-2 ">{cart.length}</span> Cart</NavLink>
<NavLink to={'/favorites'} className="cursor-pointer">Favorites</NavLink>

</div>
)}

</>
)

}

export default Navbar
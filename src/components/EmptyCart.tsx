import { NavLink } from "react-router"
import { emptyCart } from "../assets"

const EmptyCart = () => {
  return (
    <div className="flex items-center justify-center h-[60vh] gap-10">

    <img src={emptyCart} className="w-72" />

    <div className="bg-white shadow-md rounded-lg p-8 max-w-md">

      <h2 className="text-2xl font-bold mb-3">
        Your Cart feels lonely.
      </h2>

      <p className="text-gray-600 mb-6">
        Your Shopping cart lives to serve. Give it purpose – fill it
        with books, electronics, videos, etc. and make it happy.
      </p>

      <NavLink to={'/'} className="bg-yellow-400 px-6 py-3 rounded font-semibold">
        Continue Shopping
      </NavLink>

    </div>
  </div>
  )
}

export default EmptyCart

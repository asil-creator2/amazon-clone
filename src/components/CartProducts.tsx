import { useDispatch, useSelector } from "react-redux"
import { clearCart, decrement, increment, removeItem } from "../Redux/slices/cartSlice"
import type { CartProduct } from "../Types/interfaces"
import type { RootState, AppDispatch } from "../Redux/store"

const CartProducts = () => {

  const products = useSelector((state: RootState) => state.cart.products)
  const dispatch = useDispatch<AppDispatch>()

  const total = products.reduce(
    (acc: number, item: CartProduct) => acc + item.price * item.quantity,
    0
  )

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <h1 className="text-2xl font-bold">Your cart is empty 🛒</h1>
        <p className="text-gray-500">Looks like you haven't added anything yet</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-hidden max-w-6xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Cart Section */}
      <div className="md:col-span-2">

        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        {products.map((product: CartProduct) => (
          <div
            key={product.id}
            className="flex flex-col md:flex-row gap-4 md:gap-6 border-b py-6"
          >

            <img
              src={product.thumbnail}
              className="w-full md:w-28 h-28 object-contain"
            />

            <div className="flex-1">

              <h2 className="text-lg md:text-xl font-semibold">
                {product.title}
              </h2>

              <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                {product.description}
              </p>

              <p className="mt-2 font-semibold">
                Unit Price ${product.price}
              </p>

              {/* Quantity */}
              <div className="flex items-center gap-3 mt-3">

                <button
                  onClick={() => dispatch(decrement(product))}
                  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                >
                  -
                </button>

                <span className="font-semibold">{product.quantity}</span>

                <button
                  onClick={() => dispatch(increment(product))}
                  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                >
                  +
                </button>

              </div>

              <button
                onClick={() => dispatch(removeItem(product))}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete Item
              </button>

            </div>

            {/* Price */}
            <div className="font-bold text-lg">
              ${(product.price * product.quantity).toFixed(2)}
            </div>

          </div>
        ))}

        {/* Clear Cart */}
        <button
          onClick={() => dispatch(clearCart())}
          className="mt-6 bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600"
        >
          Clear Cart
        </button>

      </div>

      {/* Summary */}
      <div className="bg-gray-100 p-6 rounded-lg h-fit md:sticky md:top-20">

        <p className="text-green-600 font-medium">
          ✔ Your order qualifies for FREE Shipping
        </p>

        <h2 className="text-2xl font-bold mt-4">
          Total: ${total.toFixed(2)}
        </h2>

        <button className="w-full bg-yellow-400 mt-4 py-3 rounded font-semibold hover:bg-yellow-500">
          Proceed to Buy
        </button>

      </div>

    </div>
  )
}

export default CartProducts
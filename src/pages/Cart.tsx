import { useSelector } from "react-redux"
import EmptyCart from "../components/EmptyCart"
import CartProducts from "../components/CartProducts"

const Cart = () => {
  const products  = useSelector((state: any) => state.cart.products)

  return (
    <>
      {products.length === 0 ? <EmptyCart/> : <CartProducts/>}
    </>
  )
}

export default Cart

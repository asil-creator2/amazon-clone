import axios from "axios"
import { useEffect, useState } from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"

import { Autoplay, Pagination } from "swiper/modules"
import type { ProductHome } from "../Types/interfaces"


const Hero = () => {

  const [products, setProducts] = useState<ProductHome[]>([])

  useEffect(() => {

    const getProducts = async () => {
      const res = await axios.get("https://dummyjson.com/products?limit=8")
      setProducts(res.data.products)
    }

    getProducts()

  }, [])

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={30}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false
      }}
      pagination={{ clickable: true }}
      className="w-full h-[420px]"
    >

      {products.map(product => (

        <SwiperSlide key={product.id}>

          <div className="w-full h-full bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center">

            <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">

              {/* LEFT SIDE */}

              <div className="space-y-5">

                <h1 className="text-4xl font-bold">
                  {product.title}
                </h1>

                <p className="text-gray-300 text-lg line-clamp-2">
                  {product.description}
                </p>

                <div className="text-3xl font-bold text-yellow-400">
                  ${product.price}
                </div>

                <button className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500 transition">
                  Shop Now
                </button>

              </div>

              {/* RIGHT SIDE */}

              <div className="flex justify-center">

                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-[320px] object-contain drop-shadow-2xl hover:scale-105 transition"
                />

              </div>

            </div>

          </div>

        </SwiperSlide>

      ))}

    </Swiper>
  )
}

export default Hero
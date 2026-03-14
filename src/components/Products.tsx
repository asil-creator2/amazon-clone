import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../Redux/slices/cartSlice"
import type { ProductHome } from "../Types/interfaces"
import type { RootState } from '../Redux/store'
import { toggleFavorites } from "../Redux/slices/favoritesSlice"
import { FaRegHeart } from "react-icons/fa";


const Products = () => {
    const [products , setProducts] = useState<ProductHome[]>([])
    const favorites = useSelector((state : RootState) => state.favorites.favorites)
    const searchQuery = useSelector((state: RootState) => state.search.query)
    const dispatch = useDispatch()

    useEffect (() => {
        const getProducts = async () : Promise<void> => {
            const res = await axios.get('https://dummyjson.com/products?limit=2000')
            console.log(res.data.products);
            setProducts(res.data.products)
        }
        getProducts()
    },[])
    const selectedCategory = useSelector((state: RootState) => state.search.category);

    const filteredProducts = useMemo(() => {
    return products.filter((product) => {
        // 1. Check if it matches the search text
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());

        // 2. Check if it matches the category
        // If category is 'all', every product matches. Otherwise, check the product.category
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });
    }, [products, searchQuery, selectedCategory]); // Now it watches both!
        
     
  return (
    <div className="container mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 p-5 md:p-20">
      {filteredProducts.map(product => {
        const isFavorite = favorites.some((item) => item.id === product.id)
        return (
            <div
            key={product.id}
            className="group bg-slate-900 rounded-2xl border border-slate-800 hover:border-slate-600 shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >

            {/* IMAGE */}

            <div className="relative bg-slate-800 flex items-center justify-center h-56 overflow-hidden">

            <img
            src={product.thumbnail}
            alt={product.title}
            className="h-44 object-contain group-hover:scale-110 transition duration-500"
            />

            {/* FAVORITE BUTTON */}

            <button
            onClick={() => dispatch(toggleFavorites({ ...product }))}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur border border-slate-700 transition
            ${isFavorite ? "bg-red-500 text-white" : "bg-slate-800 text-gray-300 hover:bg-red-500 hover:text-white"}`}
            >
            <FaRegHeart />
            </button>

            {/* CATEGORY */}

            <span className="absolute bottom-3 left-3 text-xs px-2 py-1 rounded-md bg-slate-700 text-gray-300 capitalize">
            {product.category}
            </span>

            </div>

            {/* CONTENT */}

            <div className="p-5 space-y-3">

            <h3 className="text-lg font-semibold text-white line-clamp-1">
            {product.title}
            </h3>

            <p className="text-sm text-gray-400 line-clamp-2">
            {product.description}
            </p>

            {/* RATING */}

            <div className="flex items-center gap-2 text-sm">

            <span className="text-yellow-400">
            {"★".repeat(Math.round(
            product.reviews.length > 0
            ? product.reviews.reduce((sum, r) => sum + r.rating, 0) /
            product.reviews.length
            : 0
            ))}
            </span>

            <span className="text-gray-400">
            {product.reviews.length > 0
            ? (
            product.reviews.reduce((sum, r) => sum + r.rating, 0) /
            product.reviews.length
            ).toFixed(1)
            : "N/A"}
            </span>

            </div>

            {/* PRICE + ACTION */}

            <div className="flex items-center justify-between pt-3">

            <span className="text-xl font-bold text-white">
            ${product.price}
            </span>

            <button
            onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition shadow"
            >
            Add to Cart
            </button>

            </div>

            </div>

            </div>        
        )
        })}
    </div>
  )
}

export default Products

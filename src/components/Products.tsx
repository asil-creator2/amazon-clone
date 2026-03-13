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
                    <div key={product.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-200 dark:border-gray-700">

            <div className="product-image">
                <img 
                src={product.thumbnail }
                alt={product.title }
                className="w-full h-48 object-cover"
                />
            </div>

            <div className="product-info p-4 space-y-2">

                <div className="product-category text-xs font-semibold text-orange-500 uppercase tracking-wide">
                    {product.category }
                </div>

                <h3 className="product-title text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {product.title }
                </h3>

                <p className="product-description text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {product.description }
                </p>

                <div className="product-rating flex items-center gap-2 text-yellow-500">
                    <div className="stars"></div>
                    <div className="rating-count text-gray-500 dark:text-gray-400 text-sm">
                        {product.reviews.length > 0 ? (product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length).toFixed(1) : 'N/A'}
                    </div>
                </div>

                <div className="product-price text-xl font-bold text-gray-900 dark:text-white">
                    {product.price}
                </div>

                <div className="product-actions flex items-center gap-3 pt-2">

                    <button 
                    className="cursor-pointer add-to-cart flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition"
                    onClick={() => {dispatch(addToCart({...product , quantity : 1}))}}
                    >
                        🛒 Add to Cart
                    </button>

                    <button 
                    className={`cursor-pointer wishlist-btn p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300  dark:hover:bg-red-900 dark:hover:text-red-400 transition 
                        ${isFavorite ? "bg-red-500 text-white" : "bg-gray-200  hover:text-red-600"}`}
                    onClick={() => {
                        dispatch(toggleFavorites({...product}))
                    }}>
                        <FaRegHeart />
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
